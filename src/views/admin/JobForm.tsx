'use client';

import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from '../../lib/routing';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { JobListing, Status } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { slugify } from '../../lib/slugify';

const inputClass =
	'mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

const labelClass = 'ui-label text-slate';

const emptyForm = {
	title: '',
	slug: '',
	description: '',
	department: '',
	location: '',
	jobType: 'fulltime',
	status: 'RASCUNHO' as Status,
	featured: false,
	metaTitle: '',
	metaDescription: '',
};

function toForm(job: JobListing): typeof emptyForm {
	return {
		title: job.title,
		slug: job.slug,
		description: job.description,
		department: job.department ?? '',
		location: job.location ?? '',
		jobType: job.jobType,
		status: job.status,
		featured: job.featured,
		metaTitle: job.metaTitle ?? '',
		metaDescription: job.metaDescription ?? '',
	};
}

interface JobFormInnerProps {
	job?: JobListing;
	editing: boolean;
	id?: string;
}

function JobFormInner({ job, editing, id }: JobFormInnerProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [form, setForm] = useState(() => (job ? toForm(job) : emptyForm));
	const [slugTouched, setSlugTouched] = useState(false);
	const [error, setError] = useState('');

	const save = useMutation({
		mutationFn: async () => {
			const body = {
				...form,
				department: form.department || null,
				location: form.location || null,
				metaTitle: form.metaTitle || null,
				metaDescription: form.metaDescription || null,
			};
			if (editing) {
				return api.put(`/jobs/${id}`, body);
			}
			return api.post('/jobs', body);
		},
		onSuccess: () => {
			navigate('/eneryetu/jobs');
		},
		onError: (err: unknown) => {
			const msg =
				err instanceof Error && 'response' in err
					? ((err as { response?: { data?: { message?: string } } }).response?.data
							?.message ?? t('admin.errors.generic'))
					: t('admin.errors.generic');
			setError(msg);
		},
	});

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		setError('');
		save.mutate();
	};

	const set =
		<K extends keyof typeof form>(key: K) =>
		(value: (typeof form)[K]) =>
			setForm((prev) => ({ ...prev, [key]: value }));

	const onTitleChange = (value: string) => {
		setForm((prev) => ({
			...prev,
			title: value,
			slug: slugTouched ? prev.slug : slugify(value),
		}));
	};

	return (
		<form onSubmit={onSubmit} noValidate className="max-w-4xl space-y-6">
			{error ? (
				<p className="border border-sun-deep/50 bg-sun-deep/10 px-3 py-2 font-mono text-xs text-sun-deep">
					{error}
				</p>
			) : null}

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="job-title" className={labelClass}>
						{t('admin.jobs.titleField')}
					</label>
					<input
						id="job-title"
						type="text"
						required
						value={form.title}
						onChange={(event) => onTitleChange(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="job-slug" className={labelClass}>
						{t('admin.jobs.slug')}
					</label>
					<input
						id="job-slug"
						type="text"
						required
						value={form.slug}
						onChange={(event) => {
							setSlugTouched(true);
							set('slug')(slugify(event.target.value));
						}}
						className={inputClass}
					/>
				</div>
			</div>

			<RichTextEditor
				label={t('admin.jobs.description')}
				value={form.description}
				onChange={(value) => set('description')(value)}
			/>

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="job-department" className={labelClass}>
						{t('admin.jobs.department')}
					</label>
					<input
						id="job-department"
						type="text"
						value={form.department}
						onChange={(event) => set('department')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="job-location" className={labelClass}>
						{t('admin.jobs.location')}
					</label>
					<input
						id="job-location"
						type="text"
						value={form.location}
						onChange={(event) => set('location')(event.target.value)}
						className={inputClass}
					/>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div>
					<label htmlFor="job-type" className={labelClass}>
						{t('admin.jobs.jobType')}
					</label>
					<select
						id="job-type"
						required
						value={form.jobType}
						onChange={(event) => set('jobType')(event.target.value)}
						className={inputClass}
					>
						<option value="fulltime">{t('admin.jobs.fulltime')}</option>
						<option value="parttime">{t('admin.jobs.parttime')}</option>
						<option value="estagio">{t('admin.jobs.estagio')}</option>
						<option value="contrato">{t('admin.jobs.contrato')}</option>
					</select>
				</div>
				<div>
					<label htmlFor="job-status" className={labelClass}>
						{t('admin.jobs.status')}
					</label>
					<select
						id="job-status"
						value={form.status}
						onChange={(event) => set('status')(event.target.value as Status)}
						className={inputClass}
					>
						<option value="RASCUNHO">{t('admin.status.draft')}</option>
						<option value="PUBLICADO">{t('admin.status.published')}</option>
						<option value="ARQUIVADO">{t('admin.status.archived')}</option>
					</select>
				</div>
				<div>
					<label htmlFor="job-featured" className={labelClass}>
						{t('admin.jobs.featured')}
					</label>
					<div className="mt-2 flex h-[42px] items-center gap-3 border border-line bg-white px-3">
						<input
							id="job-featured"
							type="checkbox"
							checked={form.featured}
							onChange={(event) => set('featured')(event.target.checked)}
							className="h-4 w-4 accent-ink"
						/>
					</div>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="job-meta-title" className={labelClass}>
						{t('admin.jobs.metaTitle')}
					</label>
					<input
						id="job-meta-title"
						type="text"
						maxLength={70}
						value={form.metaTitle}
						onChange={(event) => set('metaTitle')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="job-meta-desc" className={labelClass}>
						{t('admin.jobs.metaDescription')}
					</label>
					<input
						id="job-meta-desc"
						type="text"
						maxLength={160}
						value={form.metaDescription}
						onChange={(event) => set('metaDescription')(event.target.value)}
						className={inputClass}
					/>
				</div>
			</div>

			<div className="flex items-center gap-3 border-t border-line pt-6">
				<button type="submit" disabled={save.isPending} className="btn btn-sun px-6 py-3">
					{save.isPending ? '…' : editing ? t('admin.save') : t('admin.save')}
				</button>
				<Link
					to="/eneryetu/jobs"
					className="btn btn-paper border-ink px-6 py-3 text-ink hover:border-ink"
				>
					{t('admin.cancel')}
				</Link>
			</div>
		</form>
	);
}

export function JobForm() {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const editing = Boolean(id);

	const { data: job, isLoading: loadingExisting } = useQuery({
		queryKey: ['job', id],
		enabled: editing,
		queryFn: async () => (await api.get<{ data: JobListing }>(`/jobs/${id}`)).data,
	});

	return (
		<AdminPage
			eyebrow={t('admin.jobs.eyebrow')}
			title={editing ? t('admin.jobs.editTitle') : t('admin.jobs.newTitle')}
			actions={
				<Link to="/eneryetu/jobs" className="btn btn-mono px-4 py-2.5 text-xs">
					← {t('admin.back')}
				</Link>
			}
		>
			{editing && loadingExisting ? (
				<div className="flex items-center gap-3 border border-line bg-white px-5 py-6">
					<span aria-hidden className="node-live h-2 w-2 rounded-full bg-blue" />
					<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
						A carregar…
					</span>
				</div>
			) : (
				<JobFormInner job={job} editing={editing} id={id} />
			)}
		</AdminPage>
	);
}
