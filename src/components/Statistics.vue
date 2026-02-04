<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "../store/use-game-store";
import { getStatistics } from "../utilities/analytics";

const gameStore = useGameStore();
const statistics = computed(() =>
  gameStore.screen === "Statistics" ? getStatistics() : {}
);

function percentage(visible: number, correct: number): string {
  if (visible === 0) return "—";
  return `${Math.floor((correct / visible) * 100)}%`;
}
</script>

<template>
  <ul class="grid grid-cols-5 gap-3 text-center">
    <li v-for="(value, key) in statistics" :key="key">
      <div class="border p-1">
        <div>{{ key }}</div>
        <div>{{ percentage(value.visible, value.correct) }}</div>
      </div>
    </li>
  </ul>
</template>
