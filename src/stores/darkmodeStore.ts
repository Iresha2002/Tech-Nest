import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDarkModeStore = defineStore('darkMode', () => {
  const isDark = ref(false)
  // load from localStorage...
    const saved = localStorage.getItem('technest_darkMode')
  if (saved === 'true') {
    isDark.value = true
  }
  // toggle function...
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    localStorage.setItem('technest_darkMode', isDark.value.toString())
  }
  // return...
  return { isDark, toggleDarkMode }
})