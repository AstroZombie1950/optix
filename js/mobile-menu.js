document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".mobile-menu");
  const nav = document.querySelector(".mobile-menu__nav");

  if (!burger || !menu) return;

  function openMenu() {
    burger.classList.add("is-active");
    menu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    burger.classList.remove("is-active");
    menu.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  /* toggle по клику на бургер */
  burger.addEventListener("click", e => {
    e.stopPropagation();
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  /* закрытие по клику на ссылку */
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* закрытие по клику вне nav */
  menu.addEventListener("click", e => {
    if (!nav.contains(e.target)) {
      closeMenu();
    }
  });

  /* закрытие по Esc */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });
});