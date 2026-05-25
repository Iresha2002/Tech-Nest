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
    items: [] as CartItem[],
  }),

  actions: {
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

  console.log(this.items)


    },
  },
})