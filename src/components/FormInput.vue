<script setup lang="ts">
import { FwbInput } from 'flowbite-vue'
import FormError from "@/components/FormError.vue"

const model = defineModel()

defineProps({
  type: {
    type: String,
    default: "text"
  },
  label: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ""
  },
  error: {
    type: String,
    default: ""
  },
  labelclass: {
    type: String,
    default: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  }
})
</script>
<template>
  <fwb-input :type="type" v-model="model" :placeholder="placeholder" :label="label" :label-class="labelclass"
    input-class="dark:text-white text-gray-900" :validation-status="error ? 'error' : ''">
    <template #validationMessage>
      <FormError :error="error" />
    </template>
  </fwb-input>
</template>