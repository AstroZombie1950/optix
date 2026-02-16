document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.querySelector(".switcher");
  const prices = document.querySelectorAll(".tariff-card__price");
  const note = document.querySelector(".tariffs__note");

  let isWholesale = false;

  if (!switcher) return;

  switcher.addEventListener("click", () => {
    isWholesale = !isWholesale;

    // визуальное состояние
    switcher.classList.toggle("switcher--active", isWholesale);

    // меняем цены
    prices.forEach(price => {
      const valueEl = price.querySelector(".price__value");
      const newValue = isWholesale
        ? price.dataset.wholesale
        : price.dataset.retail;

      if (newValue && valueEl) {
        valueEl.textContent = newValue;
      }
    });

    // подпись под переключателем

    if (note) {
      note.classList.toggle("is-visible", isWholesale);
    }

  });
});
