import axiosInstance from "@/lib/axios";
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { ColumnProcessing, ColumnForm, CustomError } from "@/types";
import { useToast } from "vue-toast-notification";

export const useColumnStore = defineStore("column", () => {
  const processing = reactive<ColumnProcessing>({
    create: false,
    update: false,
    delete: false,
  });

  const $toast = useToast();

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

      if (callback) callback();

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
