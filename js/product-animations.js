document.addEventListener("DOMContentLoaded", () => {

	const product = document.querySelector(".product");
	const description = document.querySelector(".product-description");

	if (!product) return;

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.2
	});

	observer.observe(product);

	if (description) {
		observer.observe(description);
	}

});

// FAQ
const faqItems = document.querySelectorAll(".product-faq__item");

faqItems.forEach(item => {
	const btn = item.querySelector(".product-faq__question");
	const answer = item.querySelector(".product-faq__answer");

	btn.addEventListener("click", () => {
		const isOpen = item.classList.contains("is-open");

		faqItems.forEach(i => {
			i.classList.remove("is-open");
			i.querySelector(".product-faq__answer").style.height = 0;
		});

		if (!isOpen) {
			item.classList.add("is-open");
			answer.style.height = answer.scrollHeight + "px";
		}
	});
});

// Fade sections (advantages, faq, cta)
const fadeSections = document.querySelectorAll(
	".product-advantages, .product-faq, .product-cta, .problems, .services, .internal-links"
);

const fadeObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("is-visible");
			observer.unobserve(entry.target);
		}
	});
}, {
	threshold: 0.15
});

fadeSections.forEach(section => {
	fadeObserver.observe(section);
});

// PRODUCT STOCK FADE-IN

const stockSection = document.querySelector(".product-stock");

if (stockSection) {

	const stockObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.15
	});

	stockObserver.observe(stockSection);
}