'use client';

import { useReveal } from '../hooks/useReveal';

interface ServiceCardProps {
	title: string;
	blurb: string;
	spec: string;
	index?: number;
}

export function ServiceCard({ title, blurb, spec, index }: ServiceCardProps) {
	const { ref, revealed } = useReveal<HTMLDivElement>();

	return (
		<article
			ref={ref}
			className="group flex flex-col bg-white p-5 transition-colors hover:bg-ink"
		>
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
			<div className="mt-6 flex items-center gap-3 border-t border-line pt-3 transition-colors group-hover:border-paper/20">
				<span className="ui-label text-slate transition-colors group-hover:text-paper/60">
					{spec}
				</span>
			</div>
		</article>
	);
}
