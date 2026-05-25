<script setup lang="ts">

import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const removeItem = (id: number) => {

  cartStore.items = cartStore.items.filter(
    item => item.id !== id
  )

}

</script>

<template>

  <div class="p-10">

    <h1 class="text-4xl font-bold mb-5">
      Cart Page
    </h1>

    <div
      v-if="cartStore.items.length === 0"
    >
      Your cart is empty.
    </div>

    <div
      v-else
      class="space-y-5"
    >

      <div
        v-for="item in cartStore.items"
        :key="item.id"
        class="border p-5 rounded flex gap-5 items-center"
      >

        <img
          :src="item.image"
          class="w-24 h-24 object-cover rounded"
        />

        <div class="flex-1">

          <h2 class="text-2xl font-bold">
            {{ item.title }}
          </h2>

          <p class="text-green-500">
            $ {{ item.price }}
          </p>

        </div>

        <button
          @click="removeItem(item.id)"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove
        </button>

      </div>

    </div>

  </div>

</template>