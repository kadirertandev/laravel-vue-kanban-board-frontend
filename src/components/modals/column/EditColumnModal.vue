<script setup lang="ts">
import Modal from '../../Modal.vue';
import { reactive } from "vue"
import FormInput from "@/components/FormInput.vue"
import SubmitButton from "@/components/SubmitButton.vue"
import { useColumnStore } from "@/stores/column.ts"
import { useAbortController } from "@/composables/useAbortController"
import type { ColumnForm, Column, CustomError } from '@/types';
import type { AxiosError } from 'axios';

const props = defineProps<{
  column: Column
}>()

const emit = defineEmits(["columnUpdated"])

const columnStore = useColumnStore();

const initialUpdateColumnForm = () => ({
  title: props.column.title,
  description: props.column.description
});
const updateColumnForm = reactive<ColumnForm>(initialUpdateColumnForm());

const initialError = () => ({
  status: null,
  original: {} as AxiosError,
  validation: {},
  message: null,
});
const error = reactive<CustomError>(initialError());

const controller = useAbortController();

const handleFormSubmit = () => {
  columnStore.updateColumn(
    props.column.relations.board_id!,
    props.column.id,
    updateColumnForm,
    error,
    controller,
    () => emit("columnUpdated")
  )
}

const onModalClose = () => {
  Object.assign(updateColumnForm, initialUpdateColumnForm())
  Object.assign(error, initialError())
}
</script>
<template>
  <Modal :title="`Edit Column - \'${props.column.title}\'`" :name="'edit-column-' + column.id"
    :onModalClose="onModalClose">
    <form @submit.prevent="handleFormSubmit" class="space-y-4" novalidate>
      <div>
        <FormInput labelclass="text-black" type="text" v-model="updateColumnForm.title" label="Column Title"
          placeholder="board title" :error="error?.validation?.title" />
      </div>
      <div>
        <FormInput labelclass="text-black" type="text" v-model="updateColumnForm.description" label="Column Description"
          placeholder="board description" :error="error?.validation?.description" />
      </div>

      <SubmitButton :condition="columnStore.processing.update">Update</SubmitButton>
    </form>
  </Modal>
</template>