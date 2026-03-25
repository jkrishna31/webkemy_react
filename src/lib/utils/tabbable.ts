export const TABBABLE_NODES = /input|select|textarea|button|object/;
export const FOCUS_SELECTOR = "a, input, select, textarea, button, object, [tabindex]";

export function hidden(element: HTMLElement) {
  if (process.env.NODE_ENV === "test") {
    return false;
  }
  return element.style.display === "none";
}

export function visible(element: HTMLElement) {
  const isHidden = element.getAttribute("aria-hidden") || element.getAttribute("hidden") || element.getAttribute("type") === "hidden";

  if (isHidden && isHidden === "true") {
    return false;
  }

  let parentElement: HTMLElement = element;
  while (parentElement) {
    if (parentElement === document.body || parentElement.nodeType === 11) {
      break;
    }
    if (hidden(parentElement)) {
      return false;
    }
    parentElement = parentElement.parentNode as HTMLElement;
  }
  return true;
}

export function getElementTabIndex(element: HTMLElement) {
  let tabIndex: string | null | undefined = element.getAttribute("tabindex");
  if (tabIndex === null) {
    tabIndex = undefined;
  }
  return parseInt(tabIndex as string, 10);
}

export function focusable(element: HTMLElement) {
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !isNaN(getElementTabIndex(element));
  const res = (TABBABLE_NODES.test(nodeName) && !element.ariaDisabled && !element.hasAttribute("disabled")) || (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}

export function tabbable(element: HTMLElement) {
  const tabIndex = getElementTabIndex(element);
  const isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element);
}

export function findTabbaleDescendents(element: HTMLElement): HTMLElement[] {
  return Array.from(element.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)).filter(tabbable);
}

export function scopeTab(node: HTMLElement, event: KeyboardEvent) {
  const tabbable = findTabbaleDescendents(node);

  if (!tabbable.length) {
    event.preventDefault();
    return;
  }

  const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  const root = node.getRootNode() as unknown as DocumentOrShadowRoot;
  let leavingFinalTabbable = finalTabbable === root.activeElement || node === root.activeElement;

  const activeElement = root.activeElement as Element;
  const activeElementIsRadio = activeElement.tagName === "INPUT" && activeElement.getAttribute("type") === "radio";

  if (activeElementIsRadio) {
    const activeRadioGroup = tabbable.filter(
      element =>
        element.getAttribute("type") === "radio" && element.getAttribute("name") === activeElement.getAttribute("name")
    );
    leavingFinalTabbable = activeRadioGroup.includes(finalTabbable);
  }

  if (!leavingFinalTabbable) {
    return;
  }

  event.preventDefault();

  const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];

  if (target) {
    target.focus();
  }
}
