const MEDIA_QUERY = "(min-width: 960px)";
const IS_DESKTOP = "data-is-desktop";
const IS_TOUCH = "data-is-touch";
const MOBILE_NAV_OPEN = "data-is-open";

function Navigation() {
  // ? Elements
  // * ============================================================
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const mobileNavClose = document.querySelectorAll("[data-mobile-nav-close]");
  const mobileNavOpen = document.querySelectorAll("[data-mobile-nav-open]");
  const wrapperEl = document.querySelector("[data-nav-wrapper]");

  // ? Media Query
  // * ============================================================
  const mq = window.matchMedia(MEDIA_QUERY);

  function enableIsTouch() {
    document.documentElement.setAttribute(IS_TOUCH, true);
  }

  function closeMblNav() {
    mobileNav.setAttribute(MOBILE_NAV_OPEN, false);
  }

  function openMblNav() {
    mobileNav.setAttribute(MOBILE_NAV_OPEN, true);
  }

  function setIsDesktop(e) {
    if (e.matches) mobileNav.setAttribute(MOBILE_NAV_OPEN, false);
    document.documentElement.setAttribute(IS_DESKTOP, e.matches);
  }

  document.documentElement.setAttribute(IS_TOUCH, false);
  setIsDesktop(mq);
  document.addEventListener("touchend", enableIsTouch, { once: true });
  mq.addEventListener("change", setIsDesktop);
  mobileNavClose.forEach((el) => el.addEventListener("click", closeMblNav));
  mobileNavOpen.forEach((el) => el.addEventListener("click", openMblNav));
}

Navigation();
