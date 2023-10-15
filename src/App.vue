<script setup lang="ts">
import { ref } from "vue";

import Splash from "./components/Splash.vue";
import Question from "./components/Question.vue";

type GameState = {
  state: "splash" | "questions";
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
  <Splash :onGameStart="onGameStart" v-if="gameState.state === 'splash'" />
  <Question
    v-if="gameState.state === 'questions'"
    :questionNumber="gameState.questionNumber"
    :onNextQuestion="() => gameState.questionNumber++"
  />
</template>
