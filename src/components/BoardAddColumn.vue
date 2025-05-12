<script setup lang="ts">
import { useAbortController } from '@/composables/useAbortController';
import { useColumnStore } from '@/stores/column';
import type { Board, ColumnForm, CustomError } from '@/types';
import {
  PlusIcon,
} from '@heroicons/vue/24/solid';
import type { AxiosError } from 'axios';
import FormInput from "@/components/FormInput.vue"
import SubmitButton from "@/components/SubmitButton.vue"
import { reactive, ref, useTemplateRef, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps<{
  board: Board
}>()
const emit = defineEmits(["scrollRight"])

const isCreating = ref(false)
watch(isCreating, (newIsCreating) => {
  if (newIsCreating) emit("scrollRight")
})

const formContainerRef = useTemplateRef("formContainer")
onClickOutside(formContainerRef, () => {
  reset();
})

const columnStore = useColumnStore();

const initialCreateColumnForm = () => ({
  title: "",
  description: ""
});
const createColumnForm = reactive<ColumnForm>(initialCreateColumnForm());

const initialError = () => ({
  status: null,
  original: {} as AxiosError,
  validation: {},
  message: null,
});
const error = reactive<CustomError>(initialError());

const controller = useAbortController();

const handleFormSubmit = async () => {
  await columnStore.createColumn(props.board.id, createColumnForm, error, controller, () => {
    reset();
    setTimeout(() => {
      emit("scrollRight");
    }, 500);
  })
}

const reset = () => {
  Object.assign(createColumnForm, initialCreateColumnForm())
  Object.assign(error, initialError())
  isCreating.value = false;
}
</script>
<template>
  <div class="bg-slate-200 rounded-lg w-96 min-w-96 h-fit">
    <button v-if="!isCreating" @click="isCreating = true"
      class="flex items-center gap-2 w-full p-4 rounded-lg cursor-pointer hover:bg-slate-300 ">
      <PlusIcon class="w-6 h-6" />
      <span>Add Column</span>
    </button>
    <div v-else class="w-full p-4 rounded-lg" ref="formContainer">
      <form @submit.prevent="handleFormSubmit" class="space-y-4" novalidate>
        <div>
          <FormInput labelclass="text-black" type="text" v-model="createColumnForm.title" label="Column Title"
            placeholder="column title" :error="error?.validation?.title" />
        </div>
        <div>
          <FormInput labelclass="text-black" type="text" v-model="createColumnForm.description"
            label="Column Description" placeholder="column description" :error="error?.validation?.description" />
        </div>

        <SubmitButton :condition="columnStore.processing.create">Create</SubmitButton>
      </form>
    </div>
  </div>
</template>