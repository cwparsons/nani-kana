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
        <option value="sequential">Every character before repeat</option>
      </select>
    </div>

    <div class="grid">
      <h2 class="mb-0">Quiz direction</h2>
      <p class="text-sm opacity-80 mt-0 mb-2">
        Enable both for a mix of question types each round.
      </p>
      <div class="flex flex-wrap gap-6">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            class="h-6 w-6 border p-2 cursor-pointer"
            type="checkbox"
            v-model="gameStore.kanaToRomajiEnabled"
          />
          <span>Kana → Romaji</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            class="h-6 w-6 border p-2 cursor-pointer"
            type="checkbox"
            v-model="gameStore.romajiToKanaEnabled"
          />
          <span>Romaji → Kana</span>
        </label>
      </div>
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
