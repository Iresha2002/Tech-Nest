<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useCartStore } from '../stores/cartStore'
import { useSearchStore } from '../stores/searchStore'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const searchStore = useSearchStore()
const cartStore = useCartStore()

const isDark = ref(false)

const applyDarkMode = (value: boolean) => {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem('dark-mode', value ? 'true' : 'false')
}

const toggleDarkMode = () => {
  applyDarkMode(!isDark.value)
}

onMounted(() => {
  applyDarkMode(localStorage.getItem('dark-mode') === 'true')
})
</script>

<template>
  <!-- Top Bar -->
<div class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 px-6 py-2 flex items-center justify-between text-sm">
  <div class="flex items-center gap-3 px-4">
    <span class="text-gray-900 font-bold text-sm ">
      TechNest
    </span>

    <span class="text-gray-400 dark:text-white text-sm ">
      Gadget Store
    </span>
  </div>

  <button @click="toggleDarkMode" class="bg-white dark:bg-gray-700 border border-gray-300  dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 px-4 py-1.5 rounded-lg text-sm font-medium">
    {{ isDark ? 'Light mode' : 'Dark mode' }}
  </button>
</div>

  
<nav  class=" bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-100">
    <div class="max-w-7xl mx-auto px-6">
            <div class="flex items-center h-[72px] gap-10">

     <RouterLink to="/" class="flex items-center gap-3 shrink-0">
          <div class="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
            <span class="text-white font-black text-base">TN</span>
          </div>


        <div>
            <p class="text-gray-900 font-bold dark:text-white text-base leading-tight">
              TechNest
            </p>
            <p class="text-gray-500 dark:text-gray-500 text-xs leading-tight">
              Smart gadgets, better prices
            </p>
          </div>
      </RouterLink>

  <!-- <nav class="p-5 bg-gray-800 text-white flex gap-5"> -->

    <div class="flex items-center gap-8 ml-4">
          <RouterLink to="/" class="text-sm font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
            Home
          </RouterLink>


    <!-- <RouterLink to="/cart">
      Cart ({{ cartStore.items.length }})
    </RouterLink>

    <RouterLink to="/login">
      Login
    </RouterLink> -->
             <RouterLink to="/categories" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
            Categories
          </RouterLink>

          <RouterLink to="/deals" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
            Deals
          </RouterLink>

          <RouterLink to="/support" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
            Support
          </RouterLink>
        </div>

       <div class="relative ml-auto">
          <input
            type="text"
            placeholder="Search gadgets..."
            class="w-72 pl-4 pr-10 py-2.5 text-sm border rounded-xl bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400"
            v-model="searchStore.search"
          />
        </div>

        <RouterLink
          to="/cart"
          class="flex items-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium"
        >
          🛒 Cart ({{ cartStore.items.length }})
        </RouterLink>

        <!-- <RouterLink
          to="/login"
          class="border border-gray-300 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl text-sm font-medium"
        >
          Login
        </RouterLink> -->
        
        <div v-if="authStore.isLoggedIn" class="flex items-center gap-3">
  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hi, {{ authStore.user?.firstName }}</span>
  <button @click="authStore.logout()" class="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-700">
    Logout
  </button>
</div>
<div v-else>
  <RouterLink
    to="/login?tab=signup"
    class="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-xl text-sm font-bold"
  >
    Sign up
  </RouterLink>
</div>

   </div>
    </div>
  </nav>

  <!-- </nav> -->

</template>