import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { SETLIST } from './data/songs';
import type { Song } from './data/songs';
import { useTimeline } from './hooks/useTimeline';
import { useVoiceSync } from './hooks/useVoiceSync';
import { useOfflineVoiceTrigger } from './hooks/useOfflineVoiceTrigger';
import { useWakeLock } from './hooks/useWakeLock';
import { useStageShortcuts } from './hooks/useStageShortcuts';
import { StageHeader } from './components/StageHeader';
import { SongPrompter } from './components/SongPrompter';
import { StageControls } from './components/StageControls';
import { SetlistView } from './components/SetlistView';
import { VoiceDebugger } from './components/VoiceDebugger';
import gsap from 'gsap';

export type VoiceMode = 'words' | 'offline_vad' | 'off';
export type ScreenView = 'setlist' | 'prompter';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('setlist');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [voiceMode, setVoiceMode] = useState<VoiceMode>(() => {
    const saved = localStorage.getItem('rharux_voice_mode') as VoiceMode;
    return saved === 'words' || saved === 'offline_vad' ? saved : 'off';
  });
  const [isDebuggerOpen, setIsDebuggerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mainViewRef = useRef<HTMLDivElement>(null);

  const currentSong = SETLIST[currentSongIndex];
  const hasPrev = currentSongIndex > 0;
  const hasNext = currentSongIndex < SETLIST.length - 1;

  // WakeLock: keeps screen awake
  useWakeLock();

  // Auto-advance callback
  const handleAutoAdvance = useCallback(() => {
    if (currentSongIndex < SETLIST.length - 1) {
      setCurrentSongIndex(prev => prev + 1);
    }
  }, [currentSongIndex]);

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

  // Offline Voice Activity Trigger (Huawei / offline Web Audio)
  useOfflineVoiceTrigger({
    enabled: voiceMode === 'offline_vad' && currentScreen === 'prompter',
    thresholdPercent: 20,
    silenceDurationMs: 350,
    onVoiceTrigger: () => advanceToNextLine(),
  });

  const handleToggleVoiceMode = useCallback(() => {
    setVoiceMode(prev => {
      let next: VoiceMode;
      if (prev === 'off') next = 'words';
      else if (prev === 'words') next = 'offline_vad';
      else next = 'off';
      localStorage.setItem('rharux_voice_mode', next);
      return next;
    });
  }, []);

  const handlePrevSong = useCallback(() => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(prev => prev - 1);
    }
  }, [currentSongIndex]);

  const handleNextSong = useCallback(() => {
    if (currentSongIndex < SETLIST.length - 1) {
      setCurrentSongIndex(prev => prev + 1);
    }
  }, [currentSongIndex]);

  const handleSelectSong = useCallback(
    (song: Song) => {
      const idx = SETLIST.findIndex(s => s.id === song.id);
      if (idx !== -1) {
        setCurrentSongIndex(idx);
      }
      setCurrentScreen('prompter');
    },
    []
  );

  const handleStartShow = useCallback(() => {
    setCurrentSongIndex(0);
    setCurrentScreen('prompter');
    if (!isPlaying) {
      togglePlay();
    }
  }, [isPlaying, togglePlay]);

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
      { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  }, [currentScreen]);

  // Stage Shortcuts
  useStageShortcuts({
    onTogglePlay: togglePlay,
    onRestart: restart,
    onPrevSong: handlePrevSong,
    onNextSong: handleNextSong,
    onNudge: nudgeTime,
    onToggleVoice: handleToggleVoiceMode,
    onToggleSetlist: () =>
      setCurrentScreen(prev => (prev === 'setlist' ? 'prompter' : 'setlist')),
    onToggleFullscreen: handleToggleFullscreen,
  });

  return (
    <div className="teleprompter-app-root">
      <div className="view-animation-wrapper" ref={mainViewRef}>
        {currentScreen === 'setlist' ? (
          <SetlistView
            currentSongId={currentSong.id}
            onSelectSong={handleSelectSong}
            onStartShow={handleStartShow}
          />
        ) : (
          <div className="prompter-full-view">
            {/* Minimalist Top Header */}
            <StageHeader
              currentSong={currentSong}
              onBackToSetlist={() => setCurrentScreen('setlist')}
              currentTimeSec={currentTimeSec}
              isPlaying={isPlaying}
            />

            {/* Main Spotify-style Prompter Area */}
            <main className="prompter-body">
              {/* 100% Fixed Viewport Vignettes (Never scroll with lyrics!) */}
              <div className="prompter-vignette-top" />
              <div className="prompter-vignette-bottom" />

              <SongPrompter
                flatLines={flatLines}
                activeLineIndex={activeLineIndex}
                currentTimeSec={currentTimeSec}
                isPlaying={isPlaying}
                onJumpToLine={jumpToLine}
                onTogglePlay={togglePlay}
              />
            </main>

            {/* Minimalist Floating Controls Dock */}
            <StageControls
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onRestart={restart}
              onPrevSong={handlePrevSong}
              onNextSong={handleNextSong}
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
