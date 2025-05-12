<script setup lang="ts">
import SubmitButton from '@/components/SubmitButton.vue';
import Modal from '../../Modal.vue';
import { useColumnStore } from "@/stores/column.ts"
import { useModalStore } from "@/stores/modal.ts"
import type { Column } from '@/types';
import { FwbButton } from 'flowbite-vue'

const props = defineProps<{
  column: Column
}>()

const columnStore = useColumnStore();
const modalStore = useModalStore();

const onDeleteConfirm = () => {
  columnStore.deleteColumn(
    props.column.relations.board_id!,
    props.column.id,
    () => modalStore.closeModal('delete-column-' + props.column.id)
  )
}

const onModalClose = () => {

}
</script>
<template>
  <Modal :title="`Delete Column - \'${props.column.title}\'`" :name="'delete-column-' + props.column.id"
    :onModalClose="onModalClose">
    <div class="space-y-4 flex flex-col items-center">
      <h1 class="text-lg text-black font-light">Are you sure you want to delete this column?</h1>
      <div class="flex items-center justify-end gap-2 *:cursor-pointer">
        <fwb-button @click="modalStore.closeModal('delete-column-' + props.column.id)" color="dark">No</fwb-button>
        <SubmitButton @click="onDeleteConfirm" classes="!bg-red-500 hover:!bg-red-600"
          :condition="columnStore.processing.delete">Yes
        </SubmitButton>
      </div>
    </div>
  </Modal>
</template>