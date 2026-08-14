/**
 * Reveals an element once it scrolls into view. Degrades to instantly
 * visible when IntersectionObserver is unavailable or motion is reduced.
 *
 * @param {HTMLElement} node
 * @param {{ delay?: number }} [options]
 */
export function reveal(node, options = {}) {
	const reduced =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (typeof IntersectionObserver === 'undefined' || reduced) {
		node.classList.add('reveal', 'is-visible');
		return {};
	}

	node.classList.add('reveal');
	if (options.delay) node.style.setProperty('--reveal-delay', `${options.delay}ms`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
