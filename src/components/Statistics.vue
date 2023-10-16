<script setup lang="ts">
import { getStatistics } from "../utilities/analytics";

const statistics = getStatistics();
</script>

<template>
  <ul class="grid grid-cols-5 gap-3 text-center">
    <li v-for="(value, key) in statistics">
      <div class="border p-1">
        <div>{{ key }}</div>
        <div :class="{ 'opacity-0': value.visible === 0 }">{{ Math.floor(value.correct / value.visible * 100) }}%</div>
      </div>
    </li>
  </ul>
</template>
