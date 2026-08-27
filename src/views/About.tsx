'use client';

import { useTranslation } from 'react-i18next';

import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';

export function About() {
	const { t } = useTranslation();
	const values = t('about.values', { returnObjects: true });
	const principles = t('about.principles', { returnObjects: true });

	return (
		<>
			<PageHero
				id="hero"
				eyebrow={t('about.eyebrow')}
				title={t('about.title')}
				body={t('about.lead')}
				image={t('about.heroImage')}
			/>

			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="grid gap-8 lg:grid-cols-2">
						<p className="text-lg leading-relaxed text-slate">{t('about.body1')}</p>
						<p className="text-lg leading-relaxed text-slate">{t('about.body2')}</p>
					</div>
				</div>
			</section>

			<section className="border-b border-line">
				<div className="mx-auto grid w-full max-w-6xl gap-px border border-line bg-line px-0 lg:grid-cols-2">
					<div className="bg-white p-8 lg:p-10">
						<span className="ui-label text-sun-deep">{t('about.visionTitle')}</span>
						<p className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-ink">
							{t('about.vision')}
						</p>
					</div>
					<div className="bg-white p-8 lg:p-10">
						<span className="ui-label text-blue">{t('about.missionTitle')}</span>
						<p className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-ink">
							{t('about.mission')}
						</p>
					</div>
				</div>
			</section>

			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('about.eyebrow')}
						title={t('about.valuesTitle')}
						tone="sun"
					/>
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
						{values.map((value) => (
							<div
								key={value.title}
								className="group bg-white p-6 transition-colors hover:bg-ink"
							>
								<h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-paper">
									{value.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
									{value.blurb}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('about.eyebrow')}
						title={t('about.principlesTitle')}
						tone="blue"
					/>
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
						{principles.map((principle) => (
							<div
								key={principle.title}
								className="group bg-white p-6 transition-colors hover:bg-ink"
							>
								<h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-paper">
									{principle.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
									{principle.blurb}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
