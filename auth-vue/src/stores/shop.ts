import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image?: string
  stock: number
}

interface CartItem {
  id: number
  product: Product
  quantity: number
}

interface ShopState {
  products: Product[]
  cart: {
    items: CartItem[]
    total: number
  } | null
}

export const useShopStore = defineStore('shop', {
  state: (): ShopState => ({
    products: [],
    cart: null
  }),
  actions: {
    async fetchProducts() {
      const response = await axios.get('http://localhost:8000/api/products/')
      this.products = response.data
    },
    async fetchCart() {
      const auth = useAuthStore()
      if (!auth.token) return
      try {
        const response = await axios.get('http://localhost:8000/api/cart/', {
          headers: { Authorization: `Token ${auth.token}` }
        })
        this.cart = response.data
      } catch (error) {
        console.error('Error fetching cart:', error)
      }
    },
    async addToCart(productId: number, quantity: number = 1) {
      const auth = useAuthStore()
      if (!auth.token) throw new Error('Not authenticated')
      await axios.post('http://localhost:8000/api/cart/items/', {
        product: productId,
        quantity
      }, {
        headers: { Authorization: `Token ${auth.token}` }
      })
      await this.fetchCart()
    },
    async updateQuantity(itemId: number, newQuantity: number) {
      const auth = useAuthStore()
      await axios.patch(`http://localhost:8000/api/cart/items/${itemId}/`, {
        quantity: newQuantity
      }, {
        headers: { Authorization: `Token ${auth.token}` }
      })
      await this.fetchCart()
    },
    async removeItem(itemId: number) {
      const auth = useAuthStore()
      await axios.delete(`http://localhost:8000/api/cart/items/${itemId}/`, {
        headers: { Authorization: `Token ${auth.token}` }
      })
      await this.fetchCart()
    }
  }
})