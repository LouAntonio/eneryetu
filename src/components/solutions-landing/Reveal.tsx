'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function Reveal({
	children,
	delay = 0,
	className = '',
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			el.style.opacity = '1';
			el.style.transform = 'none';
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					el.style.opacity = '1';
					el.style.transform = 'translateY(0)';
					io.disconnect();
				}
			},
			{ threshold: 0.12 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity: 0,
				transform: 'translateY(24px)',
				transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
			}}
		>
			{children}
		</div>
	);
}
