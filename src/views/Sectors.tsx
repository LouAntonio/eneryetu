'use client';

import { useTranslation } from 'react-i18next';

import { PageHero } from '../components/PageHero';

export function Sectors() {
	const { t } = useTranslation();
	const sectors = t('sectors.items', { returnObjects: true });

	return (
		<>
			<PageHero
				id="hero"
				eyebrow={t('sectors.eyebrow')}
				title={t('sectors.title')}
				body={t('sectors.body')}
				image={t('sectors.heroImage')}
			/>

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="divide-y divide-line border-y border-line">
						{sectors.map((sector, index) => (
							<article
								key={sector.title}
								className="group grid gap-4 bg-white px-5 py-6 transition-colors hover:bg-ink sm:grid-cols-[4.5rem_1fr] sm:items-start"
							>
								<span className="font-mono text-xs text-blue">
									{`S-${String(index + 1).padStart(2, '0')}`}
								</span>
								<div className="sm:grid sm:grid-cols-[120px_1fr] sm:gap-4 sm:items-center">
									{sector.image ? (
										<div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-lg overflow-hidden">
											<img
												src={sector.image}
												alt={sector.title}
												className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
												loading="lazy"
											/>
										</div>
									) : null}
									<div>
										<h2 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-ink transition-colors group-hover:text-paper">
											{sector.title}
										</h2>
										<p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
											{sector.blurb}
										</p>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
