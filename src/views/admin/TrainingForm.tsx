'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from '../../lib/routing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { Training, Status } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { assetUrl } from '../../lib/assets';
import { slugify } from '../../lib/slugify';

const inputClass =
	'mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

const labelClass = 'ui-label text-slate';

const emptyForm = {
	title: '',
	slug: '',
	description: '',
	durationDays: '',
	dayPattern: '',
	dailyStartTime: '',
	dailyEndTime: '',
	deliveryMode: 'presencial',
	price: '',
	currency: 'AOA',
	includesCert: false,
	includesExam: false,
	learningOutcomes: '',
	modules: '',
	prerequisites: '',
	pduCredits: '',
	ceuCredits: '',
	pmiProgramNumber: '',
	status: 'RASCUNHO' as Status,
	featured: false,
	sortOrder: 0,
	metaTitle: '',
	metaDescription: '',
};

function toForm(training: Training): typeof emptyForm {
	return {
		title: training.title,
		slug: training.slug,
		description: training.description ?? '',
		durationDays: training.durationDays != null ? String(training.durationDays) : '',
		dayPattern: training.dayPattern ?? '',
		dailyStartTime: training.dailyStartTime ?? '',
		dailyEndTime: training.dailyEndTime ?? '',
		deliveryMode: training.deliveryMode,
		price: training.price != null ? String(training.price) : '',
		currency: training.currency,
		includesCert: training.includesCert,
		includesExam: training.includesExam,
		learningOutcomes: training.learningOutcomes ?? '',
		modules: training.modules ?? '',
		prerequisites: training.prerequisites ?? '',
		pduCredits: training.pduCredits != null ? String(training.pduCredits) : '',
		ceuCredits: training.ceuCredits != null ? String(training.ceuCredits) : '',
		pmiProgramNumber: training.pmiProgramNumber ?? '',
		status: training.status,
		featured: training.featured,
		sortOrder: training.sortOrder,
		metaTitle: training.metaTitle ?? '',
		metaDescription: training.metaDescription ?? '',
	};
}

interface TrainingFormInnerProps {
	training?: Training;
	editing: boolean;
	id?: string;
}

