function Trigger(el) {
  const events = JSON.parse(el.dataset.trigger);
  events.forEach(({ evt, action }) => {
    if (!window[action]) window[action] = new Event(action, { bubbles: true });

    function dispatch() {
      el.dispatchEvent(window[action]);
    }

    el.addEventListener(evt, dispatch);
  });
}

export function FindTriggerElements() {
  const elements = document.querySelectorAll("[data-trigger]");
  if (!elements.length) return;
  elements.forEach(Trigger);
}
