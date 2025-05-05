<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.ts"
import { ref } from "vue"
import type { RegisterForm, CustomError } from "@/types/index.ts"
import FormInput from "@/components/FormInput.vue"
import SubmitButton from "@/components/SubmitButton.vue"
import { useAbortController } from "@/composables/useAbortController"
import type { AxiosError } from "axios"
import Logo from "@/components/Logo.vue"

const auth = useAuthStore();

const registerForm = ref<RegisterForm>({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
});

const error = ref<CustomError>({
  status: null,
  original: {} as AxiosError,
  validation: {},
  message: null,
});

const controller = useAbortController();

</script>
<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
      <div class="mb-6">
        <Logo />
      </div>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form @submit.prevent="auth.register(registerForm, error, controller)" class="space-y-4" novalidate>
            <div>
              <FormInput type="text" v-model="registerForm.name" label="Your name" placeholder="John Doe"
                :error="error?.validation?.name" />
            </div>
            <div>
              <FormInput type="email" v-model="registerForm.email" label="Your email" placeholder="john@doe.com"
                :error="error?.validation?.email" />
            </div>
            <div>
              <FormInput type="password" v-model="registerForm.password" label="Password" placeholder="••••••••"
                :error="error?.validation?.password" />
            </div>
            <div>
              <FormInput type="password" v-model="registerForm.password_confirmation" label="Confirm
                password" placeholder="••••••••" :error="error?.validation?.password_confirmation" />
            </div>

            <SubmitButton :condition="auth.processing.register">Create an account</SubmitButton>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <RouterLink :to="{ name: 'login' }"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>