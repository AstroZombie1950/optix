document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const button = item.querySelector(".faq-item__question");
    const answer = item.querySelector(".faq-item__answer");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // закрываем все
      items.forEach(i => {
        if (i !== item) closeItem(i);
      });

      // переключаем текущий
      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  function openItem(item) {
    const answer = item.querySelector(".faq-item__answer");
    item.classList.add("is-open");

    // выставляем реальную высоту
    answer.style.height = answer.scrollHeight + "px";
  }

  function closeItem(item) {
    const answer = item.querySelector(".faq-item__answer");

    // сбрасываем высоту
    answer.style.height = answer.scrollHeight + "px";

    requestAnimationFrame(() => {
      answer.style.height = "0px";
      item.classList.remove("is-open");
    });
  }
});