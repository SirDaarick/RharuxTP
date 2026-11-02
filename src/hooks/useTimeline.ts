import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { Song, ChordToken } from '../data/songs';

export interface FlatLine {
  sectionIndex: number;
  sectionTitle: string;
  sectionType: string;
  lineIndexInSection: number;
  globalLineIndex: number;
  text: string;
  chords?: string;
  tokens?: ChordToken[];
  startTimeSec: number;
  durationSec: number;
  endTimeSec: number;
}

interface UseTimelineProps {
  song: Song;
  speedMultiplier: number;
  autoAdvanceDelaySec?: number;
  onAutoAdvance?: () => void;
}

export function useTimeline({
  song,
  speedMultiplier,
  autoAdvanceDelaySec = 5,
  onAutoAdvance,
}: UseTimelineProps) {
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoAdvanceCount, setAutoAdvanceCount] = useState<number | null>(null);

  // Flatten sections and calculate time ranges for each line
  const { flatLines, totalDurationSec } = useMemo(() => {
    let currentT = 0;
    const lines: FlatLine[] = [];
    let globalIndex = 0;

    song.sections.forEach((sec, sIdx) => {
      const secDuration = sec.durationSec ?? 25;
      const linesInSec = sec.lines.length > 0 ? sec.lines.length : 1;
      const durationPerLine = secDuration / linesInSec;

      sec.lines.forEach((line, lIdx) => {
        lines.push({
          sectionIndex: sIdx,
          sectionTitle: sec.title || sec.type.toUpperCase(),
          sectionType: sec.type,
          lineIndexInSection: lIdx,
          globalLineIndex: globalIndex++,
          text: line.text,
          chords: line.chords,
          tokens: line.tokens,
          startTimeSec: currentT,
          durationSec: durationPerLine,
          endTimeSec: currentT + durationPerLine,
        });
        currentT += durationPerLine;
      });
    });

    return {
      flatLines: lines,
      totalDurationSec: Math.max(currentT, song.estimatedDurationSec),
    };
  }, [song]);

  // Reset when song changes
  useEffect(() => {
    setCurrentTimeSec(0);
    setIsPlaying(false);
    setAutoAdvanceCount(null);
  }, [song.id]);

  // Animation frame loop for continuous deterministic time
  const lastTimeRef = useRef<number>(performance.now());
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const speedRef = useRef(speedMultiplier);
  speedRef.current = speedMultiplier;

  const totalDurationRef = useRef(totalDurationSec);
  totalDurationRef.current = totalDurationSec;

  const onAutoAdvanceRef = useRef(onAutoAdvance);
  onAutoAdvanceRef.current = onAutoAdvance;

  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlayingRef.current) {
        setCurrentTimeSec(prev => {
          const next = prev + dt * speedRef.current;
          if (next >= totalDurationRef.current) {
            setIsPlaying(false);
            return totalDurationRef.current;
          }
          return next;
        });
      }

      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, []);

  // Countdown timer when song finishes
  useEffect(() => {
    if (currentTimeSec >= totalDurationSec && totalDurationSec > 0) {
      setAutoAdvanceCount(autoAdvanceDelaySec);

      const interval = setInterval(() => {
        setAutoAdvanceCount(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            onAutoAdvanceRef.current?.();
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setAutoAdvanceCount(null);
    }
  }, [currentTimeSec, totalDurationSec, autoAdvanceDelaySec]);

  // Calculate active line based on currentTimeSec
  const activeLineIndex = useMemo(() => {
    if (flatLines.length === 0) return 0;
    const found = flatLines.findIndex(
      l => currentTimeSec >= l.startTimeSec && currentTimeSec < l.endTimeSec
    );
    if (found !== -1) return found;
    return currentTimeSec >= totalDurationSec ? flatLines.length - 1 : 0;
  }, [currentTimeSec, flatLines, totalDurationSec]);

  // Controls
  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => setIsPlaying(prev => !prev), []);
  const restart = useCallback(() => {
    setCurrentTimeSec(0);
    setIsPlaying(true);
    setAutoAdvanceCount(null);
  }, []);

  const jumpToLine = useCallback(
    (index: number) => {
      if (index >= 0 && index < flatLines.length) {
        setCurrentTimeSec(flatLines[index].startTimeSec);
      }
    },
    [flatLines]
  );

  const nudgeTime = useCallback(
    (deltaSec: number) => {
      setCurrentTimeSec(prev => Math.max(0, Math.min(totalDurationSec, prev + deltaSec)));
    },
    [totalDurationSec]
  );

  const cancelAutoAdvance = useCallback(() => {
    setAutoAdvanceCount(null);
  }, []);

  return {
    currentTimeSec,
    totalDurationSec,
    isPlaying,
    activeLineIndex,
    flatLines,
    autoAdvanceCount,
    play,
    pause,
    togglePlay,
    restart,
    jumpToLine,
    nudgeTime,
    cancelAutoAdvance,
  };
}
