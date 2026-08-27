'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from '../../lib/routing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { Product, Status } from '../../types';
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
	blurb: '',
	status: 'RASCUNHO' as Status,
	featured: false,
	sortOrder: 0,
	metaTitle: '',
	metaDescription: '',
};

function toForm(product: Product): typeof emptyForm {
	return {
		title: product.title,
		slug: product.slug,
		description: product.description ?? '',
		blurb: product.blurb ?? '',
		status: product.status,
		featured: product.featured,
		sortOrder: product.sortOrder,
		metaTitle: product.metaTitle ?? '',
		metaDescription: product.metaDescription ?? '',
	};
}

interface ProductFormInnerProps {
	product?: Product;
	editing: boolean;
	id?: string;
}

function ProductFormInner({ product, editing, id }: ProductFormInnerProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [form, setForm] = useState(() => (product ? toForm(product) : emptyForm));
	const [slugTouched, setSlugTouched] = useState(false);
	const [error, setError] = useState('');
	const coverInput = useRef<HTMLInputElement>(null);

	const save = useMutation({
		mutationFn: async () => {
			const body = {
				...form,
				description: form.description || null,
				blurb: form.blurb || null,
				metaTitle: form.metaTitle || null,
				metaDescription: form.metaDescription || null,
				coverImage: product?.coverImage ?? null,
			};
			if (editing) {
				return api.put(`/products/${id}`, body);
			}
			return api.post('/products', body);
		},
		onSuccess: (resp) => {
			const saved = (resp as { data?: Product }).data;
			if (editing) {
				navigate('/eneryetu/products');
			} else if (saved?.id) {
				navigate(`/eneryetu/products/${saved.id}`);
			} else {
				navigate('/eneryetu/products');
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
			return api.post(`/upload/products/${id}/cover`, fd);
		},
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['product', id] }),
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
					<label htmlFor="product-title" className={labelClass}>
						{t('admin.products.titleField')}
					</label>
					<input
						id="product-title"
						type="text"
						required
						value={form.title}
						onChange={(event) => onTitleChange(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="product-slug" className={labelClass}>
						{t('admin.products.slug')}
					</label>
					<input
						id="product-slug"
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
				<label htmlFor="product-blurb" className={labelClass}>
					{t('admin.products.blurb')}
				</label>
				<textarea
					id="product-blurb"
					rows={2}
					value={form.blurb}
					onChange={(event) => set('blurb')(event.target.value)}
					className={inputClass}
				/>
			</div>

			<RichTextEditor
				label={t('admin.products.description')}
				value={form.description}
				onChange={(value) => set('description')(value)}
			/>

			<div className="grid gap-6 lg:grid-cols-3">
				<div>
					<label htmlFor="product-status" className={labelClass}>
						{t('admin.products.status')}
					</label>
					<select
						id="product-status"
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
					<label htmlFor="product-featured" className={labelClass}>
						{t('admin.products.featured')}
					</label>
					<div className="mt-2 flex h-[42px] items-center gap-3 border border-line bg-white px-3">
						<input
							id="product-featured"
							type="checkbox"
							checked={form.featured}
							onChange={(event) => set('featured')(event.target.checked)}
							className="h-4 w-4 accent-ink"
						/>
					</div>
				</div>
				<div>
					<label htmlFor="product-sort" className={labelClass}>
						{t('admin.products.sortOrder')}
					</label>
					<input
						id="product-sort"
						type="number"
						value={form.sortOrder}
						onChange={(event) => set('sortOrder')(Number(event.target.value))}
						className={inputClass}
					/>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="product-meta-title" className={labelClass}>
						{t('admin.products.metaTitle')}
					</label>
					<input
						id="product-meta-title"
						type="text"
						maxLength={70}
						value={form.metaTitle}
						onChange={(event) => set('metaTitle')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="product-meta-desc" className={labelClass}>
						{t('admin.products.metaDescription')}
					</label>
					<input
						id="product-meta-desc"
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
					to="/eneryetu/products"
					className="btn btn-paper border-ink px-6 py-3 text-ink hover:border-ink"
				>
					{t('admin.cancel')}
				</Link>
			</div>

			{editing && product ? (
				<div className="space-y-6 border-t border-line pt-6">
					<h2 className="font-display text-2xl font-black uppercase tracking-tight text-ink">
						{t('admin.products.coverImage')}
					</h2>

					<div className="border border-line bg-white p-5">
						<div className="flex flex-wrap items-end justify-between gap-4">
							<div>
								<span className={labelClass}>{t('admin.products.coverImage')}</span>
								<p className="mt-1 font-mono text-xs text-slate">
									{product.coverImage
										? product.coverImage
										: t('admin.products.noCover')}
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
						{product.coverImage ? (
							<img
								src={assetUrl(product.coverImage) ?? ''}
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

export function ProductForm() {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const editing = Boolean(id);

	const { data: product, isLoading: loadingExisting } = useQuery({
		queryKey: ['product', id],
		enabled: editing,
		queryFn: async () => (await api.get<{ data: Product }>(`/products/${id}`)).data,
	});

	return (
		<AdminPage
			eyebrow={t('admin.products.eyebrow')}
			title={editing ? t('admin.products.editTitle') : t('admin.products.newTitle')}
			actions={
				<Link to="/eneryetu/products" className="btn btn-mono px-4 py-2.5 text-xs">
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
				<ProductFormInner product={product} editing={editing} id={id} />
			)}
		</AdminPage>
	);
}
