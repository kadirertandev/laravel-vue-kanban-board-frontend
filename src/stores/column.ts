import axiosInstance from "@/lib/axios";
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { ColumnProcessing, ColumnForm, CustomError } from "@/types";
import { useToast } from "vue-toast-notification";
import { useBoardStore } from "./board";

export const useColumnStore = defineStore("column", () => {
  const processing = reactive<ColumnProcessing>({
    create: false,
    update: false,
    delete: false,
  });

  const $toast = useToast();
  const boardStore = useBoardStore();

  const getColumns = async (boardId: number) => {
    const response = await axiosInstance.get(`/boards/${boardId}/columns`, {
      params: {
        withColumnTasks: true,
        withColumnBoard: true,
      },
    });

    return response.data.data;
  };

  const getColumn = async (boardId: number, columnId: number) => {
    const response = await axiosInstance.get(
      `/boards/${boardId}/columns/${columnId}`,
      {
        params: {
          withColumnTasks: true,
          withColumnBoard: true,
        },
      }
    );

    return response.data.data;
  };

  const createColumn = async (
    boardId: number,
    payload: ColumnForm,
    error: CustomError,
    controller: AbortController,
    callback?: Function
  ) => {
    processing.create = true;

    try {
      await axiosInstance.post(`/boards/${boardId}/columns`, payload, {
        signal: controller.signal,
      });

      if (callback) callback();

      boardStore.board!.columns! = await getColumns(boardId);

      $toast.success("Column created", {
        position: "top-right",
      });
    } catch (err) {
      Object.assign(error, err);
    } finally {
      processing.create = false;
    }
  };

  const updateColumn = async (
    boardId: number,
    id: number,
    payload: ColumnForm,
    error: CustomError,
    controller: AbortController,
    callback?: Function
  ) => {
    processing.update = true;

    try {
      await axiosInstance.put(`/boards/${boardId}/columns/${id}`, payload, {
        signal: controller.signal,
      });

      boardStore.board!.columns![id].title = payload.title;
      boardStore.board!.columns![id].description = payload.description;

      if (callback) callback(payload);

      $toast.success("Column updated", {
        position: "top-right",
      });
    } catch (err) {
      Object.assign(error, err);
    } finally {
      processing.update = false;
    }
  };

  const deleteColumn = async (
    boardId: number,
    id: number,
    callback?: Function
  ) => {
    processing.delete = true;

    try {
      await axiosInstance.delete(`/boards/${boardId}/columns/${id}`);

      if (callback) callback();

      delete boardStore.board!.columns![id];

      $toast.success("Column deleted", {
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    } finally {
      processing.delete = false;
    }
  };

  return {
    processing,
    createColumn,
    updateColumn,
    deleteColumn,
  };
});
