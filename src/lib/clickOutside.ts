export function clickOutside(element: HTMLElement) {
  const handler = (event: MouseEvent) => {
    if (!element.contains(event.target as Node)) {
      element.dispatchEvent(new CustomEvent("click_outside"));
    }
  };
  document.addEventListener("click", handler);
  return {
    destroy() {
      document.removeEventListener("click", handler);
    },
  };
}
