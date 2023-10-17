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
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </header>
</template>
