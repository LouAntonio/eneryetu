'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/lib/routing';

interface RailSection {
	id: string;
	label: string;
}

/**
 * CircuitRail — the vertical "busbar" fixed to the left edge. A dark full-height
 * strip carries a live trace with a traveling current, and each node lights up as
 * its section scrolls into view — like a live single-line diagram. Hidden on small
 * screens.
 */
export function CircuitRail({
	sections,
	offset = 160,
}: {
	sections: RailSection[];
	offset?: number;
}) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const nodes = sections.map((s) => document.getElementById(s.id));
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible.length === 0) return;
				const idx = sections.findIndex((s) => s.id === visible[0].target.id);
				if (idx !== -1) setActive(idx);
			},
			{ rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 },
		);
		nodes.forEach((n) => n && observer.observe(n));
		return () => observer.disconnect();
	}, [sections, offset]);

	return (
		<nav
			aria-label="Sections"
			className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:flex"
		>
			<div className="flex items-center gap-4 rounded-full border border-white/10 bg-ink-deep/95 py-4 pl-4 pr-5 shadow-2xl backdrop-blur-md">
				{/* Trace + traveling current */}
				<div className="relative h-56 w-px self-stretch overflow-visible trace-vertical">
					<span className="rail-current absolute left-1/2 top-0 h-3 w-1 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(72,202,228,0.7)]" />
				</div>

				{/* Nodes */}
				<div className="flex flex-col gap-3">
					{sections.map((s, i) => {
						const isActive = i === active;
						return (
							<Link
								key={s.id}
								to={`#${s.id}`}
								className={`group flex items-center gap-3 rounded-full transition-colors focus-ring ${
									isActive ? 'bg-white/5' : ''
								}`}
								aria-current={isActive ? 'true' : undefined}
							>
								<span
									className={`relative h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
										isActive
											? 'bg-volt node-live'
											: 'bg-blue/40 group-hover:bg-blue'
									}`}
								/>
								<span
									className={`ui-label transition-colors duration-300 ${
										isActive
											? 'text-volt'
											: 'text-paper/45 group-hover:text-paper/85'
									}`}
								>
									{s.label}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
