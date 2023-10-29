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
function getLeastCorrectCharacter() {
  const characters = getAllCharacters();
  const statistics = getStatistics();

  // Get all the options and sort them by percentage
  const allOptions = Object.keys(statistics)
    .map((s) => ({
      character: s,
      percentage: statistics[s].correct / (statistics[s].visible ?? 1),
    }))
    .sort((a, b) => a.percentage - b.percentage);

  const half = Math.ceil(allOptions.length / 2);

  // Select the bottom half of options
  const options = allOptions.slice(0, half);

  const randomIndex = Math.floor(Math.random() * options.length);

  return Object.keys(characters)[randomIndex];
}

function getRandomCharacter() {
  const characters = getAllCharacters();

  const randomIndex = Math.floor(
    Math.random() * Object.keys(characters).length
  );

  return Object.keys(characters)[randomIndex];
}

function pickRandomCharacter() {
  const gameStore = useGameStore();

  if (gameStore.questionSelection === "least-correct") {
    return getLeastCorrectCharacter();
  }

  return getRandomCharacter();
}

export function getQuestion(previousQuestion?: Question): Question {
  const characters = getAllCharacters();
  const gameStore = useGameStore();

  let randomCharacter = pickRandomCharacter();

  // If it was the last question, pick another random index.
  if (previousQuestion) {
    for (
      let i = 0;
      i < 1e3 && previousQuestion.character === randomCharacter;
      i++
    ) {
      randomCharacter = pickRandomCharacter();
    }
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
