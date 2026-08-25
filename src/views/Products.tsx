'use client';

import { useTranslation } from 'react-i18next';

import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';

export function Products() {
	const { t } = useTranslation();

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
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
						{t('products.categories', { returnObjects: true }).map((category) => (
							<article
								key={category.title}
								className="group bg-white p-6 transition-colors hover:bg-ink"
							>
								{category.image ? (
									<div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
										<img
											src={category.image}
											alt={category.title}
											className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											loading="lazy"
										/>
									</div>
								) : null}
								<h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-paper">
									{category.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
									{category.blurb}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
