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
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{sectors.map((sector) => (
							<div
								key={sector.title}
								className="group relative aspect-[3/2] overflow-hidden rounded-lg bg-ink sm:aspect-[4/5]"
							>
								{sector.image ? (
									<img
										src={sector.image}
										alt={sector.title}
										className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										loading="lazy"
									/>
								) : null}
								<div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
								<div className="absolute inset-x-0 bottom-0 p-4">
									<h2 className="font-display text-sm font-bold uppercase leading-tight tracking-tight text-paper sm:text-base lg:text-lg">
										{sector.title}
									</h2>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
