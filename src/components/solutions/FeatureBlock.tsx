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
							<p className="mb-4 flex items-center gap-3">
								<span className="section-tag text-blue-dark">{eyebrow}</span>
							</p>
							<h2
								id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
								className="font-display text-3xl lg:text-4xl font-bold uppercase tracking-tight text-ink mb-6"
							>
								{title}
							</h2>

							{description && (
								<p className="text-lg text-slate leading-relaxed mb-8 max-w-xl">
									{description}
								</p>
							)}

							{points && points.length > 0 && (
								<ul className="space-y-3 mb-8 border-t border-line pt-6" role="list">
									{points.map((point, i) => (
										<li
											key={i}
											className="flex items-start gap-4 pl-0 group"
										>
											<span
												aria-hidden
												className="dim-value mt-1 text-blue-dark"
											>
												{String(i + 1).padStart(2, '0')}
											</span>
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
								<div className="corner-plate aspect-video overflow-hidden border border-line bg-line/20 relative">
									<img
										src={image}
										alt={imageAlt || title}
										className="w-full h-full object-cover"
										loading="lazy"
									/>
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
			<div className="corner-plate drawing-plate p-6 lg:p-8">
				{eyebrow && (
					<p className="mb-4 flex items-center gap-3">
						<span className="section-tag text-blue-dark">{eyebrow}</span>
					</p>
				)}
				<h3 className="font-display text-2xl lg:text-3xl font-bold uppercase tracking-tight text-ink mb-4">
					{title}
				</h3>

				{description && (
					<p className="text-slate leading-relaxed mb-6 max-w-2xl">{description}</p>
				)}

				{points && points.length > 0 && (
					<ul className="space-y-3 border-t border-line pt-5" role="list">
						{points.map((point, i) => (
							<li
								key={i}
								className="flex items-start gap-4 text-slate leading-relaxed"
							>
								<span
									aria-hidden
									className="dim-value mt-0.5 text-blue-dark"
								>
									{String(i + 1).padStart(2, '0')}
								</span>
								<span className="flex-1">{point}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</ScrollReveal>
	);
}
