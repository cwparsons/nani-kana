<script setup lang="ts">
import { ref } from "vue";

import { MONOGRAPHS } from "../constants";
import { recordAnswer } from "../analytics";
import { useGameStore } from "../use-game-store";

const gameStore = useGameStore();

const props = defineProps<{
  onAfterAnswer?: () => void;
  onNextQuestion?: () => void;
}>();

const hasAnswered = ref(false);
const question = ref(createQuestion());

function onAnswer(answer: string) {
  hasAnswered.value = true;

  const correct = answer === MONOGRAPHS[question.value.kana];

  recordAnswer(question.value.kana, correct);

  if (correct) {
    window.navigator?.vibrate?.(200);

    newQuestion();
  }

  if (props.onAfterAnswer) {
    props.onAfterAnswer();
  }
}

function createQuestion() {
  // Pick random character
  const randomCharacterIndex = Math.floor(
    Math.random() * Object.keys(MONOGRAPHS).length
  );
  const kana = Object.keys(MONOGRAPHS)[randomCharacterIndex];
  const romanji = MONOGRAPHS[kana];

  // Pick random answers that aren't the real answer
  const shuffled = Object.values(MONOGRAPHS)
    .filter((v) => v !== romanji)
    .sort(() => 0.5 - Math.random());

  const answers = [...shuffled.slice(0, gameStore.numberOfAnswers)];

  // Random insert real answer into randomized answers
  const randomAnswerIndex = Math.floor(Math.random() * gameStore.numberOfAnswers);
  answers[randomAnswerIndex] = MONOGRAPHS[kana];

  answers.sort((a, b) => {
    const indexA = Object.values(MONOGRAPHS).findIndex((v) => v === a);
    const indexB = Object.values(MONOGRAPHS).findIndex((v) => v === b);

    return indexA < indexB ? -1 : 1;
  });

  return { kana, answers };
}

async function newQuestion() {
  question.value = createQuestion();
  hasAnswered.value = false;

  if (props.onNextQuestion) {
    props.onNextQuestion();
  }
}
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div>
      <div class="flex"></div>
      <div class="border border-solid border-neutral-500 p-8 rounded">
        <h2 class="text-9xl">{{ question.kana }}</h2>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        :class="{
          'bg-lime-900': hasAnswered && answer === MONOGRAPHS[question.kana],
          'bg-rose-950': hasAnswered && answer !== MONOGRAPHS[question.kana],
        }"
        :disabled="hasAnswered"
        :key="`${question.kana}-${answer}`"
        @click="() => onAnswer(answer)"
        v-for="answer in question.answers"
      >
        {{ answer }}
      </button>
    </div>

    <div
      :aria-hidden="!hasAnswered"
      class="flex justify-center opacity-0"
      :class="{ 'opacity-100': hasAnswered }"
    >
      <button class="flex items-center gap-x-2" @click="newQuestion">
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
