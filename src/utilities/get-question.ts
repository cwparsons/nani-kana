import { useGameStore } from "../store/use-game-store";
import { getStatistics } from "./analytics";
import { getAllCharacters } from "./get-all-characters";

type Question = {
  character: string;
  answer: string;
  answers: string[];
};

/**
 * Choose incorrect answers more often than normally correct answers.
 */
function getLeastCorrectCharacter(): string | undefined {
  const characters = getAllCharacters();
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

  if (allOptions.length === 0) return getRandomCharacter();

  const half = Math.ceil(allOptions.length / 2);
  const options = allOptions.slice(0, half);
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex].character;
}

function getRandomCharacter(): string | undefined {
  const characters = getAllCharacters();
  const keys = Object.keys(characters);
  if (keys.length === 0) return undefined;
  return keys[Math.floor(Math.random() * keys.length)];
}

function pickRandomCharacter(): string | undefined {
  const gameStore = useGameStore();
  if (gameStore.questionSelection === "least-correct") {
    return getLeastCorrectCharacter() ?? getRandomCharacter();
  }
  return getRandomCharacter();
}

export function getQuestion(previousQuestion?: Question): Question {
  const characters = getAllCharacters();
  const gameStore = useGameStore();

  let randomCharacter = pickRandomCharacter();
  if (randomCharacter == null) {
    throw new Error("No characters enabled. Enable at least one kana set in Options.");
  }

  if (previousQuestion) {
    for (let i = 0; i < 1e3 && previousQuestion.character === randomCharacter; i++) {
      randomCharacter = pickRandomCharacter();
      if (randomCharacter == null) break;
    }
    if (randomCharacter == null) randomCharacter = Object.keys(characters)[0];
  }

  const answer = characters[randomCharacter];

  // Pick random answers that aren't the real answer
  const shuffled = Object.values(characters)
    .filter((v) => v !== answer)
    .sort(() => 0.5 - Math.random());

  const answers = [...shuffled.slice(0, gameStore.numberOfAnswers)];

  // Random insert real answer into randomized answers
  const randomAnswerIndex = Math.floor(
    Math.random() * gameStore.numberOfAnswers
  );
  answers[randomAnswerIndex] = characters[randomCharacter];

  answers.sort((a, b) => {
    const indexA = Object.values(characters).findIndex((v) => v === a);
    const indexB = Object.values(characters).findIndex((v) => v === b);

    return indexA < indexB ? -1 : 1;
  });

  return { character: randomCharacter, answer, answers };
}
