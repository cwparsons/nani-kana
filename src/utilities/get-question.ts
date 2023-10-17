import { useGameStore } from "../store/use-game-store";
import { getStatistics } from "./analytics";
import { MONOGRAPHS } from "./constants";

type Question = {
  character: string;
  answer: string;
  answers: string[];
};

/**
 * Choose incorrect answers more often than normally correct answers.
 */
function getLeastCorrectCharacter() {
  const statistics = getStatistics();
  const options: number[] = [];

  for (const statistic in statistics) {
    const items = Math.min(
      4,
      statistics[statistic].visible - statistics[statistic].correct + 1
    );
    const index = Object.keys(MONOGRAPHS).indexOf(statistic);

    for (let i = 0; i < items; i++) {
      options.push(index);
    }
  }

  const randomIndex = Math.floor(Math.random() * options.length);

  return Object.keys(MONOGRAPHS)[randomIndex];
}

function getRandomCharacter() {
  const randomIndex = Math.floor(
    Math.random() * Object.keys(MONOGRAPHS).length
  );

  return Object.keys(MONOGRAPHS)[randomIndex];
}

function pickRandomCharacter() {
  const gameStore = useGameStore();

  if (gameStore.questionSelection === "least-correct") {
    return getLeastCorrectCharacter();
  }

  return getRandomCharacter();
}

export function getQuestion(previousQuestion?: Question): Question {
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

  const answer = MONOGRAPHS[randomCharacter];

  // Pick random answers that aren't the real answer
  const shuffled = Object.values(MONOGRAPHS)
    .filter((v) => v !== answer)
    .sort(() => 0.5 - Math.random());

  const answers = [...shuffled.slice(0, gameStore.numberOfAnswers)];

  // Random insert real answer into randomized answers
  const randomAnswerIndex = Math.floor(
    Math.random() * gameStore.numberOfAnswers
  );
  answers[randomAnswerIndex] = MONOGRAPHS[randomCharacter];

  answers.sort((a, b) => {
    const indexA = Object.values(MONOGRAPHS).findIndex((v) => v === a);
    const indexB = Object.values(MONOGRAPHS).findIndex((v) => v === b);

    return indexA < indexB ? -1 : 1;
  });

  return { character: randomCharacter, answer, answers };
}
