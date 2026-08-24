'use client';

import { Link } from '../lib/routing';
import { useTranslation } from 'react-i18next';

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
							className="h-14 w-14 object-contain"
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
									<Link to={to} className="transition-colors hover:text-volt">
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
									<Link to={to} className="transition-colors hover:text-volt">
										{t(`navigation.${key}`)}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div>
						<h3 className="ui-label text-volt">{t('footer.contactTitle')}</h3>
						<ul className="mt-5 space-y-3 font-mono text-sm leading-relaxed text-paper/75">
							<li>{t('contact.address')}</li>
							<li>
								<a
									href="tel:+244923734199"
									className="transition-colors hover:text-volt"
								>
									{t('contact.phone')}
								</a>
							</li>
							<li>
								<a
									href="mailto:geral@eneryetu.com"
									className="transition-colors hover:text-volt"
								>
									{t('contact.email')}
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/company/eneryetu/"
									target="_blank"
									rel="noreferrer noopener"
									className="transition-colors hover:text-volt"
								>
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
					<p>{t('tagline')}</p>
				</div>
			</div>
		</footer>
	);
}
