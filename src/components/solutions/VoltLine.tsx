'use client';

interface VoltLineProps {
	variant?: 'hero' | 'divider' | 'frame' | 'custom';
	className?: string;
	dashArray?: number;
	dashOffset?: number;
	animate?: boolean;
	glow?: boolean;
}

const VARIANTS = {
	hero: {
		path: 'M 0 50 Q 150 50 250 80 T 500 60 T 750 90 T 1000 50',
		width: 1000,
		height: 100,
	},
	divider: {
		path: 'M 0 0 Q 200 30 400 0 T 800 30 T 1200 0',
		width: 1200,
		height: 60,
	},
	frame: {
		path: 'M 10 10 H 390 V 240 H 10 Z',
		width: 400,
		height: 250,
	},
	custom: {
		path: '',
		width: 400,
		height: 100,
	},
};

export function VoltLine({
	variant = 'divider',
	className = '',
	dashArray = 1000,
	dashOffset = 1000,
	animate = true,
	glow = false,
}: VoltLineProps) {
	const { path, width, height } = VARIANTS[variant];

	return (
		<svg
			className={`w-full h-auto max-w-[${width}px] ${className}`}
			viewBox={`0 0 ${width} ${height}`}
			preserveAspectRatio="none"
			aria-hidden="true"
			style={{ overflow: 'visible' }}
		>
			<path
				d={path}
				className={`volt-line ${glow ? 'volt-line--glow' : ''} ${!animate ? 'volt-line--static' : ''}`}
				strokeDasharray={dashArray}
				strokeDashoffset={dashOffset}
				style={{ transformOrigin: 'center' }}
			/>
		</svg>
	);
}
