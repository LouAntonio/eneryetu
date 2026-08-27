'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from '../../lib/routing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { Event, EventType, Status } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { assetUrl } from '../../lib/assets';
import { slugify } from '../../lib/slugify';

const inputClass =
	'mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

const labelClass = 'ui-label text-slate';

const emptyForm = {
	title: '',
	subtitle: '',
	slug: '',
	description: '',
	fullDescription: '',
	startDate: '',
	endDate: '',
	displayDate: '',
	status: 'RASCUNHO' as Status,
	featured: false,
	countryName: '',
	city: '',
	venue: '',
	eventTypeId: '',
	metaTitle: '',
	metaDescription: '',
};

function toForm(event: Event): typeof emptyForm {
	return {
		title: event.title,
		subtitle: event.subtitle ?? '',
		slug: event.slug,
		description: event.description,
		fullDescription: event.fullDescription ?? '',
		startDate: event.startDate ? event.startDate.slice(0, 10) : '',
		endDate: event.endDate ? event.endDate.slice(0, 10) : '',
		displayDate: event.displayDate,
		status: event.status,
		featured: event.featured,
		countryName: event.countryName,
		city: event.city ?? '',
		venue: event.venue ?? '',
		eventTypeId: event.eventTypeId,
		metaTitle: event.metaTitle ?? '',
		metaDescription: event.metaDescription ?? '',
	};
}

interface EventFormInnerProps {
	event?: Event;
	editing: boolean;
	id?: string;
	eventTypes: EventType[];
}

