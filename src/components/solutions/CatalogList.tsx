'use client';

import { ScrollReveal } from './ScrollReveal';

interface CatalogListProps {
	sections: Array<{
		label: string;
		items: string[];
		icon?: React.ReactNode;
	}>;
	delay?: number;
	className?: string;
}

export function CatalogList({ sections, delay = 0, className = '' }: CatalogListProps) {
	return (
		<ScrollReveal animation="up" delay={delay} className={className}>
			<div className="corner-plate drawing-plate p-6 lg:p-8">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
					{sections.map((section) => (
						<div key={section.label} className="relative">
							{/* Section Header */}
							<div className="mb-5 pb-4 border-b border-line">
								<h3 className="dim-value text-blue-dark">{section.label}</h3>
							</div>

							{/* Items List */}
							<ul className="space-y-0" role="list">
								{section.items.map((item, itemIndex) => (
									<li
										key={item}
										className="flex items-baseline gap-4 border-t border-line/70 py-2.5 first:border-t-0 text-sm text-slate leading-relaxed"
									>
										<span
											aria-hidden
											className="dim-value text-slate/50"
										>
											{String(itemIndex + 1).padStart(2, '0')}
										</span>
										<span className="flex-1">{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</ScrollReveal>
	);
}

/* Two-column catalog for simpler lists */
export function SimpleCatalog({
	title,
	items,
	delay = 0,
}: {
	title: string;
	items: string[];
	delay?: number;
}) {
	return (
		<ScrollReveal animation="up" delay={delay}>
			<div className="corner-plate drawing-plate p-6 lg:p-8">
				<h3 className="dim-value text-blue-dark mb-5">{title}</h3>
				<ul className="grid sm:grid-cols-2 gap-0" role="list">
					{items.map((item, index) => (
						<li
							key={item}
							className="flex items-baseline gap-4 text-sm text-slate leading-relaxed py-2.5 pr-3 border-t border-line/60 first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0"
						>
							<span aria-hidden className="dim-value text-slate/50">
								{String(index + 1).padStart(2, '0')}
							</span>
							<span className="flex-1">{item}</span>
						</li>
					))}
				</ul>
			</div>
		</ScrollReveal>
	);
}
