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
import { useBoardStore } from '@/stores/board';

const props = defineProps<{
  task: Task,
  column: Column
}>()

const isAdding = ref(false)

const formContainerRef = useTemplateRef("formContainer")
onClickOutside(formContainerRef, () => {
  reset();
})

const taskStore = useTaskStore();
const modalStore = useModalStore();
const boardStore = useBoardStore();

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
    () => {
      reset();
      boardStore.getBoard(props.column.relations.board_id!)
    }
  )
}

const handleTaskDelete = () => {
  modalStore.closeModal('delete-task-' + props.task.id)
  boardStore.getBoard(props.column.relations.board_id!)
}

const reset = () => {
  Object.assign(updateTaskForm, initialUpdateTaskForm())
  Object.assign(error, initialError())
  isAdding.value = false;
}


</script>
<template>
  <div class="bg-white h-20 min-h-20 overflow-scroll" ref="formContainer">
    <p v-if="!isAdding" class="text-gray-700 italic flex items-start justify-between group">
      <span class="flex-1">{{ task.description }}</span>
    <div class="flex flex-col">
      <PencilIcon @click="isAdding = true" class="w-6 h-6 hidden group-hover:block cursor-pointer" />
      <TrashIcon @click="modalStore.openModal('delete-task-' + task.id)"
        class="w-6 h-6 text-red-500 hidden group-hover:block cursor-pointer" />
    </div>
    </p>
    <div v-else>
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
    <ConfirmDeleteTaskModal :task="task" :column="column" @task-deleted="handleTaskDelete" />
  </Teleport>
</template>