<script setup lang="ts">
import { ref } from "vue";

import Header from "./components/Header.vue";
import Splash from "./components/Splash.vue";
import Question from "./components/Question.vue";

type GameState = {
  state: "splash" | "questions" | "options";
  questionNumber: number;
};

const gameState = ref<GameState>({
  state: "splash",
  questionNumber: 1,
});

function onGameStart() {
  gameState.value.state = "questions";
}
</script>

<template>
  <div class="flex flex-col items-center gap-y-4 min-h-screen w-full">
    <Header v-if="gameState.state !== 'splash'" :onOptionsClick="() => gameState.state = 'options'" />

    <main class="flex grow items-center justify-center w-96">
      <Splash :onGameStart="onGameStart" v-if="gameState.state === 'splash'" />
      <Question
        v-if="gameState.state === 'questions'"
        :questionNumber="gameState.questionNumber"
        :onNextQuestion="() => gameState.questionNumber++"
      />
    </main>
  </div>
</template>
