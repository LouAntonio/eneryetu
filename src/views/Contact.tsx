'use client';

import { useTranslation } from 'react-i18next';

import { ContactForm } from '../components/ContactForm';
import { PageHeader } from '../components/PageHeader';

const HOUR_KEYS = ['week', 'saturday', 'sunday'] as const;

export function Contact() {
	const { t } = useTranslation();

	return (
		<>
			<PageHeader
				eyebrow={t('contact.eyebrow')}
				title={t('contact.title')}
				body={t('contact.body')}
			/>

			<section>
				<div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-20">
					<div className="space-y-10">
						<div>
							<h2 className="ui-label text-slate">{t('contact.detailsTitle')}</h2>
							<ul className="mt-5 divide-y divide-line border-y border-line">
								<li className="px-5 py-4">
									<span className="block ui-label text-slate">Address</span>
									<p className="mt-1 font-mono text-sm leading-relaxed text-ink">
										{t('contact.address')}
									</p>
								</li>
								<li className="px-5 py-4">
									<span className="block ui-label text-slate">Phone</span>
									<a
										href="tel:+244923734199"
										className="mt-1 block font-mono text-sm text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
									>
										{t('contact.phone')}
									</a>
								</li>
								<li className="px-5 py-4">
									<span className="block ui-label text-slate">Email</span>
									<a
										href="mailto:geral@eneryetu.com"
										className="mt-1 block font-mono text-sm text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
									>
										{t('contact.email')}
									</a>
								</li>
								<li className="px-5 py-4">
									<span className="block ui-label text-slate">LinkedIn</span>
									<a
										href="https://www.linkedin.com/company/eneryetu/"
										target="_blank"
										rel="noreferrer noopener"
										className="mt-1 block font-mono text-sm text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
									>
										linkedin.com/company/eneryetu
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h2 className="ui-label text-slate">{t('contact.hoursTitle')}</h2>
							<ul className="mt-5 divide-y divide-line border-y border-line">
								{HOUR_KEYS.map((key) => (
									<li
										key={key}
										className="flex items-center justify-between gap-4 px-5 py-4"
									>
										<span className="font-mono text-sm text-ink">
											{t(`contact.hours.${key}.day`)}
										</span>
										<span
											className={`font-mono text-sm ${
												key === 'sunday' ? 'text-slate' : 'text-ink'
											}`}
										>
											{t(`contact.hours.${key}.time`)}
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<ContactForm />
				</div>
			</section>
		</>
	);
}
