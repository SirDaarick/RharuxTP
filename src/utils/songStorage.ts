import type { Song, SongLine, ChordToken } from '../data/songs';

export interface SongLineOverride {
  text: string;
  chords?: string;
  tokens?: ChordToken[];
}

// Map: songId -> sectionIndex -> lineIndexInSection -> SongLineOverride
export type SongOverrides = Record<string, Record<number, Record<number, SongLineOverride>>>;

const STORAGE_KEY = 'rharux_song_overrides';

/**
 * Load song overrides from localStorage safely.
 */
export function getSongOverrides(): SongOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as SongOverrides;
  } catch (err) {
    console.error('Failed to read song overrides from localStorage:', err);
    return {};
  }
}

/**
 * Save all overrides to localStorage.
 */
function setSongOverrides(overrides: SongOverrides): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (err) {
    console.error('Failed to save song overrides to localStorage:', err);
  }
}

/**
 * Save a specific line override for a song.
 */
export function saveLineOverride(
  songId: string,
  sectionIndex: number,
  lineIndexInSection: number,
  line: SongLine
): void {
  const overrides = getSongOverrides();

  if (!overrides[songId]) {
    overrides[songId] = {};
  }
  if (!overrides[songId][sectionIndex]) {
    overrides[songId][sectionIndex] = {};
  }

  overrides[songId][sectionIndex][lineIndexInSection] = {
    text: line.text,
    chords: line.chords,
    tokens: line.tokens,
  };

  setSongOverrides(overrides);
}

/**
 * Remove an override for a specific line (reverting to default).
 */
export function removeLineOverride(
  songId: string,
  sectionIndex: number,
  lineIndexInSection: number
): void {
  const overrides = getSongOverrides();
  if (
    overrides[songId] &&
    overrides[songId][sectionIndex] &&
    overrides[songId][sectionIndex][lineIndexInSection]
  ) {
    delete overrides[songId][sectionIndex][lineIndexInSection];

    // Clean up empty objects
    if (Object.keys(overrides[songId][sectionIndex]).length === 0) {
      delete overrides[songId][sectionIndex];
    }
    if (Object.keys(overrides[songId]).length === 0) {
      delete overrides[songId];
    }

    setSongOverrides(overrides);
  }
}

/**
 * Check if a specific line has a custom override.
 */
export function hasLineOverride(
  songId: string,
  sectionIndex: number,
  lineIndexInSection: number
): boolean {
  const overrides = getSongOverrides();
  return Boolean(
    overrides[songId]?.[sectionIndex]?.[lineIndexInSection]
  );
}

/**
 * Reset all overrides for an entire song.
 */
export function resetSongOverrides(songId: string): void {
  const overrides = getSongOverrides();
  if (overrides[songId]) {
    delete overrides[songId];
    setSongOverrides(overrides);
  }
}

/**
 * Deep merge default songs with localStorage overrides.
 */
export function getMergedSongs(defaultSongs: Song[]): Song[] {
  const overrides = getSongOverrides();
  if (Object.keys(overrides).length === 0) {
    return defaultSongs;
  }

  return defaultSongs.map(song => {
    const songOverride = overrides[song.id];
    if (!songOverride) return song;

    const updatedSections = song.sections.map((sec, sIdx) => {
      const secOverride = songOverride[sIdx];
      if (!secOverride) return sec;

      const updatedLines = sec.lines.map((line, lIdx) => {
        const lineOverride = secOverride[lIdx];
        if (!lineOverride) return line;

        return {
          ...line,
          text: lineOverride.text,
          chords: lineOverride.chords,
          tokens: lineOverride.tokens,
        };
      });

      return {
        ...sec,
        lines: updatedLines,
      };
    });

    return {
      ...song,
      sections: updatedSections,
    };
  });
}
