import { useEffect } from 'react';

interface StageShortcutsProps {
  onTogglePlay: () => void;
  onRestart: () => void;
  onPrevSong: () => void;
  onNextSong: () => void;
  onNudge: (deltaSec: number) => void;
  onToggleVoice: () => void;
  onToggleSetlist: () => void;
  onToggleFullscreen: () => void;
}

export function useStageShortcuts({
  onTogglePlay,
  onRestart,
  onPrevSong,
  onNextSong,
  onNudge,
  onToggleVoice,
  onToggleSetlist,
  onToggleFullscreen,
}: StageShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.code) {
        case 'Space':
        case 'Enter':
          e.preventDefault();
          onTogglePlay();
          break;

        case 'PageDown':
        case 'ArrowDown':
          e.preventDefault();
          onNudge(5);
          break;

        case 'PageUp':
        case 'ArrowUp':
          e.preventDefault();
          onNudge(-5);
          break;

        case 'ArrowRight':
        case 'KeyN':
          e.preventDefault();
          onNextSong();
          break;

        case 'ArrowLeft':
        case 'KeyP':
          e.preventDefault();
          onPrevSong();
          break;

        case 'KeyR':
          e.preventDefault();
          onRestart();
          break;

        case 'KeyV':
          e.preventDefault();
          onToggleVoice();
          break;

        case 'KeyS':
        case 'Escape':
          e.preventDefault();
          onToggleSetlist();
          break;

        case 'KeyF':
          e.preventDefault();
          onToggleFullscreen();
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    onTogglePlay,
    onRestart,
    onPrevSong,
    onNextSong,
    onNudge,
    onToggleVoice,
    onToggleSetlist,
    onToggleFullscreen,
  ]);
}
