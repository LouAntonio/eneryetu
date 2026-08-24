'use client';

import type { ReactNode } from 'react';

interface FormModalProps {
	title: string;
	onClose: () => void;
	children: ReactNode;
}

export function FormModal({ title, onClose, children }: FormModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
			<div className="fixed inset-0 bg-ink/70" onClick={onClose} aria-hidden />
			<div className="relative w-full max-w-lg border border-line bg-paper shadow-xl">
				<div className="flex items-center justify-between border-b border-line bg-ink px-5 py-4">
					<h2 className="font-display text-xl font-bold uppercase tracking-tight text-paper">
						{title}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-volt"
					>
						Fechar
					</button>
				</div>
				<div className="px-5 py-6">{children}</div>
			</div>
		</div>
	);
}
