<script setup lang="ts">
import { FwbCard, FwbButton, FwbSpinner } from 'flowbite-vue'
import { useBoardStore } from "@/stores/board.ts"
import { useModalStore } from '@/stores/modal'
import { onMounted } from "vue"
import CreateBoardModal from "@/components/modals/board/CreateBoardModal.vue"

const boardStore = useBoardStore();
const modalStore = useModalStore();

onMounted(() => {
  boardStore.getBoards();
})

</script>

<template>
  <div class="flex-1 flex flex-col p-4 overflow-hidden">
    <div class="mb-2 px-4">
      <fwb-button @click="modalStore.openModal('create-board')" color="dark" class="cursor-pointer">Create
        Board</fwb-button>
      <CreateBoardModal />
    </div>

    <div v-if="boardStore.processing.getBoards" class="flex-1 flex items-center justify-center">
      <fwb-spinner size="12" />
    </div>
    <div v-else class="flex-1 overflow-scroll p-4">
      <div v-if="boardStore.boards?.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-2">
        <fwb-card v-for="(board) in boardStore.boards" :key="board.id"
          class="h-24 overflow-scroll shadow-2xs shadow-slate-500">
          <RouterLink :to="{ name: 'boardView', params: { boardId: board.id } }">
            <div class="p-5 ">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
                {{ board.title }}
              </h5>
            </div>
          </RouterLink>
        </fwb-card>
      </div>
      <div v-else class="flex-1 flex items-center justify-center">
        <h1 class="text-3xl italic">No board found.</h1>
      </div>
    </div>
  </div>


</template>