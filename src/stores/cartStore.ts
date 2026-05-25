import { defineStore } from 'pinia'

type CartItem = {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
  }),

  actions: {
      saveCart() {

      localStorage.setItem(
        'cart',
        JSON.stringify(this.items)
      )

    },
   addToCart(product: CartItem) {

  const existingItem = this.items.find(
    item => item.id === product.id
  )

  if (existingItem) {

    existingItem.quantity++

  } else {

    this.items.push({
      ...product,
      quantity: 1,
    })

  }

      this.saveCart()


    },
  },
})