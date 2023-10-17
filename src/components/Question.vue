<script setup lang="ts">
import { ref } from "vue";

import { recordAnswer } from "../utilities/analytics";
import { getQuestion } from "../utilities/get-question";

const hasAnswered = ref(false);
const question = ref(getQuestion());

function onAnswer(answer: string) {
  hasAnswered.value = true;

  const correct = answer === question.value.answer;

  recordAnswer(question.value.answer, correct);

  if (correct) {
    window.navigator?.vibrate?.(200);

    newQuestion();
  }
}

async function newQuestion() {
  question.value = getQuestion();
  hasAnswered.value = false;
}
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div>
      <div class="flex"></div>
      <div class="border border-solid border-neutral-500 p-8 rounded-lg">
        <h2 class="text-9xl">{{ question.character }}</h2>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        class="rounded-lg"
        :class="{
          'bg-lime-900': hasAnswered && answer === question.answer,
          'bg-rose-950': hasAnswered && answer !== question.answer,
        }"
        :disabled="hasAnswered"
        :key="`${question.answers}-${answer}`"
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
      <button
        class="flex rounded-lg items-center gap-x-2"
        @click="newQuestion"
        :disabled="!hasAnswered"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
