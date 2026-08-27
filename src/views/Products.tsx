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

function ProductModal({
	product,
	onClose,
}: {
	product: Product;
	onClose: () => void;
}) {
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
			className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
		>
			<div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line-warm bg-card shadow-xl">
				{product.coverImage ? (
					<img
						src={assetUrl(product.coverImage) ?? product.coverImage}
						alt={product.title}
						className="h-64 w-full object-cover"
					/>
				) : (
					<div className="h-64 w-full bg-gradient-to-br from-blue/10 to-sand/10" />
				)}

				<button
					type="button"
					onClick={onClose}
					className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-ink/60 text-paper transition-colors hover:bg-ink"
				>
					×
				</button>

				<div className="p-6 sm:p-8">
					<h2 className="font-editorial text-2xl font-semibold text-warm-ink">
						{product.title}
					</h2>

					{product.blurb ? (
						<p className="mt-3 text-sm font-semibold uppercase tracking-wide text-blue">
							{product.blurb}
						</p>
					) : null}

					{product.description ? (
						<div
							className="prose prose-sm mt-4 max-w-none text-sand"
							dangerouslySetInnerHTML={{ __html: product.description }}
						/>
					) : null}

					<div className="mt-6 flex flex-wrap gap-3">
						<a
							href="/contact"
							className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-editorial text-sm font-semibold text-warm-ink transition-colors hover:bg-amber"
						>
							{t('common.requestQuote')} →
						</a>
						<button
							type="button"
							onClick={onClose}
							className="inline-flex items-center gap-2 rounded-full border border-line-warm px-6 py-3 font-editorial text-sm font-semibold text-warm-ink transition-colors hover:bg-bone"
						>
							{t('common.close')}
						</button>
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
							<p className="mt-2 text-sm text-sand">
								{t('products.emptyBody')}
							</p>
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
				<ProductModal
					product={selectedProduct}
					onClose={() => setSelectedProduct(null)}
				/>
			) : null}
		</>
	);
}
