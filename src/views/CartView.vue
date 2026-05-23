<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <div class="p-10">
    <h1 class="text-4xl font-bold mb-5">
      Cart Page
    </h1>

    <div v-if="cartStore.items.length === 0">
      Your cart is empty.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="item in cartStore.items"
        :key="item.id"
        class="border p-4 rounded"
      >
        <h2 class="text-2xl font-bold">
          {{ item.title }}
        </h2>

        <p class="text-green-500">
          $ {{ item.price }}
        </p>
      </div>
    </div>
  </div>
</template>