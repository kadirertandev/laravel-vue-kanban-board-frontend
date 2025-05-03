<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.ts"
const auth = useAuthStore();
</script>
<template>
  <div class="h-screen flex flex-col items-center justify-center gap-6">
    <h1 class="text-5xl italic font-bold">You are authenticated, {{ auth.user?.name }}</h1>
    <RouterLink :to="{ name: 'home' }" class="text-3xl">Go Home</RouterLink>
    <button @click="auth.logout" type="button"
      class="cursor-pointer text-2xl border-2 p-2 rounded-lg bg-red-500 text-gray-50">Log out</button>
  </div>
</template>