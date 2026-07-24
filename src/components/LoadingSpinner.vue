<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4">
    <div class="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-gray-900 dark:border-t-white rounded-full animate-spin mb-4"></div>
    <p v-if="message" class="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
      {{ message }}
    </p>
  </div>
</template>
