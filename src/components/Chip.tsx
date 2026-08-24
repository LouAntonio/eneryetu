'use client';

import type { ReactNode } from 'react';

interface ChipProps {
	children: ReactNode;
}

export function Chip({ children }: ChipProps) {
	return (
		<span className="inline-flex items-center gap-2 border border-line bg-white px-4 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink">
			{children}
		</span>
	);
}
