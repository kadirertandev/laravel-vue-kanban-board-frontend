<script setup lang="ts">
import Logo from "@/components/Logo.vue"
import { useAuthStore } from "@/stores/auth";
import { ClipboardIcon } from "@heroicons/vue/24/solid";
import {
  FwbButton, FwbDropdown
} from 'flowbite-vue'
import { computed } from "vue";
import { useRoute } from "vue-router";

const auth = useAuthStore();

const route = useRoute();

const showBoardsLink = computed(() => route.name !== 'boardIndex')

</script>

<template>
  <div class="h-screen flex flex-col">
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 p-4">
      <div class="max-w-screen flex flex-wrap items-center justify-between mx-auto">
        <Logo />

        <di class="flex items-center gap-4">

          <RouterLink v-if="showBoardsLink" :to="{ name: 'boardIndex' }">
            <fwb-button color="alternative" gradient="teal" class="cursor-pointer">
              <template #prefix>
                <ClipboardIcon class="w-5 h-5" />
              </template>
              <span>My Boards</span>
            </fwb-button>
          </RouterLink>

          <fwb-dropdown placement="bottom" color="alternative" :text="auth.user?.name">
            <nav class="py-2 text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer">
              <a href="#profile"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
              <a @click="auth.logout" type="button"
                class=" block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                out</a>
            </nav>
          </fwb-dropdown>
        </di>
      </div>
    </nav>

    <RouterView />
  </div>
</template>
