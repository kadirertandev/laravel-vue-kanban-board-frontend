import axiosInstance from "@/lib/axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type {
  Board,
  BoardProcessing,
  CreateBoardForm,
  CustomError,
} from "@/types";
import { useToast } from "vue-toast-notification";

export const useBoardStore = defineStore("board", () => {
  const boards = ref<Board[] | null>(null);
  const processing = reactive<BoardProcessing>({
    getBoards: false,
    create: false,
  });
  const $toast = useToast();

  const getBoards = async () => {
    processing.getBoards = true;

    try {
      const response = await axiosInstance.get("/boards");

      boards.value = response.data.data;
    } catch (err) {
      console.error(err);
    } finally {
      processing.getBoards = false;
    }
  };

  const createBoard = async (
    payload: CreateBoardForm,
    error: CustomError,
    controller: AbortController,
    callback: Function
  ) => {
    processing.create = true;

    try {
      await axiosInstance.post("/boards", payload, {
        signal: controller.signal,
      });

      callback();

      $toast.success("Board created", {
        position: "top-right",
      });

      await getBoards();
    } catch (err) {
      Object.assign(error, err);
    } finally {
      processing.create = false;
    }
  };

  return {
    boards,
    processing,
    getBoards,
    createBoard,
  };
});
