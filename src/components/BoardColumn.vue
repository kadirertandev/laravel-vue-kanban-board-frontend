  <script setup lang="ts">
  import type { Column } from '@/types';
  import {
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    TrashIcon
  } from '@heroicons/vue/24/solid';
  import {
    FwbButton,
    FwbDropdown,
  } from 'flowbite-vue'
  import EditColumnModal from './modals/column/EditColumnModal.vue';
  import { useModalStore } from '@/stores/modal';
  import ConfirmDeleteColumnModal from './modals/column/ConfirmDeleteColumnModal.vue';
  import ColumnTask from '@/components/ColumnTask.vue';
  import ColumnAddTask from '@/components/ColumnAddTask.vue';
  import { useTemplateRef } from "vue"
  import { useVerticalScroll } from '@/composables/useVerticalScroll';

  const props = defineProps<{
    column: Column
  }>()

  const modalStore = useModalStore();
  const columnTaskContainer = useTemplateRef("columnTaskContainer")
  const { scrollTop, scrollBottom } = useVerticalScroll(columnTaskContainer);
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
          <EditColumnModal v-if="column" :column="column" />
          <ConfirmDeleteColumnModal v-if="column" :column="column" />
        </Teleport>
      </div>

      <div class="flex-1 flex flex-col gap-2 px-4 my-1 overflow-scroll *:rounded-lg" ref="columnTaskContainer">
        <ColumnTask v-for="(task) in column.tasks" :key="task.id" :task="task" :column="column" />
      </div>

      <ColumnAddTask :column="column" @scroll-bottom="scrollBottom" />
    </div>
  </template>