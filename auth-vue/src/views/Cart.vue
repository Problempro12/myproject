<script setup lang="ts">
import { useShopStore } from '@/stores/shop'
import { onMounted } from 'vue'
const shop = useShopStore()
onMounted(async () => {
  await shop.fetchCart()
})
</script>
<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <div v-if="shop.cart?.items.length">
      <div v-for="item in shop.cart.items" :key="item.id" class="cart-item">
        <h3>{{ item.product.name }}</h3>
        <p>Price: ${{ item.product.price }} x {{ item.quantity }}</p>
        <p>Total: ${{ item.product.price * item.quantity }}</p>
        <input
          type="number"
          v-model.number="item.quantity"
          @change="shop.updateQuantity(item.id, item.quantity)"
          min="1"
          :max="item.product.stock"
        >
        <button @click="shop.removeItem(item.id)">Remove</button>
      </div>
      <h3>Total: ${{ shop.cart?.total }}</h3>
    </div>
    <p v-else>Your cart is empty</p>
  </div>
</template>
<style scoped>
.cart-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto auto;
  align-items: center;
  gap: 1rem;
}
input[type="number"] {
  width: 60px;
  padding: 0.25rem;
}
</style> 