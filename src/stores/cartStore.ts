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
   addToCart(product: Omit<CartItem, 'quantity'>){

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
  increaseQuantity(id: number) {

  const item = this.items.find(
    item => item.id === id
  )

  if (item) {

    item.quantity++

    this.saveCart()

  }

},
decreaseQuantity(id: number) {

  const item = this.items.find(
    item => item.id === id
  )

  if (item && item.quantity > 1) {

    item.quantity--

  } else {

    this.items = this.items.filter(
      item => item.id !== id
    )

  }

  this.saveCart()

},
removeFromCart(id: number) {

  this.items = this.items.filter(
    item => item.id !== id
  )

  this.saveCart()

},

    
  },
})