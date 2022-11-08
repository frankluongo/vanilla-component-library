const STATES = {
  INITIAL: "INITIAL",
  START: "START",
  ANIMATING: "ANIMATING",
  FINISHED: "FINISHED",
};

async function Animate(el) {
  const { animateHeight, delay, speed, start, stop } = JSON.parse(
    el.dataset.animate
  );

  if (animateHeight) {
    const height = el.getBoundingClientRect().height;
    el.style.setProperty("--height", `${height}px`);
  }

  el.setAttribute("data-animation-state", STATES.INITIAL);

  async function animate() {
    el.setAttribute("data-animation-state", STATES.ANIMATING);
    await new Promise((res) => setTimeout(res, speed));
    el.setAttribute("data-animation-state", STATES.FINISHED);
  }

  async function reset() {
    el.setAttribute("data-animation-state", STATES.FINISHED);
    await new Promise((res) => setTimeout(res, speed));
    el.setAttribute("data-animation-state", STATES.START);
  }

  el.setAttribute("data-animation-state", STATES.INITIAL);
  if (delay) await new Promise((res) => setTimeout(res, delay));
  el.setAttribute("data-animation-state", STATES.START);

  if (start) {
    document.addEventListener(start, animate);
  } else {
    animate();
  }

  if (stop) document.addEventListener(stop, reset);
}

export function FindAnimationElements() {
  const elements = document.querySelectorAll("[data-animate]");
  if (!elements.length) return;
  elements.forEach(Animate);
}
