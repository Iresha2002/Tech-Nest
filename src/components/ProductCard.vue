<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { computed } from 'vue'

const props = defineProps<{
  id: number
  title: string
  price: number
  image: string
  rating: number
  discountPercentage: number

}>()

const cartStore = useCartStore()
const inCart = computed(() => {

  return cartStore.items.some(
    item => item.id === props.id
  )

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
    })

  }

}
</script>

<template>

  <article
    class="bg-white border border-gray-200 hover:border-gray-400 hover:shadow-md rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 flex flex-col"
    
  >
    <!-- image area -->
    <RouterLink :to="`/product/${id}`">
    <div class="bg-gray-50 relative aspect-square overflow-hidden">

      <img
        :src="image"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div
  v-if="discountPercentage > 10"
  class="absolute top-2.5 left-2.5 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg"
>
  -{{ Math.round(discountPercentage) }}%
</div>
      
      </div>
      
    </RouterLink>

    <!-- details area -->


    <div class="p-4 flex flex-col flex-1">
        
      <h3 class="text-gray-900 group-hover:text-gray-600 font-semibold text-sm leading-snug mb-2 line-clamp-2 transition-colors">
        {{ title }}
      </h3>
          <div class="flex items-center gap-1 mb-3">
        <div class="flex gap-0.5">
          <span
            v-for="i in 5"
            :key="i"
            :class="i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'"
            class="text-xs"
          >
            ★
          </span>
        </div>

        <span class="text-gray-400 text-xs">
          {{ rating.toFixed(1) }}
        </span>
      </div>
 <div class="flex flex-row items-center justify-between gap-3">


      <div class="mt-auto flex items-center gap-3">
       <p class="text-lg font-bold text-gray-700">
        ${{ price }}
       </p>

       <p class="text-sm text-gray-400 line-through">
        ${{ Math.round(price * 1.2) }}
      </p>
      </div>


  

    <!-- </RouterLink> -->

    <button
      @click.stop="handleClick"
        :class="
    inCart
      ? 'bg-green-200 border border-green-700 text-green-700 hover:bg-green-300'
      : 'bg-gray-700 hover:bg-gray-600 text-white'
  "
class="   
            px-3
            py-1.5
            rounded-xl
            text-xs
            font-bold
            transition-colors
          "
          >
    
      {{ inCart ? '✓ Added' : '+ Add' }}
  </button>
    </div>
    </div>
    


  
  </article>


</template>