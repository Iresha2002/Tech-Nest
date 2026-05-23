import { defineStore } from 'pinia'

type CartItem = {
  id: number
  title: string
  price: number
  image: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  actions: {
    addToCart(product: CartItem) {
      this.items.push(product)
      console.log(this.items)
    },
  },
})