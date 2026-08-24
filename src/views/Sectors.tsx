'use client';

import { useTranslation } from 'react-i18next';

import { PageHeader } from '../components/PageHeader';

export function Sectors() {
	const { t } = useTranslation();
	const sectors = t('sectors.items', { returnObjects: true });

	return (
		<>
			<PageHeader
				eyebrow={t('sectors.eyebrow')}
				title={t('sectors.title')}
				body={t('sectors.body')}
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
								<div>
									<h2 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-ink transition-colors group-hover:text-paper">
										{sector.title}
									</h2>
									<p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
										{sector.blurb}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
