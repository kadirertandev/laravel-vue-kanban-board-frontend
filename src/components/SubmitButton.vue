<script setup lang="ts">
import { FwbSpinner } from 'flowbite-vue'

defineProps({
  condition: Boolean
})
</script>
<template>
  <button type="submit" :disabled="condition"
    class="w-full flex justify-center items-center disabled:cursor-default cursor-pointer text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
    <span v-if="!condition">
      <slot>Submit</slot>
    </span>
    <fwb-spinner v-else size="7" color="white" />
  </button>
</template>