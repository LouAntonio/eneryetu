'use client';

import { useTranslation } from 'react-i18next';

import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';

export function FAQ() {
	const { t } = useTranslation();
	const faqs = t('faq.items', { returnObjects: true });

	return (
		<>
			<PageHero
				id="hero"
				eyebrow={t('faq.eyebrow')}
				title={t('faq.title')}
				body={t('faq.body')}
				image={t('faq.heroImage')}
			/>

			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} tone="blue" />
					<div className="mt-10 space-y-4">
						{faqs.map((faq, i) => (
							<details
								key={i}
								className="group border border-line bg-white p-6 transition-colors hover:border-ink/20"
							>
								<summary className="cursor-pointer font-display text-lg font-bold tracking-tight text-ink marker:text-blue">
									{faq.question}
								</summary>
								<p className="mt-4 leading-relaxed text-slate">{faq.answer}</p>
							</details>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
