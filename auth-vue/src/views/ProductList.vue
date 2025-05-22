<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useShopStore } from '@/stores/shop'
const shop = useShopStore()
const search = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const stock = ref('')

onMounted(async () => {
  await doSearch()
})

async function doSearch() {
  await shop.fetchProducts(search.value, {
    min_price: minPrice.value,
    max_price: maxPrice.value,
    stock: stock.value
  })
}
</script>

<template>
  <div>
    <input
      v-model="search"
      @input="doSearch"
      placeholder="Поиск товаров..."
      style="margin-bottom: 1rem; padding: 0.5rem;"
    />
    <input v-model="minPrice" @input="doSearch" type="number" placeholder="Мин. цена" style="margin-right: 0.5rem;" />
    <input v-model="maxPrice" @input="doSearch" type="number" placeholder="Макс. цена" style="margin-right: 0.5rem;" />
    <input v-model="stock" @input="doSearch" type="number" placeholder="Остаток на складе" style="margin-right: 0.5rem;" />
    <div class="product-list">
      <div v-for="product in shop.products" :key="product.id" class="product-card">
        <img v-if="product.image" :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Price: ${{ product.price }}</p>
        <button @click="shop.addToCart(product.id)">Add to Cart</button>
      </div>
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