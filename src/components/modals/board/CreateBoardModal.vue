<script setup lang="ts">
import Modal from '../../Modal.vue';
import { reactive } from "vue"
import type { CreateBoardForm, CustomError } from "@/types"
import FormInput from "@/components/FormInput.vue"
import SubmitButton from "@/components/SubmitButton.vue"
import { useBoardStore } from "@/stores/board.ts"
import { useModalStore } from "@/stores/modal.ts"
import { useAbortController } from "@/composables/useAbortController"

const boardStore = useBoardStore();
const modalStore = useModalStore();

const initialCreateBoardForm = () => ({
  title: "",
  description: ""
});
const createBoardForm = reactive<CreateBoardForm>(initialCreateBoardForm());

const initialError = () => ({
  status: null,
  original: {} as AxiosError,
  validation: {},
  message: null,
});
const error = reactive<CustomError>(initialError());

const controller = useAbortController();

const handleFormSubmit = async () => {
  const boardCreated = await boardStore.createBoard(createBoardForm, error, controller,
    () => modalStore.closeModal('create-board'))
}

const onModalClose = () => {
  Object.assign(createBoardForm, initialCreateBoardForm())
  Object.assign(error, initialError())
}
</script>
<template>
  <Modal title="Create Board" name="create-board" :onModalClose="onModalClose">
    <form @submit.prevent="handleFormSubmit" class="space-y-4" novalidate>
      <div>
        <FormInput labelclass="text-black" type="text" v-model="createBoardForm.title" label="Board Title"
          placeholder="board title" :error="error?.validation?.title" />
      </div>
      <div>
        <FormInput labelclass="text-black" type="text" v-model="createBoardForm.description" label="Board Description"
          placeholder="board description" :error="error?.validation?.description" />
      </div>

      <SubmitButton :condition="boardStore.processing.create">Create</SubmitButton>
    </form>
  </Modal>
</template>