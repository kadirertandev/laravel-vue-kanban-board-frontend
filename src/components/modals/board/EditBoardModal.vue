<script setup lang="ts">
import Modal from '../../Modal.vue';
import { reactive } from "vue"
import FormInput from "@/components/FormInput.vue"
import SubmitButton from "@/components/SubmitButton.vue"
import { useBoardStore } from "@/stores/board.ts"
import { useModalStore } from "@/stores/modal.ts"
import { useAbortController } from "@/composables/useAbortController"
import type { Board, BoardForm, CustomError } from '@/types';
import type { AxiosError } from 'axios';

const props = defineProps<{
  board: Board
}>()

const boardStore = useBoardStore();
const modalStore = useModalStore();

const initialUpdateBoardForm = () => ({
  title: props.board.title,
  description: props.board.description
});
const updateBoardForm = reactive<BoardForm>(initialUpdateBoardForm());

const initialError = () => ({
  status: null,
  original: {} as AxiosError,
  validation: {},
  message: null,
});
const error = reactive<CustomError>(initialError());

const controller = useAbortController();

const handleFormSubmit = async () => {
  await boardStore.updateBoard(props.board.id, updateBoardForm, error, controller,
    () => modalStore.closeModal('edit-board'))
}

const onModalClose = () => {
  Object.assign(updateBoardForm, initialUpdateBoardForm())
  Object.assign(error, initialError())
}
</script>
<template>
  <Modal :title="`Edit Board - \'${props.board.title}\'`" name="edit-board" :onModalClose="onModalClose">
    <form @submit.prevent="handleFormSubmit" class="space-y-4" novalidate>
      <div>
        <FormInput labelclass="text-black" type="text" v-model="updateBoardForm.title" label="Board Title"
          placeholder="board title" :error="error?.validation?.title" />
      </div>
      <div>
        <FormInput labelclass="text-black" type="text" v-model="updateBoardForm.description" label="Board Description"
          placeholder="board description" :error="error?.validation?.description" />
      </div>

      <SubmitButton :condition="boardStore.processing.update">Update</SubmitButton>
    </form>
  </Modal>
</template>