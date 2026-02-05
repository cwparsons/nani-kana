import { useGameStore } from "../store/use-game-store";
import { getStatistics } from "./analytics";
import { getAllCharacters } from "./get-all-characters";

export type QuizDirection = "kana-to-romaji" | "romaji-to-kana";

export type Question = {
  character: string;
  romaji: string;
  direction: QuizDirection;
  answer: string;
  answers: string[];
};

/**
 * Choose incorrect answers more often than normally correct answers.
 */
function getLeastCorrectCharacter(characters: Record<string, string>): string | undefined {
  const characterKeys = Object.keys(characters);
  if (characterKeys.length === 0) return undefined;

  const statistics = getStatistics();

  const allOptions = characterKeys
    .filter((k) => statistics[k] != null)
    .map((k) => ({
      character: k,
      percentage:
        statistics[k].correct / (statistics[k].visible || 1),
    }))
    .sort((a, b) => a.percentage - b.percentage);

  if (allOptions.length === 0) return getRandomCharacter(characters);

  const half = Math.ceil(allOptions.length / 2);
  const options = allOptions.slice(0, half);
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex].character;
}

function getRandomCharacter(characters: Record<string, string>): string | undefined {
  const keys = Object.keys(characters);
  if (keys.length === 0) return undefined;
  return keys[Math.floor(Math.random() * keys.length)];
}

function shuffle<T>(array: T[]): T[] {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Pick a random character from the enabled set; each character is shown
 * once before any repeat. After a full cycle the order is reshuffled.
 */
function getSequentialCharacter(characters: Record<string, string>): string | undefined {
  const keys = Object.keys(characters);
  if (keys.length === 0) return undefined;

  const gameStore = useGameStore();
  let pool = gameStore.sequentialRemainingCharacters.filter((c) => c in characters);
  if (pool.length === 0) pool = shuffle(keys);

  const index = Math.floor(Math.random() * pool.length);
  const character = pool[index];
  pool.splice(index, 1);
  gameStore.sequentialRemainingCharacters = pool;
  return character;
}

function pickRandomCharacter(characters: Record<string, string>): string | undefined {
  const gameStore = useGameStore();
  if (gameStore.questionSelection === "sequential") {
    return getSequentialCharacter(characters) ?? getRandomCharacter(characters);
  }
  if (gameStore.questionSelection === "least-correct") {
    return getLeastCorrectCharacter(characters) ?? getRandomCharacter(characters);
  }
  return getRandomCharacter(characters);
}

function pickDirection(): QuizDirection {
  const gameStore = useGameStore();
  const forward = gameStore.kanaToRomajiEnabled;
  const reverse = gameStore.romajiToKanaEnabled;
  if (forward && reverse) return Math.random() < 0.5 ? "kana-to-romaji" : "romaji-to-kana";
  if (reverse) return "romaji-to-kana";
  return "kana-to-romaji";
}

export function getQuestion(previousQuestion?: Question): Question {
  const characters = getAllCharacters();
  const gameStore = useGameStore();

  const kanaToRomaji = gameStore.kanaToRomajiEnabled;
  const romajiToKana = gameStore.romajiToKanaEnabled;
  if (!kanaToRomaji && !romajiToKana) {
    throw new Error("Enable at least one quiz direction (Kana → Romaji or Romaji → Kana) in Options.");
  }

  let randomCharacter = pickRandomCharacter(characters);
  if (randomCharacter == null) {
    throw new Error("No characters enabled. Enable at least one kana set in Options.");
  }

  if (previousQuestion) {
    for (let i = 0; i < 1e3 && previousQuestion.character === randomCharacter; i++) {
      randomCharacter = pickRandomCharacter(characters);
      if (randomCharacter == null) break;
    }
    if (randomCharacter == null) randomCharacter = Object.keys(characters)[0];
  }

  const romaji = characters[randomCharacter];
  const direction = pickDirection();

  if (direction === "kana-to-romaji") {
    const answer = romaji;
    const wrongRomaji = Object.values(characters).filter((v) => v !== answer);
    const shuffledWrong = shuffle(wrongRomaji);
    const answers = [...shuffledWrong.slice(0, gameStore.numberOfAnswers - 1)];
    const randomAnswerIndex = Math.floor(Math.random() * gameStore.numberOfAnswers);
    answers.splice(randomAnswerIndex, 0, answer);
    return { character: randomCharacter, romaji, direction, answer, answers };
  }

  // romaji-to-kana: prompt = romaji, answer = kana, options = kana
  const characterKeys = Object.keys(characters);
  const wrongKana = characterKeys.filter((k) => k !== randomCharacter);
  const shuffledWrong = shuffle(wrongKana);
  const answers = [...shuffledWrong.slice(0, gameStore.numberOfAnswers - 1)];
  const randomAnswerIndex = Math.floor(Math.random() * gameStore.numberOfAnswers);
  answers.splice(randomAnswerIndex, 0, randomCharacter);
  return {
    character: randomCharacter,
    romaji,
    direction: "romaji-to-kana",
    answer: randomCharacter,
    answers,
  };
}
