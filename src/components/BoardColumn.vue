  <script setup lang="ts">
  import type { Column } from '@/types';
  import {
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    TrashIcon,
    Bars2Icon
  } from '@heroicons/vue/24/solid';

  import {
    FwbButton,
    FwbDropdown
  } from 'flowbite-vue'
  import EditColumnModal from './modals/column/EditColumnModal.vue';
  import { useModalStore } from '@/stores/modal';
  import ConfirmDeleteColumnModal from './modals/column/ConfirmDeleteColumnModal.vue';
  import ColumnTask from '@/components/ColumnTask.vue';
  import ColumnAddTask from '@/components/ColumnAddTask.vue';
  import { ref, useTemplateRef, watch } from "vue"
  import { useVerticalScroll } from '@/composables/useVerticalScroll';
  import Draggable from 'vuedraggable'
  import { useTaskStore } from '@/stores/task';

  const props = defineProps<{
    column: Column
  }>()

  const taskStore = useTaskStore();
  const modalStore = useModalStore();
  const columnTaskContainer = useTemplateRef("columnTaskContainer")
  const { scrollTop, scrollBottom } = useVerticalScroll(columnTaskContainer);

  const tasks = ref(props.column.tasks)

  watch(
    () => props.column.tasks,
    (newTasks) => {
      tasks.value = newTasks
    },
    { deep: true, immediate: true }
  )

  const onChange = (event) => {
    let item = event.added || event.moved;
    if (!item) return;

    let index = item.newIndex;
    let prevTask = tasks.value![index - 1];
    let nextTask = tasks.value![index + 1];
    let task = tasks.value![index];
    let position = task.position;

    if (prevTask && nextTask) {
      position = (prevTask.position + nextTask.position) / 2;
    } else if (prevTask) {
      position = prevTask.position + 60000;
    } else if (nextTask) {
      position = nextTask.position / 2;
    }

    taskStore.moveTask(
      props.column!.relations!.board_id!,
      props.column.id,
      task,
      tasks.value![item.newIndex].relations.column_id,
      props.column,
      position
    );
  }
</script>
  <template>
    <div class="bg-slate-200 rounded-lg w-96 min-w-96 flex flex-col h-full max-h-full">
      <div class="flex items-center justify-between px-4 my-1">
        <div>
          <h1 class="text-2xl">{{ column.title }}</h1>
          <p class="text-xs min-h-8 overflow-hidden line-clamp-2 hover:line-clamp-none hover:h-min">
            {{ column.description }}
          </p>
        </div>
        <div class="self-start flex flex-col items-center">
          <fwb-dropdown placement="bottom" close-inside>
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
          <Bars2Icon class="w-6 h-6 cursor-pointer column-drag-handle" />
        </div>
        <Teleport to="#modals">
          <EditColumnModal v-if="column" :column="column" />
          <ConfirmDeleteColumnModal v-if="column" :column="column" />
        </Teleport>
      </div>

      <div ref="columnTaskContainer" class="flex-1 flex flex-col gap-2 px-4 my-1 overflow-scroll *:rounded-lg">
        <Draggable :disabled="taskStore.processing.move" draggable=".task-item" handle=".task-drag-handle"
          v-model="tasks" @change="onChange" group="tasks" item-key="id" class="h-full flex flex-col gap-2"
          ghost-class="ghost-task">
          <template #item="{ element }">
            <div class="task-item bg-white p-2 rounded shadow">
              <ColumnTask :task="element" :column="column">
              </ColumnTask>
            </div>
          </template>
        </Draggable>
      </div>

      <ColumnAddTask :column="column" @scroll-bottom="scrollBottom" />
    </div>
  </template>
<style scoped>
.ghost {
  background-color: #bcc4dad5;
}

.ghost>* {
  visibility: hidden;
}

.ghost-task {
  background-color: #cacaca93;
}

.ghost-task>* {
  visibility: hidden;
}
</style>