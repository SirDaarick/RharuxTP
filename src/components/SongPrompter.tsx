import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { FlatLine } from '../hooks/useTimeline';
import { isInstrumentalLine } from '../utils/textMatcher';
import { Music } from 'lucide-react';
import gsap from 'gsap';

interface SongPrompterProps {
  flatLines: FlatLine[];
  activeLineIndex: number;
  currentTimeSec: number;
  isPlaying: boolean;
  onJumpToLine: (index: number) => void;
  onTogglePlay: () => void;
}

export const SongPrompter: React.FC<SongPrompterProps> = ({
  flatLines,
  activeLineIndex,
  currentTimeSec,
  isPlaying,
  onJumpToLine,
  onTogglePlay,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isUserScrollingRef = useRef(false);
  const userScrollTimeoutRef = useRef<number | null>(null);
  const [showStatusToast, setShowStatusToast] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    if (userScrollTimeoutRef.current) {
      window.clearTimeout(userScrollTimeoutRef.current);
    }
  }, []);

  const handleTouchStart = () => {
    isUserScrollingRef.current = true;
  };

  const handleTouchEnd = () => {
    userScrollTimeoutRef.current = window.setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 2500);
  };

  // GSAP Smooth Centering Scroll
  useEffect(() => {
    if (isUserScrollingRef.current || !containerRef.current) return;

    const activeEl = lineRefs.current[activeLineIndex];
    if (!activeEl) return;

    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    const activeTop = activeEl.offsetTop;
    const activeHeight = activeEl.offsetHeight;

    // Anchor active lyric DEAD CENTER (50% of container height)
    const targetScroll = Math.max(0, activeTop - containerHeight * 0.5 + activeHeight / 2);

    gsap.to(container, {
      scrollTop: targetScroll,
      duration: 0.65,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Subtle scale pop on line change
    gsap.fromTo(
      activeEl,
      { scale: 0.98 },
      { scale: 1.025, duration: 0.3, ease: 'power2.out' }
    );
  }, [activeLineIndex]);

  // Clean Toast
  useEffect(() => {
    setShowStatusToast(isPlaying ? 'EN VIVO' : 'PAUSA');
    const timer = setTimeout(() => setShowStatusToast(null), 800);
    return () => clearTimeout(timer);
  }, [isPlaying]);

  return (
    <div
      className="spotify-prompter-wrapper"
      ref={containerRef}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={onTogglePlay}
    >
      {showStatusToast && (
        <div
          className={`status-toast ${
            showStatusToast === 'EN VIVO' ? 'toast-live' : 'toast-paused'
          }`}
        >
          {showStatusToast}
        </div>
      )}

      {/* Spotify Lyrics Viewport */}
      <div className="spotify-lyrics-scroll">
        <div className="prompter-top-spacer" />

        {flatLines.map((line, idx) => {
          const isActive = idx === activeLineIndex;
          const isPast = idx < activeLineIndex;
          const isNewSection =
            idx === 0 || flatLines[idx - 1].sectionIndex !== line.sectionIndex;

          const isInstrumental = isInstrumentalLine(line.text);

          let lineProgressPct = 0;
          if (isActive) {
            const lineElapsed = currentTimeSec - line.startTimeSec;
            lineProgressPct = Math.min(
              100,
              Math.max(0, (lineElapsed / (line.durationSec || 1)) * 100)
            );
          }

          return (
            <React.Fragment key={line.globalLineIndex}>
              {/* Subtle Section Divider */}
              {isNewSection && line.sectionTitle && (
                <div className="spotify-section-divider">
                  <span>{line.sectionTitle}</span>
                </div>
              )}

              {isInstrumental ? (
                // Refined Spotify Instrumental Break
                <div
                  ref={el => {
                    lineRefs.current[idx] = el;
                  }}
                  className={`spotify-inst-line ${
                    isActive ? 'inst-active' : ''
                  } ${isPast ? 'line-past' : 'line-future'}`}
                  onClick={() => onJumpToLine(idx)}
                >
                  <div className="inst-body">
                    {isActive && (
                      <span className="active-cue-arrow" aria-hidden="true">
                        ▶
                      </span>
                    )}
                    <Music size={15} className="inst-icon" />
                    <span className="inst-text">{line.text}</span>
                    {line.chords && (
                      <span className="inst-chords">{line.chords}</span>
                    )}
                  </div>
                  {isActive && (
                    <div className="inst-progress-line">
                      <div
                        className="inst-progress-fill"
                        style={{ width: `${lineProgressPct}%` }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                // Spotify Lyric Line with Active Indicator
                <div
                  ref={el => {
                    lineRefs.current[idx] = el;
                  }}
                  className={`spotify-lyric-line ${
                    isActive ? 'line-active' : ''
                  } ${isPast ? 'line-past' : 'line-future'}`}
                  onClick={() => {
                    if (isActive) {
                      onJumpToLine(Math.min(flatLines.length - 1, idx + 1));
                    } else {
                      onJumpToLine(idx);
                    }
                  }}
                >
                  {/* Clean Chords Tag Above Lyric (fallback if no tokenized chords) */}
                  {!line.tokens && line.chords && (
                    <div className="spotify-chord-tag">{line.chords}</div>
                  )}

                  {/* Main Lyric Text with Active Indicator */}
                  <div className="spotify-lyric-text">
                    {isActive && (
                      <span className="active-cue-arrow" aria-hidden="true">
                        ▶
                      </span>
                    )}
                    {line.tokens && line.tokens.length > 0 ? (
                      <span className="lyric-token-container">
                        {line.tokens.map((tok, tIdx) => (
                          <span key={tIdx} className="lyric-token-unit">
                            <span className="token-chord" aria-hidden="true">
                              {tok.chord || '\u00A0'}
                            </span>
                            <span className="token-text">{tok.text}</span>
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="lyric-string">{line.text}</span>
                    )}
                  </div>

                  {/* Minimalist Progress Underline */}
                  {isActive && (
                    <div className="lyric-progress-track">
                      <div
                        className="lyric-progress-bar"
                        style={{ width: `${lineProgressPct}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}

        <div className="prompter-bottom-spacer" />
      </div>
    </div>
  );
};
