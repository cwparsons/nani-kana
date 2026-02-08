<script setup lang="ts">
import { useGameStore } from "../store/use-game-store";

const gameStore = useGameStore();
</script>

<template>
  <div class="flex flex-col gap-y-8 justify-center">
    <h1 class="text-7xl">
      <ruby>
        何 <rp>(</rp><rt>Nani</rt><rp>)</rp> か <rp>(</rp><rt>ka</rt
        ><rp>)</rp> な <rp>(</rp><rt>na</rt><rp>)</rp>
      </ruby>
    </h1>

    <div class="flex flex-col justify-center gap-y-4">
      <button @click="() => (gameStore.screen = 'Question')">Start</button>
      <button @click="() => (gameStore.screen = 'Options')">Options</button>
      <button @click="() => (gameStore.screen = 'Statistics')">
        Statistics
      </button>
    </div>

    <div class="flex justify-center gap-x-8">
      <PromptUpdate />
    </div>
  </div>
</template>
