import type { Ref } from "vue";

export function useHorizontalScroll(elementRef: Ref<HTMLElement | null>) {
  const scrollLeft = () => {
    elementRef.value?.scroll({
      left: -100000,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    elementRef.value?.scroll({
      left: 100000,
      behavior: "smooth",
    });
  };

  return {
    scrollLeft,
    scrollRight,
  };
}
