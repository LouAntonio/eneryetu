'use client';

import { NavLink } from '../../lib/routing';
import { useTranslation } from 'react-i18next';

const NAV = [
	{ to: '/eneryetu', labelKey: 'admin.nav.dashboard', end: true },
	{ to: '/eneryetu/users', labelKey: 'admin.nav.users', end: false },
	{ to: '/eneryetu/posts', labelKey: 'admin.nav.posts', end: false },
	{ to: '/eneryetu/events', labelKey: 'admin.nav.events', end: false },
	{ to: '/eneryetu/categories', labelKey: 'admin.nav.categories', end: false },
	{ to: '/eneryetu/event-types', labelKey: 'admin.nav.eventTypes', end: false },
] as const;

export function Sidebar() {
	const { t } = useTranslation();

	return (
		<aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-ink-deep text-paper">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 grid-dark opacity-60"
			/>
			<div className="relative flex items-center gap-3 border-b border-paper/15 px-5 py-5">
				<img src="/logo.png" alt={t('brand')} className="h-11 w-11 object-contain" />
				<div>
					<p className="font-display text-lg font-black uppercase leading-none tracking-tight">
						{t('brand')}
					</p>
					<p className="mt-1 ui-label text-paper/50">Control room</p>
				</div>
			</div>
			<nav className="relative flex-1 space-y-1 overflow-y-auto px-3 py-6" aria-label="Admin">
				{NAV.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						end={item.end}
						className={({ isActive }) =>
							`group flex items-center gap-3 border-l-2 px-3 py-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors ${
								isActive
									? 'border-volt bg-white/5 text-volt'
									: 'border-transparent text-paper/60 hover:border-paper/30 hover:text-paper'
							}`
						}
					>
						<span
							aria-hidden
							className="h-1.5 w-1.5 rounded-full bg-current opacity-60 transition-opacity group-hover:opacity-100"
						/>
						{t(item.labelKey)}
					</NavLink>
				))}
			</nav>
			<div className="relative border-t border-paper/15 px-5 py-4">
				<NavLink
					to="/"
					className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/50 transition-colors hover:text-volt"
				>
					← {t('admin.backToSite')}
				</NavLink>
			</div>
		</aside>
	);
}
