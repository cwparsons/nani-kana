<script setup lang="ts">
import Header from "./Header.vue";
import Options from "./Options.vue";
import Question from "./Question.vue";
import Splash from "./Splash.vue";
import Statistics from "./Statistics.vue";

import { GAME_STORE_KEY, useGameStore } from "../store/use-game-store";

const gameStore = useGameStore();

gameStore.$subscribe((_mutation, state) => {
  localStorage.setItem(GAME_STORE_KEY, JSON.stringify(state));
});
</script>

<template>
  <div class="flex flex-col items-center gap-y-4 min-h-screen w-full">
    <Header v-if="gameStore.screen !== 'Splash'" />

    <main class="flex grow items-center justify-center p-4 w-96">
      <Options v-if="gameStore.screen === 'Options'" />
      <Question v-if="gameStore.screen === 'Question'" />
      <Splash v-if="gameStore.screen === 'Splash'" />
      <Statistics v-if="gameStore.screen === 'Statistics'" />
    </main>
  </div>
</template>
