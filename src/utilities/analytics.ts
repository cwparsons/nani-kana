import {
  HIRAGANA_DIACRITICS,
  HIRAGANA_DIGRAPHS,
  HIRAGANA_MONOGRAPHS,
  KATAKANA_DIACRITICS,
  KATAKANA_DIGRAPHS,
  KATAKANA_MONOGRAPHS,
} from "./constants";

const KEY = `analytics-v1`;

type Statistics = {
  [k: string]: {
    visible: number;
    correct: number;
  };
};

/** Romaji → kana (for migrating stats that were stored with English keys). */
function romajiToKana(): Record<string, string> {
  const out: Record<string, string> = {};
  const maps = [
    HIRAGANA_MONOGRAPHS,
    HIRAGANA_DIACRITICS,
    HIRAGANA_DIGRAPHS,
    KATAKANA_MONOGRAPHS,
    KATAKANA_DIACRITICS,
    KATAKANA_DIGRAPHS,
  ];
  for (const map of maps) {
    for (const [kana, romaji] of Object.entries(map)) {
      if (!(romaji in out)) out[romaji] = kana;
    }
  }
  return out;
}

function migrateRomajiKeysToKana(statistics: Statistics): Statistics {
  const romajiToKanaMap = romajiToKana();
  const migrated: Statistics = {};
  let changed = false;
  for (const [key, value] of Object.entries(statistics)) {
    const kana = romajiToKanaMap[key];
    if (kana) {
      migrated[kana] = migrated[kana] ?? { visible: 0, correct: 0 };
      migrated[kana].visible += value.visible;
      migrated[kana].correct += value.correct;
      changed = true;
    } else {
      migrated[key] = value;
    }
  }
  return changed ? migrated : statistics;
}

export function recordAnswer(kana: string, correct: boolean) {
  const statistics = getStatistics();

  statistics[kana] = statistics[kana] ?? { visible: 0, correct: 0 };

  statistics[kana].visible++;

  if (correct) {
    statistics[kana].correct++;
  }

  setStatistics(statistics);
}

export function getStatistics(): Statistics {
  const raw = window.localStorage.getItem(KEY) ?? JSON.stringify(emptyStatistics());
  const statistics = JSON.parse(raw) as Statistics;
  const migrated = migrateRomajiKeysToKana(statistics);
  if (migrated !== statistics) {
    setStatistics(migrated);
    return migrated;
  }
  return statistics;
}

export function resetStatistics() {
  setStatistics(emptyStatistics());
}

function setStatistics(statistics: Statistics) {
  const stringifiedStatistics = JSON.stringify(statistics);

  window.localStorage.setItem(KEY, stringifiedStatistics);
}

function emptyStatistics() {
  const statistics: Statistics = {};

  Object.keys(HIRAGANA_MONOGRAPHS).forEach(
    (monograph) => (statistics[monograph] = { visible: 0, correct: 0 })
  );

  return statistics;
}
