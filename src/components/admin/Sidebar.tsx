'use client';

import { NavLink } from '../../lib/routing';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { canManage } from '../../lib/permissions';
import type { ModuleKey } from '../../types';

type GroupLabel =
	| 'admin.sidebar.overview'
	| 'admin.sidebar.content'
	| 'admin.sidebar.media'
	| 'admin.sidebar.taxonomy'
	| 'admin.sidebar.access';

type ItemLabel =
	| 'admin.nav.dashboard'
	| 'admin.nav.posts'
	| 'admin.nav.events'
	| 'admin.nav.trainings'
	| 'admin.nav.products'
	| 'admin.nav.jobs'
	| 'admin.nav.gallery'
	| 'admin.galleryCategories.title'
	| 'admin.nav.categories'
	| 'admin.nav.eventTypes'
	| 'admin.nav.users';

interface SidebarItem {
	to: string;
	labelKey: ItemLabel;
	end?: boolean;
	module?: ModuleKey;
	superOnly?: boolean;
}

const NAV_GROUPS: { labelKey: GroupLabel; items: SidebarItem[] }[] = [
	{
		labelKey: 'admin.sidebar.overview',
		items: [{ to: '/eneryetu', labelKey: 'admin.nav.dashboard', end: true }],
	},
	{
		labelKey: 'admin.sidebar.content',
		items: [
			{ to: '/eneryetu/posts', labelKey: 'admin.nav.posts', module: 'POSTS' },
			{ to: '/eneryetu/events', labelKey: 'admin.nav.events', module: 'EVENTS' },
			{ to: '/eneryetu/trainings', labelKey: 'admin.nav.trainings', module: 'TRAININGS' },
			{ to: '/eneryetu/products', labelKey: 'admin.nav.products', module: 'PRODUCTS' },
			{ to: '/eneryetu/jobs', labelKey: 'admin.nav.jobs', module: 'JOBS' },
		],
	},
	{
		labelKey: 'admin.sidebar.media',
		items: [
			{ to: '/eneryetu/gallery', labelKey: 'admin.nav.gallery', module: 'GALLERY' },
			{
				to: '/eneryetu/gallery/categories',
				labelKey: 'admin.galleryCategories.title',
				module: 'GALLERY',
			},
		],
	},
	{
		labelKey: 'admin.sidebar.taxonomy',
		items: [
			{ to: '/eneryetu/categories', labelKey: 'admin.nav.categories', module: 'TAXONOMY' },
			{ to: '/eneryetu/event-types', labelKey: 'admin.nav.eventTypes', module: 'TAXONOMY' },
		],
	},
	{
		labelKey: 'admin.sidebar.access',
		items: [{ to: '/eneryetu/users', labelKey: 'admin.nav.users', superOnly: true }],
	},
];

export function Sidebar() {
	const { t } = useTranslation();
	const { user } = useAuth();

	const groups = NAV_GROUPS.map((group) => ({
		...group,
		items: group.items.filter((item) => {
			if (item.superOnly) return user?.role === 'SUPERADMIN';
			if (item.module) return canManage(user, item.module);
			return true;
		}),
	})).filter((group) => group.items.length > 0);

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
			<nav className="relative flex-1 space-y-5 overflow-y-auto px-3 py-6" aria-label="Admin">
				{groups.map((group) => (
					<div key={group.labelKey}>
						<p className="mb-2 px-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper/35">
							{t(group.labelKey)}
						</p>
						<div className="space-y-0.5">
							{group.items.map((item) => (
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
						</div>
					</div>
				))}
			</nav>
			<div className="relative border-t border-paper/15 px-5 py-4">
				<NavLink
					to="/"
					className="flex items-center gap-2 border border-paper/20 px-3 py-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/60 transition-colors hover:border-volt hover:text-volt"
				>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
						<path
							d="M1 6h8M5.5 2L2 6l3.5 4"
							stroke="currentColor"
							strokeWidth="1.2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					{t('admin.backToSite')}
				</NavLink>
			</div>
		</aside>
	);
}
