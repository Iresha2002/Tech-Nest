<template>
  <div>
  <nav class="p-5 bg-gray-800 text-white flex gap-5">
    
    <RouterLink to="/">Home</RouterLink>

    <RouterLink to="/cart">Cart</RouterLink>

    <RouterLink to="/login">Login</RouterLink>

  </nav>
    <RouterView />
  </div>
</template>