document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".scroll-top");
  const footer = document.querySelector(".footer");

  if (!button || !footer) return;

  let footerVisible = false;
  let lastScrollY = window.scrollY;

  /* следим за футером */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        footerVisible = entry.isIntersecting;

        if (footerVisible) {
          button.classList.add("is-visible");
        } else {
          button.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  observer.observe(footer);

  /* следим за направлением скролла */
  window.addEventListener("scroll", () => {
    if (!footerVisible) return;

    if (window.scrollY < lastScrollY) {
      button.classList.remove("is-visible");
    } else {
      button.classList.add("is-visible");
    }

    lastScrollY = window.scrollY;
  });

  /* клик → наверх */
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});