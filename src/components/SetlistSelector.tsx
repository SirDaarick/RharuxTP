import React from 'react';
import { SETLIST } from '../data/songs';
import type { Song } from '../data/songs';
import { Music, Clock, Gauge, X, Play } from 'lucide-react';

interface SetlistSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentSongId: string;
  onSelectSong: (song: Song) => void;
}

export const SetlistSelector: React.FC<SetlistSelectorProps> = ({
  isOpen,
  onClose,
  currentSongId,
  onSelectSong,
}) => {
  if (!isOpen) return null;

  const formatMinSec = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="setlist-backdrop" onClick={onClose}>
      <div className="setlist-drawer" onClick={e => e.stopPropagation()}>
        <div className="setlist-header">
          <div className="setlist-title-row">
            <Music className="icon-gold" size={24} />
            <h2>Setlist: Homenaje Andy Rharux</h2>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Cerrar">
            <X size={24} />
          </button>
        </div>

        <div className="setlist-list">
          {SETLIST.map(song => {
            const isCurrent = song.id === currentSongId;
            return (
              <div
                key={song.id}
                className={`setlist-item ${isCurrent ? 'active' : ''}`}
                onClick={() => {
                  onSelectSong(song);
                  onClose();
                }}
              >
                <div className="song-order-badge">{song.order}</div>
                <div className="song-info">
                  <h3 className="song-title">{song.title}</h3>
                  <div className="song-meta">
                    {song.bpm && (
                      <span className="meta-tag">
                        <Gauge size={14} /> {song.bpm} BPM
                      </span>
                    )}
                    {song.tempoLabel && (
                      <span className="meta-tag">{song.tempoLabel}</span>
                    )}
                    <span className="meta-tag">
                      <Clock size={14} /> {formatMinSec(song.estimatedDurationSec)}
                    </span>
                  </div>
                </div>
                {isCurrent && (
                  <div className="current-badge">
                    <Play size={16} fill="currentColor" /> Tocando
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
