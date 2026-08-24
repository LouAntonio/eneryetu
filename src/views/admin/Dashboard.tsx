'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { Event, Paginated, Post, User } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';

function useCount<T>(key: string, url: string) {
	return useQuery({
		queryKey: [key, 'count'],
		queryFn: async () => {
			const page = await api.get<Paginated<T>>(url, { params: { limit: 1 } });
			return page.pagination.total;
		},
	});
}

export function Dashboard() {
	const { t } = useTranslation();

	const users = useQuery({
		queryKey: ['users'],
		queryFn: async () => (await api.get<{ data: User[] }>('/auth/users')).data,
	});
	const posts = useCount<Post>('posts', '/posts');
	const events = useCount<Event>('events', '/events');

	const stats = [
		{
			label: t('admin.dashboard.users'),
			value: users.data?.length ?? '—',
			loading: users.isLoading,
		},
		{ label: t('admin.dashboard.posts'), value: posts.data ?? '—', loading: posts.isLoading },
		{
			label: t('admin.dashboard.events'),
			value: events.data ?? '—',
			loading: events.isLoading,
		},
	];

	return (
		<AdminPage eyebrow={t('admin.dashboard.eyebrow')} title={t('admin.dashboard.title')}>
			<div className="grid gap-px border border-line bg-line sm:grid-cols-3">
				{stats.map((stat) => (
					<div key={stat.label} className="bg-white p-6">
						<div className="flex items-center gap-3">
							{stat.loading ? (
								<span
									aria-hidden
									className="node-live h-2 w-2 rounded-full bg-blue"
								/>
							) : (
								<span aria-hidden className="h-2 w-2 rounded-full bg-volt" />
							)}
							<span className="ui-label text-slate">{stat.label}</span>
						</div>
						<div className="mt-5 font-display text-6xl font-black uppercase leading-none tracking-tight text-ink tabular-nums">
							{stat.value}
						</div>
					</div>
				))}
			</div>

			<div className="mt-10 border border-line bg-white p-6">
				<span className="ui-label text-slate">{t('admin.dashboard.note')}</span>
				<p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-ink">
					{t('admin.dashboard.noteBody')}
				</p>
			</div>
		</AdminPage>
	);
}
