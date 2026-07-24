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

  <div v-else-if="product" class="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
  <div class="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
    
      <div class="w-full md:w-96 shrink-0">
  <!-- main image -->
  <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden mb-3">
    <img :src="selectedImage" class="w-full object-contain h-64 sm:h-80" />
  </div>

  <!-- thumbnail row -->
  <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
    <img
      v-for="img in product.images"
      :key="img"
      :src="img"
      @click="selectedImage = img"
      :class="selectedImage === img ? 'border-gray-900 dark:border-white ring-2 ring-gray-900 dark:ring-white' : 'border-gray-200 dark:border-gray-700'"
      class="w-16 h-16 object-contain rounded-xl border cursor-pointer shrink-0 transition-all"
    />
  </div>

    </div>

    <!-- right: details -->
    <div class="flex-1 w-full">
      <p class="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mb-1 capitalize">{{ product.category }}</p>
      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3 leading-tight">{{ product.title }}</h1>
      <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-5 sm:mb-6">{{ product.description }}</p>
      <div class="flex items-center gap-4 mb-6">
        <p class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">${{ product.price }}</p>
        <span class="text-sm text-amber-500 font-semibold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">⭐ {{ product.rating }} / 5</span>
      </div>
      
      <!-- availability & stock -->
<div class="grid grid-cols-2 gap-3 mb-4">
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">Availability</p>
    <p class="text-xs sm:text-sm font-semibold text-green-600 dark:text-green-400">{{ product.availabilityStatus }}</p>
  </div>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">Stock</p>
    <p class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{{ product.stock }} units</p>
  </div>
</div>

<!-- shipping & returns -->
<div class="grid grid-cols-2 gap-3 mb-4">
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">Shipping</p>
    <p class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{{ product.shippingInformation }}</p>
  </div>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-1">Returns</p>
    <p class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{{ product.returnPolicy }}</p>
  </div>
</div>

<!-- tags -->
<div class="flex flex-wrap gap-2 mb-6">
  <span v-for="tag in product.tags" :key="tag"
    class="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
    #{{ tag }}
  </span>
</div>
<button @click="addProductToCart" 
  class="w-full px-8 py-3.5 rounded-xl font-bold text-white transition-all text-sm sm:text-base"
  :class="added ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200'">
  {{ added ? '✓ Added to Cart' : 'Add to Cart' }}
</button>
    </div>

  </div>
 <!-- reviews section -->
<div class="mt-10 sm:mt-12 border-t border-gray-100 dark:border-gray-800 pt-8 sm:pt-10">
  <h2 class="text-xl font-black text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="review in product.reviews"
      :key="review.date"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
    >
      <p class="font-semibold text-gray-900 dark:text-white mb-1">{{ review.reviewerName }}</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mb-2">{{ new Date(review.date).toLocaleDateString() }}</p>
      <p class="text-sm text-gray-400 dark:text-gray-500 mb-2">⭐ {{ review.rating }} / 5</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ review.comment }}</p>
    </div>
  </div>
</div>
  </div>
</template>