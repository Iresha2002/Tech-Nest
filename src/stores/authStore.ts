import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  // The logged-in user — null means nobody is logged in
  const user = ref<{ username: string; firstName: string; image: string } | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Load saved user from localStorage when app starts
  const saved = localStorage.getItem('technest_user')
  if (saved) {
    user.value = JSON.parse(saved)
  }

  // Automatically true/false based on whether user has data
  const isLoggedIn = computed(() => user.value !== null)

  async function login(username: string, password: string): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 60 })
      })

      const data = await res.json()

      if (!res.ok) {
        error.value = data.message ?? 'Invalid credentials'
        return false
      }

      user.value = data
      localStorage.setItem('technest_user', JSON.stringify(data))
      return true

    } catch {
      error.value = 'Network error. Please try again.'
      return false

    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('technest_user')

  }

async function signup(
  firstName: string,
  lastName: string, 
  email: string,
  username: string,
  password: string
): Promise<boolean> {

  isLoading.value = true
  error.value = null

  try {
    const res = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, username, password })
    })

    const data = await res.json()

    if (!data.id) {
      error.value = 'Signup failed. Please try again.'
      return false
    }

  // instead of: return await login(username, password)
user.value = { username, firstName, image: '' }
localStorage.setItem('technest_user', JSON.stringify(user.value))
return true

  } catch {
    error.value = 'Network error. Please try again.'
    return false

  } finally {
    isLoading.value = false
  }
}

  return { user, isLoggedIn, isLoading, error, login, logout, signup }
})