'use client';

import { useReveal } from '../hooks/useReveal';

interface ServiceCardProps {
	title: string;
	blurb: string;
	image?: string;
	index?: number;
}

export function ServiceCard({ title, blurb, image, index }: ServiceCardProps) {
	const { ref, revealed } = useReveal<HTMLDivElement>();

	return (
		<article ref={ref} className="group flex flex-col bg-white transition-colors hover:bg-ink">
			{image ? (
				<div className="relative h-48 w-full overflow-hidden">
					<img
						src={image}
						alt={title}
						className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>
			) : null}
			<div className="flex flex-1 flex-col p-5">
				{index !== undefined ? (
					<span
						className={`font-mono text-[0.68rem] tracking-[0.18em] ${
							revealed ? 'text-blue' : 'text-slate group-hover:text-paper/60'
						}`}
					>
						{String(index).padStart(2, '0')}
					</span>
				) : null}
				<h3 className="mt-4 font-display text-2xl font-bold uppercase leading-none tracking-tight text-ink transition-colors group-hover:text-paper">
					{title}
				</h3>
				<p className="mt-3 flex-1 text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
					{blurb}
				</p>
			</div>
		</article>
	);
}
