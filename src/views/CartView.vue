<script setup lang="ts">

import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const removeItem = (id: number) => {

  cartStore.items = cartStore.items.filter(
    item => item.id !== id
  )

}
const totalPrice = () => {

  return cartStore.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

}
const increase = (id: number) => {

  cartStore.increaseQuantity(id)

}

const decrease = (id: number) => {

  cartStore.decreaseQuantity(id)

}

</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-10">
    
    <h1 class="text-3xl font-black text-gray-900 dark:text-white mb-1">Shopping Cart</h1>
    <p class="text-sm text-gray-400 dark:text-gray-500 mb-8">{{ cartStore.items.length }} items</p>

    <div v-if="cartStore.items.length === 0" class="text-gray-400 dark:text-gray-500 text-center py-20">
      Your cart is empty.
    </div>

    <div v-else class="flex gap-8 items-start">
      
      <!-- left: cart items -->
      <div class="flex-1">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-2xl p-4 flex items-center gap-4 mb-3"
        >
          <img :src="item.image" class="w-20 h-20 object-contain rounded-xl border border-gray-100 dark:border-gray-600" />
          <div class="flex-1">
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{{ item.brand }}</p>
            <h2 class="font-bold text-gray-900 dark:text-white">{{ item.title }}</h2>
            <div class="flex items-center gap-2 mt-2">
              <button @click="decrease(item.id)" class="w-7 h-7 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">-</button>
              <span class="text-sm font-semibold w-4 text-center">{{ item.quantity }}</span>
              <button @click="increase(item.id)" class="w-7 h-7 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">+</button>
            </div>
          </div>
          <div class="text-right">
            <p class="font-black text-gray-900 dark:text-white">${{ item.price }}</p>
            <p class="text-xs text-gray-400 dark:text-gray-500  line-through">${{ item.originalPrice }}</p>
          </div>
          <button @click="removeItem(item.id)" class="text-gray-300 dark:text-gray-600 dark:hover:text-red-500 ml-2">🗑</button>
        </div>
      </div>
      <!-- right: order summary -->
      <div class="w-80 shrink-0 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-2xl p-6">
        <h2 class="text-lg font-black text-gray-900 dark:text-white mb-4">Order Summary</h2>
        <div class="flex justify-between text-sm mb-2">
          <span class="text-gray-500 dark:text-white ">Subtotal ({{ cartStore.items.length }})</span>
          <span class="font-semibold">${{ totalPrice().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm mb-2">
          <span class="text-green-600">You save</span>
          <span class="text-green-600 font-semibold">-${{ (cartStore.items.reduce((t, i) => t + (i.originalPrice - i.price) * i.quantity, 0)).toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm mb-4">
          <span class="text-gray-500 dark:text-gray-400">Shipping</span>
          <span class="text-green-600 font-semibold">FREE 🎉</span>
        </div>
        <div class="flex justify-between font-black text-gray-900 dark:text-white dark:border-gray-700 text-lg border-t border-gray-200 pt-4 mb-6">
          <span>Total</span>
          <span>${{ totalPrice().toFixed(2) }}</span>
        </div>
        <button class="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-700 mb-3">
          Proceed to Checkout →
        </button>
        <RouterLink to="/" class="block text-center text-sm text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
          ← Continue Shopping
        </RouterLink>
      </div>

    </div>
  </div>
</template>