'use client';

import { AnimatedCounter, StatItem } from './AnimatedCounter';
import { VoltLine } from './VoltLine';
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
						className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
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

					{/* Volt accent line */}
					<div
						className="h-px bg-line/50 group-hover:bg-volt group-hover:scale-x-100 transition-all duration-300 origin-left w-24"
						style={{ transform: 'scaleX(0.3)' }}
					/>
				</div>

				{/* Bottom accent */}
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-volt to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
			<section className="py-16 lg:py-24" aria-labelledby="metrics-grid-title">
				<div className="mx-auto max-w-6xl px-6">
					<div className="mb-12 lg:mb-16 text-center max-w-3xl mx-auto">
						<p className="ui-label text-blue-dark mb-3">{eyebrow}</p>
						<h2
							id="metrics-grid-title"
							className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight text-ink mb-4"
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

					{/* Volt Line divider below */}
					<div className="mt-16 lg:mt-24 w-full max-w-4xl mx-auto">
						<VoltLine variant="divider" className="opacity-30" />
					</div>
				</div>
			</section>
		</ScrollReveal>
	);
}
