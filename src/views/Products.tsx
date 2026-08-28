'use client';

import { useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { api } from '../services/api';
import type { Product, Paginated } from '../types';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { LoadingBoard } from './media/shared';
import { assetUrl } from '../lib/assets';
import { Link } from '@/lib/routing';

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
	const { t } = useTranslation();
	const dialogRef = useRef<HTMLDialogElement>(null);

	const onDialogClick = useCallback(
		(event: React.MouseEvent<HTMLDialogElement>) => {
			if (event.target === dialogRef.current) onClose();
		},
		[onClose],
	);

	return (
		<dialog
			ref={dialogRef}
			open
			onClick={onDialogClick}
			className="fixed inset-0 z-50 h-full w-full bg-warm-ink/60 p-0 backdrop-blur-sm"
		>
			<div className="animate-modal-in relative flex h-full w-full flex-col overflow-hidden bg-card lg:flex-row">
				{/* Close button */}
				<button
					type="button"
					onClick={onClose}
					aria-label={t('common.close')}
					className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-paper/80 text-warm-ink backdrop-blur-sm transition-colors hover:bg-paper"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>

				{/* Image — left half (desktop) / top 40% (mobile) */}
				<div className="relative h-[40vh] w-full shrink-0 lg:h-full lg:w-1/2">
					{product.coverImage ? (
						<img
							src={assetUrl(product.coverImage) ?? product.coverImage}
							alt={product.title}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="h-full w-full bg-gradient-to-br from-amber/10 to-bone" />
					)}
				</div>

				{/* Content — right half (desktop) / bottom 60% (mobile) */}
				<div className="flex flex-1 flex-col overflow-y-auto px-6 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
					<p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.16em] text-warm-ink">
						{t('products.eyebrow')}
					</p>

					<div className="mt-3 h-[3px] w-8 bg-amber" />

					<h2 className="mt-4 max-w-lg font-editorial text-3xl font-semibold leading-[1.1] text-warm-ink sm:text-4xl">
						{product.title}
					</h2>

					{product.blurb ? (
						<p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-sand">
							{product.blurb}
						</p>
					) : null}

					{product.description ? (
						<div
							className="prose prose-sm mt-6 max-w-lg text-sand/90"
							dangerouslySetInnerHTML={{ __html: product.description }}
						/>
					) : null}

					<div className="mt-auto pt-8">
						<Link
							to="/contact"
							className="inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3 font-editorial text-sm font-semibold text-warm-ink transition-colors hover:bg-amber"
						>
							{t('common.requestQuote')}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14" />
								<path d="m12 5 7 7-7 7" />
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</dialog>
	);
}

export function Products() {
	const { t } = useTranslation();
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	const { data, isLoading } = useQuery({
		queryKey: ['products', 'public'],
		queryFn: async () =>
			(
				await api.get<Paginated<Product>>('/products', {
					params: { status: 'PUBLICADO' },
				})
			).data,
	});

	const products = data ?? [];

	return (
		<>
			<PageHero
				id="hero"
				eyebrow={t('products.eyebrow')}
				title={t('products.title')}
				body={t('products.body')}
				image={t('products.heroImage')}
			/>

			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('products.eyebrow')}
						title={t('products.title')}
						body={t('products.body')}
						tone="blue"
					/>

					{isLoading ? (
						<LoadingBoard label={t('media.loading')} />
					) : products.length === 0 ? (
						<div className="mt-10 rounded-2xl border border-line-warm bg-card p-8 sm:p-12">
							<p className="font-editorial text-xl italic text-sand">
								{t('products.emptyTitle')}
							</p>
							<p className="mt-2 text-sm text-sand">{t('products.emptyBody')}</p>
						</div>
					) : (
						<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{products.map((product) => (
								<article
									key={product.id}
									className="group flex flex-col overflow-hidden rounded-2xl border border-line-warm bg-card transition-shadow hover:shadow-lg"
								>
									{product.coverImage ? (
										<img
											src={assetUrl(product.coverImage) ?? product.coverImage}
											alt={product.title}
											className="aspect-[16/10] w-full object-cover"
											loading="lazy"
										/>
									) : (
										<div className="aspect-[16/10] w-full bg-gradient-to-br from-blue/10 to-sand/10" />
									)}

									<div className="flex flex-1 flex-col p-6">
										<h3 className="font-editorial text-xl font-semibold leading-[1.15] text-warm-ink">
											{product.title}
										</h3>

										{product.blurb ? (
											<p className="mt-2 text-sm leading-relaxed text-sand line-clamp-2">
												{product.blurb}
											</p>
										) : null}

										<div className="mt-auto pt-4">
											<button
												type="button"
												onClick={() => setSelectedProduct(product)}
												className="inline-flex items-center gap-2 font-editorial text-base font-semibold text-warm-ink transition-colors hover:text-amber"
											>
												{t('common.readMore')}
												<span
													aria-hidden
													className="text-amber transition-transform duration-200 group-hover:translate-x-1"
												>
													→
												</span>
											</button>
										</div>
									</div>
								</article>
							))}
						</div>
					)}
				</div>
			</section>

			{selectedProduct ? (
				<ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
			) : null}
		</>
	);
}
