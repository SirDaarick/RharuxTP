import React, { useEffect, useRef } from 'react';
import { SETLIST } from '../data/songs';
import type { Song } from '../data/songs';
import { Play, Clock, Disc3, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import gsap from 'gsap';

interface SetlistViewProps {
  currentSongId: string;
  songs?: Song[];
  onSelectSong: (song: Song) => void;
  onStartShow: () => void;
}

export const SetlistView: React.FC<SetlistViewProps> = ({
  currentSongId,
  songs = SETLIST,
  onSelectSong,
  onStartShow,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { canInstall, triggerInstall } = usePWAInstall();

  // GSAP Entrance
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );

      const items = listRef.current?.querySelectorAll('.setlist-track-row');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.03,
            ease: 'power2.out',
            delay: 0.1,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const formatMinSec = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  const totalDurationSec = songs.reduce(
    (acc, s) => acc + (s.estimatedDurationSec || 0),
    0
  );

  return (
    <div className="setlist-view-container" ref={containerRef}>
      {/* Refined Spotify-grade Hero */}
      <div className="setlist-hero" ref={heroRef}>
        <div className="hero-artwork-box">
          <Disc3 className="hero-disc-icon" size={54} strokeWidth={1.5} />
        </div>

        <div className="hero-meta">
          <span className="hero-category">PLAYLIST</span>
          <h1 className="hero-title">1er. Homenaje a Andy Rharux</h1>

          <div className="hero-stats-row">
            <span>{songs.length} temas</span>
            <span className="stat-dot">•</span>
            <span>{Math.round(totalDurationSec / 60)} min</span>
          </div>

          <div className="hero-actions-row">
            <button
              className="btn-spotify-play"
              onClick={onStartShow}
              title="Iniciar setlist desde el primer tema"
            >
              <Play size={18} fill="currentColor" />
              <span>Iniciar</span>
            </button>

            {canInstall && (
              <button
                className="btn-spotify-install"
                onClick={triggerInstall}
                title="Instalar aplicación en la pantalla de inicio"
              >
                <Download size={16} />
                <span>Instalar App</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Minimalist Spotify Tracklist */}
      <div className="setlist-tracks-section" ref={listRef}>
        <div className="tracks-header-row">
          <div className="col-num">#</div>
          <div className="col-title">TÍTULO</div>
          <div className="col-tempo">RITMO</div>
          <div className="col-time">
            <Clock size={15} strokeWidth={1.75} />
          </div>
        </div>

        <div className="tracks-scroll-area">
          {songs.map((song, index) => {
            const isSelected = song.id === currentSongId;
            const orderNum = index + 1;

            return (
              <div
                key={song.id}
                className={`setlist-track-row ${isSelected ? 'row-active' : ''}`}
                onClick={() => onSelectSong(song)}
              >
                <div className="col-num">
                  <span className="num-display">{orderNum}</span>
                  <span className="hover-play-icon">
                    <Play size={14} fill="currentColor" />
                  </span>
                </div>

                <div className="col-title">
                  <div className="track-title-text">{song.title}</div>
                  <div className="track-title-sub">
                    {song.tempoLabel && <span>{song.tempoLabel}</span>}
                    {song.tempoLabel && song.bpm && <span>•</span>}
                    {song.bpm && <span>{song.bpm} BPM</span>}
                  </div>
                </div>

                <div className="col-tempo">
                  {song.bpm ? (
                    <span className="tempo-clean-tag">{song.bpm} BPM</span>
                  ) : song.tempoLabel ? (
                    <span className="tempo-clean-sub">{song.tempoLabel}</span>
                  ) : (
                    <span className="tempo-empty">—</span>
                  )}
                </div>

                <div className="col-time">
                  {formatMinSec(song.estimatedDurationSec)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
