'use client';

import { useReveal } from '../hooks/useReveal';

export type Tone = 'blue' | 'sun' | 'volt';

interface SectionHeadingProps {
	eyebrow: string;
	title: string;
	body?: string;
	tone?: Tone;
	className?: string;
}

const TRACES: Record<Tone, string> = {
	blue: 'bg-blue',
	sun: 'bg-sun-deep',
	volt: 'bg-volt',
};

export function SectionHeading({
	eyebrow,
	title,
	body,
	tone = 'blue',
	className = '',
}: SectionHeadingProps) {
	const { ref, revealed } = useReveal<HTMLDivElement>();

	return (
		<div ref={ref} className={className}>
			<div className="flex items-center gap-3">
				<span className="ui-label text-slate">{eyebrow}</span>
				<span
					aria-hidden
					className={`h-0.5 min-w-8 flex-1 transition-colors duration-700 ${
						revealed ? TRACES[tone] : 'bg-line'
					}`}
				/>
			</div>
			<h2 className="mt-5 max-w-3xl font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
				{title}
			</h2>
			{body ? (
				<p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">{body}</p>
			) : null}
		</div>
	);
}
