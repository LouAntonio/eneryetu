'use client';

import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import { slugify } from '../../lib/slugify';
import type { Category, EventType } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { DataTable } from '../../components/admin/DataTable';
import { FormModal } from '../../components/admin/FormModal';

interface TaxonomyPageProps {
	kind: 'category' | 'eventType' | 'galleryCategory';
	eyebrow: string;
	title: string;
	addLabel: string;
	nameLabel: string;
	slugLabel: string;
	countLabel: string;
}

type Row =
	Category | EventType | { id: string; name: string; slug: string; _count?: { photos: number } };

const inputClass =
	'mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

export function TaxonomyPage({
	kind,
	eyebrow,
	title,
	addLabel,
	nameLabel,
	slugLabel,
	countLabel,
}: TaxonomyPageProps) {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState({ name: '', slug: '' });
	const [slugTouched, setSlugTouched] = useState(false);
	const [editing, setEditing] = useState<Row | null>(null);

	const base =
		kind === 'category'
			? '/categories'
			: kind === 'eventType'
				? '/event-types'
				: '/gallery/categories';
	const plural =
		kind === 'category'
			? 'categories'
			: kind === 'eventType'
				? 'eventTypes'
				: 'galleryCategories';

	const { data, isLoading } = useQuery({
		queryKey: [plural],
		queryFn: async () => (await api.get<{ data: Row[] }>(base)).data,
	});

	const save = useMutation({
		mutationFn: async () => {
			const body = { name: form.name, slug: form.slug };
			if (editing) {
				return api.put(`${base}/${editing.id}`, body);
			}
			return api.post(base, body);
		},
		onSuccess: () => {
			setShowForm(false);
			setEditing(null);
			setForm({ name: '', slug: '' });
			void queryClient.invalidateQueries({ queryKey: [plural] });
		},
	});

	const remove = useMutation({
		mutationFn: async (id: string) => api.delete(`${base}/${id}`),
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: [plural] }),
	});

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		save.mutate();
	};

	const openCreate = () => {
		setEditing(null);
		setForm({ name: '', slug: '' });
		setSlugTouched(false);
		setShowForm(true);
	};

	const openEdit = (row: Row) => {
		setEditing(row);
		setForm({ name: row.name, slug: row.slug });
		setSlugTouched(true);
		setShowForm(true);
	};

	return (
		<AdminPage
			eyebrow={eyebrow}
			title={title}
			actions={
				<button type="button" className="btn btn-sun px-5 py-2.5" onClick={openCreate}>
					{addLabel}
				</button>
			}
		>
			<DataTable<Row>
				loading={isLoading}
				rows={data ?? []}
				rowKey={(row) => row.id}
				columns={[
					{
						key: 'name',
						label: nameLabel,
						render: (row) => (
							<span className="font-mono text-sm font-semibold text-ink group-hover:text-paper">
								{row.name}
							</span>
						),
					},
					{
						key: 'slug',
						label: slugLabel,
						render: (row) => (
							<span className="font-mono text-xs text-slate group-hover:text-paper/70">
								{row.slug}
							</span>
						),
					},
					{
						key: 'count',
						label: countLabel,
						render: (row) => {
							let count: number | undefined;
							if (kind === 'category') {
								count = (row as Category)._count?.posts;
							} else if (kind === 'eventType') {
								count = (row as EventType)._count?.events;
							} else {
								count = (row as { _count?: { photos?: number } })._count?.photos;
							}
							return (
								<span className="font-mono text-sm tabular-nums text-blue group-hover:text-paper/60">
									{count ?? 0}
								</span>
							);
						},
					},
					{
						key: 'actions',
						label: '',
						render: (row) => (
							<div className="flex items-center gap-4">
								<button
									type="button"
									onClick={() => openEdit(row)}
									className="font-mono text-xs uppercase tracking-[0.16em] text-slate underline decoration-line underline-offset-4 transition-colors hover:text-volt group-hover:text-paper"
								>
									{t('admin.edit')}
								</button>
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

			{showForm ? (
				<FormModal
					title={editing ? t('admin.edit') : addLabel}
					onClose={() => setShowForm(false)}
				>
					<form onSubmit={onSubmit} noValidate>
						<div>
							<label htmlFor="tax-name" className="ui-label text-slate">
								{nameLabel}
							</label>
							<input
								id="tax-name"
								type="text"
								required
								value={form.name}
								onChange={(event) => {
									const value = event.target.value;
									setForm((prev) => ({
										name: value,
										slug: slugTouched ? prev.slug : slugify(value),
									}));
								}}
								className={inputClass}
							/>
						</div>
						<div className="mt-5">
							<label htmlFor="tax-slug" className="ui-label text-slate">
								{slugLabel}
							</label>
							<input
								id="tax-slug"
								type="text"
								required
								value={form.slug}
								onChange={(event) => {
									setSlugTouched(true);
									setForm((prev) => ({ ...prev, slug: event.target.value }));
								}}
								className={inputClass}
							/>
						</div>
						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								className="btn btn-paper border-ink bg-transparent px-5 py-2.5 text-ink hover:border-ink"
								onClick={() => setShowForm(false)}
							>
								{t('admin.cancel')}
							</button>
							<button
								type="submit"
								disabled={save.isPending}
								className="btn btn-sun px-5 py-2.5"
							>
								{save.isPending ? '…' : t('admin.save')}
							</button>
						</div>
					</form>
				</FormModal>
			) : null}
		</AdminPage>
	);
}
