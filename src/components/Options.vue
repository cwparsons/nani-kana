<script setup lang="ts">
import { useGameStore } from "../store/use-game-store";

const gameStore = useGameStore();
</script>

<template>
  <form class="flex flex-col gap-y-6">
    <div class="flex items-center gap-x-3">
      <input
        class="h-10 w-10 border p-2 text-center"
        type="number"
        name="number-of-answers"
        id="number-of-answers"
        :value="gameStore.numberOfAnswers"
        @input="(event) => (gameStore.numberOfAnswers = parseInt((event.target as any).value ?? '8'))"
      />
      <label class="block text-sm font-medium leading-6" for="number-of-answers"
        >Number of answers</label
      >
    </div>

    <button @click="gameStore.screen = 'Splash'">Return home</button>
  </form>
</template>
