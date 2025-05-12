<script setup lang="ts">
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
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
import BoardColumn from '@/components/BoardColumn.vue';
import BoardAddColumn from '@/components/BoardAddColumn.vue';

const columnContainer = useTemplateRef("column-container")
const { scrollLeft, scrollRight } = useHorizontalScroll(columnContainer);

const boardStore = useBoardStore();
const modalStore = useModalStore();
const route = useRoute();

watchEffect(() => {
  boardStore.getBoard(Number(route.params.boardId))
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
            <fwb-button @click="modalStore.openModal('edit-board-' + boardStore.board?.id)" color="alternative"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
              <template #prefix>
                <PencilSquareIcon class="w-5 h-5" />
              </template>
              <span>Edit</span>
            </fwb-button>

            <fwb-button @click="modalStore.openModal('delete-board-' + boardStore.board?.id)" color="alternative"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
              <template #prefix>
                <TrashIcon class="w-5 h-5" />
              </template>
              <span>Delete</span>
            </fwb-button>
          </nav>
        </fwb-dropdown>
        <Teleport to="#modals">
          <EditBoardModal v-if="boardStore.board" :board="boardStore.board" />
          <ConfirmDeleteBoardModal v-if="boardStore.board" :board="boardStore.board" />
        </Teleport>

      </div>
    </div>
    <!-- Board Info End -->

    <div ref="column-container" class="flex-1 overflow-scroll flex justify-start gap-4 pb-4">
      <!-- Columns Start -->
      <BoardColumn v-for="(column) in boardStore.board?.columns" :column="column" :key="column.id" />
      <!-- Columns End -->

      <BoardAddColumn v-if="boardStore.board" :board="boardStore.board" @scroll-right="scrollRight" />
    </div>
  </div>

  <div v-else class="flex-1 flex items-center justify-center">
    <fwb-spinner size="12" />
  </div>

</template>