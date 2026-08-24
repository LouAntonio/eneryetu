'use client';

import { NavLink } from '../../lib/routing';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

import { Postmark } from './shared';

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
			<header className="border-b border-line-warm bg-bone">
				<div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-8 px-6 pb-14 pt-28">
					<div className="max-w-2xl">
						<span className="text-sm font-semibold tracking-wide text-amber">
							{t('media.eyebrow')}
						</span>
						<h1 className="mt-4 font-editorial text-5xl font-semibold leading-[1.02] text-warm-ink sm:text-6xl">
							{t('media.title')}
						</h1>
						<p className="mt-5 max-w-xl text-lg leading-relaxed text-sand">
							{t('media.body')}
						</p>
					</div>
					<Postmark place="LUANDA" className="hidden shrink-0 lg:inline-flex" />
				</div>
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
