'use client';

import { Link } from '../lib/routing';
import { useTranslation } from 'react-i18next';

function PhoneIcon({ className = '' }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			className={`h-4 w-4 shrink-0 ${className}`}
			aria-hidden
		>
			<path
				d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"
				fill="currentColor"
			/>
		</svg>
	);
}

function EmailIcon({ className = '' }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			className={`h-4 w-4 shrink-0 ${className}`}
			aria-hidden
		>
			<path
				d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"
				fill="currentColor"
			/>
		</svg>
	);
}

function LinkedinIcon({ className = '' }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			className={`h-4 w-4 shrink-0 ${className}`}
			aria-hidden
		>
			<path
				d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
				fill="currentColor"
			/>
		</svg>
	);
}

function ArrowIcon({ className = '' }: { className?: string }) {
	return (
		<svg viewBox="0 0 8 8" fill="none" className={`h-2 w-2 shrink-0 ${className}`} aria-hidden>
			<path
				d="M1 4h5M4.5 1.5L7 4l-2.5 2.5"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function PinIcon({ className = '' }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			className={`h-4 w-4 shrink-0 ${className}`}
			aria-hidden
		>
			<path
				d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.75c-1.38 0-2.5-1.12-2.5-2.5S6.62 2.75 8 2.75 10.5 3.87 10.5 5.25 9.38 7.75 8 7.75z"
				fill="currentColor"
			/>
		</svg>
	);
}

export function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	const quick = [
		{ key: 'home', to: '/' },
		{ key: 'about', to: '/about' },
		{ key: 'sectors', to: '/sectors' },
		{ key: 'services', to: '/services' },
		{ key: 'training', to: '/training' },
	] as const;

	const media = [
		{ key: 'blog', to: '/media/blog' },
		{ key: 'news', to: '/media/news' },
		{ key: 'events', to: '/media/events' },
		{ key: 'gallery', to: '/media/gallery' },
		{ key: 'careers', to: '/careers' },
		{ key: 'contact', to: '/contact' },
	] as const;

	return (
		<footer className="bg-ink-deep text-paper">
			<div className="mx-auto w-full max-w-6xl px-6 py-16">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<img
							src="/logo.png"
							alt={t('brand')}
							className="h-18 w-18 object-contain"
							// eslint-disable-next-line @next/next/no-img-element
						/>
						<p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/65">
							{t('footer.about')}
						</p>
					</div>

					<nav aria-label={t('footer.quickLinksTitle')}>
						<h3 className="ui-label text-volt">{t('footer.quickLinksTitle')}</h3>
						<ul className="mt-5 space-y-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/75">
							{quick.map(({ key, to }) => (
								<li key={key}>
									<Link
										to={to}
										className="flex items-center gap-2 transition-colors hover:text-volt"
									>
										<ArrowIcon />
										{t(`navigation.${key}`)}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<nav aria-label={t('footer.mediaLinksTitle')}>
						<h3 className="ui-label text-volt">{t('footer.mediaLinksTitle')}</h3>
						<ul className="mt-5 space-y-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/75">
							{media.map(({ key, to }) => (
								<li key={key}>
									<Link
										to={to}
										className="flex items-center gap-2 transition-colors hover:text-volt"
									>
										<ArrowIcon />
										{t(`navigation.${key}`)}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div>
						<h3 className="ui-label text-volt">{t('footer.contactTitle')}</h3>
						<ul className="mt-5 space-y-3 font-mono text-sm leading-relaxed text-paper/75">
							<li className="flex items-start gap-2">
								<PinIcon className="mt-0.5" />
								<span>{t('contact.address')}</span>
							</li>
							<li className="flex items-start gap-2">
								<PhoneIcon className="mt-0.5" />
								<span className="flex flex-col gap-1">
									<a
										href="tel:+244923734199"
										className="transition-colors hover:text-volt"
									>
										+244 923 734 199
									</a>
									<a
										href="tel:+244945459270"
										className="transition-colors hover:text-volt"
									>
										+244 945 459 270
									</a>
								</span>
							</li>
							<li>
								<a
									href="mailto:geral@eneryetu.com"
									className="flex items-center gap-2 transition-colors hover:text-volt"
								>
									<EmailIcon />
									{t('contact.email')}
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/company/eneryetu/"
									target="_blank"
									rel="noreferrer noopener"
									className="flex items-center gap-2 transition-colors hover:text-volt"
								>
									<LinkedinIcon />
									LinkedIn
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="border-t border-paper/15">
				<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 font-mono text-xs text-paper/50 sm:flex-row">
					<p>
						{t('brand')} © {year}. {t('footer.rights')}
					</p>
					<p className="flex items-center gap-1">
						Desenvolvido por{' '}
						<a
							href="https://www.caxiauto.com/"
							target="_blank"
							rel="noreferrer noopener"
							className="text-paper/70 underline decoration-paper/30 underline-offset-2 transition-colors hover:text-volt hover:decoration-volt"
						>
							Caxinda divulga
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
