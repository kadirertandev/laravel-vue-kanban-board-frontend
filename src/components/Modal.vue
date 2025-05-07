<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue';
import { useModalStore } from '@/stores/modal'
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const props = defineProps({
  title: String,
  name: String,
  onModalClose: Function
})

const modalStore = useModalStore();

const modalContainer = useTemplateRef<HTMLElement>('modalContainer')

onClickOutside(modalContainer, event => modalStore.closeModal(props.name))

const { hasFocus, activate, deactivate } = useFocusTrap(modalContainer, { immediate: true })

modalStore.modalCloseCallbacks.set(props.name, () => {
  props.onModalClose();
  // deactivating focus after modal is closed
  deactivate();
})
modalStore.modalOpenCallbacks.set(props.name, async () => {
  //activating focus after modal is opened because it does not exist in the DOM at the time of the focus activation
  await nextTick()
  activate()
})

const showModal = computed(() => modalStore.visibleModals.has(props.name))

const zIndex = computed(() => (Array.from(modalStore.visibleModals).indexOf(props.name) + 1) * 10)

onMounted(() => {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      modalStore.closeModal(props.name)
    }
  });
});
</script>
<template>
  <div v-if="showModal" :class="`z-[${zIndex}]`" class="relative" aria-labelledby="modal-title" role="dialog"
    aria-modal="true">
    <div class="fixed inset-0 bg-gray-500/75 opacity-40 transition-opacity" aria-hidden="true"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

        <div
          class='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>

          <div ref="modalContainer" class="bg-white">
            <!-- modal header start -->
            <div class="flex items-center justify-between px-4 py-2 border-b  dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900">
                {{ props.title }}
              </h3>

              <button type="button" @click.stop="modalStore.closeModal(props.name)"
                class="text-gray-400 bg-transparent cursor-pointer hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- modal header end -->


            <!-- modal content start -->
            <div class="p-4">
              <slot>modal content</slot>
            </div>

            <!-- modal content end -->
          </div>

        </div>
      </div>
    </div>
  </div>

</template>