'use client';

import { useTranslation } from 'react-i18next';

import { ContactForm } from '../components/ContactForm';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';

const HOUR_KEYS = ['week', 'saturday', 'sunday'] as const;

function PhoneIcon({ className = '' }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			className={`h-6 w-6 shrink-0 ${className}`}
			aria-hidden
		>
			<path
				d="M5.454 1.61a.678.678 0 0 0-1.015-.063L2.405 2.9c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.334-1.334a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L6.482 9.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L5.454 1.61z"
				fill="currentColor"
			/>
		</svg>
	);
}

function EmailIcon({ className = '' }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			className={`h-6 w-6 shrink-0 ${className}`}
			aria-hidden
		>
			<path
				d="M0 4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l11 6.6 11-6.6V4a1 1 0 0 0-1-1H2zm19.5 5.383-9.708 5.825L19.5 19.105V9.383zm-.534 10.876-7.64-4.571L12 14.583l-1.326-.795-7.64 4.57A1 1 0 0 0 3 20h18a1 1 0 0 0 .966-.741zM2 17.105l4.708-2.897L2 9.383v7.722z"
				fill="currentColor"
			/>
		</svg>
	);
}

function LinkedinIcon({ className = '' }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			className={`h-6 w-6 shrink-0 ${className}`}
			aria-hidden
		>
			<path
				d="M0 1.146C0 .513.526 0 1.175 0h21.65C23.474 0 24 .513 24 1.146v21.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 24 0 23.487 0 22.854V1.146zm4.943 19.248V8.169H3.542v12.225h2.401zm-1.2-13.812c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm7.407 8.812V13.26c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V8.169h-2.4c.03.678 0 12.225 0 12.225h2.4z"
				fill="currentColor"
			/>
		</svg>
	);
}

function PinIcon({ className = '' }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			className={`h-6 w-6 shrink-0 ${className}`}
			aria-hidden
		>
			<path
				d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function Contact() {
	const { t } = useTranslation();

	return (
		<>
			<PageHero
				id="hero"
				eyebrow={t('contact.eyebrow')}
				title={t('contact.title')}
				body={t('contact.body')}
				image={t('contact.heroImage')}
			/>

			<section>
				<div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-20">
					<div className="space-y-10">
						<SectionHeading
							eyebrow={t('contact.eyebrow')}
							title={t('contact.detailsTitle')}
							tone="blue"
						/>

						{/* Morada — banner full-width */}
						<div className="border border-line border-l-4 border-l-blue bg-white p-5">
							<div className="flex items-start gap-3">
								<PinIcon className="mt-0.5 text-blue" />
								<div>
									<span className="ui-label text-blue">
										{t('contact.detailsTitle')}
									</span>
									<p className="mt-2 font-mono text-sm leading-relaxed text-ink">
										{t('contact.address')}
									</p>
								</div>
							</div>
						</div>

						{/* Cards de contacto — grid 2 colunas */}
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="flex items-start gap-3 border border-line bg-white p-5">
								<PhoneIcon className="mt-0.5 text-blue" />
								<div>
									<span className="ui-label text-slate">
										{t('contact.phoneLabel')}
									</span>
									<div className="mt-1 flex flex-col gap-1">
										<a
											href="tel:+244923734199"
											className="font-mono text-sm text-ink transition-colors hover:text-blue"
										>
											+244 923 734 199
										</a>
										<a
											href="tel:+244945459270"
											className="font-mono text-sm text-ink transition-colors hover:text-blue"
										>
											+244 945 459 270
										</a>
									</div>
								</div>
							</div>

							<a
								href="mailto:geral@eneryetu.com"
								className="group flex items-start gap-3 border border-line bg-white p-5 transition-colors hover:border-blue"
							>
								<EmailIcon className="mt-0.5 text-blue" />
								<div>
									<span className="ui-label text-slate">
										{t('contact.emailLabel')}
									</span>
									<p className="mt-1 font-mono text-sm text-ink group-hover:text-blue">
										{t('contact.email')}
									</p>
								</div>
							</a>
						</div>

						{/* LinkedIn — coluna única */}
						<a
							href="https://www.linkedin.com/company/eneryetu/"
							target="_blank"
							rel="noreferrer noopener"
							className="group flex items-start gap-3 border border-line bg-white p-5 transition-colors hover:border-blue"
						>
							<LinkedinIcon className="mt-0.5 text-blue" />
							<div>
								<span className="ui-label text-slate">
									{t('contact.linkedinLabel')}
								</span>
								<p className="mt-1 font-mono text-sm text-ink group-hover:text-blue">
									linkedin.com/company/eneryetu
								</p>
							</div>
						</a>

						{/* Horários */}
						<div>
							<div className="flex items-center gap-3">
								<span className="ui-label text-blue">
									{t('contact.hoursTitle')}
								</span>
								<span aria-hidden className="h-0.5 min-w-8 flex-1 bg-line" />
							</div>
							<ul className="mt-5 border border-line bg-white">
								{HOUR_KEYS.map((key, index) => (
									<li
										key={key}
										className={`flex items-center justify-between gap-4 px-5 py-4 ${
											index < HOUR_KEYS.length - 1
												? 'border-b border-line'
												: ''
										}`}
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
