<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

import type { Product } from '../types'

const TECH_SLUGS = [
  'smartphones',
  'laptops',
  'tablets',
  'mobile-accessories',
]

const MIN_DISCOUNT = 10

const allProducts = ref<Product[]>([])
const isLoading = ref(true)
const error = ref('')
const sortBy = ref('discount')

const fetchDeals = async () => {
  try {
    const responses = await Promise.all(
      TECH_SLUGS.map(slug =>
        fetch(`https://dummyjson.com/products/category/${slug}?limit=100`)
      )
    )

    const data = await Promise.all(
      responses.map(response => response.json())
    )

    allProducts.value = []

    data.forEach(item => {
      allProducts.value.push(...item.products)
    })
  } catch {
    error.value = 'Failed to load deals.'
  } finally {
    isLoading.value = false
  }
}

const deals = computed(() => {
  const list = allProducts.value.filter(
    product => product.discountPercentage > MIN_DISCOUNT
  )

  if (sortBy.value === 'discount') {
    return list.sort((a, b) => b.discountPercentage - a.discountPercentage)
  }

  if (sortBy.value === 'price-asc') {
    return list.sort((a, b) => a.price - b.price)
  }

  if (sortBy.value === 'price-desc') {
    return list.sort((a, b) => b.price - a.price)
  }

  if (sortBy.value === 'rating') {
    return list.sort((a, b) => b.rating - a.rating)
  }

  return list
})

const averageSaving = computed(() => {
  if (deals.value.length === 0) {
    return 0
  }

  const totalSaving = deals.value.reduce(
    (total, product) =>
      total + product.price * product.discountPercentage / 100,
    0
  )

  return Math.round(totalSaving / deals.value.length)
})

onMounted(() => {
  fetchDeals()
})
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">

    <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
        🔥 Hot Deals
      </h1>

      <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400">
        Products with more than {{ MIN_DISCOUNT }}% discount. Best deals first.
      </p>
    </div>

    <div
      v-if="!isLoading && deals.length > 0"
      class="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8"
    >
      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 sm:p-5 text-center">
        <p class="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">
          {{ deals.length }}
        </p>
        <p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
          Deals found
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 sm:p-5 text-center">
        <p class="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">
          {{ MIN_DISCOUNT }}%+
        </p>
        <p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
          Min. discount
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 sm:p-5 text-center">
        <p class="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">
          ${{ averageSaving }}
        </p>
        <p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
          Avg. saving
        </p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <span class="text-gray-900 dark:text-white font-bold">
          {{ deals.length }}
        </span>
        deals available
      </p>

      <select
        v-model="sortBy"
        class="text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-xl focus:outline-none w-full sm:w-52"
      >
        <option value="discount">Biggest Discount First</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>

    <LoadingSpinner
      v-if="isLoading"
      message="Finding the best deals..."
    />

    <div
      v-else-if="error"
      class="text-center py-20"
    >
      <p class="text-red-400 dark:text-red-400">
        {{ error }}
      </p>
    </div>

    <div
      v-else-if="deals.length === 0"
      class="text-center py-20"
    >
      <p class="text-4xl mb-3">
        😕
      </p>

      <p class="text-gray-500 dark:text-gray-400">
        No deals found right now. Check back soon!
      </p>
    </div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
    >
      <ProductCard
        v-for="product in deals"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :price="product.price"
        :image="product.thumbnail"
        :rating="product.rating"
        :discount-percentage="product.discountPercentage"
        :brand="product.brand"
        :original-price="Math.round(product.price / (1 - (product.discountPercentage || 0) / 100))"
      />
    </div>

  </main>
</template>