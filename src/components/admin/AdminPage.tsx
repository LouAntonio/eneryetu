'use client';

import type { ReactNode } from 'react';
import { Topbar } from './Topbar';

interface AdminPageProps {
	eyebrow: string;
	title: string;
	children: ReactNode;
	actions?: ReactNode;
}

export function AdminPage({ eyebrow, title, children, actions }: AdminPageProps) {
	return (
		<div className="min-h-screen">
			<Topbar title={title} eyebrow={eyebrow} />
			<div className="px-6 py-8 lg:px-10">
				{actions ? (
					<div className="mb-8 flex flex-wrap items-center gap-3">{actions}</div>
				) : null}
				{children}
			</div>
		</div>
	);
}
