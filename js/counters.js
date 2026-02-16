document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".about__stat-value");

  if (!("IntersectionObserver" in window)) {
    counters.forEach(counter => {
      counter.textContent = counter.dataset.count;
    });
    return;
  }

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;

    const duration = 1200; // длительность анимации
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      current = Math.floor(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target; // финальное значение
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.6
    }
  );

  counters.forEach(counter => observer.observe(counter));
});
