import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
	const ref = useRef<T | null>(null);
	const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined');

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					setRevealed(true);
					observer.disconnect();
				}
			},
			{ threshold },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold]);

	return { ref, revealed };
}
