<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
  rating: number
}
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
  <main class="max-w-7xl mx-auto px-6 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-black text-gray-900 mb-2">
        Categories
      </h1>

      <p class="text-base text-gray-500">
        Phones, laptops, tablets, and computing accessories.
      </p>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-10">
      <button
  v-for="cat in categories"
  :key="cat.label"
  @click="selectCategory(cat.slug)"
  class="bg-white border border-gray-200 hover:shadow-md rounded-2xl p-6 transition-all text-left"
>
      
        <div class="text-3xl mb-3">
          {{ cat.icon }}
        </div>

        <h3 class="font-black text-lg text-gray-900 mb-1">
          {{ cat.label }}
        </h3>

        <p class="text-sm text-gray-500 mb-4">
          {{ cat.description }}
        </p>

        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-400">
            {{ cat.count }} products
          </span>

          <span class="text-lg font-bold text-gray-500">
            ›
          </span>
          </div>
      </button>
        </div>
        
      

    

    
      <div v-if="products.length > 0" class="mt-10">
  <h2 class="text-2xl font-black text-gray-900 mb-6">
    Selected Category Products
  </h2>

  <div class="grid grid-cols-4 gap-5">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :id="product.id"
      :title="product.title"
      :price="product.price"
      :image="product.thumbnail"
      :rating="product.rating"
    />
  </div>
</div>

<div class="bg-white border border-gray-200 rounded-2xl p-6 mt-16">
      <h2 class="font-black text-lg text-gray-900 mb-5">
        What's in each category?
      </h2>

      <div class="grid grid-cols-4 gap-6">
        <div
          v-for="cat in categories"
          :key="cat.label"
        >
          <p class="font-bold text-sm text-gray-900 mb-2">
            {{ cat.icon }} {{ cat.label }}
          </p>

          <ul class="text-sm text-gray-500 space-y-1.5">
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