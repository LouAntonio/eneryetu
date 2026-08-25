'use client';

import { Link } from '../../lib/routing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { JobListing, Paginated } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';

export function Jobs() {
	const { t } = useTranslation();
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ['jobs'],
		queryFn: async () =>
			(await api.get<Paginated<JobListing>>('/jobs', { params: { limit: 100, all: 'true' } }))
				.data,
	});

	const remove = useMutation({
		mutationFn: async (id: string) => api.delete(`/jobs/${id}`),
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['jobs'] }),
	});

	return (
		<AdminPage
			eyebrow={t('admin.jobs.eyebrow')}
			title={t('admin.jobs.title')}
			actions={
				<Link to="/eneryetu/jobs/new" className="btn btn-sun px-5 py-2.5">
					{t('admin.jobs.add')}
				</Link>
			}
		>
			<DataTable<JobListing>
				loading={isLoading}
				rows={data ?? []}
				rowKey={(row) => row.id}
				columns={[
					{
						key: 'title',
						label: t('admin.jobs.titleField'),
						render: (row) => (
							<div>
								<span className="font-mono text-sm font-semibold text-ink group-hover:text-paper">
									{row.title}
								</span>
								<span className="mt-0.5 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate group-hover:text-paper/60">
									{row.department ?? '—'}
								</span>
							</div>
						),
					},
					{
						key: 'location',
						label: t('admin.jobs.location'),
						render: (row) => (
							<span className="font-mono text-xs text-slate group-hover:text-paper/70">
								{row.location ?? '—'}
							</span>
						),
					},
					{
						key: 'jobType',
						label: t('admin.jobs.jobType'),
						render: (row) => (
							<span className="font-mono text-xs text-slate group-hover:text-paper/70">
								{row.jobType}
							</span>
						),
					},
					{
						key: 'status',
						label: t('admin.jobs.status'),
						render: (row) => <StatusBadge status={row.status} />,
					},
					{
						key: 'actions',
						label: '',
						render: (row) => (
							<div className="flex items-center gap-4">
								<Link
									to={`/eneryetu/jobs/${row.id}`}
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
