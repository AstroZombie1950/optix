// FAQ accordion

// анимация высоты для <details>
document.querySelectorAll('.faq-item').forEach(item => {
	item.addEventListener('toggle', () => {
	});
});

// анимации .animate для hh-страницы
document.addEventListener("DOMContentLoaded", () => {
	const blocks = document.querySelectorAll(".animate");

	if (!("IntersectionObserver" in window)) {
		blocks.forEach(el => el.classList.add("animate--visible"));
		return;
	}

	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("animate--visible");
            obs.unobserve(entry.target);
		});
	}, {
		threshold: 0.15,
		rootMargin: "0px 0px -80px 0px"
	});

	blocks.forEach(el => observer.observe(el));
});