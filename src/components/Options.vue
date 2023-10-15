<script setup lang="ts">
    const props = defineProps<{
        onOptionsClick: () => void
    }>();
</script>

<template>
    <header class="border-b flex p-4 w-full">
        <div class="basis-1/3"></div>
        <div class="flex justify-center basis-1/3"><img alt="Nani?" class="w-10" src="/logo.svg" /></div>
        <div class="flex justify-end basis-1/3">
            <button @click="props.onOptionsClick">Options</button>
        </div>
    </header>
</template>