'use client';

import { Link } from '../lib/routing';
import { useTranslation } from 'react-i18next';

import { Chip } from '../components/Chip';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';

export function Training() {
	const { t } = useTranslation();
	const features = t('training.features', { returnObjects: true });

	return (
		<>
			<PageHero
				eyebrow={t('training.eyebrow')}
				title={t('training.title')}
				body={t('training.body')}
				image={t('training.heroImage')}
			/>

			<section className="border-b border-line">
				<div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
					<SectionHeading
						eyebrow={t('training.eyebrow')}
						title={t('training.title')}
						body={t('training.body')}
						tone="volt"
					/>
					<div className="flex flex-wrap gap-2 justify-self-start lg:pt-2">
						{features.map((feature) => (
							<Chip key={feature}>{feature}</Chip>
						))}
					</div>
				</div>
			</section>

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="border-2 border-paper/20 bg-ink-deep p-8 text-paper sm:p-12">
						<div className="flex items-center gap-3">
							<span
								aria-hidden
								className="node-live h-2.5 w-2.5 rounded-full bg-volt"
							/>
							<span className="ui-label text-volt">{t('training.eyebrow')}</span>
						</div>
						<p className="mt-6 max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
							{t('training.title')}
						</p>
						<p className="mt-4 max-w-2xl text-paper/70">{t('training.body')}</p>
						<Link to="/contact" className="btn btn-sun mt-8 px-6 py-3">
							{t('common.requestQuote')}
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
