<script setup lang="ts">
import { useGameStore } from "../store/use-game-store";

const gameStore = useGameStore();
</script>

<template>
  <form class="flex flex-col gap-y-6 w-full">
    <div class="flex flex-col gap-x-3">
      <label
        class="block text-sm font-medium leading-6"
        for="number-of-answers"
      >
        Number of answers:
      </label>
      <input
        class="h-10 w-14 border p-2 text-center"
        id="number-of-answers"
        max="12"
        name="number-of-answers"
        type="number"
        v-model.number="gameStore.numberOfAnswers"
      />
    </div>

    <div class="flex flex-col gap-x-3">
      <label
        class="block text-sm font-medium leading-6"
        for="question-selection"
      >
        Question selection:
      </label>
      <select
        class="border p-2"
        id="question-selection"
        v-model="gameStore.questionSelection"
      >
        <option value="random">Random</option>
        <option value="least-correct">Incorrect more often</option>
      </select>
    </div>

    <div class="grid">
      <h2 class="mb-0">Hiragana</h2>

      <div class="grid grid-cols-3">
        <div class="flex flex-col gap-x-3">
          <label
            class="block text-sm font-medium leading-6"
            for="hiragana-monographs"
          >
            Monographs:
          </label>
          <input
            class="h-6 w-6 border p-2 text-center cursor-pointer"
            id="hiragana-monographs"
            max="12"
            name="hiragana-monographs"
            type="checkbox"
            v-model="gameStore.hiraganaMonographsEnabled"
          />
        </div>

        <div class="flex flex-col gap-x-3">
          <label
            class="block text-sm font-medium leading-6"
            for="hiragana-monographs-with-diacritics"
          >
            Diacritics:
          </label>
          <input
            class="h-6 w-6 border p-2 text-center cursor-pointer"
            id="hiragana-monographs-with-diacritics"
            max="12"
            name="hiragana-monographs-with-diacritics"
            type="checkbox"
            v-model="gameStore.hiraganaMonographsWithDiacriticsEnabled"
          />
        </div>

        <div class="flex flex-col gap-x-3">
          <label
            class="block text-sm font-medium leading-6"
            for="hiragana-monographs-with-diagraphs"
          >
            Digraphs:
          </label>
          <input
            class="h-6 w-6 border p-2 text-center cursor-pointer"
            id="hiragana-monographs-with-diagraphs"
            max="12"
            name="hiragana-monographs-with-diagraphs"
            type="checkbox"
            v-model="gameStore.hiraganaWithDigraphsEnabled"
          />
        </div>
      </div>
    </div>

    <div class="grid">
      <h2 class="mb-0">Katakana</h2>

      <div class="grid grid-cols-3">
        <div class="flex flex-col gap-x-3">
          <label
            class="block text-sm font-medium leading-6"
            for="katakana-monographs"
          >
            Monographs:
          </label>
          <input
            class="h-6 w-6 border p-2 text-center cursor-pointer"
            id="katakana-monographs"
            max="12"
            name="katakana-monographs"
            type="checkbox"
            v-model="gameStore.katakanaMonographsEnabled"
          />
        </div>

        <div class="flex flex-col gap-x-3">
          <label
            class="block text-sm font-medium leading-6"
            for="katakana-monographs-with-diacritics"
          >
            Diacritics:
          </label>
          <input
            class="h-6 w-6 border p-2 text-center cursor-pointer"
            id="katakana-monographs-with-diacritics"
            max="12"
            name="katakana-monographs-with-diacritics"
            type="checkbox"
            v-model="gameStore.katakanaMonographsWithDiacriticsEnabled"
          />
        </div>

        <div class="flex flex-col gap-x-3">
          <label
            class="block text-sm font-medium leading-6"
            for="katakana-monographs-with-diagraphs"
          >
            Digraphs:
          </label>
          <input
            class="h-6 w-6 border p-2 text-center cursor-pointer"
            id="katakana-monographs-with-diagraphs"
            max="12"
            name="katakana-monographs-with-diagraphs"
            type="checkbox"
            v-model="gameStore.katakanaWithDigraphsEnabled"
          />
        </div>
      </div>
    </div>

    <button @click="gameStore.screen = 'Splash'" type="button">
      Return home
    </button>
  </form>
</template>
