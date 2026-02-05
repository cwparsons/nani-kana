<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";

import { recordAnswer } from "../utilities/analytics";
import { getQuestion } from "../utilities/get-question";

const ANSWER_KEYS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "+",
];

const hasAnswered = ref(false);
const nextButtonRef = ref<HTMLButtonElement | null>(null);
const question = ref(getQuestion());
const showShortcuts = ref(true);

function updateShowShortcuts() {
  showShortcuts.value = !window.matchMedia("(pointer: coarse)").matches;
}

function shortcutKey(index: number): string {
  return ANSWER_KEYS[index] ?? "";
}

async function onAnswer(answer: string) {
  hasAnswered.value = true;

  const correct = answer === question.value.answer;

  recordAnswer(question.value.character, correct);

  if (correct) {
    window.navigator?.vibrate?.(200);

    newQuestion();
  } else {
    await nextTick();
    nextButtonRef.value?.focus();
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (hasAnswered.value) return;
  const key = e.key;
  const index = ANSWER_KEYS.indexOf(key);
  if (index === -1 || index >= question.value.answers.length) return;
  e.preventDefault();
  onAnswer(question.value.answers[index]);
}

async function newQuestion() {
  const previousQuestion = question.value;
  question.value = getQuestion(previousQuestion);
  hasAnswered.value = false;
}

const mql =
  typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)") : null;

onMounted(() => {
  updateShowShortcuts();
  mql?.addEventListener("change", updateShowShortcuts);
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  mql?.removeEventListener("change", updateShowShortcuts);
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="flex w-full min-w-full max-w-full flex-col gap-y-8">
    <div
      class="flex min-h-52 w-full min-w-full max-w-full items-center justify-center rounded-lg border border-solid border-neutral-500 p-8"
    >
      <h2
        class="text-center"
        :class="{
          'text-5xl': question.direction === 'romaji-to-kana',
          'text-9xl': question.direction === 'kana-to-romaji',
        }"
      >
        {{
          question.direction === "kana-to-romaji"
            ? question.character
            : question.romaji
        }}
      </h2>
    </div>

    <div
      class="grid w-full min-w-full max-w-full grid-cols-2 gap-4"
      style="grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);"
    >
      <button
        class="relative flex min-h-24 min-w-0 items-center justify-center overflow-hidden rounded-lg text-4xl"
        :class="{
          'bg-lime-900': hasAnswered && answer === question.answer,
          'bg-rose-950': hasAnswered && answer !== question.answer,
        }"
        :disabled="hasAnswered"
        :key="`${question.character}-${question.direction}-${index}-${answer}`"
        @click="() => onAnswer(answer)"
        v-for="(answer, index) in question.answers"
      >
        <span
          v-if="showShortcuts && shortcutKey(index)"
          class="absolute left-1.5 top-1.5 text-xs opacity-60"
          aria-hidden="true"
        >
          {{ shortcutKey(index) }}
        </span>
        {{ answer }}
      </button>
    </div>

    <div
      :aria-hidden="!hasAnswered"
      class="flex justify-center opacity-0"
      :class="{ 'opacity-100': hasAnswered }"
    >
      <button
        ref="nextButtonRef"
        class="flex rounded-lg items-center gap-x-2"
        @click="newQuestion"
        :disabled="!hasAnswered"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="w-5 h-5"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M3 10a1 1 0 0 1 .8-.7h10.6l-4.2-4a.8.8 0 1 1 1-1l5.6 5.2a1 1 0 0 1 0 1l-5.5 5.3a.8.8 0 1 1-1-1l4-4H3.9A1 1 0 0 1 3 10"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
