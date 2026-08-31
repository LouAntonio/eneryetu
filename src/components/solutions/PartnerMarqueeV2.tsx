'use client';

import { useRef, useEffect, useState } from 'react';

interface PartnerMarqueeV2Props {
	partners: Array<{ name: string; logo: string }> | string[];
	speed?: number;
	paused?: boolean;
}

export function PartnerMarqueeV2({ partners, speed = 30, paused = false }: PartnerMarqueeV2Props) {
	const trackRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState<{ x: number; scrollLeft: number } | null>(null);
	const animationRef = useRef<number>(0);

	// Normalize partners to array of objects
	const normalizedPartners = partners.map((p, i) =>
		typeof p === 'string' ? { name: p, logo: '' } : p,
	);

	// Create duplicated array for seamless loop
	const items = [...normalizedPartners, ...normalizedPartners, ...normalizedPartners];

	useEffect(() => {
		if (paused) return;

		const animate = () => {
			if (!trackRef.current || isDragging) return;

			const track = trackRef.current;
			const firstChild = track.firstElementChild as HTMLElement;
			if (!firstChild) return;

			const itemWidth = firstChild.offsetWidth + 24;
			const maxScroll = itemWidth * normalizedPartners.length;

			track.scrollLeft += speed / 60;

			if (track.scrollLeft >= maxScroll) {
				track.scrollLeft = 0;
			}

			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
		};
	}, [paused, speed, normalizedPartners.length, isDragging]);

	const handlePointerDown = (e: React.PointerEvent) => {
		if (!trackRef.current) return;
		setIsDragging(true);
		setDragStart({ x: e.clientX, scrollLeft: trackRef.current.scrollLeft });
		trackRef.current.setPointerCapture(e.pointerId);
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		if (!isDragging || !dragStart || !trackRef.current) return;
		const dx = e.clientX - dragStart.x;
		trackRef.current.scrollLeft = dragStart.scrollLeft - dx;
	};

	const handlePointerUp = () => {
		setIsDragging(false);
		setDragStart(null);
		if (trackRef.current) trackRef.current.releasePointerCapture(0);
	};

	return (
		<div className="relative overflow-hidden">
			<div
				ref={trackRef}
				className="flex gap-6 lg:gap-8"
				style={{ touchAction: 'pan-y', cursor: isDragging ? 'grabbing' : 'grab' }}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerLeave={handlePointerUp}
				onPointerCancel={handlePointerUp}
			>
				{items.map((partner, index) => (
					<div
						key={`${partner.name}-${index}`}
						className="flex-shrink-0 w-40 lg:w-48 h-20 lg:h-24"
					>
						<div className="h-full w-full flex items-center justify-center p-4 transition-all duration-300 group relative overflow-hidden border border-paper/15 bg-white/[0.03]">
							{partner.logo ? (
								<img
									src={partner.logo}
									alt={partner.name}
									className="max-h-full max-w-full object-contain opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
									loading="lazy"
									draggable={false}
								/>
							) : (
								<span className="font-display text-lg font-bold uppercase tracking-tight text-paper text-center">
									{partner.name}
								</span>
							)}
						</div>
					</div>
				))}
			</div>

			{/* Fade masks on sides */}
			<div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-deep to-transparent pointer-events-none hidden lg:block" />
			<div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-deep to-transparent pointer-events-none hidden lg:block" />
		</div>
	);
}

/* Compact partner grid for mobile */
export function PartnerGrid({
	partners,
	delay = 0,
}: {
	partners: Array<{ name: string; logo: string }>;
	delay?: number;
}) {
	return (
		<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="list">
			{partners.map((partner, index) => (
				<div
					key={partner.name}
					className="surface-elevated aspect-square flex items-center justify-center p-4 group transition-all duration-300"
					style={{ animationDelay: `${delay + index * 80}ms` }}
				>
					<img
						src={partner.logo}
						alt={partner.name}
						className="max-h-full max-w-full object-contain grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
						loading="lazy"
					/>
				</div>
			))}
		</div>
	);
}
