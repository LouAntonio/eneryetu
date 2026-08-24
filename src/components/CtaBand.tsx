'use client';

import { Link } from '../lib/routing';
import { useTranslation } from 'react-i18next';

export function CtaBand() {
	const { t } = useTranslation();

	return (
		<section>
			<div aria-hidden className="hazard h-1 w-full" />
			<div className="bg-ink text-paper">
				<div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:py-20">
					<div>
						<p className="ui-label text-volt">EnerYetu</p>
						<h2 className="mt-4 max-w-xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-5xl">
							{t('cta.title')}
						</h2>
						<p className="mt-4 max-w-lg text-paper/70">{t('cta.body')}</p>
					</div>
					<div className="flex flex-wrap items-center gap-4">
						<Link to="/contact" className="btn btn-sun px-6 py-3">
							{t('cta.cta')}
						</Link>
						<a href="tel:+244923734199" className="btn btn-paper px-6 py-3">
							{t('cta.phone')}
							<span className="hidden font-mono normal-case tracking-normal text-paper/50 xl:inline">
								+244 923 734 199
							</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
