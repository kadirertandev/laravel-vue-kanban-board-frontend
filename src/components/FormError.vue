<script setup lang="ts">
defineProps({
  error: {
    type: String,
    default: ""
  }
})
</script>
<template>
  <span v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ error }}</span>
</template>