'use client';

import { NavLink } from '../../lib/routing';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

const MEDIA_KEYS = ['blog', 'news', 'events', 'gallery'] as const;
type MediaKey = (typeof MEDIA_KEYS)[number];

export function MediaLayout({ children }: { children: ReactNode }) {
	const { t } = useTranslation();

	const labels: Record<MediaKey, string> = {
		blog: t('navigation.blog'),
		news: t('navigation.news'),
		events: t('navigation.events'),
		gallery: t('navigation.gallery'),
	};

	return (
		<>
			<header
				id="hero"
				className="relative isolate min-h-screen overflow-hidden border-b border-line-warm bg-bone text-paper"
			>
				<img
					src={t('media.heroImage')}
					alt=""
					aria-hidden
					className="absolute inset-0 -z-20 h-full w-full object-cover"
					loading="eager"
				/>
				<div aria-hidden className="absolute inset-0 -z-10 bg-ink/70" />
				<div aria-hidden className="absolute inset-0 -z-10 grid-dark opacity-70" />

				<div className="relative mx-auto flex w-full max-w-6xl items-end justify-between gap-8 px-6 pb-14 pt-28">
					<div className="max-w-2xl">
						<span className="ui-label text-paper/70">{t('media.eyebrow')}</span>
						<h1 className="mt-5 max-w-3xl font-display text-6xl font-black uppercase leading-[0.92] tracking-tight text-paper sm:text-7xl">
							{t('media.title')}
						</h1>
						<p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/75">
							{t('media.body')}
						</p>
					</div>
				</div>

				<div aria-hidden className="absolute bottom-0 inset-x-0 z-10 h-1 w-full bg-volt" />
			</header>

			<nav aria-label={t('navigation.media')} className="border-b border-line-warm bg-bone">
				<div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-6 py-4">
					{MEDIA_KEYS.map((key) => (
						<NavLink
							key={key}
							to={`/media/${key}`}
							className={({ isActive }) =>
								`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
									isActive
										? 'bg-warm-ink text-bone'
										: 'text-sand hover:bg-card hover:text-warm-ink'
								}`
							}
						>
							{labels[key]}
						</NavLink>
					))}
				</div>
			</nav>

			{children}
		</>
	);
}
