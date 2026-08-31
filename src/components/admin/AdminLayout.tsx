'use client';

import { Navigate, useLocation } from '../../lib/routing';
import { useAuth } from '../../hooks/useAuth';
import { Sidebar } from './Sidebar';
import { moduleForPath } from '../../lib/permissions';
import type { ReactNode } from 'react';

export function AdminLayout({ children }: { children: ReactNode }) {
	const { user, initializing } = useAuth();
	const location = useLocation();

	if (initializing) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-ink-deep text-paper">
				<div className="flex items-center gap-3">
					<span aria-hidden className="node-live h-2.5 w-2.5 rounded-full bg-volt" />
					<span className="ui-label text-paper/70">ENERYETU — control room</span>
				</div>
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/eneryetu/login" replace state={{ from: location }} />;
	}

	const pathname = location.pathname;
	if (
		pathname !== '/eneryetu' &&
		moduleForPath(pathname) === 'ACCESS' &&
		user.role !== 'SUPERADMIN'
	) {
		return <Navigate to="/eneryetu" replace />;
	}
	const mod = moduleForPath(pathname);
	if (
		mod &&
		mod !== 'ACCESS' &&
		user.role !== 'SUPERADMIN' &&
		!user.modules?.some((m) => m.module === mod)
	) {
		return <Navigate to="/eneryetu" replace />;
	}

	return (
		<div className="min-h-screen bg-paper">
			<Sidebar />
			<div className="min-h-screen lg:pl-60">{children}</div>
		</div>
	);
}
