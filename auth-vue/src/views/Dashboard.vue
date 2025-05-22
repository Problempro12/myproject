<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div class="dashboard">
    <h1>Welcome {{ auth.user?.username }}</h1>
    <p>Email: {{ auth.user?.email }}</p>
    <p v-if="auth.user?.phone">Phone: {{ auth.user.phone }}</p>
    <p v-if="auth.user?.bio">Bio: {{ auth.user.bio }}</p>
    <button @click="auth.logout()">Logout</button>
  </div>
</template> 