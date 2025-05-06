import axiosInstance from "@/lib/axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Board } from "@/types";

export const useBoardStore = defineStore("board", () => {
  const boards = ref<Board[] | null>(null);
  const loading = ref<boolean>(false);

  const getBoards = async () => {
    loading.value = true;

    try {
      const response = await axiosInstance.get("/boards");

      boards.value = response.data.data;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    boards,
    getBoards,
    loading,
  };
});
