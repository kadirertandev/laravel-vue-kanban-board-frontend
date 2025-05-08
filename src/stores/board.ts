import axiosInstance from "@/lib/axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { Board, BoardProcessing, BoardForm, CustomError } from "@/types";
import { useToast } from "vue-toast-notification";
import router from "@/router";

export const useBoardStore = defineStore("board", () => {
  const boards = ref<Board[] | null>(null);
  const board = ref<Board | null>(null);
  const processing = reactive<BoardProcessing>({
    getBoards: false,
    getBoard: false,
    create: false,
    update: false,
    delete: false,
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

  const getBoard = async (id: number) => {
    processing.getBoard = true;

    try {
      const response = await axiosInstance.get(`/boards/${id}`, {
        params: {
          withColumns: true,
          withColumnTasks: true,
          withColumnBoard: true,
        },
      });

      board.value = response.data.data;
    } catch (err) {
      console.error(err);
    } finally {
      processing.getBoard = false;
    }
  };

  const createBoard = async (
    payload: BoardForm,
    error: CustomError,
    controller: AbortController,
    callback?: Function
  ) => {
    processing.create = true;

    try {
      await axiosInstance.post("/boards", payload, {
        signal: controller.signal,
      });

      if (callback) callback();

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

  const updateBoard = async (
    id: number,
    payload: BoardForm,
    error: CustomError,
    controller: AbortController,
    callback?: Function
  ) => {
    processing.update = true;

    try {
      await axiosInstance.put(`/boards/${id}`, payload, {
        signal: controller.signal,
      });

      if (callback) callback();

      $toast.success("Board updated", {
        position: "top-right",
      });

      await getBoard(id);
    } catch (err) {
      Object.assign(error, err);
    } finally {
      processing.update = false;
    }
  };

  const deleteBoard = async (id: number, callback?: Function) => {
    processing.delete = true;

    try {
      await axiosInstance.delete(`/boards/${id}`);

      if (callback) callback();

      await router.push({ name: "boardIndex" });

      $toast.success("Board deleted", {
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    } finally {
      processing.delete = false;
    }
  };

  return {
    boards,
    board,
    processing,
    getBoards,
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard,
  };
});
