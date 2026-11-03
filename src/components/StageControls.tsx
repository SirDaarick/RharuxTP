import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  Bug,
} from 'lucide-react';
import type { VoiceMode } from '../App';

interface StageControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  onPrevSong: () => void;
  onNextSong: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentTimeSec: number;
  totalDurationSec: number;
  speedMultiplier: number;
  onChangeSpeed: (speed: number) => void;
  voiceMode: VoiceMode;
  onToggleVoice: () => void;
  onOpenDebugger?: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const StageControls: React.FC<StageControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onRestart,
  onPrevSong,
  onNextSong,
  hasPrev,
  hasNext,
  currentTimeSec,
  totalDurationSec,
  speedMultiplier,
  onChangeSpeed,
  voiceMode,
  onToggleVoice,
  onOpenDebugger,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  const handleCycleSpeed = () => {
    if (speedMultiplier === 1.0) onChangeSpeed(1.2);
    else if (speedMultiplier === 1.2) onChangeSpeed(0.8);
    else onChangeSpeed(1.0);
  };

  const isVoiceActive = voiceMode !== 'off';

  return (
    <div className="spotify-controls-floating-dock">
      {/* Left: Time & Speed */}
      <div className="dock-left-group">
        <span className="dock-time-text">
          {formatTime(currentTimeSec)} / {formatTime(totalDurationSec)}
        </span>

        {!isVoiceActive && (
          <button
            className="dock-speed-pill"
            onClick={handleCycleSpeed}
            title="Velocidad (0.8x / 1.0x / 1.2x)"
          >
            {speedMultiplier}x
          </button>
        )}
      </div>

      {/* Center: Playback Transport */}
      <div className="dock-center-group">
        <button
          className="dock-btn-round"
          onClick={onPrevSong}
          disabled={!hasPrev}
          title="Canción anterior"
        >
          <SkipBack size={18} />
        </button>

        {/* In Voice Mode: Hide play/pause button completely to avoid confusion */}
        {!isVoiceActive ? (
          <button
            className="dock-btn-play-main"
            onClick={onTogglePlay}
            title={isPlaying ? 'Pausa (Espacio)' : 'Reproducir (Espacio)'}
          >
            {isPlaying ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play size={22} fill="currentColor" style={{ marginLeft: 2 }} />
            )}
          </button>
        ) : (
          <div
            className="dock-voice-active-pill"
            title="Modo Voz activo: el teleprompter avanza automáticamente al cantar (sin reproducción por tiempo)"
          >
            <Mic size={16} className="mic-listening-pulse" />
            <span className="dock-voice-pill-text">Voz</span>
          </div>
        )}

        <button
          className="dock-btn-round"
          onClick={onNextSong}
          disabled={!hasNext}
          title="Siguiente canción"
        >
          <SkipForward size={18} />
        </button>
      </div>

      {/* Right: Clean Action Icons */}
      <div className="dock-right-group">
        {/* Restart */}
        <button
          className="dock-btn-round dock-btn-subtle"
          onClick={onRestart}
          title="Reiniciar canción (R)"
        >
          <RotateCcw size={16} />
        </button>

        {/* Minimalist Voice Toggle */}
        <button
          className={`dock-btn-round dock-btn-subtle ${
            isVoiceActive ? 'dock-btn-mic-active' : ''
          }`}
          onClick={onToggleVoice}
          title={
            isVoiceActive
              ? 'Micrófono: Activo (Click para apagar y usar Tiempo)'
              : 'Micrófono: Apagado (Click para activar sincronización por voz)'
          }
        >
          {!isVoiceActive ? (
            <MicOff size={16} />
          ) : (
            <div className="mic-icon-wrapper">
              <Mic size={16} />
              <span className="mic-dot dot-online" />
            </div>
          )}
        </button>

        {/* Debug Console */}
        {onOpenDebugger && (
          <button
            className="dock-btn-round dock-btn-subtle"
            onClick={onOpenDebugger}
            title="Diagnóstico de micrófono y logs"
          >
            <Bug size={16} />
          </button>
        )}

        {/* Fullscreen */}
        <button
          className="dock-btn-round dock-btn-subtle"
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa (F)'}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );
};
