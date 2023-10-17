<script setup lang="ts">
import { useGameStore } from "../store/use-game-store";
// import { resetStatistics } from "../utilities/analytics";

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
        type="number"
        name="number-of-answers"
        id="number-of-answers"
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
      <select class="border p-2" id="question-selection" v-model="gameStore.questionSelection">
        <option value="random">Random</option>
        <option value="least-correct">Least-correct</option>
      </select>
    </div>

    <!-- <button @click="() => { if (confirm('test')) resetStatistics(); }" type="button">Reset statistics</button> -->

    <button @click="gameStore.screen = 'Splash'" type="button">Return home</button>
  </form>
</template>
