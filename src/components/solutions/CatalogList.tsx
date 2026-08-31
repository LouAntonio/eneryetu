'use client';

import { ScrollReveal, StaggeredReveal } from './ScrollReveal';

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
			<div className="surface-elevated p-6 lg:p-8">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
					{sections.map((section, sectionIndex) => (
						<div key={section.label} className="relative">
							{/* Section Header */}
							<div className="flex items-center gap-3 mb-5 pb-4 border-b border-line">
								{section.icon && (
									<div className="h-10 w-10 rounded-lg bg-blue/15 flex items-center justify-center text-blue-deep">
										{section.icon}
									</div>
								)}
								<h3 className="ui-label text-blue-deep">{section.label}</h3>
							</div>

							{/* Items List */}
							<ul className="space-y-3" role="list">
								{section.items.map((item, itemIndex) => (
									<li
										key={item}
										className="flex items-center gap-3 text-sm text-slate leading-relaxed p-3 rounded-lg bg-white/50 hover:bg-white hover:text-ink transition-all duration-200 group relative pl-8 before:content-[''] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-volt before:scale-100 group-hover:before:translate-x-1 "
									>
										{item}
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
			<div className="surface-elevated p-6 lg:p-8">
				<h3 className="ui-label text-blue-deep mb-5">{title}</h3>
				<ul className="grid sm:grid-cols-2 gap-3" role="list">
					{items.map((item, index) => (
						<li
							key={item}
							className="flex items-center gap-3 text-sm text-slate leading-relaxed p-3 rounded-lg bg-white/50 hover:bg-white hover:text-ink transition-all duration-200 group relative pl-8 before:content-[''] before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-volt before:scale-100 group-hover:before:translate-x-1"
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		</ScrollReveal>
	);
}
