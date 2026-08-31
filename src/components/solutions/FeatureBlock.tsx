'use client';

import { ScrollReveal, StaggeredReveal } from './ScrollReveal';
import { VoltLine } from './VoltLine';

interface FeatureBlockProps {
	eyebrow: string;
	title: string;
	description?: string;
	points?: string[];
	image?: string;
	imageAlt?: string;
	reverse?: boolean;
	delay?: number;
	className?: string;
	children?: React.ReactNode;
}

export function FeatureBlock({
	eyebrow,
	title,
	description,
	points,
	image,
	imageAlt,
	reverse = false,
	delay = 0,
	className = '',
	children,
}: FeatureBlockProps) {
	return (
		<ScrollReveal animation="up" delay={delay} className={className}>
			<section
				className="relative py-16 lg:py-24"
				aria-labelledby={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
			>
				{/* Volt Line divider above */}
				<div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 w-[80%] max-w-6xl">
					<VoltLine variant="divider" className="opacity-30" />
				</div>

				<div className="mx-auto max-w-6xl px-6">
					<div
						className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? 'lg:row-reverse' : ''}`}
					>
						{/* Content Column */}
						<div className="relative z-10">
							<p className="ui-label text-blue-dark mb-3">{eyebrow}</p>
							<h2
								id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
								className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight text-ink mb-6"
							>
								{title}
							</h2>

							{description && (
								<p className="text-lg text-slate leading-relaxed mb-8 max-w-xl">
									{description}
								</p>
							)}

							{points && points.length > 0 && (
								<ul className="space-y-4 mb-8" role="list">
									{points.map((point, i) => (
										<li
											key={i}
											className="flex items-start gap-4 group relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-volt before:opacity-0 group-hover:before:opacity-100 transition-opacity"
										>
											<span className="text-slate leading-relaxed">
												{point}
											</span>
										</li>
									))}
								</ul>
							)}

							{children}
						</div>

						{/* Image Column */}
						{image && (
							<div className="relative">
								<div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-line/30 relative">
									<img
										src={image}
										alt={imageAlt || title}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
									/>
									{/* Volt accent corner */}
									<div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-volt rounded-tr-2xl border-t-transparent border-r-transparent opacity-50" />
								</div>
								{/* Floating stat/badge */}
								<div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white/95 backdrop-blur-sm border border-line/30 rounded-2xl p-4 shadow-lg animate-float">
									<p className="ui-label text-volt">ENERYETU Solutions</p>
									<p className="font-display text-lg font-bold uppercase tracking-tight text-ink">
										Verified Capability
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</ScrollReveal>
	);
}

/* Compact variant for tighter sections */
export function FeatureBlockCompact({
	eyebrow,
	title,
	description,
	points,
	delay = 0,
	className = '',
}: Omit<FeatureBlockProps, 'image' | 'imageAlt' | 'reverse' | 'children'>) {
	return (
		<ScrollReveal animation="up" delay={delay} className={className}>
			<div className="surface-elevated p-6 lg:p-8">
				<p className="ui-label text-blue-dark mb-3">{eyebrow}</p>
				<h3 className="font-display text-2xl lg:text-3xl font-black uppercase tracking-tight text-ink mb-4">
					{title}
				</h3>

				{description && (
					<p className="text-slate leading-relaxed mb-6 max-w-2xl">{description}</p>
				)}

				{points && points.length > 0 && (
					<ul className="space-y-3" role="list">
						{points.map((point, i) => (
							<li
								key={i}
								className="flex items-start gap-3 text-slate leading-relaxed"
							>
								<span className="rev-chip text-volt shrink-0 mt-1">{i + 1}</span>
								{point}
							</li>
						))}
					</ul>
				)}
			</div>
		</ScrollReveal>
	);
}
