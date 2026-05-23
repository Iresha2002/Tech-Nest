<script setup lang="ts">
const handleClick = () => {
  console.log(`Added ${props.title}`)
}
const props = defineProps<{
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
     <button
     @click="handleClick"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add to Cart
    </button>

  </div>

</template>