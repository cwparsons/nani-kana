<script setup lang="ts">
import { useGameStore } from "../store/use-game-store";

const gameStore = useGameStore();
</script>

<template>
  <header class="flex align-center items-center p-4 w-full">
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
        aria-label="Options"
        class="rounded-lg"
        :class="{ 'opacity-0': gameStore.screen === 'Options' }"
        @click="() => (gameStore.screen = 'Options')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          role="presentation"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  </header>
</template>
