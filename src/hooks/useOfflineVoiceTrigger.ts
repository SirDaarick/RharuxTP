import { useEffect, useRef, useState, useCallback } from 'react';

interface UseOfflineVoiceTriggerProps {
  enabled: boolean;
  thresholdPercent?: number; // 0 to 100
  silenceDurationMs?: number; // silence gap after singing before advancing
  onVoiceTrigger: () => void;
}

export function useOfflineVoiceTrigger({
  enabled,
  thresholdPercent = 25,
  silenceDurationMs = 500,
  onVoiceTrigger,
}: UseOfflineVoiceTriggerProps) {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [triggerCount, setTriggerCount] = useState<number>(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const isSpeakingRef = useRef<boolean>(false);
  const silenceTimerRef = useRef<number | null>(null);
  const lastTriggerTimeRef = useRef<number>(0);

  const onTriggerRef = useRef(onVoiceTrigger);
  onTriggerRef.current = onVoiceTrigger;

  const thresholdRef = useRef(thresholdPercent);
  thresholdRef.current = thresholdPercent;

  const silenceMsRef = useRef(silenceDurationMs);
  silenceMsRef.current = silenceDurationMs;

  const cleanup = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setCurrentLevel(0);
    setIsVoiceActive(false);
  }, []);

  useEffect(() => {
    if (!enabled) {
      cleanup();
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        streamRef.current = stream;
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = ctx;

        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.4;
        source.connect(analyser);
        analyserRef.current = analyser;

        const buffer = new Uint8Array(analyser.frequencyBinCount);

        const loop = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(buffer);

          let sum = 0;
          for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i];
          }
          const avg = sum / buffer.length;
          const level = Math.min(100, Math.round((avg / 128) * 100));
          setCurrentLevel(level);

          const now = performance.now();
          const threshold = thresholdRef.current;
          const silenceDelay = silenceMsRef.current;

          if (level >= threshold) {
            // Voice active
            setIsVoiceActive(true);
            isSpeakingRef.current = true;
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
          } else if (isSpeakingRef.current) {
            // Silence detected after voice
            if (!silenceTimerRef.current) {
              silenceTimerRef.current = window.setTimeout(() => {
                isSpeakingRef.current = false;
                setIsVoiceActive(false);
                silenceTimerRef.current = null;

                // Cooldown: at least 1.5 seconds between line advances
                if (now - lastTriggerTimeRef.current > 1500) {
                  lastTriggerTimeRef.current = now;
                  setTriggerCount(c => c + 1);
                  onTriggerRef.current();
                }
              }, silenceDelay);
            }
          }

          animFrameRef.current = requestAnimationFrame(loop);
        };

        loop();
      })
      .catch(err => {
        console.warn('Offline Voice Trigger getUserMedia error:', err);
      });

    return cleanup;
  }, [enabled, cleanup]);

  return {
    currentLevel,
    isVoiceActive,
    triggerCount,
  };
}
