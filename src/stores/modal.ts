import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const visibleModals = ref<Set<string>>(new Set());
  const modalCloseCallbacks = ref<Map<string, () => void>>(new Map());
  const modalOpenCallbacks = ref<Map<string, () => void>>(new Map());

  const openModal = (name: string) => {
    visibleModals.value.add(name);
    console.log(`opened ${name}`);

    const callback = modalOpenCallbacks.value.get(name);
    if (callback) {
      callback();
    }
  };

  const closeModal = (name: string) => {
    if (visibleModals.value.has(name)) {
      visibleModals.value.delete(name);
      console.log(`closed ${name}`);

      const callback = modalCloseCallbacks.value.get(name);
      if (callback) {
        callback();
      }
    }
  };

  const removeLastAddedModal = () => {
    let lastModal = Array.from(visibleModals.value).pop() ?? "";

    visibleModals.value.delete(lastModal);
    console.log("last added modal removed");
  };

  return {
    visibleModals,
    modalCloseCallbacks,
    modalOpenCallbacks,
    openModal,
    closeModal,
    removeLastAddedModal,
  };
});
