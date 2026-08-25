'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from '../../lib/routing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { GalleryCategory, GalleryPhoto } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { assetUrl } from '../../lib/assets';

const inputClass =
	'mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

const labelClass = 'ui-label text-slate';

const emptyForm = {
	title: '',
	categoryId: '',
	sortOrder: 0,
};

function toForm(photo: GalleryPhoto): typeof emptyForm {
	return {
		title: photo.title ?? '',
		categoryId: photo.categoryId,
		sortOrder: photo.sortOrder,
	};
}

interface GalleryPhotoFormInnerProps {
	photo?: GalleryPhoto;
	editing: boolean;
	id?: string;
	categories: GalleryCategory[];
}

function GalleryPhotoFormInner({ photo, editing, id, categories }: GalleryPhotoFormInnerProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [form, setForm] = useState(() => (photo ? toForm(photo) : emptyForm));
	const [error, setError] = useState('');
	const coverInput = useRef<HTMLInputElement>(null);

	const save = useMutation({
		mutationFn: async () => {
			const body = {
				title: form.title || null,
				categoryId: form.categoryId,
				sortOrder: form.sortOrder,
			};
			if (editing) {
				return api.put(`/gallery/photos/${id}`, body);
			}
			return api.post('/gallery/photos', body);
		},
		onSuccess: (resp) => {
			const saved = (resp as { data?: GalleryPhoto }).data;
			if (editing) {
				navigate('/eneryetu/gallery');
			} else if (saved?.id) {
				navigate(`/eneryetu/gallery/${saved.id}`);
			} else {
				navigate('/eneryetu/gallery');
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

	const upload = useMutation({
		mutationFn: async (file: File) => {
			const fd = new FormData();
			fd.append('file', file);
			fd.append('title', form.title);
			fd.append('categoryId', form.categoryId);
			fd.append('sortOrder', String(form.sortOrder));
			return api.post(`/upload/gallery/photos/${id}`, fd);
		},
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['gallery-photos'] }),
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
					<label htmlFor="photo-title" className={labelClass}>
						{t('admin.gallery.titleField')}
					</label>
					<input
						id="photo-title"
						type="text"
						value={form.title}
						onChange={(event) => set('title')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="photo-category" className={labelClass}>
						{t('admin.gallery.category')}
					</label>
					<select
						id="photo-category"
						required
						value={form.categoryId}
						onChange={(event) => set('categoryId')(event.target.value)}
						className={inputClass}
					>
						<option value="">{t('admin.gallery.chooseCategory')}</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div>
				<label htmlFor="photo-sort" className={labelClass}>
					{t('admin.gallery.sortOrder')}
				</label>
				<input
					id="photo-sort"
					type="number"
					value={form.sortOrder}
					onChange={(event) => set('sortOrder')(Number(event.target.value))}
					className={inputClass}
				/>
			</div>

			<div className="flex items-center gap-3 border-t border-line pt-6">
				<button type="submit" disabled={save.isPending} className="btn btn-sun px-6 py-3">
					{save.isPending ? '…' : editing ? t('admin.save') : t('admin.save')}
				</button>
				<Link
					to="/eneryetu/gallery"
					className="btn btn-paper border-ink px-6 py-3 text-ink hover:border-ink"
				>
					{t('admin.cancel')}
				</Link>
			</div>

			{editing && photo ? (
				<div className="space-y-6 border-t border-line pt-6">
					<h2 className="font-display text-2xl font-black uppercase tracking-tight text-ink">
						{t('admin.gallery.image')}
					</h2>

					<div className="border border-line bg-white p-5">
						<div className="flex flex-wrap items-end justify-between gap-4">
							<div>
								<span className={labelClass}>{t('admin.gallery.image')}</span>
								<p className="mt-1 font-mono text-xs text-slate">
									{photo.imageUrl ? photo.imageUrl : t('admin.gallery.noImage')}
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
						{photo.imageUrl ? (
							<img
								src={assetUrl(photo.imageUrl) ?? ''}
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

export function GalleryPhotoForm() {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const editing = Boolean(id);

	const { data: categories } = useQuery({
		queryKey: ['galleryCategories'],
		queryFn: async () =>
			(await api.get<{ data: GalleryCategory[] }>('/gallery/categories')).data,
	});

	const { data: photo, isLoading: loadingExisting } = useQuery({
		queryKey: ['gallery-photo', id],
		enabled: editing,
		queryFn: async () => (await api.get<{ data: GalleryPhoto }>(`/gallery/photos/${id}`)).data,
	});

	return (
		<AdminPage
			eyebrow={t('admin.gallery.eyebrow')}
			title={editing ? t('admin.gallery.editTitle') : t('admin.gallery.newTitle')}
			actions={
				<Link to="/eneryetu/gallery" className="btn btn-mono px-4 py-2.5 text-xs">
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
				<GalleryPhotoFormInner
					photo={photo}
					editing={editing}
					id={id}
					categories={categories ?? []}
				/>
			)}
		</AdminPage>
	);
}
