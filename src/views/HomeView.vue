<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
}

const products = ref<Product[]>([])
const search = ref('')

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
      .includes(search.value.toLowerCase())
  )
})

onMounted(() => {
  fetchProducts()
})
</script>

<template>

  <div class="p-10">
    <input
  v-model="search"
  type="text"
  placeholder="Search products..."
  class="border p-3 rounded w-full mb-5"
/>

    <h1 class="text-4xl font-bold mb-5">
      Products
    </h1>

    <div class="grid grid-cols-3 gap-5">
        
<ProductCard
  v-for="product in filteredProducts"
  :key="product.id"
  :id="product.id"
  :title="product.title"
  :price="product.price"
  :image="product.thumbnail"
/>

    </div>
    

  </div>

</template>