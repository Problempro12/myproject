<script setup lang="ts">
import { useShopStore } from '@/stores/shop'
import { onMounted } from 'vue'
const shop = useShopStore()
onMounted(async () => {
  await shop.fetchProducts()
})
</script>
<template>
  <div class="product-list">
    <div v-for="product in shop.products" :key="product.id" class="product-card">
      <img v-if="product.image" :src="product.image" :alt="product.name" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
      <button @click="shop.addToCart(product.id)">Add to Cart</button>
    </div>
  </div>
</template>
<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}
.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}
</style> 