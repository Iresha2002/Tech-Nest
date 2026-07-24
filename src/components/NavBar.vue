<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useCartStore } from '../stores/cartStore'
import { useSearchStore } from '../stores/searchStore'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const searchStore = useSearchStore()
const cartStore = useCartStore()
const route = useRoute()

const isDark = ref(false)
const isMobileMenuOpen = ref(false)

const applyDarkMode = (value: boolean) => {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem('dark-mode', value ? 'true' : 'false')
}

const toggleDarkMode = () => {
  applyDarkMode(!isDark.value)
}

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

onMounted(() => {
  applyDarkMode(localStorage.getItem('dark-mode') === 'true')
})
</script>

<template>
  <!-- Top Bar -->
  <div class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 px-4 sm:px-6 py-2 flex items-center justify-between text-xs sm:text-sm">
    <div class="flex items-center gap-2 sm:gap-3">
      <span class="text-gray-900 dark:text-white font-bold">
        TechNest
      </span>

      <span class="hidden sm:inline text-gray-400 dark:text-gray-500">|</span>

      <span class="text-gray-500 dark:text-gray-400">
        Gadget Store
      </span>
    </div>

    <button @click="toggleDarkMode" class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors">
      {{ isDark ? '☀️ Light' : '🌙 Dark' }}
    </button>
  </div>

  <nav class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-[72px] gap-4">

        <!-- Logo & Brand -->
        <RouterLink to="/" class="flex items-center gap-3 shrink-0">
          <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gray-900 dark:bg-gray-800 border border-gray-800 dark:border-gray-700 flex items-center justify-center shrink-0 shadow-sm">
            <span class="text-white font-black text-sm sm:text-base">TN</span>
          </div>

          <div>
            <p class="text-gray-900 font-bold dark:text-white text-base leading-tight">
              TechNest
            </p>
            <p class="text-gray-500 dark:text-gray-400 text-xs leading-tight hidden sm:block">
              Smart gadgets, better prices
            </p>
          </div>
        </RouterLink>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex items-center gap-6 xl:gap-8 ml-4">
          <RouterLink to="/" class="text-sm font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            Home
          </RouterLink>

          <RouterLink to="/categories" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
            Categories
          </RouterLink>

          <RouterLink to="/deals" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
            Deals
          </RouterLink>

          <RouterLink to="/support" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
            Support
          </RouterLink>
        </div>

        <!-- Desktop Search & Cart & Auth -->
        <div class="hidden lg:flex items-center gap-4 ml-auto">
          <div class="relative w-56 xl:w-72">
            <input
              type="text"
              placeholder="Search gadgets..."
              class="w-full pl-4 pr-4 py-2 text-sm border rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-all"
              v-model="searchStore.search"
            />
          </div>

          <RouterLink
            to="/cart"
            class="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors shrink-0"
          >
            🛒 Cart <span class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">{{ cartStore.items.length }}</span>
          </RouterLink>

          <div v-if="authStore.isLoggedIn" class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Hi, {{ authStore.user?.firstName }}</span>
            <button @click="authStore.logout()" class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Logout
            </button>
          </div>
          <div v-else>
            <RouterLink
              to="/login?tab=signup"
              class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
            >
              Sign up
            </RouterLink>
          </div>
        </div>

        <!-- Mobile/Tablet Hamburger Toggle -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>

      <!-- Mobile/Tablet Dropdown Menu -->
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4 space-y-4">
        <!-- Mobile Search -->
        <div class="relative">
          <input
            type="text"
            placeholder="Search gadgets..."
            class="w-full px-4 py-2.5 text-sm border rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
            v-model="searchStore.search"
          />
        </div>

        <!-- Mobile Nav Links -->
        <div class="flex flex-col space-y-2">
          <RouterLink
            to="/"
            @click="isMobileMenuOpen = false"
            class="px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/categories"
            @click="isMobileMenuOpen = false"
            class="px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
          >
            Categories
          </RouterLink>

          <RouterLink
            to="/deals"
            @click="isMobileMenuOpen = false"
            class="px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
          >
            Deals
          </RouterLink>

          <RouterLink
            to="/support"
            @click="isMobileMenuOpen = false"
            class="px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
          >
            Support
          </RouterLink>
        </div>

        <!-- Mobile Cart & Auth -->
        <div class="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-3">
          <RouterLink
            to="/cart"
            @click="isMobileMenuOpen = false"
            class="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
          >
            <span>🛒 Shopping Cart</span>
            <span class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2.5 py-0.5 rounded-full text-xs font-bold">{{ cartStore.items.length }}</span>
          </RouterLink>

          <div v-if="authStore.isLoggedIn" class="flex items-center justify-between pt-1">
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Hi, {{ authStore.user?.firstName }}</span>
            <button @click="authStore.logout(); isMobileMenuOpen = false" class="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-xl text-sm font-bold">
              Logout
            </button>
          </div>
          <div v-else class="pt-1">
            <RouterLink
              to="/login?tab=signup"
              @click="isMobileMenuOpen = false"
              class="block text-center bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2.5 rounded-xl text-sm font-bold"
            >
              Sign up
            </RouterLink>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>