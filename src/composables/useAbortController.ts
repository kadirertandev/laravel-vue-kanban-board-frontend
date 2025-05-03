import { onBeforeRouteLeave } from "vue-router";

export const useAbortController = () => {
  const controller = new AbortController();

  onBeforeRouteLeave(() => {
    controller.abort();
  });

  return controller;
};
