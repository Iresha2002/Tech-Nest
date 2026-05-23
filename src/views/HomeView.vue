<script setup lang="ts">

import { ref, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
}
const products = ref<Product[]>([])

const fetchProducts = async () => {

  const response = await fetch('https://dummyjson.com/products')

  const data = await response.json()

  products.value = data.products

}

onMounted(() => {
  fetchProducts()
})

</script>

<template>

  <div class="p-10">

    <h1 class="text-4xl font-bold mb-5">
      Products
    </h1>

    <div class="grid grid-cols-3 gap-5">
        
<ProductCard
  v-for="product in products"
  :key="product.id"
  :id="product.id"
  :title="product.title"
  :price="product.price"
  :image="product.thumbnail"
/>

    </div>

  </div>

</template>