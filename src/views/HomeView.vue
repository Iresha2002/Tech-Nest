<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useSearchStore } from '../stores/searchStore'
import type { Product } from '../types'
const searchStore = useSearchStore()

// type Product = {
//   id: number
//   title: string
//   price: number
//   thumbnail: string
//   rating: number
//   discountPercentage: number
// }

const products = ref<Product[]>([])
          // const search = ref('')

const fetchProducts = async () => {
  const categories = [
    'smartphones',
    'laptops',
    'tablets',
    'mobile-accessories',
  ]

  const responses = await Promise.all(
    categories.map(category =>
      fetch(`https://dummyjson.com/products/category/${category}`)
    )
  )

  const data = await Promise.all(
    responses.map(response => response.json())
  )

  products.value = []

  data.forEach(item => {
    products.value.push(...item.products)
  })
}

const filteredProducts = computed(() => {
  return products.value.filter(product =>
    product.title
      .toLowerCase()
      .includes(searchStore.search.toLowerCase())
  )
})
const scrollToProducts = () => {
  document.getElementById('products')?.scrollIntoView({
    behavior: 'smooth',
  })
}

const goToDeals = () => {
  window.location.href = '/deals'
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <!-- Hero Section -->

<section class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 mb-8 sm:mb-16" id="hero">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

    <!-- Left Side -->
    <div>
      <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-4 font-semibold uppercase tracking-wider">
        Welcome to TechNest
      </p>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight sm:leading-none mb-4 sm:mb-5 text-gray-900 dark:text-white">
        Find your next gadget with a clean, modern shopping experience.
      </h1>

      <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
        Browse phones, laptops, tablets, and computing accessories.
      </p>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="scrollToProducts"
          class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 px-6 sm:px-7 py-3 rounded-xl font-bold text-sm transition-colors text-center"
        >
          Browse Products
        </button>

        <button
          @click="goToDeals"
          class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 sm:px-7 py-3 rounded-xl font-bold text-sm transition-colors text-center"
        >
          View Deals
        </button>
      </div>
    </div>

    <!-- Right Side -->
    <div class="bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 sm:p-7">
      <p class="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4 sm:mb-5">
        Quick stats
      </p>

      <div class="grid grid-cols-3 gap-2 sm:gap-3">
        <div class="bg-white dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-xl p-3 sm:p-5 text-center">
          <p class="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">
            100+
          </p>
          <p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
            Products
          </p>
        </div>

        <div class="bg-white dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-xl p-3 sm:p-5 text-center">
          <p class="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">
            Top
          </p>
          <p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
            Brands
          </p>
        </div>

        <div class="bg-white dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-xl p-3 sm:p-5 text-center">
          <p class="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">
            Fast
          </p>
          <p class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">
            Search
          </p>
        </div>
      </div>
    </div>

  </div>
</section>

<section id="products" class="border-t border-gray-100 dark:border-gray-800">

<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">

<ProductCard
  v-for="product in filteredProducts"
  :key="product.id"
  :id="product.id"
  :title="product.title"
  :price="product.price"
  :image="product.thumbnail"
  :rating="product.rating"
  :discountPercentage="product.discountPercentage"
  :brand="product.brand"  
  :originalPrice="Math.round(product.price / (1 - product.discountPercentage / 100))"
/>

    </div>
    </section>
    

  <!-- </div> -->

</template>