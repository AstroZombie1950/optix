document.addEventListener("DOMContentLoaded", () => {
	const track = document.querySelector(".stock-slider__track");
	const prevBtn = document.querySelector(".stock-slider__arrow--prev");
	const nextBtn = document.querySelector(".stock-slider__arrow--next");

	if (!track) return;

	const originalCards = Array.from(track.children);
	const originalCount = originalCards.length;

	let step = 0;
	let originalWidth = 0;

	/* ==============================
	   клоны ДО и ПОСЛЕ
	================================ */

	const clonesBefore = originalCards.map(card => card.cloneNode(true));
	const clonesAfter = originalCards.map(card => card.cloneNode(true));

	clonesBefore.forEach(clone => track.insertBefore(clone, track.firstChild));
	clonesAfter.forEach(clone => track.appendChild(clone));

	/* ==============================
	   расчёт размеров
	================================ */

	function calculateSizes() {
		const firstCard = track.children[0];
		const gap = parseInt(getComputedStyle(track).gap) || 0;
		const cardWidth = firstCard.offsetWidth;

		step = cardWidth + gap;
		originalWidth = step * originalCount;
	}

	calculateSizes();

	window.addEventListener("resize", () => {
		calculateSizes();
		track.scrollLeft = originalWidth;
	});

	/* ==============================
	   старт в центре
	================================ */

	track.scrollLeft = originalWidth;

	/* ==============================
	   стрелки
	================================ */

	if (nextBtn) {
		nextBtn.addEventListener("click", () => {
			track.scrollBy({ left: step, behavior: "smooth" });
		});
	}

	if (prevBtn) {
		prevBtn.addEventListener("click", () => {
			track.scrollBy({ left: -step, behavior: "smooth" });
		});
	}

	/* ==============================
	   бесконечность
	================================ */

	track.addEventListener("scroll", () => {
		const current = track.scrollLeft;

		const centralStart = originalWidth;
		const centralEnd = originalWidth * 2;

		// ушли слишком вправо
		if (current >= centralEnd) {
			track.style.scrollBehavior = "auto";
			track.scrollLeft = current - originalWidth;
			track.style.scrollBehavior = "smooth";
		}

		// ушли слишком влево
		if (current <= centralStart - step) {
			track.style.scrollBehavior = "auto";
			track.scrollLeft = current + originalWidth;
			track.style.scrollBehavior = "smooth";
		}
	});
});