<script setup lang="ts">
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
        <RouterLink :to="{ name: 'authTest' }">Auth Page</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
