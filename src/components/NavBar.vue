<script setup lang="ts">

import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

</script>

<template>

  <nav class="p-5 bg-gray-800 text-white flex gap-5">

    <RouterLink to="/">
      Home
    </RouterLink>

    <RouterLink to="/cart">
      Cart ({{ cartStore.items.length }})
    </RouterLink>

    <RouterLink to="/login">
      Login
    </RouterLink>

  </nav>

</template>