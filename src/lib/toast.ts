const TOAST_EVENT = "wedding-toast";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}

export function subscribeToast(handler: (message: string) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<string>).detail);
  window.addEventListener(TOAST_EVENT, listener);
  return () => window.removeEventListener(TOAST_EVENT, listener);
}
