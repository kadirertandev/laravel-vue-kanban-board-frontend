<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <h1 class="text-3xl text-red-400 italic">hello world</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        <RouterLink :to="{ name: 'register' }">Register</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
