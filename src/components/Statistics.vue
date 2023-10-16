<script setup lang="ts">
import { getStatistics } from "../utilities/analytics";

const statistics = getStatistics();
</script>

<template>
  <div>
    <h1>Statistics</h1>

    <ul>
      <li v-for="(value, key) in statistics">
        <b>{{ key }}</b
        >: {{ value.correct }} / {{ value.visible }}
      </li>
    </ul>
  </div>
</template>
../utilities/analytics
