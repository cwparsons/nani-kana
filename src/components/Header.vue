<script setup lang="ts">
import { useGameStore } from "../store/use-game-store";

const gameStore = useGameStore();
</script>

<template>
  <header class="border-b flex align-center items-center p-4 w-full">
    <div class="basis-1/3">
      <a @click="() => (gameStore.screen = 'Splash')">
        <img alt="Nani?" class="w-10" src="/assets/images/logo.svg" />
      </a>
    </div>
    <div class="flex justify-center basis-1/3">
      <h1>{{ gameStore.screen }}</h1>
    </div>
    <div class="flex justify-end basis-1/3">
      <button
        v-if="gameStore.screen !== 'Options'"
        @click="() => (gameStore.screen = 'Options')"
      >
        Options
      </button>
    </div>
  </header>
</template>
