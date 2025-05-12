<script setup lang="ts">
import SubmitButton from '@/components/SubmitButton.vue';
import Modal from '../../Modal.vue';
import { useBoardStore } from "@/stores/board.ts"
import { useModalStore } from "@/stores/modal.ts"
import type { Board } from '@/types';
import { FwbButton } from 'flowbite-vue'

const props = defineProps<{
  board: Board
}>()

const boardStore = useBoardStore();
const modalStore = useModalStore();

const onDeleteConfirm = () => {
  boardStore.deleteBoard(props.board.id, () => modalStore.closeModal("delete-board"));
}

const onModalClose = () => {

}
</script>
<template>
  <Modal :title="`Delete Board - \'${props.board.title}\'`" :name="'delete-board-' + board.id"
    :onModalClose="onModalClose">
    <div class="space-y-4 flex flex-col items-center">
      <h1 class="text-lg text-black font-light">Are you sure you want to delete this board?</h1>
      <div class="flex items-center justify-end gap-2 *:cursor-pointer">
        <fwb-button @click="modalStore.closeModal('delete-board-' + board.id)" color="dark">No</fwb-button>
        <SubmitButton @click="onDeleteConfirm" classes="!bg-red-500 hover:!bg-red-600"
          :condition="boardStore.processing.delete">Yes
        </SubmitButton>
      </div>
    </div>
  </Modal>
</template>