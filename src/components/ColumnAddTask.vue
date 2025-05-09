<script setup lang="ts">
import { useAbortController } from '@/composables/useAbortController';
import { useTaskStore } from '@/stores/task';
import type { Column, CustomError, TaskForm } from '@/types';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { onClickOutside } from '@vueuse/core';
import type { AxiosError } from 'axios';
import { reactive, ref, useTemplateRef } from 'vue';
import SubmitButton from "@/components/SubmitButton.vue"
import { FwbInput } from 'flowbite-vue'
import FormError from './FormError.vue';
import { useBoardStore } from '@/stores/board';

const props = defineProps<{
  column: Column
}>()

const isAdding = ref(false)

const formContainerRef = useTemplateRef("formContainer")
onClickOutside(formContainerRef, () => {
  reset();
})

const taskStore = useTaskStore();
const boardStore = useBoardStore();

const initialCreateTaskForm = () => ({
  description: ""
});
const createTaskForm = reactive<TaskForm>(initialCreateTaskForm());

const initialError = () => ({
  status: null,
  original: {} as AxiosError,
  validation: {},
  message: null,
});
const error = reactive<CustomError>(initialError());

const controller = useAbortController();

const handleFormSubmit = async () => {
  await taskStore.createTask(
    props.column.relations.board_id!,
    props.column.id,
    createTaskForm,
    error,
    controller,
    () => {
      reset();
      boardStore.getBoard(props.column.relations.board_id!)
    }
  )
}

const reset = () => {
  Object.assign(createTaskForm, initialCreateTaskForm())
  Object.assign(error, initialError())
  isAdding.value = false;
}

</script>
<template>
  <div>
    <button v-if="!isAdding" @click="isAdding = true"
      class="w-full flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-300 rounded-b-lg">
      <PlusIcon class="w-6 h-6" />
      <span>Add Task</span>
    </button>

    <div v-else ref="formContainer" class="w-full p-2 rounded-b-lg border-t-2 mt-2">
      <form @submit.prevent="handleFormSubmit" novalidate>
        <fwb-input class="p-1 gap-2" v-model="createTaskForm.description" placeholder="task description" size="sm">
          <template #suffix>
            <SubmitButton :condition="taskStore.processing.create">Create</SubmitButton>
          </template>
          <template #validationMessage>
            <FormError :error="error?.validation?.description" />
          </template>
        </fwb-input>
      </form>
    </div>
  </div>
</template>