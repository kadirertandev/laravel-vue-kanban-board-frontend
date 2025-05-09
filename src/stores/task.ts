import axiosInstance from "@/lib/axios";
import { defineStore } from "pinia";
import { reactive } from "vue";
import type { TaskProcessing, TaskForm, CustomError } from "@/types";
import { useToast } from "vue-toast-notification";

export const useTaskStore = defineStore("task", () => {
  const processing = reactive<TaskProcessing>({
    create: false,
    update: false,
    delete: false,
  });

  const $toast = useToast();

  const createTask = async (
    boardId: number,
    columnId: number,
    payload: TaskForm,
    error: CustomError,
    controller: AbortController,
    callback?: Function
  ) => {
    processing.create = true;

    try {
      await axiosInstance.post(
        `/boards/${boardId}/columns/${columnId}/tasks`,
        payload,
        {
          signal: controller.signal,
        }
      );

      if (callback) callback();

      $toast.success("Task created", {
        position: "top-right",
      });
    } catch (err) {
      Object.assign(error, err);
    } finally {
      processing.create = false;
    }
  };

  const updateTask = async (
    boardId: number,
    columnId: number,
    id: number,
    payload: TaskForm,
    error: CustomError,
    controller: AbortController,
    callback?: Function
  ) => {
    processing.update = true;

    try {
      await axiosInstance.put(
        `/boards/${boardId}/columns/${columnId}/tasks/${id}`,
        payload,
        {
          signal: controller.signal,
        }
      );

      if (callback) callback();

      $toast.success("Task updated", {
        position: "top-right",
      });
    } catch (err) {
      Object.assign(error, err);
    } finally {
      processing.update = false;
    }
  };

  const deleteTask = async (
    boardId: number,
    columnId: number,
    id: number,
    callback?: Function
  ) => {
    processing.delete = true;

    try {
      await axiosInstance.delete(
        `/boards/${boardId}/columns/${columnId}/tasks/${id}`
      );

      if (callback) callback();

      $toast.success("Task deleted", {
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
    createTask,
    updateTask,
    deleteTask,
  };
});
