'use client';

import { Link } from '../../lib/routing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { Event, Paginated } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';

export function Events() {
	const { t } = useTranslation();
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ['events'],
		queryFn: async () =>
			(await api.get<Paginated<Event>>('/events', { params: { limit: 100, all: 'true' } }))
				.data,
	});

	const remove = useMutation({
		mutationFn: async (id: string) => api.delete(`/events/${id}`),
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['events'] }),
	});

	return (
		<AdminPage
			eyebrow={t('admin.events.eyebrow')}
			title={t('admin.events.title')}
			actions={
				<Link to="/eneryetu/events/new" className="btn btn-sun px-5 py-2.5">
					{t('admin.events.add')}
				</Link>
			}
		>
			<DataTable<Event>
				loading={isLoading}
				rows={data ?? []}
				rowKey={(row) => row.id}
				columns={[
					{
						key: 'title',
						label: t('admin.events.title'),
						render: (row) => (
							<div>
								<span className="font-mono text-sm font-semibold text-ink group-hover:text-paper">
									{row.title}
								</span>
								<span className="mt-0.5 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate group-hover:text-paper/60">
									{row.eventType?.name ?? '—'}
								</span>
							</div>
						),
					},
					{
						key: 'displayDate',
						label: t('admin.events.displayDate'),
						render: (row) => (
							<span className="font-mono text-xs text-slate group-hover:text-paper/70">
								{row.displayDate}
							</span>
						),
					},
					{
						key: 'countryName',
						label: t('admin.events.countryName'),
						render: (row) => (
							<span className="font-mono text-xs text-slate group-hover:text-paper/70">
								{row.countryName}
							</span>
						),
					},
					{
						key: 'status',
						label: t('admin.events.status'),
						render: (row) => <StatusBadge status={row.status} />,
					},
					{
						key: 'actions',
						label: '',
						render: (row) => (
							<div className="flex items-center gap-4">
								<Link
									to={`/eneryetu/events/${row.id}`}
									className="font-mono text-xs uppercase tracking-[0.16em] text-slate underline decoration-line underline-offset-4 transition-colors hover:text-volt group-hover:text-paper"
								>
									{t('admin.edit')}
								</Link>
								<button
									type="button"
									onClick={() => {
										if (window.confirm(t('admin.deleteConfirm')))
											remove.mutate(row.id);
									}}
									className="font-mono text-xs uppercase tracking-[0.16em] text-slate underline decoration-line underline-offset-4 transition-colors hover:text-volt group-hover:text-paper"
								>
									{t('admin.delete')}
								</button>
							</div>
						),
					},
				]}
			/>
		</AdminPage>
	);
}
