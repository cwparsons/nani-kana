<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "../store/use-game-store";
import { getStatistics, resetStatistics, statisticsRef } from "../utilities/analytics";

const gameStore = useGameStore();
const statistics = computed(() => {
  if (gameStore.screen !== "Statistics") return {};
  if (statisticsRef.value === null) return getStatistics();
  return statisticsRef.value;
});

function percentage(visible: number, correct: number): string {
  if (visible === 0) return "—";
  return `${Math.floor((correct / visible) * 100)}%`;
}

function handleReset() {
  if (confirm("Reset all statistics? This cannot be undone.")) {
    resetStatistics();
  }
}
</script>

<template>
  <div>
    <ul class="grid grid-cols-5 gap-3 text-center">
      <li v-for="(value, key) in statistics" :key="key">
        <div class="border p-1">
          <div>{{ key }}</div>
          <div>{{ percentage(value.visible, value.correct) }}</div>
        </div>
      </li>
    </ul>
    <button
      type="button"
      class="mt-4 border border-red-500 bg-transparent px-3 py-1.5 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/50"
      @click="handleReset"
    >
      Reset statistics
    </button>
  </div>
</template>
