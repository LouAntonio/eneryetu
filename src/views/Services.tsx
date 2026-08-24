'use client';

import { useTranslation } from 'react-i18next';

import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';

export function Services() {
	const { t } = useTranslation();
	const services = t('services.items', { returnObjects: true });
	const beyond = t('services.beyond.items', { returnObjects: true });

	return (
		<>
			<PageHero
				eyebrow={t('services.eyebrow')}
				title={t('services.title')}
				body={t('services.body')}
				image={t('services.heroImage')}
			/>

			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
						{services.map((service, index) => (
							<ServiceCard
								key={service.title}
								index={index + 1}
								title={service.title}
								blurb={service.blurb}
								spec={service.spec}
							/>
						))}
					</div>
				</div>
			</section>

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('services.beyond.eyebrow')}
						title={t('services.beyond.title')}
						body={t('services.beyond.body')}
						tone="sun"
					/>
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
						{beyond.map((item) => (
							<article
								key={item.title}
								className="group bg-white p-6 transition-colors hover:bg-ink"
							>
								<h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-paper">
									{item.title}
								</h2>
								<p className="mt-3 text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
									{item.blurb}
								</p>
							</article>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
