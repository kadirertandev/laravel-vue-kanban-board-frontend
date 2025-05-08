<script setup lang="ts">
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/vue/24/solid';
import {
  FwbButton,
  FwbDropdown,
  FwbSpinner
} from 'flowbite-vue'
import { useTemplateRef, watchEffect } from 'vue';
import { useHorizontalScroll } from '@/composables/useHorizontalScroll';
import { useBoardStore } from '@/stores/board';
import { useRoute } from 'vue-router';
import EditBoardModal from '@/components/modals/board/EditBoardModal.vue';
import { useModalStore } from '@/stores/modal';
import ConfirmDeleteBoardModal from '@/components/modals/board/ConfirmDeleteBoardModal.vue';

const columnContainer = useTemplateRef("column-container")
const { scrollLeft, scrollRight } = useHorizontalScroll(columnContainer);

const boardStore = useBoardStore();
const modalStore = useModalStore();
const route = useRoute();

watchEffect(() => {
  boardStore.getBoard(Number(route.params.boardId));
})
</script>

<template>
  <div v-if="!boardStore.processing.getBoard" class="flex-1 flex flex-col overflow-scroll gap-4 p-4">
    <!-- Board Info Start -->
    <div class="flex items-center justify-between gap-2">
      <div class="flex-1">
        <h1 class="text-3xl font-thin">{{ boardStore.board?.title }}</h1>
        <p class="text-sm italic text-gray-800">{{ boardStore.board?.description }}</p>
      </div>


      <div class="flex items-center gap-4">
        <div class="flex items-center justify-end gap-2">
          <fwb-button @click="scrollLeft" color="alternative" class="cursor-pointer">
            <ChevronDoubleLeftIcon class="w-5 h-5" />
          </fwb-button>

          <fwb-button @click="scrollRight" color="alternative" class="cursor-pointer">
            <ChevronDoubleRightIcon class="w-5 h-5" />
          </fwb-button>
        </div>

        <fwb-dropdown placement="bottom" close-inside>
          <template #trigger>
            <fwb-button color="alternative" class="cursor-pointer">
              <template #prefix>
                <EllipsisVerticalIcon class="w-5 h-5" />
              </template>
              <span>Settings</span>
            </fwb-button>
          </template>
          <nav class="text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer">
            <fwb-button @click="modalStore.openModal('edit-board')" color="alternative"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
              <template #prefix>
                <PencilSquareIcon class="w-5 h-5" />
              </template>
              <span>Edit</span>
            </fwb-button>

            <fwb-button @click="modalStore.openModal('delete-board')" color="alternative"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
              <template #prefix>
                <TrashIcon class="w-5 h-5" />
              </template>
              <span>Delete</span>
            </fwb-button>
          </nav>
        </fwb-dropdown>
        <EditBoardModal v-if="boardStore.board" :board="boardStore.board" />
        <ConfirmDeleteBoardModal v-if="boardStore.board" :board="boardStore.board" />

      </div>
    </div>
    <!-- Board Info End -->

    <div ref="column-container" class="flex-1 overflow-scroll flex justify-start gap-4 pb-4">
      <!-- Columns Start -->
      <div v-for="(column) in boardStore.board?.columns" :key="column.id"
        class="bg-slate-200 rounded-lg w-96 min-w-96 flex flex-col min-h-full">
        <div class="flex items-center justify-between px-4 my-1">
          <h1 class="text-2xl">{{ column.title }}</h1>
          <fwb-dropdown placement="bottom">
            <template #trigger>
              <EllipsisHorizontalIcon class="w-7 h-7 cursor-pointer" />
            </template>
            <nav class="text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer">
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <PencilSquareIcon class="w-5 h-5" />
                </template>
                <span>Rename</span>
              </fwb-button>
              <fwb-button href="#" color="alternative"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
                <template #prefix>
                  <TrashIcon class="w-5 h-5" />
                </template>
                <span>Delete</span>
              </fwb-button>
            </nav>
          </fwb-dropdown>
        </div>

        <div class="flex-1 flex flex-col gap-2 px-4 my-1 overflow-scroll *:rounded-lg *:p-4">
          <div v-for="(task) in column.tasks" :key="task.id" class="bg-white text-black h-20 overflow-scroll">
            <h2 class="text-gray-700 italic">{{ task.title }}</h2>
            <p>{{ task.description }}</p>
          </div>
        </div>

        <div>
          <button class="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-300 rounded-b-lg">
            <PlusIcon class="w-6 h-6" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
      <!-- Columns End -->

      <div class="bg-slate-200 rounded-lg w-96 min-w-96 h-fit">
        <button class="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-300 rounded-lg">
          <PlusIcon class="w-6 h-6" />
          <span>Add Column</span>
        </button>
      </div>
    </div>
  </div>

  <div v-else class="flex-1 flex items-center justify-center">
    <fwb-spinner size="12" />
  </div>

</template>