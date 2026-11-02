import { useEffect, useRef, useState, useCallback } from 'react';
import { matchPhraseSmart, isInstrumentalLine } from '../utils/textMatcher';
import type { LogEntry } from '../components/VoiceDebugger';

interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export type VoiceStatus =
  | 'disabled'
  | 'unsupported'
  | 'connecting'
  | 'listening'
  | 'matched'
  | 'rejected'
  | 'error'
  | 'offline'
  | 'permission_denied';

interface UseVoiceSyncProps {
  enabled: boolean;
  activeLineIndex: number;
  allLines: string[];
  lang?: string;
  onAdvanceToNextLine: (fromLineIndex: number) => void;
}

export function useVoiceSync({
  enabled,
  activeLineIndex,
  allLines,
  lang = 'es-MX',
  onAdvanceToNextLine,
}: UseVoiceSyncProps) {
  const [status, setStatus] = useState<VoiceStatus>('disabled');
  const [lastHeard, setLastHeard] = useState<string>('');
  const [lastMatchText, setLastMatchText] = useState<string>('');
  const [debugLog, setDebugLog] = useState<string>('Micrófono desactivado.');
  const [matchCount, setMatchCount] = useState<number>(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const recognitionRef = useRef<any>(null);
  const isManuallyStoppedRef = useRef(false);
  const restartTimerRef = useRef<number | null>(null);
  const lastAdvanceTimeRef = useRef<number>(0);

  const activeLineIndexRef = useRef(activeLineIndex);
  activeLineIndexRef.current = activeLineIndex;

  const allLinesRef = useRef(allLines);
  allLinesRef.current = allLines;

  const onAdvanceRef = useRef(onAdvanceToNextLine);
  onAdvanceRef.current = onAdvanceToNextLine;

  const addLog = useCallback((type: LogEntry['type'], message: string) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now
      .getMilliseconds()
      .toString()
      .padStart(3, '0')}`;

    setLogs(prev => [...prev.slice(-100), { id: Date.now() + Math.random(), time, type, message }]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const handleResult = useCallback(
    (event: any) => {
      let transcript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        transcript += res[0].transcript + ' ';
      }

      const cleanSpoken = transcript.trim();
      if (!cleanSpoken) return;

      // Rate limit / cooldown: minimum 1.2s between distinct line jumps
      const now = performance.now();
      const timeSinceLastAdvance = now - lastAdvanceTimeRef.current;
      if (timeSinceLastAdvance < 1200) {
        return;
      }

      setLastHeard(cleanSpoken);

      const currentIdx = activeLineIndexRef.current;
      const lines = allLinesRef.current;

      // Find target sung line (skip instrumental cues)
      let targetIdx = currentIdx;
      while (targetIdx < lines.length && isInstrumentalLine(lines[targetIdx])) {
        targetIdx++;
      }
      if (targetIdx >= lines.length) targetIdx = currentIdx;

      // Match against current line
      const currentResult = matchPhraseSmart(cleanSpoken, lines[targetIdx]);

      if (currentResult.isComplete) {
        // INSTANT ADVANCE: the line is completely sung!
        lastAdvanceTimeRef.current = performance.now();

        const matchedLineText = lines[targetIdx];
        setStatus('matched');
        setLastMatchText(matchedLineText);
        setMatchCount(c => c + 1);

        const matchMsg = `¡COMPLETO (${Math.round(
          currentResult.score * 100
        )}%)! Oído: "${cleanSpoken}" -> Verso: "${matchedLineText}"`;
        setDebugLog(matchMsg);
        addLog('success', `⚡ ${matchMsg} -> Avance instantáneo`);

        // Instant advance (0ms delay)
        onAdvanceRef.current(targetIdx);

        setTimeout(() => {
          setStatus(prev => (prev === 'matched' ? 'listening' : prev));
        }, 1200);
        return;
      }

      // If line has repeated phrases and only the first repetition was sung
      if (currentResult.hasRepeatedWords && currentResult.score > 0) {
        setDebugLog(
          `Canto en curso: "${cleanSpoken}" (${currentResult.matchedCount}/${currentResult.targetCount} palabras). Esperando cierre de verso...`
        );
        addLog(
          'info',
          `⏳ Canto parcial en verso repetitivo: "${cleanSpoken}" -> Esperando segunda repetición`
        );
        return;
      }

      // If user jumped directly to next line with 100% complete phrasing
      let nextSungIdx = targetIdx + 1;
      while (nextSungIdx < lines.length && isInstrumentalLine(lines[nextSungIdx])) {
        nextSungIdx++;
      }
      if (nextSungIdx < lines.length) {
        const nextResult = matchPhraseSmart(cleanSpoken, lines[nextSungIdx]);
        if (nextResult.isComplete) {
          lastAdvanceTimeRef.current = performance.now();
          const matchedLineText = lines[nextSungIdx];
          setStatus('matched');
          setLastMatchText(matchedLineText);
          setMatchCount(c => c + 1);
          setDebugLog(`¡Siguiente verso reconocido! -> "${matchedLineText}"`);
          addLog('success', `⚡ Salto al siguiente verso: "${matchedLineText}"`);

          onAdvanceRef.current(nextSungIdx);
          setTimeout(() => {
            setStatus(prev => (prev === 'matched' ? 'listening' : prev));
          }, 1200);
          return;
        }
      }

      // Rejection handling for logging
      if (cleanSpoken.split(' ').length >= 2 || cleanSpoken.length >= 6) {
        setStatus('rejected');
        const expected = lines[targetIdx] || '';
        setDebugLog(`Oído: "${cleanSpoken}" (Esperando canto: "${expected}")`);
        setTimeout(() => {
          setStatus(prev => (prev === 'rejected' ? 'listening' : prev));
        }, 1000);
      }
    },
    [addLog]
  );

  const cleanupRecognition = useCallback(() => {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (recognitionRef.current) {
      const rec = recognitionRef.current;
      recognitionRef.current = null;
      rec.onstart = null;
      rec.onaudiostart = null;
      rec.onsoundstart = null;
      rec.onspeechstart = null;
      rec.onspeechend = null;
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      try {
        rec.abort();
      } catch (_) {}
    }
  }, []);

  const startRecognition = useCallback(() => {
    cleanupRecognition();

    const win = window as unknown as IWindow;
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setStatus('unsupported');
      setDebugLog('Este navegador no soporta SpeechRecognition (usa Chrome o Edge).');
      addLog('error', 'SpeechRecognition no soportado en este navegador');
      return;
    }

    isManuallyStoppedRef.current = false;
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;

    addLog('info', `Servicio de voz iniciado (idioma: ${lang}, modo adaptativo instantáneo)`);

    recognition.onstart = () => {
      setStatus('listening');
      const lines = allLinesRef.current;
      let cur = activeLineIndexRef.current;
      while (cur < lines.length && isInstrumentalLine(lines[cur])) {
        cur++;
      }
      const isIntro = isInstrumentalLine(lines[activeLineIndexRef.current]);
      const nextLyric = lines[cur] || '';
      const msg = isIntro
        ? `🎸 Instrumental en curso. Próximo canto: "${nextLyric}"`
        : `Escuchando canto: "${nextLyric}"`;
      setDebugLog(msg);
      addLog('info', `🟢 ${msg}`);
    };

    recognition.onaudiostart = () => {
      addLog('info', 'Hardware de audio enlazado');
    };

    recognition.onsoundstart = () => {
      addLog('info', 'Sonido captado');
    };

    recognition.onspeechstart = () => {
      addLog('speech', '🗣️ Voz humana detectada');
    };

    recognition.onresult = handleResult;

    recognition.onerror = (event: any) => {
      console.warn('SpeechRecognition error:', event.error);
      const errMsg = `Error evento: ${event.error}`;
      if (event.error === 'network') {
        setStatus('offline');
        setDebugLog('Error "network": Chrome requiere internet para el motor de voz.');
        addLog('error', '🔴 Error "network": Falta conexión a Google Cloud Speech.');
      } else if (event.error === 'not-allowed') {
        setStatus('permission_denied');
        setDebugLog('Permiso de micrófono no otorgado.');
        addLog('error', '🔴 Permiso denegado.');
      } else if (event.error === 'no-speech') {
        // normal silence
      } else {
        setStatus('error');
        setDebugLog(errMsg);
        addLog('warn', `⚠️ ${errMsg}`);
      }
    };

    recognition.onend = () => {
      if (!isManuallyStoppedRef.current && recognitionRef.current) {
        restartTimerRef.current = window.setTimeout(() => {
          if (!isManuallyStoppedRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (_) {}
          }
        }, 150);
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setStatus('connecting');
      setDebugLog('Activando micrófono...');
    } catch (e: any) {
      setDebugLog(`Error al iniciar: ${e?.message}`);
      addLog('error', `Excepción: ${e?.message}`);
      setStatus('error');
    }
  }, [lang, handleResult, cleanupRecognition, addLog]);

  const stopRecognition = useCallback(() => {
    isManuallyStoppedRef.current = true;
    cleanupRecognition();
    setStatus('disabled');
    setDebugLog('Voz pausada.');
    addLog('info', 'Reconocimiento detenido.');
  }, [cleanupRecognition, addLog]);

  const simulateVoiceInput = useCallback(
    (phrase: string) => {
      addLog('info', `[Prueba] Frase: "${phrase}"`);
      handleResult({
        resultIndex: 0,
        results: [
          {
            0: { transcript: phrase },
            isFinal: true,
            length: 1,
          },
        ],
      });
    },
    [handleResult, addLog]
  );

  useEffect(() => {
    if (enabled) {
      startRecognition();
    } else {
      stopRecognition();
    }

    return () => {
      isManuallyStoppedRef.current = true;
      cleanupRecognition();
    };
  }, [enabled, startRecognition, stopRecognition, cleanupRecognition]);

  return {
    status,
    lastHeard,
    lastMatchText,
    debugLog,
    matchCount,
    logs,
    clearLogs,
    startRecognition,
    stopRecognition,
    simulateVoiceInput,
  };
}
