'use client';

import { useTranslation } from 'react-i18next';

import { ApplicationForm } from '../components/ApplicationForm';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';

export function Careers() {
	const { t } = useTranslation();

	return (
		<>
			<PageHero
				id="hero"
				eyebrow={t('careers.eyebrow')}
				title={t('careers.title')}
				body={t('careers.body')}
				image={t('careers.heroImage')}
			/>

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<p className="font-mono text-sm text-slate">
						{t('careers.applyLabel')}{' '}
						<a
							href="mailto:geral@eneryetu.com"
							className="text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
						>
							geral@eneryetu.com
						</a>
					</p>
					<p className="mt-2 font-mono text-xs text-slate/70">{t('careers.applyHint')}</p>

					<div className="mt-16 border-t border-line pt-16">
						<SectionHeading
							eyebrow={t('careers.eyebrow')}
							title={t('careers.form.title')}
							tone="blue"
						/>
						<p className="mt-4 max-w-2xl text-slate">{t('careers.form.subtitle')}</p>
						<div className="mt-10 max-w-3xl">
							<ApplicationForm />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
