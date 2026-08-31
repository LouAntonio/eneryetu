'use client';

import { AnimatedCounter } from './AnimatedCounter';

interface MetricCell {
	label: string;
	value: number;
	unit: string;
}

/**
 * MetricTicker — the hero "telemetry readout": real facility facts shown as
 * animated counters with live status dots, reading like an operator's panel.
 */
export function MetricTicker({
	items,
	className = '',
}: {
	items: MetricCell[];
	className?: string;
}) {
	return (
		<div className={`grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 ${className}`} role="list">
			{items.map((item, i) => (
				<div
					key={item.label}
					role="listitem"
					className="glass-dark rounded-2xl px-5 py-4"
					style={{ transitionDelay: `${i * 60}ms` }}
				>
					<div className="flex items-center gap-2 mb-2">
						<span className="node-live h-2 w-2 rounded-full bg-volt" />
						<span className="ui-label text-paper/60">{item.label}</span>
					</div>
					<AnimatedCounter
						value={item.value}
						delay={300 + i * 120}
						className="text-3xl lg:text-4xl text-volt"
						suffix={item.unit}
					/>
				</div>
			))}
		</div>
	);
}
