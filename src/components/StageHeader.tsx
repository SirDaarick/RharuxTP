import React from 'react';
import type { Song } from '../data/songs';
import { ChevronLeft } from 'lucide-react';

interface StageHeaderProps {
  currentSong: Song;
  onBackToSetlist: () => void;
  currentTimeSec: number;
  isPlaying: boolean;
}

export const StageHeader: React.FC<StageHeaderProps> = ({
  currentSong,
  onBackToSetlist,
  currentTimeSec,
  isPlaying,
}) => {
  const bpm = currentSong.bpm || 120;
  const currentBeat = isPlaying ? Math.floor(currentTimeSec * (bpm / 60)) % 4 : 0;

  return (
    <header className="spotify-stage-header">
      <div className="header-inner-row">
        {/* Back to Setlist Chevron */}
        <button
          className="btn-back-setlist"
          onClick={onBackToSetlist}
          title="Regresar al Setlist (Esc)"
        >
          <ChevronLeft size={20} />
          <span className="btn-back-label">Setlist</span>
        </button>

        {/* Center: Song Name */}
        <div className="header-center-info">
          <span className="header-song-title">
            {currentSong.order}. {currentSong.title}
          </span>
        </div>

        {/* Right: Subtle Metronome Pulse */}
        <div className="header-right-meta">
          {currentSong.bpm ? (
            <div className="clean-metronome">
              <div className="metronome-dots">
                {[0, 1, 2, 3].map(beat => (
                  <span
                    key={beat}
                    className={`beat-dot ${
                      isPlaying && currentBeat === beat
                        ? beat === 0
                          ? 'beat-accent'
                          : 'beat-on'
                        : ''
                    }`}
                  />
                ))}
              </div>
              <span className="metronome-bpm">{currentSong.bpm}</span>
            </div>
          ) : (
            <div className="clean-spacer" />
          )}
        </div>
      </div>
    </header>
  );
};
