'use client';

import type { Status } from '../../types';

const STATUS_META: Record<Status, { label: string; dot: string; tone: string }> = {
	PUBLICADO: {
		label: 'Publicado',
		dot: 'bg-volt',
		tone: 'text-ink',
	},
	RASCUNHO: {
		label: 'Rascunho',
		dot: 'bg-blue',
		tone: 'text-ink',
	},
	ARQUIVADO: {
		label: 'Arquivado',
		dot: 'bg-slate',
		tone: 'text-slate',
	},
};

export function StatusBadge({ status }: { status: Status }) {
	const meta = STATUS_META[status];
	return (
		<span
			className={`inline-flex items-center gap-2 border border-line bg-white px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] ${meta.tone}`}
		>
			<span aria-hidden className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
			{meta.label}
		</span>
	);
}
