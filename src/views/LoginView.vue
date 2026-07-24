<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('login')
const signupError = ref('')
const loginForm = ref({
  username: '',
  password: '',
})

const signupForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirm: ''
})


async function handleLogin() {
  
    const ok = await authStore.login(loginForm.value.username, loginForm.value.password)
    if (ok) {
      router.push('/')
    }
  } 
  
  async function handleSignup() {
    if (signupForm.value.password !== signupForm.value.confirm) {
      signupError.value = 'Passwords do not match'
      return
    }
    const ok = await authStore.signup(
      signupForm.value.firstName,
      signupForm.value.lastName,
      signupForm.value.email,
      signupForm.value.username,
      signupForm.value.password
    )
    console.log('signup result:', ok)
    if (ok) {
      activeTab.value = 'login'
    }
  }

</script>
<template>
  <div class="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-8 sm:py-12">
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md shadow-sm">
  

<!-- tab switcher — no v-if here, both buttons always show -->
<div class="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
  <button
    @click="activeTab = 'login'"
    class="flex-1 py-2 text-sm rounded-lg transition-all"
    :class="activeTab === 'login' ? 'bg-white dark:bg-gray-700 font-bold text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'"
  >Login</button>

  <button
    @click="activeTab = 'signup'"
    class="flex-1 py-2 text-sm rounded-lg transition-all"
    :class="activeTab === 'signup' ? 'bg-white dark:bg-gray-700 font-bold text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'"
  >Sign Up</button>
</div>

<!-- form changes here -->
<div v-if="activeTab === 'login'">
<h1 class="text-xl font-black text-gray-900 dark:text-white mb-1">Welcome back</h1>
  <p class="text-sm text-gray-400 dark:text-gray-500 mb-5">Sign in to your account</p>

  <div v-if="authStore.error"
    class="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
  {{ authStore.error }} 
  </div>

  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
  <input
    v-model="loginForm.username"
    type="text"
    placeholder="Enter username"
    class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>

    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
  <input 
    v-model="loginForm.password"
    type="password"
    placeholder="Enter password"
    class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
  
    <button
    @click="handleLogin" :disabled="authStore.isLoading" class="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-2.5 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 text-sm">


    {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
    </button>
  
  <p class="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
    No account?
    <button @click="activeTab = 'signup'" class="text-sm text-gray-800 dark:text-gray-200 font-semibold hover:underline">Sign up</button>
  </p>
</div>

<div v-else>
  <h1 class="text-xl font-black text-gray-900 dark:text-white mb-1">Create an account</h1>
  <p class="text-sm text-gray-400 dark:text-gray-500 mb-5">Sign up to get started</p>

  <div v-if="signupError"
    class="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
  {{ signupError }}
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
    <div>
      <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
      <input 
        v-model="signupForm.firstName"
        type="text"
        placeholder="John"
        class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
    </div>

    <div>
      <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
      <input 
        v-model="signupForm.lastName"
        type="text"
        placeholder="Doe"
        class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
    </div>
  </div>

  <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
  <input 
    v-model="signupForm.email"
    type="email"
    placeholder="john@example.com"
    class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3.5 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>

  <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
  <input 
    v-model="signupForm.username"
    type="text"
    placeholder="johndoe"
    class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3.5 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
    
  <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
  <input 
    v-model="signupForm.password"
    type="password"
    placeholder="••••••••"
    class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3.5 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
    
  <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
  <input 
    v-model="signupForm.confirm"
    type="password"
    placeholder="••••••••"
    class="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3.5 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>

  <button
    @click="handleSignup" :disabled="authStore.isLoading" class="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-2.5 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 text-sm">
    {{ authStore.isLoading ? 'Signing up...' : 'Sign Up' }}
  </button>

  <p class="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
    Already have an account?
    <button @click="activeTab = 'login'" class="text-sm text-gray-800 dark:text-gray-200 font-semibold hover:underline">Sign in</button>
  </p>

</div>

     </div>
      </div>
</template>