import { MONOGRAPHS } from "./constants";

const KEY = `analytics-v1`;

type Statistics = {
  [k: string]: {
    visible: number;
    correct: number;
  };
};

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
  return JSON.parse(
    window.localStorage.getItem(KEY) ?? JSON.stringify(emptyStatistics())
  );
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

  Object.keys(MONOGRAPHS).forEach(
    (monograph) => (statistics[monograph] = { visible: 0, correct: 0 })
  );

  return statistics;
}
