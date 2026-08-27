'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from '../../lib/routing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import { assetUrl } from '../../lib/assets';
import { slugify } from '../../lib/slugify';
import type { Category, Post, PostType, Status } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { RichTextEditor } from '../../components/admin/RichTextEditor';

const inputClass =
	'mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

const labelClass = 'ui-label text-slate';

const emptyForm = {
	title: '',
	slug: '',
	type: 'NOTICIA' as PostType,
	excerpt: '',
	content: '',
	coverImage: '',
	status: 'RASCUNHO' as Status,
	featured: false,
	categoryId: '',
	metaTitle: '',
	metaDescription: '',
};

function toForm(post: Post): typeof emptyForm {
	return {
		title: post.title,
		slug: post.slug,
		type: post.type,
		excerpt: post.excerpt ?? '',
		content: post.content,
		coverImage: post.coverImage ?? '',
		status: post.status,
		featured: post.featured,
		categoryId: post.categoryId ?? '',
		metaTitle: post.metaTitle ?? '',
		metaDescription: post.metaDescription ?? '',
	};
}

interface PostFormInnerProps {
	initial?: Post;
	editing: boolean;
	id?: string;
	categories: Category[];
}

function PostFormInner({ initial, editing, id, categories }: PostFormInnerProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [form, setForm] = useState(() => (initial ? toForm(initial) : emptyForm));
	const [slugTouched, setSlugTouched] = useState(false);
	const [error, setError] = useState('');
	const coverInput = useRef<HTMLInputElement>(null);

	const { data: freshPost } = useQuery({
		queryKey: ['post', id],
		enabled: Boolean(id),
		queryFn: async () => (await api.get<{ data: Post }>(`/posts/${id}`)).data,
	});
	const cover = freshPost?.coverImage ?? '';

	const save = useMutation({
		mutationFn: async () => {
			const body = {
				...form,
				categoryId: form.categoryId || null,
				excerpt: form.excerpt || null,
				coverImage: cover || null,
				metaTitle: form.metaTitle || null,
				metaDescription: form.metaDescription || null,
			};
			if (editing) {
				return api.put(`/posts/${id}`, body);
			}
			return api.post('/posts', body);
		},
		onSuccess: () => {
			navigate('/eneryetu/posts');
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

	const uploadCover = useMutation({
		mutationFn: async (file: File) => {
			const fd = new FormData();
			fd.append('file', file);
			return api.post(`/upload/posts/${id}/cover`, fd);
		},
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['post', id] }),
	});

	const removeCover = useMutation({
		mutationFn: async () => api.delete(`/upload/posts/${id}/cover`),
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['post', id] }),
	});

	const onCoverPick = () => {
		const file = coverInput.current?.files?.[0];
		if (file) uploadCover.mutate(file);
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
					<label htmlFor="post-title" className={labelClass}>
						{t('admin.posts.titleField')}
					</label>
					<input
						id="post-title"
						type="text"
						required
						value={form.title}
						onChange={(event) => onTitleChange(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="post-slug" className={labelClass}>
						{t('admin.posts.slug')}
					</label>
					<input
						id="post-slug"
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

			<div className="grid gap-6 lg:grid-cols-3">
				<div>
					<label htmlFor="post-type" className={labelClass}>
						{t('admin.posts.type')}
					</label>
					<select
						id="post-type"
						value={form.type}
						onChange={(event) => set('type')(event.target.value as PostType)}
						className={inputClass}
					>
						<option value="NOTICIA">{t('admin.posts.typeNoticia')}</option>
						<option value="BLOG">{t('admin.posts.typeBlog')}</option>
					</select>
				</div>
				<div>
					<label htmlFor="post-status" className={labelClass}>
						{t('admin.posts.status')}
					</label>
					<select
						id="post-status"
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
					<label htmlFor="post-category" className={labelClass}>
						{t('admin.posts.category')}
					</label>
					<select
						id="post-category"
						value={form.categoryId}
						onChange={(event) => set('categoryId')(event.target.value)}
						className={inputClass}
					>
						<option value="">{t('admin.posts.noCategory')}</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div>
				<label htmlFor="post-excerpt" className={labelClass}>
					{t('admin.posts.excerpt')}
				</label>
				<input
					id="post-excerpt"
					type="text"
					value={form.excerpt}
					onChange={(event) => set('excerpt')(event.target.value)}
					placeholder={t('admin.posts.excerptHint')}
					className={inputClass}
				/>
			</div>

			<RichTextEditor
				label={t('admin.posts.content')}
				value={form.content}
				onChange={(value) => set('content')(value)}
			/>

			{id ? (
				<div className="border border-line bg-white p-5">
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div>
							<span className={labelClass}>{t('admin.posts.coverImage')}</span>
							<p className="mt-1 font-mono text-xs text-slate">
								{cover ? cover : t('admin.events.noCover')}
							</p>
						</div>
						<div className="flex items-center gap-2">
							{cover ? (
								<button
									type="button"
									onClick={() => removeCover.mutate()}
									className="btn btn-mono px-4 py-2 text-xs"
								>
									{t('admin.posts.removeCover')}
								</button>
							) : null}
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
					</div>
					{cover ? (
						<img
							src={assetUrl(cover) ?? ''}
							alt=""
							className="mt-4 h-40 w-full object-cover"
						/>
					) : // eslint-disable-next-line @next/next/no-img-element
					null}
				</div>
			) : (
				<p className="border border-line bg-white px-5 py-4 font-mono text-xs text-slate">
					{t('admin.posts.coverHint')}
				</p>
			)}

			<div className="grid gap-6 lg:grid-cols-2">
				<div>
					<label htmlFor="post-meta-title" className={labelClass}>
						{t('admin.posts.metaTitle')}
					</label>
					<input
						id="post-meta-title"
						type="text"
						maxLength={70}
						value={form.metaTitle}
						onChange={(event) => set('metaTitle')(event.target.value)}
						className={inputClass}
					/>
				</div>
				<div>
					<label htmlFor="post-meta-desc" className={labelClass}>
						{t('admin.posts.metaDescription')}
					</label>
					<input
						id="post-meta-desc"
						type="text"
						maxLength={160}
						value={form.metaDescription}
						onChange={(event) => set('metaDescription')(event.target.value)}
						className={inputClass}
					/>
				</div>
			</div>

			<label className="flex cursor-pointer items-center gap-3">
				<input
					type="checkbox"
					checked={form.featured}
					onChange={(event) => set('featured')(event.target.checked)}
					className="h-4 w-4 accent-ink"
				/>
				<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
					{t('admin.posts.featured')}
				</span>
			</label>

			<div className="flex items-center gap-3 border-t border-line pt-6">
				<button type="submit" disabled={save.isPending} className="btn btn-sun px-6 py-3">
					{save.isPending ? '…' : t('admin.save')}
				</button>
				<Link
					to="/eneryetu/posts"
					className="btn btn-paper border-ink px-6 py-3 text-ink hover:border-ink"
				>
					{t('admin.cancel')}
				</Link>
			</div>
		</form>
	);
}

export function PostForm() {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const editing = Boolean(id);

	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: async () => (await api.get<{ data: Category[] }>('/categories')).data,
	});

	const { data: existing, isLoading: loadingExisting } = useQuery({
		queryKey: ['post', id],
		enabled: editing,
		queryFn: async () => (await api.get<{ data: Post }>(`/posts/${id}`)).data,
	});

	return (
		<AdminPage
			eyebrow={t('admin.posts.eyebrow')}
			title={editing ? t('admin.posts.editTitle') : t('admin.posts.newTitle')}
			actions={
				<Link to="/eneryetu/posts" className="btn btn-mono px-4 py-2.5 text-xs">
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
				<PostFormInner
					initial={existing}
					editing={editing}
					id={id}
					categories={categories ?? []}
				/>
			)}
		</AdminPage>
	);
}
