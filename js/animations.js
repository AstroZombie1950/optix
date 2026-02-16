document.addEventListener("DOMContentLoaded", () => {
  const animatedBlocks = document.querySelectorAll(".animate");

  if (!("IntersectionObserver" in window)) {
    // fallback — просто показываем всё
    animatedBlocks.forEach(el => {
      el.classList.add("animate--visible");

      if (
          el.classList.contains("about") ||
          el.classList.contains("avitolog") ||
          el.classList.contains("faq") ||
          el.classList.contains("marks")
      ) {
        el.classList.add("is-visible");
      }
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        /* базовое появление */
        el.classList.add("animate--visible");

        /* где срабатывает */
        if (
          el.classList.contains("about") ||
          el.classList.contains("avitolog") ||
          el.classList.contains("faq") ||
          el.classList.contains("marks")
        ) {
          el.classList.add("is-visible");
        }

        obs.unobserve(el);
      });
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -120px 0px"
    }
  );

  animatedBlocks.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
	const hero = document.querySelector(".hero");
	if (!hero) return;

	setTimeout(() => {
		hero.classList.add("is-loaded");
	}, 100);
});