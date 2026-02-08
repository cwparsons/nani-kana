<script setup lang="ts">
import Header from "./Header.vue";
import Options from "./Options.vue";
import Question from "./Question.vue";
import Splash from "./Splash.vue";
import Statistics from "./Statistics.vue";

import { GAME_STORE_KEY, useGameStore } from "../store/use-game-store";

const gameStore = useGameStore();

let persistTimeout: ReturnType<typeof setTimeout> | null = null;
gameStore.$subscribe((_mutation, state) => {
  if (persistTimeout != null) clearTimeout(persistTimeout);
  persistTimeout = setTimeout(() => {
    persistTimeout = null;
    localStorage.setItem(GAME_STORE_KEY, JSON.stringify(state));
  }, 300);
});

// Flush on page unload so last state is saved
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    if (persistTimeout != null) {
      clearTimeout(persistTimeout);
      persistTimeout = null;
      localStorage.setItem(GAME_STORE_KEY, JSON.stringify(gameStore.$state));
    }
  });
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col items-center gap-y-4 w-full">
    <Header v-if="gameStore.screen !== 'Splash'" />

    <main class="flex min-h-0 grow flex-col overflow-y-auto p-4 w-96">
      <div class="flex min-h-full flex-col items-center justify-center w-full">
        <Options v-if="gameStore.screen === 'Options'" />
        <Question v-if="gameStore.screen === 'Question'" />
        <Splash v-if="gameStore.screen === 'Splash'" />
        <Statistics v-if="gameStore.screen === 'Statistics'" />
      </div>
    </main>
  </div>
</template>
