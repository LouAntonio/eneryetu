'use client';

import { ScrollReveal } from './ScrollReveal';

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
				className="relative py-20 lg:py-28"
				aria-labelledby={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
			>
				<div className="mx-auto max-w-7xl px-6">
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
											className="flex items-start gap-4 group relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-volt before:opacity-100 transition-transform group-hover:before:translate-x-1 group-hover:translate-x-1"
										>
											<span className="text-slate leading-relaxed group-hover:text-ink transition-colors">
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
							</div>
						)}
					</div>
				</div>
			</section>
		</ScrollReveal>
	);
}

interface FeatureBlockCompactProps {
	eyebrow?: string;
	title: string;
	description?: string;
	points?: string[];
	delay?: number;
	className?: string;
}

/* Compact variant for tighter sections */
export function FeatureBlockCompact({
	eyebrow,
	title,
	description,
	points,
	delay = 0,
	className = '',
}: FeatureBlockCompactProps) {
	return (
		<ScrollReveal animation="up" delay={delay} className={className}>
			<div className="surface-elevated p-6 lg:p-8">
				{eyebrow && <p className="ui-label text-blue-dark mb-3">{eyebrow}</p>}
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
								className="flex items-start gap-3 text-slate leading-relaxed before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-volt before:shrink-0 before:mt-2.5"
							>
								{point}
							</li>
						))}
					</ul>
				)}
			</div>
		</ScrollReveal>
	);
}
