'use client';

/**
 * EnergySweep — an animated volt/cyan pulse + optional scanline and drifting
 * blueprint grid. Used on dark sections (hero, form band) to give the
 * "system powered on" feel of the Live Circuit direction.
 */
export function EnergySweep({
	sweep = true,
	scanline = true,
	grid = true,
	opacity = 'opacity-60',
}: {
	sweep?: boolean;
	scanline?: boolean;
	grid?: boolean;
	opacity?: string;
}) {
	return (
		<div
			aria-hidden
			className={`pointer-events-none absolute inset-0 overflow-hidden ${opacity}`}
		>
			{grid && <div className="grid-dark grid-drift absolute inset-0" />}
			{scanline && <div className="scanline" />}
			{sweep && <div className="energy-sweep" />}
		</div>
	);
}
