import axiosInstance from "@/lib/axios";
import { defineStore } from "pinia";
import { reactive } from "vue";
import type {
  TaskProcessing,
  TaskForm,
  CustomError,
  Task,
  Column,
} from "@/types";
import { useToast } from "vue-toast-notification";
import { useColumnStore } from "./column";

export const useTaskStore = defineStore("task", () => {
  const processing = reactive<TaskProcessing>({
    create: false,
    update: false,
    delete: false,
    move: false,
  });

  const $toast = useToast();
  const columnStore = useColumnStore();

  const getTasks = async (boardId: number, columnId: number) => {
    const response = await axiosInstance.get(
      `/boards/${boardId}/columns/${columnId}/tasks`,
      {
        params: {
          withTaskColumn: true,
        },
      }
    );

    return response.data.data;
  };

  const getTask = async (boardId: number, columnId: number, id: number) => {
    const response = await axiosInstance.get(
      `/boards/${boardId}/columns/${columnId}/tasks/${id}`
    );

    return response.data.data;
  };

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

      let tasks = await getTasks(boardId, columnId);

      let column = columnStore.columns?.find(
        (column) => column.id === columnId
      );
      column!.tasks = tasks;

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

      columnStore
        .columns!.find((col) => col.id === columnId)!
        .tasks!.find((task) => task.id === id)!.description =
        payload.description;

      if (callback) callback(payload);

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

      let column = columnStore.columns?.find(
        (column) => column.id === columnId
      );
      column!.tasks = column!.tasks!.filter((task) => task.id !== id);

      $toast.success("Task deleted", {
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
    } finally {
      processing.delete = false;
    }
  };

  const moveTask = async (
    boardId: number,
    columnId: number,
    task: Task,
    fromColumn: number | null,
    toColumn: Column,
    position: number,
    callback?: Function
  ) => {
    if (processing.move) return;
    processing.move = true;
    try {
      await axiosInstance.put(
        `/boards/${boardId}/columns/${columnId}/tasks/${task.id}/move`,
        {
          fromColumn: fromColumn,
          toColumn: toColumn.id,
          position,
        }
      );

      //remove task from column with id fromColumn
      let fromColumnTWW = columnStore.columns.find(
        (column) => column.id === fromColumn
      );
      fromColumnTWW!.tasks = fromColumnTWW!.tasks?.filter(
        (t) => t.id !== task.id
      );

      //add task to column with id toColumn.id and reorder in ascending order by position
      let toColumnTWW = columnStore.columns.find(
        (column) => column.id === toColumn.id
      );
      toColumnTWW!.tasks?.push({
        ...task,
        position,
        relations: { column_id: toColumn.id },
      });
      toColumnTWW!.tasks?.sort((a, b) => a.position - b.position);

      if (callback) callback();

      $toast.success("Task moved", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    } finally {
      processing.move = false;
    }
  };

  return {
    processing,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasks,
  };
});
