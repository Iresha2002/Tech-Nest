<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useSearchStore } from '../stores/searchStore'

const searchStore = useSearchStore()

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
  rating: number
}

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

<section class="max-w-7xl mx-auto px-6 py-16 mb-16" id="hero">
  <div class="grid grid-cols-2 gap-16 items-center">

    <!-- Left Side -->
    <div>
      <p class="text-sm text-gray-500 mb-4">
        Welcome to TechNest
      </p>

      <h1 class="text-5xl font-black leading-none mb-5 text-gray-900">
        Find your next gadget with a clean, modern shopping experience.
      </h1>

      <p class="text-base text-gray-500 mb-8">
        Browse phones, laptops, tablets, and computing accessories.
      </p>

      <div class="flex gap-3">
        <button
          @click="scrollToProducts"
          class="bg-gray-900 text-white hover:bg-gray-700 px-7 py-3 rounded-xl font-bold text-sm transition-colors"
        >
          Browse Products
        </button>

        <button
          @click="goToDeals"
          class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-7 py-3 rounded-xl font-bold text-sm transition-colors"
        >
          View Deals
        </button>
      </div>
    </div>

    <!-- Right Side -->
    <div class="bg-gray-50 border border-gray-200 rounded-2xl p-7">
      <p class="text-gray-500 text-sm font-medium mb-5">
        Quick stats
      </p>

      <div class="grid grid-cols-3 gap-3">
        <div class="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p class="text-2xl font-black text-gray-900">
            100+
          </p>
          <p class="text-xs text-gray-500 mt-1.5">
            Products
          </p>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p class="text-2xl font-black text-gray-900">
            Top
          </p>
          <p class="text-xs text-gray-500 mt-1.5">
            Brands
          </p>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-5 text-center">
          <p class="text-2xl font-black text-gray-900">
            Fast
          </p>
          <p class="text-xs text-gray-500 mt-1.5">
            Search
          </p>
        </div>
      </div>
    </div>

  </div>
</section>

  <!-- <div class="p-10">
    <input
  v-model="searchStore.search"
  type="text"
  placeholder="Search products..."
  class="border p-3 rounded w-full mb-5"
/>

    <h1 class="text-4xl font-bold mb-5">
      Products
    </h1> -->
<section id="products" class="border-t border-gray-100">

<div class="grid grid-cols-4 gap-5 max-w-7xl mx-auto px-6 py-10">

<ProductCard
  v-for="product in filteredProducts"
  :key="product.id"
  :id="product.id"
  :title="product.title"
  :price="product.price"
  :image="product.thumbnail"
  :rating="product.rating"
/>

    </div>
    </section>
    

  <!-- </div> -->

</template>