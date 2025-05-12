import type { Ref } from "vue";

export function useVerticalScroll(elementRef: Ref<HTMLElement | null>) {
  const scrollTop = () => {
    elementRef.value?.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollBottom = () => {
    const el = elementRef.value;
    if (el) {
      el.scroll({
        top: el.scrollHeight - el.clientHeight,
        behavior: "smooth",
      });
    }
  };

  return {
    scrollTop,
    scrollBottom,
  };
}
