'use client';

import { useCallback, useEffect, useRef } from 'react';

type Partner = { name: string; logo: string };

export function PartnerMarquee({ partners }: { partners: Partner[] }) {
	const trackRef = useRef<HTMLDivElement>(null);
	const dragging = useRef(false);
	const startX = useRef(0);
	const velocity = useRef(0);
	const lastX = useRef(0);
	const lastTime = useRef(0);
	const rafId = useRef(0);

	const onPointerDown = useCallback((e: React.PointerEvent) => {
		if (!trackRef.current) return;
		dragging.current = true;
		startX.current = e.clientX;
		velocity.current = 0;
		lastX.current = e.clientX;
		lastTime.current = Date.now();
		trackRef.current.setPointerCapture(e.pointerId);
		trackRef.current.classList.add('dragging');
	}, []);

	const onPointerMove = useCallback((e: React.PointerEvent) => {
		if (!dragging.current || !trackRef.current) return;
		const dx = e.clientX - startX.current;
		const now = Date.now();
		const dt = now - lastTime.current;
		if (dt > 0) velocity.current = (e.clientX - lastX.current) / dt;
		lastX.current = e.clientX;
		lastTime.current = now;
		trackRef.current.style.transform = `translateX(${dx}px)`;
	}, []);

	const onPointerUp = useCallback(() => {
		if (!dragging.current || !trackRef.current) return;
		dragging.current = false;
		trackRef.current.classList.remove('dragging');

		const v = velocity.current;
		const deceleration = v * 80;
		const target =
			parseFloat(
				trackRef.current.style.transform.replace('translateX(', '').replace('px)', '') ||
					'0',
			) + deceleration;

		const animate = () => {
			if (!trackRef.current) return;
			const current = parseFloat(
				trackRef.current.style.transform.replace('translateX(', '').replace('px)', '') ||
					'0',
			);
			const next = current + (target - current) * 0.15;
			if (Math.abs(target - next) < 0.5) {
				trackRef.current.style.transform = '';
				return;
			}
			trackRef.current.style.transform = `translateX(${next}px)`;
			rafId.current = requestAnimationFrame(animate);
		};
		rafId.current = requestAnimationFrame(animate);
	}, []);

	useEffect(() => {
		return () => cancelAnimationFrame(rafId.current);
	}, []);

	if (!partners.length) return null;

	const items = [...partners, ...partners, ...partners];

	return (
		<div className="overflow-hidden border-t border-line">
			<div
				className="marquee-track py-8"
				style={{ touchAction: 'pan-y', cursor: 'grab' }}
				ref={trackRef}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
			>
				{items.map((partner, i) => (
					<div
						key={`${partner.name}-${i}`}
						className="flex shrink-0 items-center justify-center px-6 sm:px-10"
					>
						<img
							src={partner.logo}
							alt={partner.name}
							className="h-[120px] w-[120px] object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:h-[200px] sm:w-[200px]"
							loading="lazy"
							draggable={false}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
