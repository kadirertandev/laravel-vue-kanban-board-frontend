import axiosInstance from "@/lib/axios";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type {
  ColumnProcessing,
  ColumnForm,
  CustomError,
  Column,
} from "@/types";
import { useToast } from "vue-toast-notification";

export const useColumnStore = defineStore("column", () => {
  const columns = ref<Column[] | []>([]);
  const processing = reactive<ColumnProcessing>({
    create: false,
    update: false,
    delete: false,
    getColumns: false,
  });

  const $toast = useToast();

  const getColumns = async (boardId: number) => {
    processing.getColumns = true;

    const response = await axiosInstance.get(`/boards/${boardId}/columns`, {
      params: {
        withColumnTasks: true,
        withColumnBoard: true,
        withTaskColumn: true,
      },
    });

    columns.value = response.data.data;

    processing.getColumns = false;
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

      await getColumns(boardId);

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

      let column = columns.value.find((column) => column.id === id);
      column!.title = payload.title;
      column!.description = payload.description;

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

      columns.value = columns.value.filter((column) => column.id !== id);

      $toast.success("Column deleted", {
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    } finally {
      processing.delete = false;
    }
  };

  const moveColumn = async (
    boardId: number,
    id: number,
    position: number,
    callback?: Function
  ) => {
    try {
      await axiosInstance.put(`/boards/${boardId}/columns/${id}/move`, {
        position,
      });

      columns.value.find((column) => column.id === id)!.position = position;

      columns.value.sort((a, b) => a.position - b.position);

      if (callback) callback();

      $toast.success("Column moved", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    columns,
    processing,
    createColumn,
    updateColumn,
    deleteColumn,
    moveColumn,
    getColumns,
  };
});
