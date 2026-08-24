'use client';

import { Link } from '../../lib/routing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { Paginated, Post } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';

export function Posts() {
	const { t } = useTranslation();
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ['posts'],
		queryFn: async () =>
			(await api.get<Paginated<Post>>('/posts', { params: { limit: 100, all: 'true' } }))
				.data,
	});

	const remove = useMutation({
		mutationFn: async (id: string) => api.delete(`/posts/${id}`),
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['posts'] }),
	});

	return (
		<AdminPage
			eyebrow={t('admin.posts.eyebrow')}
			title={t('admin.posts.title')}
			actions={
				<Link to="/eneryetu/posts/new" className="btn btn-sun px-5 py-2.5">
					{t('admin.posts.add')}
				</Link>
			}
		>
			<DataTable<Post>
				loading={isLoading}
				rows={data ?? []}
				rowKey={(row) => row.id}
				columns={[
					{
						key: 'title',
						label: t('admin.posts.title'),
						render: (row) => (
							<div>
								<span className="font-mono text-sm font-semibold text-ink group-hover:text-paper">
									{row.title}
								</span>
								<span className="mt-0.5 block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate group-hover:text-paper/60">
									{row.type}
								</span>
							</div>
						),
					},
					{
						key: 'category',
						label: t('admin.posts.category'),
						render: (row) => (
							<span className="font-mono text-xs text-slate group-hover:text-paper/70">
								{row.category?.name ?? '—'}
							</span>
						),
					},
					{
						key: 'status',
						label: t('admin.posts.status'),
						render: (row) => <StatusBadge status={row.status} />,
					},
					{
						key: 'featured',
						label: t('admin.posts.featured'),
						render: (row) => (
							<span
								className={`font-mono text-xs uppercase tracking-[0.16em] ${
									row.featured
										? 'text-sun-deep group-hover:text-volt'
										: 'text-slate/60 group-hover:text-paper/50'
								}`}
							>
								{row.featured ? '★' : '—'}
							</span>
						),
					},
					{
						key: 'actions',
						label: '',
						render: (row) => (
							<div className="flex items-center gap-4">
								<Link
									to={`/eneryetu/posts/${row.id}`}
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
