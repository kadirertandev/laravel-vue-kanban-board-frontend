<script setup lang="ts">
import { useAbortController } from '@/composables/useAbortController';
import { useTaskStore } from '@/stores/task';
import type { Column, CustomError, Task, TaskForm } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { onClickOutside } from '@vueuse/core';
import type { AxiosError } from 'axios';
import { reactive, ref, useTemplateRef } from 'vue';
import { FwbInput } from 'flowbite-vue'
import FormError from './FormError.vue';
import SubmitButton from './SubmitButton.vue';
import { useModalStore } from '@/stores/modal';
import ConfirmDeleteTaskModal from './modals/task/ConfirmDeleteTaskModal.vue';

const props = defineProps<{
  task: Task,
  column: Column
}>()

const isEditing = ref(false)

const formContainerRef = useTemplateRef("formContainer")
onClickOutside(formContainerRef, () => {
  reset();
})

const taskStore = useTaskStore();
const modalStore = useModalStore();

const initialUpdateTaskForm = () => ({
  description: props.task.description
});
const updateTaskForm = reactive<TaskForm>(initialUpdateTaskForm());

const initialError = () => ({
  status: null,
  original: {} as AxiosError,
  validation: {},
  message: null,
});
const error = reactive<CustomError>(initialError());

const controller = useAbortController();

const handleFormSubmit = async () => {
  await taskStore.updateTask(
    props.column.relations.board_id!,
    props.column.id!,
    props.task.id,
    updateTaskForm,
    error,
    controller,
    (task: TaskForm) => {
      reset();
      updateTaskForm.description = task.description;
    }
  )
}

const reset = () => {
  Object.assign(updateTaskForm, initialUpdateTaskForm())
  Object.assign(error, initialError())
  isEditing.value = false;
}
</script>
<template>
  <div class="bg-white h-20 min-h-20 overflow-scroll max-w-full">
    <div v-if="!isEditing" class="text-gray-700 italic flex justify-between group p-4 h-full w-full space-x-2">
      <div
        class="flex-1 max-h-20 overflow-hidden group-hover:overflow-y-auto overflow-x-hidden break-words whitespace-pre-wrap pr-2">
        {{ task.description }}
      </div>
      <div class="flex flex-col flex-shrink-0 items-end">
        <PencilIcon @click="isEditing = true" class="w-6 h-6 hidden group-hover:block cursor-pointer" />
        <TrashIcon @click="modalStore.openModal('delete-task-' + task.id)"
          class="w-6 h-6 text-red-500 hidden group-hover:block cursor-pointer" />
      </div>
    </div>

    <div v-else ref="formContainer" class="h-full p-4">
      <form @submit.prevent="handleFormSubmit" novalidate>
        <fwb-input class="gap-2" v-model="updateTaskForm.description" placeholder="task description" size="sm">
          <template #suffix>
            <SubmitButton :condition="taskStore.processing.update">Update</SubmitButton>
          </template>
          <template #validationMessage>
            <FormError :error="error?.validation?.description" />
          </template>
        </fwb-input>
      </form>
    </div>
  </div>
  <Teleport to="#modals">
    <ConfirmDeleteTaskModal :task="task" :column="column" />
  </Teleport>
</template>