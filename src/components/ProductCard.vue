<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { computed } from 'vue'

const props = defineProps<{
  id: number
  title: string
  price: number
  image: string
  rating: number
  discountPercentage?: number
  brand?: string
  originalPrice?: number
}>()

const cartStore = useCartStore()
const inCart = computed(() => {
  return cartStore.items.some(
    item => item.id === props.id
  )
})

const calcOriginalPrice = computed(() => {
  if (props.originalPrice) return props.originalPrice
  if (props.discountPercentage && props.discountPercentage > 0) {
    return Math.round(props.price / (1 - props.discountPercentage / 100))
  }
  return Math.round(props.price * 1.2)
})

const handleClick = () => {
  if (inCart.value) {
    cartStore.removeFromCart(props.id)
  } else {
    cartStore.addToCart({
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.image,
      brand: props.brand || '',
      originalPrice: calcOriginalPrice.value
    })
  }
}
</script>

<template>
  <article
    class="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-lg rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 flex flex-col h-full"
  >
    <!-- image area -->
    <RouterLink :to="`/product/${id}`" class="block relative group">
      <div class="bg-gray-50 dark:bg-gray-800/70 relative aspect-square overflow-hidden p-3 flex items-center justify-center">
        <img
          :src="image"
          class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
          loading="lazy"
          :alt="title"
        />
        <div
          v-if="discountPercentage && discountPercentage > 10"
          class="absolute top-2.5 left-2.5 bg-red-500 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-lg shadow-sm tracking-wide"
        >
          -{{ Math.round(discountPercentage) }}%
        </div>
      </div>
    </RouterLink>

    <!-- details area -->
    <div class="p-3 sm:p-4 flex flex-col flex-1">
      <p v-if="brand" class="text-[11px] font-medium text-gray-400 dark:text-gray-500 mb-1 truncate">
        {{ brand }}
      </p>

      <RouterLink :to="`/product/${id}`" class="block">
        <h3 class="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 font-bold text-xs sm:text-sm leading-snug mb-1.5 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] transition-colors">
          {{ title }}
        </h3>
      </RouterLink>

      <div class="flex items-center gap-1 mb-3">
        <div class="flex gap-0.5">
          <span
            v-for="i in 5"
            :key="i"
            :class="i <= Math.round(rating || 4.5) ? 'text-amber-400' : 'text-gray-200 dark:text-gray-700'"
            class="text-[10px] sm:text-xs"
          >
            ★
          </span>
        </div>

        <span class="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs font-semibold ml-0.5">
          {{ rating ? rating.toFixed(1) : '4.5' }}
        </span>
      </div>

      <div class="mt-auto pt-2 flex items-center justify-between gap-1.5 border-t border-gray-100 dark:border-gray-800/80">
        <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
          <span class="text-sm sm:text-base font-black text-gray-900 dark:text-white">
            ${{ price }}
          </span>

          <span v-if="calcOriginalPrice > price" class="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 line-through">
            ${{ calcOriginalPrice }}
          </span>
        </div>

        <button
          @click.stop="handleClick"
          :class="
            inCart
              ? 'bg-green-100 border border-green-600 text-green-700 dark:bg-green-950/60 dark:border-green-700 dark:text-green-400'
              : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200'
          "
          class="px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all shrink-0 active:scale-95"
        >
          {{ inCart ? '✓ Added' : '+ Add' }}
        </button>
      </div>
    </div>
  </article>
</template>