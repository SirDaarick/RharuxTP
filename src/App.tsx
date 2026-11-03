import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { SETLIST } from './data/songs';
import type { Song, SongLine } from './data/songs';
import {
  getMergedSongs,
  saveLineOverride,
  removeLineOverride,
  hasLineOverride,
} from './utils/songStorage';
import { useTimeline } from './hooks/useTimeline';
import { useVoiceSync } from './hooks/useVoiceSync';
import { useWakeLock } from './hooks/useWakeLock';
import { useStageShortcuts } from './hooks/useStageShortcuts';
import { StageHeader } from './components/StageHeader';
import { SongPrompter } from './components/SongPrompter';
import { StageControls } from './components/StageControls';
import { SetlistView } from './components/SetlistView';
import { VoiceDebugger } from './components/VoiceDebugger';
import gsap from 'gsap';

export type VoiceMode = 'words' | 'off';
export type ScreenView = 'setlist' | 'prompter';

export function App() {
  const [songs, setSongs] = useState<Song[]>(() => getMergedSongs(SETLIST));
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('setlist');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [voiceMode, setVoiceMode] = useState<VoiceMode>(() => {
    const saved = localStorage.getItem('rharux_voice_mode') as VoiceMode;
    return saved === 'words' ? 'words' : 'off';
  });
  const [isDebuggerOpen, setIsDebuggerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mainViewRef = useRef<HTMLDivElement>(null);

  const currentSong = songs[currentSongIndex] || songs[0];
  const hasPrev = currentSongIndex > 0;
  const hasNext = currentSongIndex < songs.length - 1;

  // WakeLock: keeps screen awake
  useWakeLock();

  // Auto-advance callback
  const handleAutoAdvance = useCallback(() => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(prev => prev + 1);
    }
  }, [currentSongIndex, songs.length]);

  // Timeline Engine
  const {
    currentTimeSec,
    totalDurationSec,
    isPlaying,
    activeLineIndex,
    flatLines,
    togglePlay,
    restart,
    jumpToLine,
    nudgeTime,
  } = useTimeline({
    song: currentSong,
    speedMultiplier,
    autoAdvanceDelaySec: 5,
    onAutoAdvance: handleAutoAdvance,
  });

  const allLinesText = useMemo(() => flatLines.map(l => l.text), [flatLines]);

  const advanceToNextLine = useCallback(
    (fromIndex?: number) => {
      const current = fromIndex ?? activeLineIndex;
      const nextIdx = Math.min(flatLines.length - 1, current + 1);
      jumpToLine(nextIdx);
    },
    [activeLineIndex, flatLines.length, jumpToLine]
  );

  // Voice Sync (Online SpeechRecognition)
  const voiceLang = currentSong.id === 'breaking-the-law' ? 'en-US' : 'es-MX';
  const {
    status: speechStatus,
    logs: voiceLogs,
    clearLogs: handleClearLogs,
    startRecognition: handleRestartVoice,
    simulateVoiceInput,
  } = useVoiceSync({
    enabled: voiceMode === 'words' && currentScreen === 'prompter',
    activeLineIndex,
    allLines: allLinesText,
    lang: voiceLang,
    onAdvanceToNextLine: advanceToNextLine,
  });

  // Countdown Engine (3-2-1 Lead-in Count-in)
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const clearCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdown(null);
  }, []);

  const handlePlayWithCountdown = useCallback(() => {
    // In voice mode, playback is controlled by voice, not by time!
    if (voiceMode !== 'off') return;

    if (isPlaying) {
      clearCountdown();
      togglePlay();
      return;
    }

    if (countdown !== null) {
      // Tap again during countdown -> start immediately
      clearCountdown();
      togglePlay();
      return;
    }

    // Start 3-second countdown
    let currentCount = 3;
    setCountdown(currentCount);

    countdownIntervalRef.current = window.setInterval(() => {
      currentCount -= 1;
      if (currentCount <= 0) {
        clearCountdown();
        togglePlay();
      } else {
        setCountdown(currentCount);
      }
    }, 1000);
  }, [isPlaying, countdown, clearCountdown, togglePlay, voiceMode]);

  useEffect(() => {
    clearCountdown();
  }, [currentSongIndex, clearCountdown]);

  const handleToggleVoiceMode = useCallback(() => {
    setVoiceMode(prev => {
      const next: VoiceMode = prev === 'off' ? 'words' : 'off';
      if (next !== 'off') {
        clearCountdown();
        if (isPlaying) {
          togglePlay();
        }
      }
      localStorage.setItem('rharux_voice_mode', next);
      return next;
    });
  }, [clearCountdown, isPlaying, togglePlay]);

  const handleSelectVoiceMode = useCallback(
    (mode: VoiceMode) => {
      if (mode !== 'off') {
        clearCountdown();
        if (isPlaying) {
          togglePlay();
        }
      }
      setVoiceMode(mode);
      localStorage.setItem('rharux_voice_mode', mode);
    },
    [clearCountdown, isPlaying, togglePlay]
  );

  const handlePrevSong = useCallback(() => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(prev => prev - 1);
    }
  }, [currentSongIndex]);

  const handleNextSong = useCallback(() => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(prev => prev + 1);
    }
  }, [currentSongIndex, songs.length]);

  const handleSelectSong = useCallback(
    (song: Song) => {
      const idx = songs.findIndex(s => s.id === song.id);
      if (idx !== -1) {
        setCurrentSongIndex(idx);
      }
      setCurrentScreen('prompter');
    },
    [songs]
  );

  const handleStartShow = useCallback(() => {
    setCurrentSongIndex(0);
    setCurrentScreen('prompter');
    if (voiceMode === 'off') {
      handlePlayWithCountdown();
    }
  }, [handlePlayWithCountdown, voiceMode]);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch(err => {
          console.warn('Error attempting to enable fullscreen:', err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch(err => {
          console.warn('Error attempting to exit fullscreen:', err);
        });
    }
  }, []);

  // Screen transition animation with GSAP
  useEffect(() => {
    if (!mainViewRef.current) return;
    gsap.fromTo(
      mainViewRef.current,
      { opacity: 0, scale: 0.985 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
        clearProps: 'transform',
      }
    );
  }, [currentScreen]);

  // Stage Shortcuts
  useStageShortcuts({
    onTogglePlay: handlePlayWithCountdown,
    onRestart: () => {
      clearCountdown();
      restart();
    },
    onPrevSong: () => {
      clearCountdown();
      handlePrevSong();
    },
    onNextSong: () => {
      clearCountdown();
      handleNextSong();
    },
    onNudge: nudgeTime,
    onToggleVoice: handleToggleVoiceMode,
    onToggleSetlist: () => {
      clearCountdown();
      setCurrentScreen(prev => (prev === 'setlist' ? 'prompter' : 'setlist'));
    },
    onToggleFullscreen: handleToggleFullscreen,
  });

  // Song Line Editing Handlers
  const handleSaveLine = useCallback(
    (sectionIndex: number, lineIndexInSection: number, updatedLine: SongLine) => {
      saveLineOverride(currentSong.id, sectionIndex, lineIndexInSection, updatedLine);
      setSongs(getMergedSongs(SETLIST));
    },
    [currentSong.id]
  );

  const handleResetLine = useCallback(
    (sectionIndex: number, lineIndexInSection: number) => {
      removeLineOverride(currentSong.id, sectionIndex, lineIndexInSection);
      setSongs(getMergedSongs(SETLIST));
    },
    [currentSong.id]
  );

  const checkIsLineCustomized = useCallback(
    (sectionIndex: number, lineIndexInSection: number) => {
      return hasLineOverride(currentSong.id, sectionIndex, lineIndexInSection);
    },
    [currentSong.id]
  );

  return (
    <div className="teleprompter-app-root">
      <div className="view-animation-wrapper" ref={mainViewRef}>
        {currentScreen === 'setlist' ? (
          <SetlistView
            songs={songs}
            currentSongId={currentSong.id}
            onSelectSong={handleSelectSong}
            onStartShow={handleStartShow}
          />
        ) : (
          <div className="prompter-full-view">
            {/* Minimalist Top Header */}
            <StageHeader
              currentSong={currentSong}
              onBackToSetlist={() => {
                clearCountdown();
                setCurrentScreen('setlist');
              }}
              currentTimeSec={currentTimeSec}
              isPlaying={isPlaying}
              voiceMode={voiceMode}
              onSelectVoiceMode={handleSelectVoiceMode}
            />

            {/* Main Spotify-style Prompter Area */}
            <main className="prompter-body">
              {/* 100% Fixed Viewport Vignettes (Never scroll with lyrics!) */}
              <div className="prompter-vignette-top" />
              <div className="prompter-vignette-bottom" />

              {/* Live Count-in Overlay (3 - 2 - 1) */}
              {countdown !== null && (
                <div
                  className="prompter-countdown-overlay"
                  onClick={handlePlayWithCountdown}
                  title="Toca para iniciar de inmediato"
                >
                  <div className="countdown-card">
                    <div className="countdown-number">{countdown}</div>
                    <div className="countdown-label">¡Prepárate!</div>
                    <div className="countdown-hint">Toca para saltar la cuenta</div>
                  </div>
                </div>
              )}

              <SongPrompter
                flatLines={flatLines}
                activeLineIndex={activeLineIndex}
                currentTimeSec={currentTimeSec}
                isPlaying={isPlaying}
                voiceMode={voiceMode}
                songTitle={currentSong.title}
                onJumpToLine={jumpToLine}
                onTogglePlay={handlePlayWithCountdown}
                onSaveLine={handleSaveLine}
                onResetLine={handleResetLine}
                isLineCustomized={checkIsLineCustomized}
              />
            </main>

            {/* Minimalist Floating Controls Dock */}
            <StageControls
              isPlaying={isPlaying}
              onTogglePlay={handlePlayWithCountdown}
              onRestart={() => {
                clearCountdown();
                restart();
              }}
              onPrevSong={() => {
                clearCountdown();
                handlePrevSong();
              }}
              onNextSong={() => {
                clearCountdown();
                handleNextSong();
              }}
              hasPrev={hasPrev}
              hasNext={hasNext}
              currentTimeSec={currentTimeSec}
              totalDurationSec={totalDurationSec}
              speedMultiplier={speedMultiplier}
              onChangeSpeed={setSpeedMultiplier}
              voiceMode={voiceMode}
              onToggleVoice={handleToggleVoiceMode}
              onOpenDebugger={() => setIsDebuggerOpen(true)}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
            />
          </div>
        )}
      </div>

      {/* Real-time Voice & Audio Diagnostic Modal */}
      <VoiceDebugger
        isOpen={isDebuggerOpen}
        onClose={() => setIsDebuggerOpen(false)}
        logs={voiceLogs}
        onClearLogs={handleClearLogs}
        onSimulatePhrase={simulateVoiceInput}
        currentExpectedLine={flatLines[activeLineIndex]?.text || ''}
        isListening={speechStatus === 'listening'}
        onRestartRecognition={handleRestartVoice}
      />
    </div>
  );
}

export default App;
