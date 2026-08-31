'use client';

import { AnimatedCounter } from './AnimatedCounter';
import { ScrollReveal } from './ScrollReveal';

interface MetricCardProps {
	title: string;
	value: number;
	unit: string;
	note: string;
	delay?: number;
	image: string;
	imageAlt?: string;
	icon?: React.ReactNode;
}

export function MetricCard({
	title,
	value,
	unit,
	note,
	delay = 0,
	image,
	imageAlt,
	icon,
}: MetricCardProps) {
	return (
		<ScrollReveal animation="up" delay={delay} className="group">
			<article className="surface-elevated overflow-hidden relative">
				{/* Background Image */}
				<div className="absolute inset-0 -z-10">
					<img
						src={image}
						alt={imageAlt || title}
						className="w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-500"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
				</div>

				<div className="relative p-6 lg:p-8">
					{/* Title */}
					<h3 className="font-display text-xl lg:text-2xl font-bold uppercase tracking-tight text-ink mb-6">
						{title}
					</h3>

					{/* Metric Display */}
					<div className="flex items-baseline gap-2 mb-4">
						<AnimatedCounter
							value={value}
							suffix={unit}
							delay={delay + 200}
							className="text-4xl lg:text-5xl font-black text-ink"
						/>
					</div>

					{/* Note */}
					<p className="text-sm text-slate leading-relaxed mb-6">{note}</p>

					{/* Accent line */}
					<div className="h-1 w-16 bg-volt group-hover:w-28 transition-all duration-300" />
				</div>
			</article>
		</ScrollReveal>
	);
}

interface MetricsGridProps {
	title: string;
	eyebrow: string;
	description?: string;
	items: MetricCardProps[];
	delay?: number;
}

export function MetricsGrid({ title, eyebrow, description, items, delay = 0 }: MetricsGridProps) {
	return (
		<ScrollReveal animation="up" delay={delay}>
			<section className="py-20 lg:py-28" aria-labelledby="metrics-grid-title">
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-14 max-w-3xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-blue-dark">
							<span className="node-live h-2 w-2 rounded-full bg-volt" />
							{eyebrow}
						</p>
						<h2
							id="metrics-grid-title"
							className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-4"
						>
							{title}
						</h2>
						{description && (
							<p className="text-lg text-slate leading-relaxed">{description}</p>
						)}
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item, index) => (
							<MetricCard key={item.title} {...item} delay={delay + index * 100} />
						))}
					</div>
				</div>
			</section>
		</ScrollReveal>
	);
}
