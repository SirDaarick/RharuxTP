import React, { useEffect, useRef, useState } from 'react';
import { Bug, X, Mic, RefreshCw, Volume2 } from 'lucide-react';

export interface LogEntry {
  id: number;
  time: string;
  type: 'info' | 'success' | 'warn' | 'error' | 'speech';
  message: string;
}

interface VoiceDebuggerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: LogEntry[];
  onClearLogs: () => void;
  onSimulatePhrase: (phrase: string) => void;
  currentExpectedLine: string;
  isListening: boolean;
  onRestartRecognition: () => void;
}

export const VoiceDebugger: React.FC<VoiceDebuggerProps> = ({
  isOpen,
  onClose,
  logs,
  onClearLogs,
  onSimulatePhrase,
  currentExpectedLine,
  isListening,
  onRestartRecognition,
}) => {
  const [audioLevel, setAudioLevel] = useState(0);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [micState, setMicState] = useState<string>('Sin verificar');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Enumerate input devices
  useEffect(() => {
    if (!isOpen) return;

    const listDevices = async () => {
      try {
        const all = await navigator.mediaDevices.enumerateDevices();
        const inputs = all.filter(d => d.kind === 'audioinput');
        setDevices(inputs);
        if (inputs.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(inputs[0].deviceId);
        }
      } catch (err) {
        console.warn('enumerateDevices error:', err);
      }
    };

    listDevices();
  }, [isOpen, selectedDeviceId]);

  // Audio level & oscilloscope monitor when debugger is open
  useEffect(() => {
    if (!isOpen) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      return;
    }

    let active = true;

    const startMonitor = async () => {
      try {
        setMicState('Solicitando acceso a hardware...');
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: selectedDeviceId ? { deviceId: { exact: selectedDeviceId } } : true,
        });

        if (!active) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        streamRef.current = stream;
        const track = stream.getAudioTracks()[0];
        setMicState(`Conectado: ${track.label || 'Micrófono'}`);

        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const drawLoop = () => {
          if (!active || !analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          const level = Math.min(100, Math.round((avg / 128) * 100));
          setAudioLevel(level);

          // Draw canvas visualizer
          const canvas = canvasRef.current;
          if (canvas) {
            const cCtx = canvas.getContext('2d');
            if (cCtx) {
              cCtx.fillStyle = '#09090b';
              cCtx.fillRect(0, 0, canvas.width, canvas.height);

              const barWidth = (canvas.width / dataArray.length) * 2.5;
              let x = 0;
              for (let i = 0; i < dataArray.length; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height;
                cCtx.fillStyle = barHeight > canvas.height * 0.7 ? '#ef4444' : barHeight > canvas.height * 0.4 ? '#facc15' : '#22c55e';
                cCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
              }
            }
          }

          animFrameRef.current = requestAnimationFrame(drawLoop);
        };

        drawLoop();
      } catch (err: any) {
        setMicState(`Error de hardware: ${err.name} - ${err.message}`);
      }
    };

    startMonitor();

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [isOpen, selectedDeviceId]);

  if (!isOpen) return null;

  return (
    <div className="debug-modal-backdrop" onClick={onClose}>
      <div className="debug-modal-card" onClick={e => e.stopPropagation()}>
        <div className="debug-modal-header">
          <div className="debug-title-row">
            <Bug className="icon-gold" size={24} />
            <h2>Diagnóstico de Micrófono y Voz en Vivo</h2>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Cerrar">
            <X size={24} />
          </button>
        </div>

        <div className="debug-modal-body">
          {/* Section 1: Hardware mic visualizer */}
          <div className="debug-section">
            <h3>1. Estado del Micrófono Físico (Hardware)</h3>
            <div className="device-select-row">
              <label>Dispositivo:</label>
              <select
                value={selectedDeviceId}
                onChange={e => setSelectedDeviceId(e.target.value)}
                className="device-select"
              >
                {devices.map(d => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Micrófono (${d.deviceId.slice(0, 8)})`}
                  </option>
                ))}
              </select>
            </div>

            <div className="mic-status-badge">
              <Mic size={16} /> <strong>{micState}</strong>
            </div>

            {/* Audio Oscilloscope Canvas */}
            <div className="oscilloscope-container">
              <canvas ref={canvasRef} width={400} height={70} className="oscilloscope-canvas" />
              <div className="level-bar-wrapper">
                <div className="level-bar-label">
                  <Volume2 size={16} /> Volumen captado: <strong>{audioLevel}%</strong>
                </div>
                <div className="level-meter-track">
                  <div
                    className={`level-meter-fill ${audioLevel > 60 ? 'loud' : audioLevel > 20 ? 'good' : 'quiet'}`}
                    style={{ width: `${audioLevel}%` }}
                  />
                </div>
                <p className="level-hint">
                  {audioLevel > 15
                    ? '✓ Tu micrófono SÍ está captando sonido de tu voz.'
                    : '⚠ Nivel bajo o silencio. Habla más cerca o revisa que el micrófono no esté en silencio en Windows/Android.'}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Speech Recognition Status & Controls */}
          <div className="debug-section">
            <div className="section-title-row">
              <h3>2. Motor de Voz (SpeechRecognition de Chrome)</h3>
              <button className="btn-debug-action" onClick={onRestartRecognition}>
                <RefreshCw size={14} /> Reiniciar Reconocedor
              </button>
            </div>

            <div className="debug-info-grid">
              <div className="info-box">
                <span className="box-label">Estado actual:</span>
                <span className={`status-pill pill-${isListening ? 'active' : 'warn'}`}>
                  {isListening ? 'Escuchando en vivo' : 'Detenido / Reconectando'}
                </span>
              </div>
              <div className="info-box">
                <span className="box-label">Frase que debe escuchar ahora:</span>
                <span className="expected-pill">"{currentExpectedLine}"</span>
              </div>
            </div>

            {/* Quick Test Simulation */}
            <div className="test-buttons-row">
              <span className="test-label">Prueba rápida:</span>
              <button
                className="btn-quick-test"
                onClick={() => onSimulatePhrase(currentExpectedLine)}
              >
                Simular decir: "{currentExpectedLine}"
              </button>
              <button
                className="btn-quick-test btn-test-fail"
                onClick={() => onSimulatePhrase('palabra completamente diferente')}
              >
                Simular palabra equivocada
              </button>
            </div>
          </div>

          {/* Section 3: Live Event Log Stream */}
          <div className="debug-section debug-section-logs">
            <div className="section-title-row">
              <h3>3. Bitácora de Eventos en Tiempo Real (Logs)</h3>
              <button className="btn-clear-logs" onClick={onClearLogs}>
                Limpiar logs
              </button>
            </div>

            <div className="logs-terminal" ref={logContainerRef}>
              {logs.length === 0 ? (
                <div className="log-empty">No hay eventos registrados aún. Habla al micrófono...</div>
              ) : (
                logs.map(log => (
                  <div key={log.id} className={`log-row log-${log.type}`}>
                    <span className="log-time">[{log.time}]</span>
                    <span className="log-msg">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
