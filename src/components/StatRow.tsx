'use client';

interface StatRowProps {
	value: string;
	label: string;
}

export function StatRow({ value, label }: StatRowProps) {
	return (
		<div className="flex flex-col justify-between bg-white p-6">
			<div className="font-display text-6xl font-black uppercase leading-none tracking-tight text-ink tabular-nums sm:text-7xl">
				{value}
			</div>
			<div className="mt-6 border-t border-line pt-3">
				<span className="ui-label text-slate">{label}</span>
			</div>
		</div>
	);
}
