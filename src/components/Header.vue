<script setup lang="ts">
import { useGameStore } from "../store/use-game-store";

const gameStore = useGameStore();
</script>

<template>
  <header class="flex align-center items-center p-4 w-full">
    <div class="basis-1/3">
      <a class="cursor-pointer" @click="() => (gameStore.screen = 'Splash')">
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
          fill="currentColor"
          class="w-5 h-5"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M2 4.8a1 1 0 0 1 .8-.8h14.5a.8.8 0 0 1 0 1.5H2.8a1 1 0 0 1-.8-.7M2 10a1 1 0 0 1 .8-.7h14.5a.8.8 0 0 1 0 1.4H2.8A1 1 0 0 1 2 10m0 5.3a1 1 0 0 1 .8-.8h14.5a.8.8 0 0 1 0 1.5H2.8a1 1 0 0 1-.8-.7"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </header>
</template>
