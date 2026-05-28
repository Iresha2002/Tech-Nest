<script setup lang="ts">

import { useCartStore } from '../stores/cartStore'
import { useSearchStore } from '../stores/searchStore'

const searchStore = useSearchStore()
const cartStore = useCartStore()

</script>

<template>
  <!-- Top Bar -->
<div class="bg-gray-100 border-b border-gray-200 text-gray-600 px-6 py-2 flex items-center justify-between text-sm">
  <div class="flex items-center gap-3 px-4">
    <span class="text-gray-900 font-bold text-sm ">
      TechNest
    </span>

    <span class="text-gray-400 text-sm ">
      Gadget Store
    </span>
  </div>

  <button class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-1.5 rounded-lg text-sm font-medium">
    Dark mode
  </button>
</div>
<nav  class=" bg-white border-b border-gray-200 sticky top-0 z-100">
    <div class="max-w-7xl mx-auto px-6">
            <div class="flex items-center h-[72px] gap-6">

     <RouterLink to="/" class="flex items-center gap-3 shrink-0">
          <div class="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
            <span class="text-white font-black text-base">TN</span>
          </div>


        <div>
            <p class="text-gray-900 font-bold text-base leading-tight">
              TechNest
            </p>
            <p class="text-gray-500 text-xs leading-tight">
              Smart gadgets, better prices
            </p>
          </div>
      </RouterLink>

  <!-- <nav class="p-5 bg-gray-800 text-white flex gap-5"> -->

    <div class="flex items-center gap-8 ml-4">
          <RouterLink to="/" class="text-sm font-medium text-gray-900">
            Home
          </RouterLink>


    <!-- <RouterLink to="/cart">
      Cart ({{ cartStore.items.length }})
    </RouterLink>

    <RouterLink to="/login">
      Login
    </RouterLink> -->
             <RouterLink to="/categories" class="text-sm font-medium text-gray-600 hover:text-gray-900">
            Categories
          </RouterLink>

          <RouterLink to="/deals" class="text-sm font-medium text-gray-600 hover:text-gray-900">
            Deals
          </RouterLink>

          <RouterLink to="/support" class="text-sm font-medium text-gray-600 hover:text-gray-900">
            Support
          </RouterLink>
        </div>

       <div class="relative">
          <input
            type="text"
            placeholder="Search gadgets..."
            class="w-72 pl-4 pr-10 py-2.5 text-sm border rounded-xl bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400"
            v-model="searchStore.search"
          />
        </div>

        <RouterLink
          to="/cart"
          class="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-xl text-sm font-medium"
        >
          🛒 Cart ({{ cartStore.items.length }})
        </RouterLink>

        <RouterLink
          to="/login"
          class="border border-gray-300 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl text-sm font-medium"
        >
          Login
        </RouterLink>

        <RouterLink
          to="/login?tab=signup"
          class="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-xl text-sm font-bold"
        >
          Sign up
        </RouterLink>

   </div>
    </div>
  </nav>

  <!-- </nav> -->

</template>