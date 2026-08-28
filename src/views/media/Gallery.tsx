'use client';

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../services/api';
import type { GalleryCategory, GalleryPhoto } from '../../types';
import { EmptyBoard, LoadingBoard } from './shared';

export function MediaGallery() {
	const { t } = useTranslation();
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const { data: categories, isLoading: categoriesLoading } = useQuery({
		queryKey: ['media', 'gallery', 'categories'],
		queryFn: async () =>
			(await api.get<{ data: GalleryCategory[] }>('/gallery/categories')).data,
	});

	const { data: photos, isLoading: photosLoading } = useQuery({
		queryKey: ['media', 'gallery', 'photos', activeCategory],
		queryFn: async () =>
			(
				await api.get<{ data: GalleryPhoto[] }>('/gallery/photos', {
					params: activeCategory ? { category: activeCategory } : undefined,
				})
			).data,
	});

	const isLoading = categoriesLoading || photosLoading;

	function openLightbox(photo: GalleryPhoto) {
		setLightboxPhoto(photo);
		dialogRef.current?.showModal();
	}

	function closeLightbox() {
		setLightboxPhoto(null);
		dialogRef.current?.close();
	}

	function navigateLightbox(direction: 'prev' | 'next') {
		if (!lightboxPhoto || !photos) return;
		const idx = photos.findIndex((p) => p.id === lightboxPhoto.id);
		if (idx === -1) return;
		const next =
			direction === 'next'
				? (idx + 1) % photos.length
				: (idx - 1 + photos.length) % photos.length;
		setLightboxPhoto(photos[next]);
	}

	return (
		<>
			<section className="min-h-[40vh] bg-bone">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					{isLoading ? (
						<LoadingBoard label={t('media.loading')} />
					) : !photos || photos.length === 0 ? (
						<EmptyBoard
							titleKey="gallery"
							cta={{ label: t('media.ctaContact'), to: '/contact' }}
						/>
					) : (
						<>
							<div className="flex flex-wrap gap-2">
								<button
									type="button"
									onClick={() => setActiveCategory(null)}
									className={`inline-flex items-center rounded-full border px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
										activeCategory === null
											? 'border-amber bg-amber/10 text-amber'
											: 'border-line bg-white text-sand hover:border-amber/50'
									}`}
								>
									{t('media.gallery.all')}
								</button>
								{categories?.map((cat) => (
									<button
										key={cat.id}
										type="button"
										onClick={() => setActiveCategory(cat.slug)}
										className={`inline-flex items-center rounded-full border px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
											activeCategory === cat.slug
												? 'border-amber bg-amber/10 text-amber'
												: 'border-line bg-white text-sand hover:border-amber/50'
										}`}
									>
										{cat.name}
									</button>
								))}
							</div>

							<div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
								{photos.map((photo) => (
									<button
										key={photo.id}
										type="button"
										onClick={() => openLightbox(photo)}
										className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
									>
										{photo.imageUrl ? (
											<img
												src={photo.imageUrl}
												alt={photo.title ?? ''}
												className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										) : (
											<div className="h-full w-full bg-evergreen/10" />
										)}
										{photo.title ? (
											<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-warm-ink/80 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
												<span className="text-sm font-medium text-paper">
													{photo.title}
												</span>
											</div>
										) : null}
									</button>
								))}
							</div>
						</>
					)}
				</div>
			</section>

			<dialog
				ref={dialogRef}
				onClick={(e) => {
					if (e.target === dialogRef.current) closeLightbox();
				}}
				className="fixed inset-0 m-0 h-full w-full border-0 bg-transparent p-0 backdrop:bg-warm-ink/90 backdrop:backdrop-blur-sm"
			>
				{lightboxPhoto && (
					<div className="relative flex h-full w-full items-center justify-center p-6">
						<button
							type="button"
							onClick={closeLightbox}
							className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-warm-ink/80 text-paper transition-colors hover:bg-warm-ink"
						>
							✕
						</button>
						<button
							type="button"
							onClick={() => navigateLightbox('prev')}
							className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-warm-ink/80 text-paper transition-colors hover:bg-warm-ink"
						>
							←
						</button>
						<button
							type="button"
							onClick={() => navigateLightbox('next')}
							className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-warm-ink/80 text-paper transition-colors hover:bg-warm-ink"
						>
							→
						</button>
						<img
							src={lightboxPhoto.imageUrl}
							alt={lightboxPhoto.title ?? ''}
							className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
						/>
						{lightboxPhoto.title && (
							<div className="absolute inset-x-0 bottom-4 text-center">
								<span className="inline-block rounded-full bg-warm-ink/80 px-4 py-2 text-sm font-medium text-paper">
									{lightboxPhoto.title}
								</span>
							</div>
						)}
					</div>
				)}
			</dialog>
		</>
	);
}
