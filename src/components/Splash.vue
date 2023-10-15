<script setup lang="ts">
import PromptUpdate from "./PromptUpdate.vue";

defineProps<{
  onGameStart: () => void;
}>();
</script>

<template>
  <div class="flex flex-col gap-y-8 justify-center">
    <h1 class="text-8xl">
      <ruby>
        何 <rp>(</rp><rt>Nani</rt><rp>)</rp>
        か <rp>(</rp><rt>ka</rt><rp>)</rp>
        な <rp>(</rp><rt>na</rt><rp>)</rp>
      </ruby>
    </h1>

    <div class="flex justify-center gap-x-8">
      <button class="space-y-4" @click="onGameStart">Start</button>
    </div>

    <div class="flex justify-center gap-x-8">
      <PromptUpdate />
    </div>
  </div>
</template>
