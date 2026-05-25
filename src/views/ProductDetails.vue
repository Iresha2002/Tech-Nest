<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const product = ref<any>(null)

const fetchProduct = async () => {

  const response = await fetch(
    `https://dummyjson.com/products/${route.params.id}`
  )

  const data = await response.json()

  product.value = data

}

onMounted(() => {

  fetchProduct()

})

</script>

<template>

  <div
    v-if="product"
    class="p-10"
  >

    <img
      :src="product.thumbnail"
      class="w-80 rounded"
    />

    <h1 class="text-4xl font-bold mt-5">
      {{ product.title }}
    </h1>

    <p class="mt-3 text-gray-600">
      {{ product.description }}
    </p>

    <p class="text-2xl text-green-500 mt-5">
      $ {{ product.price }}
    </p>

    <p class="mt-2">
      Rating: {{ product.rating }}
    </p>

    <p>
      Category: {{ product.category }}
    </p>

  </div>

</template>