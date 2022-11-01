function DropdownElement(el) {
  const subMenu = el.querySelector("ul");
  if (!subMenu) return;
  const subMenuId = `submenu-${el.id}` || `submenu-${Math.random()}`;
  subMenu.id = subMenuId;
  el.setAttribute("aria-controls", subMenuId);

  let open = false;
  const link = el.querySelector("a");

  const onLinkClick = (e) => e.preventDefault();
  const closeSubMenu = () => updateOpen(false);
  const openSubMenu = () => updateOpen(true);

  function onLinkTouch(e) {
    e.preventDefault();
    updateOpen(!open);
  }

  function onElMouseenter() {
    openSubMenu();
    el.classList.add("has-hover");
  }

  function onElMouseleave() {
    closeSubMenu();
    el.classList.remove("has-hover");
  }

  function updateOpen(state) {
    open = state;
    el.setAttribute("aria-expanded", open);
  }

  el.addEventListener("mouseenter", onElMouseenter);
  el.addEventListener("mouseleave", onElMouseleave);
  link.addEventListener("click", onLinkClick);
  link.addEventListener("touchend", onLinkTouch);

  el.addEventListener("focusin", () => {
    openSubMenu();
    el.classList.add("has-focus");
  });

  el.addEventListener("focusout", (e) => {
    if (el.contains(e.relatedTarget)) return;
    closeSubMenu();
    el.classList.remove("has-focus");
  });
}

function Dropdown(wrapper) {
  const elSelector = wrapper.dataset.dropdown;
  const elements = wrapper.querySelectorAll(elSelector);
  elements.forEach(DropdownElement);
}

function Dropdowns() {
  const dropdowns = document.querySelectorAll("[data-dropdown]");
  if (!dropdowns) return;
  dropdowns.forEach(Dropdown);
}

Dropdowns();
