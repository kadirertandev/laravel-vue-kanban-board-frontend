import type { Ref } from "vue";

export function useHorizontalScroll(elementRef: Ref<HTMLElement | null>) {
  const scrollLeft = () => {
    elementRef.value?.scroll({
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const el = elementRef.value;
    if (el) {
      el.scroll({
        left: el.scrollWidth - el.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return {
    scrollLeft,
    scrollRight,
  };
}
