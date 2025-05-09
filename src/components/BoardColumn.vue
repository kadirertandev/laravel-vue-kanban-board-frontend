  <script setup lang="ts">
  import type { Column } from '@/types';
  import {
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    PlusIcon,
    TrashIcon
  } from '@heroicons/vue/24/solid';
  import {
    FwbButton,
    FwbDropdown,
  } from 'flowbite-vue'
  import EditColumnModal from './modals/column/EditColumnModal.vue';
  import { useModalStore } from '@/stores/modal';
  import { useBoardStore } from '@/stores/board';
  import ConfirmDeleteColumnModal from './modals/column/ConfirmDeleteColumnModal.vue';

  const props = defineProps<{
    column: Column
  }>()

  const modalStore = useModalStore();
  const boardStore = useBoardStore();

  const handleColumnUpdate = () => {
    modalStore.closeModal('edit-column-' + props.column.id)
    boardStore.getBoard(props.column.relations.board_id!)
  }

  const handleColumnDelete = () => {
    modalStore.closeModal('delete-column-' + props.column.id)
    boardStore.getBoard(props.column.relations.board_id!)
  }
</script>
  <template>
    <div class="bg-slate-200 rounded-lg w-96 min-w-96 flex flex-col min-h-full">
      <div class="flex items-center justify-between px-4 my-1">
        <div>
          <h1 class="text-2xl">{{ column.title }}</h1>
          <p class="text-xs min-h-8 overflow-hidden line-clamp-2 hover:line-clamp-none hover:h-min">
            {{ column.description }}
          </p>
        </div>
        <fwb-dropdown placement="bottom" close-inside class="self-start">
          <template #trigger>
            <EllipsisHorizontalIcon class="w-7 h-7 cursor-pointer" />
          </template>
          <nav class="text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer">
            <fwb-button @click="modalStore.openModal('edit-column-' + column.id)" color="alternative"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
              <template #prefix>
                <PencilSquareIcon class="w-5 h-5" />
              </template>
              <span>Edit</span>
            </fwb-button>
            <fwb-button @click="modalStore.openModal('delete-column-' + column.id)" color="alternative"
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">
              <template #prefix>
                <TrashIcon class="w-5 h-5" />
              </template>
              <span>Delete</span>
            </fwb-button>
          </nav>
        </fwb-dropdown>
        <Teleport to="#modals">
          <EditColumnModal v-if="column" :column="column" @column-updated="handleColumnUpdate" />
          <ConfirmDeleteColumnModal v-if="column" :column="column" @column-deleted="handleColumnDelete" />
        </Teleport>
      </div>

      <div class="flex-1 flex flex-col gap-2 px-4 my-1 overflow-scroll *:rounded-lg *:p-4">
        <div v-for="(task) in column.tasks" :key="task.id" class="bg-white text-black h-20 overflow-scroll">
          <p class="text-gray-700 italic">{{ task.description }}</p>
        </div>
      </div>

      <div>
        <button class="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-300 rounded-b-lg">
          <PlusIcon class="w-6 h-6" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  </template>