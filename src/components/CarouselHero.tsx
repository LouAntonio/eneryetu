'use client';

import { useEffect, useState, type ReactNode } from 'react';

interface CarouselHeroProps {
	id?: string;
	images: string[];
	eyebrow: string;
	title: string;
	body?: string;
	interval?: number;
	children?: ReactNode;
}

export function CarouselHero({
	id,
	images,
	eyebrow,
	title,
	body,
	interval = 5000,
	children,
}: CarouselHeroProps) {
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		if (images.length < 2) return;
		const timer = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % images.length);
		}, interval);
		return () => clearInterval(timer);
	}, [images.length, interval]);

	return (
		<section
			id={id}
			className="relative isolate min-h-screen overflow-hidden bg-ink-deep text-paper"
		>
			<div className="absolute inset-0 -z-20">
				{images.map((src, index) => (
					<img
						key={src}
						src={src}
						alt=""
						aria-hidden
						className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
							index === currentImage ? 'opacity-100' : 'opacity-0'
						}`}
						loading={index === 0 ? 'eager' : 'lazy'}
					/>
				))}
			</div>
			<div aria-hidden className="absolute inset-0 -z-10 bg-ink/70" />
			<div aria-hidden className="absolute inset-0 -z-10 grid-dark opacity-70" />

			<div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-28 sm:pt-32 lg:pt-36">
				<span className="ui-label text-paper/70">{eyebrow}</span>
				<h1 className="mt-5 max-w-4xl text-balance font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-paper sm:text-6xl lg:text-7xl xl:text-8xl">
					{title}
				</h1>
				{body ? (
					<p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">{body}</p>
				) : null}
				{children ? <div className="mt-8">{children}</div> : null}
			</div>

			<div aria-hidden className="relative z-10 h-1 w-full bg-volt" />
		</section>
	);
}
