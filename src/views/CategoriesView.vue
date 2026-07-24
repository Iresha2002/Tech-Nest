<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../types'

const categories = [
  {
    label: 'Smartphones',
    slug: 'smartphones',
    icon: '📱',
    description: 'Latest flagship phones and budget picks',
    count: 16,
    items: ['Android flagships', 'iPhones & iOS'],
  },

  {
    label: 'Laptops',
    slug: 'laptops',
    icon: '💻',
    description: 'Ultrabooks, gaming rigs, and workstations',
    count: 5,
    items: ['Ultrabooks', 'Gaming laptops'],
  },

  {
    label: 'Tablets',
    slug: 'tablets',
    icon: '📲',
    description: 'iPads, Android tablets, and e-readers',
    count: 3,
    items: ['iPad & iPad Pro', 'Android tablets'],
  },

  {
    label: 'Accessories',
    slug: 'mobile-accessories',
    icon: '🎧',
    description: 'Headsets, speakers, chargers, cables',
    count: 14,
    items: ['Headsets & earbuds', 'Bluetooth speakers'],
  },
]
const selectedCategory = ref('')
const products = ref<Product[]>([])

const selectCategory = async (slug: string) => {
  selectedCategory.value = slug

  const response = await fetch(
    `https://dummyjson.com/products/category/${slug}`
  )

  const data = await response.json()

  products.value = data.products
}
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
    <div class="mb-6 sm:mb-10">
      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
        Categories
      </h1>

      <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400">
        Phones, laptops, tablets, and computing accessories.
      </p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
      <button
        v-for="cat in categories"
        :key="cat.label"
        @click="selectCategory(cat.slug)"
        :class="selectedCategory === cat.slug ? 'border-gray-900 dark:border-white ring-2 ring-gray-900 dark:ring-white' : 'border-gray-200 dark:border-gray-700'"
        class="bg-white dark:bg-gray-800 border hover:shadow-md rounded-2xl p-4 sm:p-6 transition-all text-left flex flex-col justify-between"
      >
        <div>
          <div class="text-2xl sm:text-3xl mb-2 sm:mb-3">
            {{ cat.icon }}
          </div>

          <h3 class="font-black text-sm sm:text-lg text-gray-900 dark:text-white mb-1">
            {{ cat.label }}
          </h3>

          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
            {{ cat.description }}
          </p>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700/50">
          <span class="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
            {{ cat.count }} products
          </span>

          <span class="text-base sm:text-lg font-bold text-gray-500 dark:text-gray-400">
            ›
          </span>
        </div>
      </button>
    </div>

    <div v-if="products.length > 0" class="mt-8 sm:mt-10">
      <h2 class="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-6">
        Selected Category Products
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :title="product.title"
          :price="product.price"
          :image="product.thumbnail"
          :rating="product.rating"
          :discountPercentage="product.discountPercentage"
          :brand="product.brand"
          :originalPrice="Math.round(product.price / (1 - (product.discountPercentage || 0) / 100))"
        />
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 sm:p-6 mt-12 sm:mt-16">
      <h2 class="font-black text-lg text-gray-900 dark:text-white mb-5">
        What's in each category?
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="cat in categories"
          :key="cat.label"
        >
          <p class="font-bold text-sm text-gray-900 dark:text-white mb-2">
            {{ cat.icon }} {{ cat.label }}
          </p>

          <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-1.5">
            <li
              v-for="item in cat.items"
              :key="item"
            >
              • {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>