<script setup lang="ts">

defineProps<{
  title: string
  price: number
  image: string
}>()

</script>

<template>

  <div class="border p-5 rounded">

    <img
      :src="image"
      class="h-40 w-full object-cover"
    />

    <h2 class="text-2xl font-bold mt-3">
      {{ title }}
    </h2>

    <p class="text-green-500">
      $ {{ price }}
    </p>

  </div>

</template>