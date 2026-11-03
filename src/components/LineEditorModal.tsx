import React, { useState, useEffect, useRef } from 'react';
import type { SongLine, ChordToken } from '../data/songs';
import type { FlatLine } from '../hooks/useTimeline';
import { X, Check, RotateCcw, Sparkles, Music, HelpCircle } from 'lucide-react';

interface WordItem {
  id: string;
  word: string;
  note: string;
}

interface LineEditorModalProps {
  isOpen: boolean;
  songTitle: string;
  line: FlatLine | null;
  isCustomized: boolean;
  onSave: (updatedLine: SongLine) => void;
  onResetOriginal?: () => void;
  onClose: () => void;
}

const QUICK_CHORDS = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Am', 'Em', 'Dm', 'Corte'];

export const LineEditorModal: React.FC<LineEditorModalProps> = ({
  isOpen,
  songTitle,
  line,
  isCustomized,
  onSave,
  onResetOriginal,
  onClose,
}) => {
  const [lineText, setLineText] = useState('');
  const [wordItems, setWordItems] = useState<WordItem[]>([]);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(0);
  const [showHelp, setShowHelp] = useState(false);
  const textInputRef = useRef<HTMLInputElement>(null);

  // Initialize state when modal opens or line changes
  useEffect(() => {
    if (!line || !isOpen) return;

    setLineText(line.text);

    // If line has tokens, extract words and chords
    if (line.tokens && line.tokens.length > 0) {
      const items: WordItem[] = [];
      let counter = 0;

      line.tokens.forEach(tok => {
        // Token text might have multiple words
        const trimmed = tok.text.trim();
        if (!trimmed) return;
        const words = trimmed.split(/\s+/).filter(Boolean);

        words.forEach((w, wIdx) => {
          items.push({
            id: `word-${counter++}`,
            word: w,
            // Assign chord to first word of the token
            note: wIdx === 0 && tok.chord ? tok.chord : '',
          });
        });
      });

      setWordItems(items);
    } else {
      // Split raw line text into words
      const words = line.text.trim().split(/\s+/).filter(Boolean);
      const items: WordItem[] = words.map((w, idx) => ({
        id: `word-${idx}`,
        word: w,
        note: idx === 0 && line.chords ? line.chords : '',
      }));
      setWordItems(items);
    }

    setSelectedWordIndex(0);
  }, [line, isOpen]);

  if (!isOpen || !line) return null;

  // Handle changes in line text input
  const handleLineTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setLineText(newText);

    // Synchronize words while retaining existing notes
    const newWords = newText.trim().split(/\s+/).filter(Boolean);
    const updated: WordItem[] = newWords.map((word, idx) => {
      const existing = wordItems[idx];
      return {
        id: existing?.id || `word-${idx}-${Date.now()}`,
        word,
        note: existing?.note || '',
      };
    });

    setWordItems(updated);
    if (selectedWordIndex !== null && selectedWordIndex >= updated.length) {
      setSelectedWordIndex(updated.length > 0 ? updated.length - 1 : null);
    }
  };

  // Change note for a specific word
  const handleNoteChange = (index: number, noteVal: string) => {
    setWordItems(prev =>
      prev.map((item, idx) => (idx === index ? { ...item, note: noteVal } : item))
    );
  };

  // Quick chord apply to selected word
  const handleApplyQuickChord = (chord: string) => {
    if (selectedWordIndex === null || !wordItems[selectedWordIndex]) return;
    handleNoteChange(selectedWordIndex, chord);
  };

  // Clear note for selected word
  const handleClearSelectedNote = () => {
    if (selectedWordIndex === null || !wordItems[selectedWordIndex]) return;
    handleNoteChange(selectedWordIndex, '');
  };

  // Detect and parse bracket chords e.g. "[G] Un [F] fantasma"
  const handleParseBrackets = () => {
    // Match tokens like [Am] word or plain word
    const regex = /(?:\[([^\]]+)\]\s*)?([^\s[]+)/g;
    const items: WordItem[] = [];
    const plainWords: string[] = [];
    let match: RegExpExecArray | null;
    let idx = 0;

    while ((match = regex.exec(lineText)) !== null) {
      const chord = match[1] || '';
      const word = match[2];
      plainWords.push(word);
      items.push({
        id: `bracket-${idx++}-${Date.now()}`,
        word,
        note: chord,
      });
    }

    if (items.length > 0) {
      setLineText(plainWords.join(' '));
      setWordItems(items);
      setSelectedWordIndex(0);
    }
  };

  // Construct tokens and save
  const handleSave = () => {
    const cleanText = lineText.trim();
    if (!cleanText) return;

    const hasAnyNote = wordItems.some(item => Boolean(item.note.trim()));

    let tokens: ChordToken[] | undefined;
    let chordsSummary: string | undefined;

    if (hasAnyNote) {
      tokens = wordItems.map((item, idx) => ({
        chord: item.note.trim() || undefined,
        text: item.word + (idx < wordItems.length - 1 ? ' ' : ''),
      }));

      const chordList = wordItems
        .map(i => i.note.trim())
        .filter(Boolean);
      chordsSummary = Array.from(new Set(chordList)).join(' ');
    } else {
      tokens = undefined;
      chordsSummary = undefined;
    }

    onSave({
      text: cleanText,
      chords: chordsSummary,
      tokens,
    });

    onClose();
  };

  const hasBracketFormat = /\[[^\]]+\]/.test(lineText);

  return (
    <div className="line-editor-overlay" onClick={onClose}>
      <div
        className="line-editor-modal"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-labelledby="editor-title"
      >
        {/* Header */}
        <div className="editor-header">
          <div className="editor-header-left">
            <span className="editor-pill-section">{line.sectionTitle}</span>
            <h2 id="editor-title" className="editor-title">
              Editar Letra y Notas
            </h2>
            <span className="editor-song-meta">{songTitle}</span>
          </div>
          <button
            className="editor-btn-close"
            onClick={onClose}
            aria-label="Cerrar modal"
            title="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="editor-body">
          {/* Section 1: Line Text Input */}
          <div className="editor-field-group">
            <div className="editor-field-label-row">
              <label htmlFor="line-text-input" className="editor-label">
                Texto del renglón (letra)
              </label>
              {hasBracketFormat && (
                <button
                  type="button"
                  className="editor-btn-brackets"
                  onClick={handleParseBrackets}
                  title="Detectar y colocar automáticamente los acordes entre corchetes sobre las palabras"
                >
                  <Sparkles size={14} />
                  <span>Extraer corchetes [C]</span>
                </button>
              )}
            </div>
            <input
              id="line-text-input"
              ref={textInputRef}
              type="text"
              className="editor-input-text"
              value={lineText}
              onChange={handleLineTextChange}
              placeholder="Escribe la letra del renglón..."
              autoFocus
            />
          </div>

          {/* Section 2: Words & Above Notes Grid */}
          <div className="editor-field-group">
            <div className="editor-field-label-row">
              <label className="editor-label">
                <Music size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Notas y Acordes sobre palabras
              </label>
              <button
                type="button"
                className="editor-help-toggle"
                onClick={() => setShowHelp(prev => !prev)}
                title="Cómo funciona"
              >
                <HelpCircle size={14} />
                <span>Ayuda</span>
              </button>
            </div>

            {showHelp && (
              <div className="editor-help-box">
                <p>
                  Escribe notas o acordes (ej. <strong>Am</strong>, <strong>G</strong>, <strong>Sol</strong>, <strong>Corte</strong>) en la casilla superior de cualquier palabra.
                  También puedes usar los botones rápidos abajo.
                </p>
              </div>
            )}

            {/* Word Chips Row */}
            <div className="editor-words-strip">
              {wordItems.length === 0 ? (
                <div className="editor-empty-words">
                  Escribe texto en el renglón para agregar notas.
                </div>
              ) : (
                wordItems.map((item, idx) => {
                  const isSelected = selectedWordIndex === idx;
                  return (
                    <div
                      key={item.id}
                      className={`editor-word-unit ${isSelected ? 'unit-selected' : ''}`}
                      onClick={() => setSelectedWordIndex(idx)}
                    >
                      {/* Top: Chord/Note Input */}
                      <input
                        type="text"
                        className={`editor-note-input ${item.note ? 'has-note' : ''}`}
                        value={item.note}
                        onChange={e => handleNoteChange(idx, e.target.value)}
                        placeholder="+ nota"
                        title="Nota o acorde sobre esta palabra"
                        onFocus={() => setSelectedWordIndex(idx)}
                      />
                      {/* Bottom: Word */}
                      <span className="editor-word-label">{item.word}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Chords Toolbar */}
            {selectedWordIndex !== null && wordItems[selectedWordIndex] && (
              <div className="editor-quick-chords-bar">
                <span className="quick-bar-label">
                  Nota para &ldquo;{wordItems[selectedWordIndex].word}&rdquo;:
                </span>
                <div className="quick-buttons-row">
                  {QUICK_CHORDS.map(ch => (
                    <button
                      key={ch}
                      type="button"
                      className="btn-quick-chord"
                      onClick={() => handleApplyQuickChord(ch)}
                    >
                      {ch}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="btn-quick-chord btn-quick-clear"
                    onClick={handleClearSelectedNote}
                    title="Quitar nota de esta palabra"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Live Preview on Stage Prompter */}
          <div className="editor-field-group">
            <label className="editor-label">Vista previa en vivo (como se verá en escenario)</label>
            <div className="editor-preview-container">
              <div className="spotify-lyric-line line-active preview-line">
                <div className="spotify-lyric-text">
                  <span className="active-cue-arrow" aria-hidden="true">
                    ▶
                  </span>
                  {wordItems.some(w => Boolean(w.note.trim())) ? (
                    <span className="lyric-token-container">
                      {wordItems.map((item, idx) => (
                        <span key={item.id} className="lyric-token-unit">
                          {item.note.trim() ? (
                            <span className="token-chord token-chord-badge" aria-hidden="true">
                              {item.note.trim()}
                            </span>
                          ) : (
                            <span className="token-chord token-chord-spacer" aria-hidden="true">
                              {'\u00A0'}
                            </span>
                          )}
                          <span className="token-text">
                            {item.word}
                            {idx < wordItems.length - 1 ? ' ' : ''}
                          </span>
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="lyric-string">{lineText || '(Línea vacía)'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="editor-footer">
          <div className="editor-footer-left">
            {isCustomized && onResetOriginal && (
              <button
                type="button"
                className="editor-btn-secondary btn-reset-original"
                onClick={() => {
                  onResetOriginal();
                  onClose();
                }}
                title="Volver a la letra original del repertorio"
              >
                <RotateCcw size={15} />
                <span>Restaurar original</span>
              </button>
            )}
          </div>

          <div className="editor-footer-right">
            <button type="button" className="editor-btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="button"
              className="editor-btn-primary"
              onClick={handleSave}
              disabled={!lineText.trim()}
            >
              <Check size={16} />
              <span>Guardar cambios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
