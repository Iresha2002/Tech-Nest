<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '../types'
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
const route = useRoute()
const product = ref<Product | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const selectedImage = ref('')
const added = ref(false)
const addProductToCart = () => {
  if (!product.value) return
  const cartItem = {
    id: product.value.id,
    title: product.value.title,
    price: product.value.price, 
    image: selectedImage.value || product.value.thumbnail,
    brand: product.value.brand,       
    originalPrice: Math.round(product.value.price / (1 - product.value.discountPercentage / 100) * 100) / 100, 
  }
  console.log('cart item:', cartItem)
  cartStore.addToCart(cartItem)
  added.value = true
}
const fetchProduct = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch(
      `https://dummyjson.com/products/${route.params.id}`
    )

    const data = await response.json()
    product.value = data
    selectedImage.value = data.images[0]

  } catch (err) {
    product.value = null
    error.value = 'Failed to fetch product data'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})

</script>

<template>


  <div
    v-if="isLoading"
    class="p-10 text-gray-500 dark:text-gray-400"
  >
    Loading...
  </div>

  <div
    v-else-if="error"
    class="p-10 text-red-500 dark:text-red-400"
  >
    {{ error }}
  </div>

  <div v-else-if="product" class="max-w-5xl mx-auto px-6 py-10">
  <div class="flex gap-10">
    
    
      
      <div class="w-96 shrink-0">
  <!-- main image -->
  <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden mb-3">
    <img :src="selectedImage" class="w-full object-contain h-80" />
  </div>

  <!-- thumbnail row -->
  <div class="flex gap-2">
    <img
      v-for="img in product.images"
      :key="img"
      :src="img"
      @click="selectedImage = img"
      class="w-16 h-16 object-contain rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-gray-900 dark:hover:border-white"
    />
  </div>

    </div>

    <!-- right: details -->
    <div class="flex-1">
      <p class="text-sm text-gray-400 dark:text-gray-500 mb-1">{{ product.category }}</p>
      <h1 class="text-3xl font-black text-gray-900 dark:text-white mb-3">{{ product.title }}</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-6">{{ product.description }}</p>
      <p class="text-3xl font-black text-gray-900 dark:text-white mb-6">${{ product.price }}</p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mb-6">⭐ {{ product.rating }} / 5</p>
      <!-- availability & stock -->
<div class="grid grid-cols-2 gap-3 mb-4">
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">Availability</p>
    <p class="text-sm font-semibold text-green-600 dark:text-green-400">{{ product.availabilityStatus }}</p>
  </div>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">Stock</p>
    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ product.stock }} units</p>
  </div>
</div>

<!-- shipping & returns -->
<div class="grid grid-cols-2 gap-3 mb-4">
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">Shipping</p>
    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ product.shippingInformation }}</p>
  </div>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">Returns</p>
    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ product.returnPolicy }}</p>
  </div>
</div>

<!-- tags -->
<div class="flex gap-2 mb-6">
  <span v-for="tag in product.tags" :key="tag"
    class="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
    #{{ tag }}
  </span>
</div>
<button @click="addProductToCart" 
  class="w-full px-8 py-3 rounded-xl font-bold text-white transition-all"
  :class="added ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-700'">
  {{ added ? '✓ Added to Cart' : 'Add to Cart' }}
</button>
    </div>

  </div>
 <!-- reviews section -->
<div class="mt-10">
  <h2 class="text-xl font-black text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
  <div class="grid grid-cols-3 gap-4">
    <div
      v-for="review in product.reviews"
      :key="review.date"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
    >
      <p class="font-semibold text-gray-900 dark:text-white mb-1">{{ review.reviewerName }}</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mb-2">{{  new Date(review.date).toLocaleDateString() }}</p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mb-2">⭐ {{ review.rating }} / 5</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ review.comment }}</p>
    </div>
  </div>
</div>
  </div>
</template>