function TrainingFormInner({ training, editing, id }: TrainingFormInnerProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [form, setForm] = useState(() => (training ? toForm(training) : emptyForm));
	const [slugTouched, setSlugTouched] = useState(false);
	const [error, setError] = useState('');
	const coverInput = useRef<HTMLInputElement>(null);

	const save = useMutation({
		mutationFn: async () => {
			const body = {
				...form,
				durationDays: form.durationDays ? Number(form.durationDays) : null,
				price: form.price ? Number(form.price) : null,
				pduCredits: form.pduCredits ? Number(form.pduCredits) : null,
				ceuCredits: form.ceuCredits ? Number(form.ceuCredits) : null,
				learningOutcomes: form.learningOutcomes || null,
				modules: form.modules || null,
				prerequisites: form.prerequisites || null,
				pmiProgramNumber: form.pmiProgramNumber || null,
				dayPattern: form.dayPattern || null,
				dailyStartTime: form.dailyStartTime || null,
				dailyEndTime: form.dailyEndTime || null,
				metaTitle: form.metaTitle || null,
				metaDescription: form.metaDescription || null,
				coverImage: training?.coverImage ?? null,
			};
			if (editing) {
				return api.put(`/trainings/${id}`, body);
			}
			return api.post('/trainings', body);
		},
		onSuccess: (resp) => {
			const saved = (resp as { data?: Training }).data;
			if (editing) {
				navigate('/eneryetu/trainings');
			} else if (saved?.id) {
				navigate(`/eneryetu/trainings/${saved.id}`);
			} else {
				navigate('/eneryetu/trainings');
			}
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

	const upload = useMutation({
		mutationFn: async (file: File) => {
			const fd = new FormData();
			fd.append('file', file);
			return api.post(`/upload/trainings/${id}/cover`, fd);
		},
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['training', id] }),
	});

	const onCoverPick = () => {
		const file = coverInput.current?.files?.[0];
		if (file) upload.mutate(file);
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
					<label htmlFor="training-title" className={labelClass}>
						{t('admin.trainings.titleField')}
					</label>
					<input
						id="training-title"
						type="text"
						required
						value={form.title}
						onChange={(event) => onTitleChange(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="training-slug" className={labelClass}>
						{t('admin.trainings.slug')}
					</label>
					<input
						id="training-slug"
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
				label={t('admin.trainings.description')}
				value={form.description}
				onChange={(value) => set('description')(value)}
			/>

			<div className="grid gap-6 lg:grid-cols-3">
				<div>
					<label htmlFor="training-duration" className={labelClass}>
						{t('admin.trainings.durationDays')}
					</label>
					<input
						id="training-duration"
						type="number"
						value={form.durationDays}
						onChange={(event) => set('durationDays')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="training-day-pattern" className={labelClass}>
						{t('admin.trainings.dayPattern')}
					</label>
					<input
						id="training-day-pattern"
						type="text"
						placeholder="Seg–Sex"
						value={form.dayPattern}
						onChange={(event) => set('dayPattern')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="training-delivery" className={labelClass}>
						{t('admin.trainings.deliveryMode')}
					</label>
					<select
						id="training-delivery"
						required
						value={form.deliveryMode}
						onChange={(event) => set('deliveryMode')(event.target.value)}
						className={inputClass}
					>
						<option value="presencial">{t('admin.trainings.presencial')}</option>
						<option value="online">{t('admin.trainings.online')}</option>
						<option value="autoformacao">{t('admin.trainings.autoformacao')}</option>
					</select>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-4">
				<div>
					<label htmlFor="training-start-time" className={labelClass}>
						{t('admin.trainings.dailyStartTime')}
					</label>
					<input
						id="training-start-time"
						type="time"
						value={form.dailyStartTime}
						onChange={(event) => set('dailyStartTime')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="training-end-time" className={labelClass}>
						{t('admin.trainings.dailyEndTime')}
					</label>
					<input
						id="training-end-time"
						type="time"
						value={form.dailyEndTime}
						onChange={(event) => set('dailyEndTime')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="training-price" className={labelClass}>
						{t('admin.trainings.price')}
					</label>
					<input
						id="training-price"
						type="number"
						step="0.01"
						value={form.price}
						onChange={(event) => set('price')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="training-currency" className={labelClass}>
						{t('admin.trainings.currency')}
					</label>
					<input
						id="training-currency"
						type="text"
						value={form.currency}
						onChange={(event) => set('currency')(event.target.value)}
						className={inputClass}
					/>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div>
					<label htmlFor="training-pdu" className={labelClass}>
						{t('admin.trainings.pduCredits')}
					</label>
					<input
						id="training-pdu"
						type="number"
						step="0.1"
						value={form.pduCredits}
						onChange={(event) => set('pduCredits')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="training-ceu" className={labelClass}>
						{t('admin.trainings.ceuCredits')}
					</label>
					<input
						id="training-ceu"
						type="number"
						step="0.1"
						value={form.ceuCredits}
						onChange={(event) => set('ceuCredits')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="training-pmi" className={labelClass}>
						{t('admin.trainings.pmiProgramNumber')}
					</label>
					<input
						id="training-pmi"
						type="text"
						value={form.pmiProgramNumber}
						onChange={(event) => set('pmiProgramNumber')(event.target.value)}
						className={inputClass}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="training-prerequisites" className={labelClass}>
					{t('admin.trainings.prerequisites')}
				</label>
				<textarea
					id="training-prerequisites"
					rows={3}
					value={form.prerequisites}
					onChange={(event) => set('prerequisites')(event.target.value)}
					className={inputClass}
				/>
			</div>

			<div>
				<label htmlFor="training-outcomes" className={labelClass}>
					{t('admin.trainings.learningOutcomes')}
				</label>
				<textarea
					id="training-outcomes"
					rows={4}
					placeholder="Um por linha"
					value={form.learningOutcomes}
					onChange={(event) => set('learningOutcomes')(event.target.value)}
					className={inputClass}
				/>
			</div>

			<div>
				<label htmlFor="training-modules" className={labelClass}>
					{t('admin.trainings.modules')}
				</label>
				<textarea
					id="training-modules"
					rows={4}
					placeholder="Um por linha"
					value={form.modules}
					onChange={(event) => set('modules')(event.target.value)}
					className={inputClass}
				/>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div>
					<label htmlFor="training-status" className={labelClass}>
						{t('admin.trainings.status')}
					</label>
					<select
						id="training-status"
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
					<label htmlFor="training-featured" className={labelClass}>
						{t('admin.trainings.featured')}
					</label>
					<div className="mt-2 flex h-[42px] items-center gap-3 border border-line bg-white px-3">
						<input
							id="training-featured"
							type="checkbox"
							checked={form.featured}
							onChange={(event) => set('featured')(event.target.checked)}
							className="h-4 w-4 accent-ink"
						/>
					</div>
				</div>
				<div>
					<label htmlFor="training-cert" className={labelClass}>
						{t('admin.trainings.includesCert')}
					</label>
					<div className="mt-2 flex h-[42px] items-center gap-3 border border-line bg-white px-3">
						<input
							id="training-cert"
							type="checkbox"
							checked={form.includesCert}
							onChange={(event) => set('includesCert')(event.target.checked)}
							className="h-4 w-4 accent-ink"
						/>
					</div>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="training-exam" className={labelClass}>
						{t('admin.trainings.includesExam')}
					</label>
					<div className="mt-2 flex h-[42px] items-center gap-3 border border-line bg-white px-3">
						<input
							id="training-exam"
							type="checkbox"
							checked={form.includesExam}
							onChange={(event) => set('includesExam')(event.target.checked)}
							className="h-4 w-4 accent-ink"
						/>
					</div>
				</div>
				<div>
					<label htmlFor="training-sort" className={labelClass}>
						{t('admin.trainings.sortOrder')}
					</label>
					<input
						id="training-sort"
						type="number"
						value={form.sortOrder}
						onChange={(event) => set('sortOrder')(Number(event.target.value))}
						className={inputClass}
					/>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="training-meta-title" className={labelClass}>
						{t('admin.trainings.metaTitle')}
					</label>
					<input
						id="training-meta-title"
						type="text"
						maxLength={70}
						value={form.metaTitle}
						onChange={(event) => set('metaTitle')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="training-meta-desc" className={labelClass}>
						{t('admin.trainings.metaDescription')}
					</label>
					<input
						id="training-meta-desc"
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
					to="/eneryetu/trainings"
					className="btn btn-paper border-ink px-6 py-3 text-ink hover:border-ink"
				>
					{t('admin.cancel')}
				</Link>
			</div>

			{editing && training ? (
				<div className="space-y-6 border-t border-line pt-6">
					<h2 className="font-display text-2xl font-black uppercase tracking-tight text-ink">
						{t('admin.trainings.coverImage')}
					</h2>

					<div className="border border-line bg-white p-5">
						<div className="flex flex-wrap items-end justify-between gap-4">
							<div>
								<span className={labelClass}>
									{t('admin.trainings.coverImage')}
								</span>
								<p className="mt-1 font-mono text-xs text-slate">
									{training.coverImage
										? training.coverImage
										: t('admin.trainings.noCover')}
								</p>
							</div>
							<label className="btn btn-mono cursor-pointer px-4 py-2 text-xs">
								{t('admin.upload')}
								<input
									ref={coverInput}
									type="file"
									accept="image/*"
									className="hidden"
									onChange={onCoverPick}
								/>
							</label>
						</div>
						{training.coverImage ? (
							<img
								src={assetUrl(training.coverImage) ?? ''}
								alt=""
								className="mt-4 h-40 w-full object-cover"
							/>
						) : null}
					</div>
				</div>
			) : null}
		</form>
	);
}

export function TrainingForm() {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const editing = Boolean(id);

	const { data: training, isLoading: loadingExisting } = useQuery({
		queryKey: ['training', id],
		enabled: editing,
		queryFn: async () => (await api.get<{ data: Training }>(`/trainings/${id}`)).data,
	});

	return (
		<AdminPage
			eyebrow={t('admin.trainings.eyebrow')}
			title={editing ? t('admin.trainings.editTitle') : t('admin.trainings.newTitle')}
			actions={
				<Link to="/eneryetu/trainings" className="btn btn-mono px-4 py-2.5 text-xs">
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
				<TrainingFormInner training={training} editing={editing} id={id} />
			)}
		</AdminPage>
	);
}
