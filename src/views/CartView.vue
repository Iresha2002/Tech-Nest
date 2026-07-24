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
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
    
    <h1 class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-1">Shopping Cart</h1>
    <p class="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mb-6 sm:mb-8">{{ cartStore.items.length }} items</p>

    <div v-if="cartStore.items.length === 0" class="text-gray-400 dark:text-gray-500 text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
      <p class="text-4xl mb-2">🛒</p>
      <p class="text-base font-semibold text-gray-600 dark:text-gray-400 mb-4">Your cart is empty.</p>
      <RouterLink to="/" class="inline-block bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm">
        Start Shopping
      </RouterLink>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
      
      <!-- left: cart items -->
      <div class="w-full lg:flex-1">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-3"
        >
          <img :src="item.image" class="w-20 h-20 object-contain rounded-xl border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 shrink-0 self-center sm:self-auto" />
          <div class="flex-1 w-full sm:w-auto">
            <p class="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{{ item.brand }}</p>
            <h2 class="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{{ item.title }}</h2>
            <div class="flex items-center gap-2 mt-2">
              <button @click="decrease(item.id)" class="w-7 h-7 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center justify-center font-bold">-</button>
              <span class="text-sm font-semibold w-6 text-center text-gray-900 dark:text-white">{{ item.quantity }}</span>
              <button @click="increase(item.id)" class="w-7 h-7 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center justify-center font-bold">+</button>
            </div>
          </div>
          <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-700">
            <div class="text-left sm:text-right">
              <p class="font-black text-gray-900 dark:text-white text-base sm:text-lg">${{ (item.price * item.quantity).toFixed(2) }}</p>
              <p v-if="item.originalPrice" class="text-xs text-gray-400 dark:text-gray-500 line-through">${{ (item.originalPrice * item.quantity).toFixed(2) }}</p>
            </div>
            <button @click="removeItem(item.id)" class="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 p-1 transition-colors" title="Remove item">🗑</button>
          </div>
        </div>
      </div>
      <!-- right: order summary -->
      <div class="w-full lg:w-80 shrink-0 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-2xl p-5 sm:p-6">
        <h2 class="text-lg font-black text-gray-900 dark:text-white mb-4">Order Summary</h2>
        <div class="flex justify-between text-sm mb-2">
          <span class="text-gray-500 dark:text-gray-400">Subtotal ({{ cartStore.items.reduce((t, i) => t + i.quantity, 0) }} items)</span>
          <span class="font-semibold text-gray-900 dark:text-white">${{ totalPrice().toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm mb-2">
          <span class="text-green-600 dark:text-green-400">You save</span>
          <span class="text-green-600 dark:text-green-400 font-semibold">-${{ (cartStore.items.reduce((t, i) => t + ((i.originalPrice || i.price) - i.price) * i.quantity, 0)).toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm mb-4">
          <span class="text-gray-500 dark:text-gray-400">Shipping</span>
          <span class="text-green-600 dark:text-green-400 font-semibold">FREE 🎉</span>
        </div>
        <div class="flex justify-between font-black text-gray-900 dark:text-white dark:border-gray-700 text-lg border-t border-gray-200 pt-4 mb-6">
          <span>Total</span>
          <span>${{ totalPrice().toFixed(2) }}</span>
        </div>
        <button class="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mb-3">
          Proceed to Checkout →
        </button>
        <RouterLink to="/" class="block text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          ← Continue Shopping
        </RouterLink>
      </div>

    </div>
  </div>
</template>