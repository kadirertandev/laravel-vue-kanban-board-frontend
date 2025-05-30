<script setup lang="ts">
import FormInput from "@/components/FormInput.vue"
import SubmitButton from "@/components/SubmitButton.vue"
import { useAuthStore } from "@/stores/auth.ts"
import { useAbortController } from "@/composables/useAbortController"
import type { LoginForm, CustomError } from "@/types"
import type { AxiosError } from "axios"
import { ref } from "vue"
import Logo from "@/components/Logo.vue"

const auth = useAuthStore();

const loginForm = ref<LoginForm>({
  email: "test@test.com",
  password: "asdfasdf"
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
            Sign in to your account
          </h1>
          <div class="text-white bg-gray-700 p-2">
            <h2 class="text-xl">Test User</h2>
            <p>Email:test@test.com - Password:asdfasdf</p>
          </div>
          <form @submit.prevent="auth.login(loginForm, error, controller)" class="space-y-4" novalidate>
            <div>
              <FormInput type="email" v-model="loginForm.email" label="Your email" placeholder="john@doe.com"
                :error="error?.validation?.email" />
            </div>
            <div>
              <FormInput type="password" v-model="loginForm.password" label="Password" placeholder="••••••••"
                :error="error?.validation?.password" />
            </div>

            <SubmitButton :condition="auth.processing.login">Sign In</SubmitButton>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <RouterLink :to="{ name: 'register' }"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>