function EventFormInner({ event, editing, id, eventTypes }: EventFormInnerProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [form, setForm] = useState(() => (event ? toForm(event) : emptyForm));
	const [slugTouched, setSlugTouched] = useState(false);
	const [error, setError] = useState('');
	const coverInput = useRef<HTMLInputElement>(null);
	const galleryInput = useRef<HTMLInputElement>(null);
	const documentInput = useRef<HTMLInputElement>(null);

	const save = useMutation({
		mutationFn: async () => {
			const body = {
				...form,
				subtitle: form.subtitle || null,
				fullDescription: form.fullDescription || null,
				endDate: form.endDate || null,
				city: form.city || null,
				venue: form.venue || null,
				metaTitle: form.metaTitle || null,
				metaDescription: form.metaDescription || null,
				coverImage: event?.coverImage ?? null,
				gallery: event?.gallery ?? undefined,
				documents: event?.documents ?? undefined,
			};
			if (editing) {
				return api.put(`/events/${id}`, body);
			}
			return api.post('/events', body);
		},
		onSuccess: (resp) => {
			const saved = (resp as { data?: Event }).data;
			if (editing) {
				navigate('/eneryetu/events');
			} else if (saved?.id) {
				navigate(`/eneryetu/events/${saved.id}`);
			} else {
				navigate('/eneryetu/events');
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
		mutationFn: async ({
			type,
			file,
		}: {
			type: 'cover' | 'gallery' | 'document';
			file: File;
		}) => {
			const fd = new FormData();
			fd.append('file', file);
			const url =
				type === 'cover'
					? `/upload/events/${id}/cover`
					: type === 'gallery'
						? `/upload/events/${id}/gallery`
						: `/upload/events/${id}/document`;
			return api.post(url, fd);
		},
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['event', id] }),
	});

	const deleteAsset = useMutation({
		mutationFn: async ({ type, index }: { type: 'gallery' | 'document'; index: number }) =>
			api.delete(`/upload/events/${id}/${type}/${index}`),
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['event', id] }),
	});

	const onCoverPick = () => {
		const file = coverInput.current?.files?.[0];
		if (file) upload.mutate({ type: 'cover', file });
	};
	const onGalleryPick = () => {
		const file = galleryInput.current?.files?.[0];
		if (file) upload.mutate({ type: 'gallery', file });
	};
	const onDocumentPick = () => {
		const file = documentInput.current?.files?.[0];
		if (file) upload.mutate({ type: 'document', file });
	};

	const galleryItems = Array.isArray(event?.gallery) ? (event.gallery as { url?: string }[]) : [];
	const documentItems = Array.isArray(event?.documents)
		? (event.documents as { url?: string; name?: string }[])
		: [];

	return (
		<form onSubmit={onSubmit} noValidate className="max-w-4xl space-y-6">
			{error ? (
				<p className="border border-sun-deep/50 bg-sun-deep/10 px-3 py-2 font-mono text-xs text-sun-deep">
					{error}
				</p>
			) : null}

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="event-title" className={labelClass}>
						{t('admin.events.titleField')}
					</label>
					<input
						id="event-title"
						type="text"
						required
						value={form.title}
						onChange={(event) => onTitleChange(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="event-slug" className={labelClass}>
						{t('admin.events.slug')}
					</label>
					<input
						id="event-slug"
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

			<div>
				<label htmlFor="event-subtitle" className={labelClass}>
					{t('admin.events.subtitle')}
				</label>
				<input
					id="event-subtitle"
					type="text"
					value={form.subtitle}
					onChange={(event) => set('subtitle')(event.target.value)}
					className={inputClass}
				/>
			</div>

			<div>
				<label htmlFor="event-description" className={labelClass}>
					{t('admin.events.description')}
				</label>
				<input
					id="event-description"
					type="text"
					required
					maxLength={255}
					value={form.description}
					onChange={(event) => set('description')(event.target.value)}
					className={inputClass}
				/>
			</div>

			<RichTextEditor
				label={t('admin.events.fullDescription')}
				value={form.fullDescription}
				onChange={(value) => set('fullDescription')(value)}
			/>

			<div className="grid gap-6 lg:grid-cols-3">
				<div>
					<label htmlFor="event-start" className={labelClass}>
						{t('admin.events.startDate')}
					</label>
					<input
						id="event-start"
						type="date"
						required
						value={form.startDate}
						onChange={(event) => set('startDate')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="event-end" className={labelClass}>
						{t('admin.events.endDate')}
					</label>
					<input
						id="event-end"
						type="date"
						value={form.endDate}
						onChange={(event) => set('endDate')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="event-display" className={labelClass}>
						{t('admin.events.displayDate')}
					</label>
					<input
						id="event-display"
						type="text"
						required
						placeholder="MAI · 2026"
						value={form.displayDate}
						onChange={(event) => set('displayDate')(event.target.value)}
						className={inputClass}
					/>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div>
					<label htmlFor="event-type" className={labelClass}>
						{t('admin.events.eventType')}
					</label>
					<select
						id="event-type"
						required
						value={form.eventTypeId}
						onChange={(event) => set('eventTypeId')(event.target.value)}
						className={inputClass}
					>
						<option value="">{t('admin.events.chooseType')}</option>
						{eventTypes.map((type) => (
							<option key={type.id} value={type.id}>
								{type.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="event-status" className={labelClass}>
						{t('admin.events.status')}
					</label>
					<select
						id="event-status"
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
					<label htmlFor="event-featured" className={labelClass}>
						{t('admin.events.featured')}
					</label>
					<div className="mt-2 flex h-[42px] items-center gap-3 border border-line bg-white px-3">
						<input
							id="event-featured"
							type="checkbox"
							checked={form.featured}
							onChange={(event) => set('featured')(event.target.checked)}
							className="h-4 w-4 accent-ink"
						/>
					</div>
				</div>
			</div>

			<div>
				<label htmlFor="event-country-name" className={labelClass}>
					{t('admin.events.countryName')}
				</label>
				<input
					id="event-country-name"
					type="text"
					required
					value={form.countryName}
					onChange={(event) => set('countryName')(event.target.value)}
					className={inputClass}
				/>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="event-city" className={labelClass}>
						{t('admin.events.city')}
					</label>
					<input
						id="event-city"
						type="text"
						value={form.city}
						onChange={(event) => set('city')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="event-venue" className={labelClass}>
						{t('admin.events.venue')}
					</label>
					<input
						id="event-venue"
						type="text"
						value={form.venue}
						onChange={(event) => set('venue')(event.target.value)}
						className={inputClass}
					/>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="event-meta-title" className={labelClass}>
						{t('admin.events.metaTitle')}
					</label>
					<input
						id="event-meta-title"
						type="text"
						maxLength={70}
						value={form.metaTitle}
						onChange={(event) => set('metaTitle')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="event-meta-desc" className={labelClass}>
						{t('admin.events.metaDescription')}
					</label>
					<input
						id="event-meta-desc"
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
					{save.isPending
						? '…'
						: editing
							? t('admin.save')
							: t('admin.events.saveAndNext')}
				</button>
				<Link
					to="/eneryetu/events"
					className="btn btn-paper border-ink px-6 py-3 text-ink hover:border-ink"
				>
					{t('admin.cancel')}
				</Link>
			</div>

			{editing && event ? (
				<div className="space-y-6 border-t border-line pt-6">
					<h2 className="font-display text-2xl font-black uppercase tracking-tight text-ink">
						{t('admin.events.assets')}
					</h2>

					<div className="border border-line bg-white p-5">
						<div className="flex flex-wrap items-end justify-between gap-4">
							<div>
								<span className={labelClass}>{t('admin.events.coverImage')}</span>
								<p className="mt-1 font-mono text-xs text-slate">
									{event.coverImage
										? event.coverImage
										: t('admin.events.noCover')}
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
						{event.coverImage ? (
							<img
								src={assetUrl(event.coverImage) ?? ''}
								alt=""
								className="mt-4 h-40 w-full object-cover"
							/>
						) : // eslint-disable-next-line @next/next/no-img-element
						null}
					</div>

					<div className="border border-line bg-white p-5">
						<div className="flex flex-wrap items-end justify-between gap-4">
							<span className={labelClass}>{t('admin.events.gallery')}</span>
							<label className="btn btn-mono cursor-pointer px-4 py-2 text-xs">
								{t('admin.upload')}
								<input
									ref={galleryInput}
									type="file"
									accept="image/*"
									className="hidden"
									onChange={onGalleryPick}
								/>
							</label>
						</div>
						{galleryItems.length === 0 ? (
							<p className="mt-3 font-mono text-xs text-slate">
								{t('admin.events.noGallery')}
							</p>
						) : (
							<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
								{galleryItems.map((item, index) => (
									<div key={`${item.url}-${index}`} className="group relative">
										<img
											src={assetUrl(item.url) ?? ''}
											alt=""
											className="h-28 w-full border border-line object-cover"
										/>
										<button
											type="button"
											onClick={() =>
												deleteAsset.mutate({ type: 'gallery', index })
											}
											className="absolute right-1 top-1 bg-ink px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-paper opacity-0 transition-opacity group-hover:opacity-100"
										>
											✕
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					<div className="border border-line bg-white p-5">
						<div className="flex flex-wrap items-end justify-between gap-4">
							<span className={labelClass}>{t('admin.events.documents')}</span>
							<label className="btn btn-mono cursor-pointer px-4 py-2 text-xs">
								{t('admin.upload')}
								<input
									ref={documentInput}
									type="file"
									accept=".pdf,.doc,.docx"
									className="hidden"
									onChange={onDocumentPick}
								/>
							</label>
						</div>
						{documentItems.length === 0 ? (
							<p className="mt-3 font-mono text-xs text-slate">
								{t('admin.events.noDocuments')}
							</p>
						) : (
							<ul className="mt-4 divide-y divide-line">
								{documentItems.map((item, index) => (
									<li
										key={`${item.url}-${index}`}
										className="flex items-center justify-between gap-4 py-2.5"
									>
										<span className="font-mono text-xs text-ink">
											{item.name ?? item.url}
										</span>
										<button
											type="button"
											onClick={() =>
												deleteAsset.mutate({ type: 'document', index })
											}
											className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate underline decoration-line underline-offset-4 hover:text-ink"
										>
											✕
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			) : null}
		</form>
	);
}

export function EventForm() {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const editing = Boolean(id);

	const { data: eventTypes } = useQuery({
		queryKey: ['eventTypes'],
		queryFn: async () => (await api.get<{ data: EventType[] }>('/event-types')).data,
	});

	const { data: event, isLoading: loadingExisting } = useQuery({
		queryKey: ['event', id],
		enabled: editing,
		queryFn: async () => (await api.get<{ data: Event }>(`/events/${id}`)).data,
	});

	return (
		<AdminPage
			eyebrow={t('admin.events.eyebrow')}
			title={editing ? t('admin.events.editTitle') : t('admin.events.newTitle')}
			actions={
				<Link to="/eneryetu/events" className="btn btn-mono px-4 py-2.5 text-xs">
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
				<EventFormInner
					event={event}
					editing={editing}
					id={id}
					eventTypes={eventTypes ?? []}
				/>
			)}
		</AdminPage>
	);
}
