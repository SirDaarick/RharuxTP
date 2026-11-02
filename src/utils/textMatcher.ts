/**
 * Clean and normalize text: lowercase, remove accents, remove punctuation and extra spaces.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9\s]/g, ' ') // replace punctuation with space
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Levenshtein distance between two strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/**
 * Fuzzy phonetic match for Spanish singing:
 * Handles vocalic shifts (daña vs daño), plural/singular, and 1-letter transcription drift.
 */
export function wordsMatchFuzzy(w1: string, w2: string): boolean {
  if (w1 === w2) return true;

  if (w1.length >= 4 && w2.length >= 4) {
    if (w1.slice(0, 3) === w2.slice(0, 3) && Math.abs(w1.length - w2.length) <= 1) {
      return true;
    }
    if (levenshteinDistance(w1, w2) <= 1) {
      return true;
    }
  }

  if (w1.length >= 7 && w2.length >= 7) {
    if (levenshteinDistance(w1, w2) <= 2) {
      return true;
    }
  }

  return false;
}

/**
 * Conversational filler words in Spanish and English.
 */
const STOP_WORDS = new Set([
  // Spanish
  'de', 'la', 'el', 'en', 'y', 'a', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'por', 'con', 'que', 'es', 'se', 'su', 'sus', 'al', 'del', 'lo', 'le', 'les',
  'me', 'te', 'mi', 'tu', 'si', 'no', 'o', 'pero', 'mas', 'ya', 'muy', 'tan',
  'este', 'esta', 'estos', 'estas', 'como', 'para',
  'esto', 'eso', 'aqui', 'alla', 'bueno', 'pues', 'oye', 'mira',
  // English
  'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'is', 'it', 'was', 'are', 'be', 'this', 'that', 'from', 'as', 'by', 'so'
]);

/**
 * Extract list of content words preserving repetitions (multiset).
 * E.g., "No sabes si a tu lado está, no sabes" -> ["sabes", "lado", "sabes"]
 */
export function getContentWordsList(text: string): string[] {
  return normalizeText(text)
    .split(' ')
    .filter(w => w.length >= 3 && !STOP_WORDS.has(w));
}

/**
 * Returns true if a line is an instrumental instruction or musical cue rather than sung lyrics.
 */
export function isInstrumentalLine(text: string): boolean {
  if (!text) return true;
  const trimmed = text.trim();
  if (
    trimmed.startsWith('(') ||
    trimmed.startsWith('[') ||
    trimmed.startsWith('***') ||
    trimmed.startsWith('...') ||
    trimmed.startsWith('TRIADAS') ||
    trimmed.startsWith('INTRO') ||
    trimmed.startsWith('CORO:') ||
    trimmed.startsWith('SOLO') ||
    trimmed.startsWith('FIN') ||
    trimmed.startsWith('END')
  ) {
    return true;
  }
  const norm = normalizeText(text);
  return (
    norm.includes('solo de guitarra') ||
    norm.includes('guitarra') ||
    norm.includes('arpegio') ||
    norm.includes('riff') ||
    norm.includes('intro') ||
    norm.includes('figura de blues') ||
    norm.includes('tarareo con requinto') ||
    norm.includes('requinto') ||
    norm.includes('bombo bateria') ||
    norm.includes('silbido') ||
    norm.includes('power cords') ||
    norm.includes('triadas')
  );
}

export interface MatchResult {
  score: number;
  isComplete: boolean;
  hasRepeatedWords: boolean;
  matchedCount: number;
  targetCount: number;
}

/**
 * Smart Lyric Matcher:
 * 1. Multiset matching: tracks word counts so lines with repeated phrases
 *    (e.g. "no sabes ... no sabes") require hearing BOTH occurrences before completing!
 * 2. Instant completion for short/unrepeated lines (e.g. "Un fantasma", "anda y daña").
 * 3. Tail-word verification: checks if the closing word of the line was reached.
 */
export function matchPhraseSmart(spoken: string, targetLine: string): MatchResult {
  if (isInstrumentalLine(targetLine)) {
    return { score: 0, isComplete: false, hasRepeatedWords: false, matchedCount: 0, targetCount: 0 };
  }

  const spokenWords = getContentWordsList(spoken);
  const targetWords = getContentWordsList(targetLine);

  if (targetWords.length === 0 || spokenWords.length === 0) {
    return { score: 0, isComplete: false, hasRepeatedWords: false, matchedCount: 0, targetCount: 0 };
  }

  // Multiset consumption: ensure repeated words in the lyric must be sung multiple times
  const remainingSpoken = [...spokenWords];
  let matchedCount = 0;

  for (const tword of targetWords) {
    const foundIdx = remainingSpoken.findIndex(sword => wordsMatchFuzzy(sword, tword));
    if (foundIdx !== -1) {
      matchedCount++;
      remainingSpoken.splice(foundIdx, 1); // consume occurrence
    }
  }

  const coverage = matchedCount / targetWords.length;
  if (matchedCount === 0) {
    return { score: 0, isComplete: false, hasRepeatedWords: false, matchedCount: 0, targetCount: targetWords.length };
  }

  // Check if target line has repeated words (e.g. "sabes" ... "sabes")
  const uniqueCount = new Set(targetWords).size;
  const hasRepeatedWords = uniqueCount < targetWords.length;

  // Tail match: was the final word of the line reached?
  const lastTargetWord = targetWords[targetWords.length - 1];
  const lastSpokenWord = spokenWords[spokenWords.length - 1];
  const tailMatched =
    wordsMatchFuzzy(lastSpokenWord, lastTargetWord) ||
    spokenWords.slice(-2).some(sw => wordsMatchFuzzy(sw, lastTargetWord));

  let isComplete = false;
  if (hasRepeatedWords) {
    // If the line repeats words, require matching ALL occurrences OR tail match with >= 85% coverage
    isComplete = (coverage >= 0.85 && tailMatched) || coverage >= 0.95;
  } else if (targetWords.length <= 2) {
    // Short line (1 or 2 words): 100% coverage -> INSTANT COMPLETE!
    isComplete = coverage >= 0.90;
  } else {
    // Medium line (3-4 words): 60% coverage or tail match -> COMPLETE!
    isComplete = coverage >= 0.60 || (coverage >= 0.50 && tailMatched);
  }

  return {
    score: coverage,
    isComplete,
    hasRepeatedWords,
    matchedCount,
    targetCount: targetWords.length,
  };
}
