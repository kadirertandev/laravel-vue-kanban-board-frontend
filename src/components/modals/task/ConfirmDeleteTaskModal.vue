<script setup lang="ts">
import SubmitButton from '@/components/SubmitButton.vue';
import Modal from '../../Modal.vue';
import { useModalStore } from "@/stores/modal.ts"
import type { Column, Task } from '@/types';
import { FwbButton } from 'flowbite-vue'
import { useTaskStore } from '@/stores/task';

const props = defineProps<{
  task: Task,
  column: Column
}>()

const taskStore = useTaskStore();
const modalStore = useModalStore();

const onDeleteConfirm = () => {
  taskStore.deleteTask(
    props.column.id!,
    props.task.id,
    () => modalStore.closeModal('delete-task-' + props.task.id)
  )
}
</script>
<template>
  <Modal :title="`Delete Task - \'${props.task.description}\'`" :name="'delete-task-' + props.task.id">
    <div class="space-y-4 flex flex-col items-center">
      <h1 class="text-lg text-black font-light">Are you sure you want to delete this task?</h1>
      <div class="flex items-center justify-end gap-2 *:cursor-pointer">
        <fwb-button @click="modalStore.closeModal('delete-task-' + props.task.id)" color="dark">No</fwb-button>
        <SubmitButton @click="onDeleteConfirm" classes="!bg-red-500 hover:!bg-red-600"
          :condition="taskStore.processing.delete">Yes
        </SubmitButton>
      </div>
    </div>
  </Modal>
</template>