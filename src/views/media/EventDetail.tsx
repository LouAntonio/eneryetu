'use client';

import { Link, useParams } from '../../lib/routing';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { assetUrl } from '../../lib/assets';
import { api } from '../../services/api';
import type { Event } from '../../types';
import { BackLink, CategoryTag, EmptyBoard, LoadingBoard, SpecRow } from './shared';
import { formatDate } from './format';

export function MediaEventDetail() {
	const { t, i18n } = useTranslation();
	const { slug } = useParams<{ slug: string }>();
	const { data: event, isLoading } = useQuery({
		queryKey: ['media', 'event', slug],
		enabled: Boolean(slug),
		queryFn: async () => (await api.get<{ data: Event }>(`/events/slug/${slug}`)).data,
	});

	if (isLoading) {
		return <LoadingBoard label={t('media.loading')} />;
	}

	if (!event) {
		return <EmptyBoard titleKey="events" />;
	}

	const cover = assetUrl(event.coverImage);
	const locale = i18n.resolvedLanguage ?? 'en';
	const date = new Date(event.startDate);
	const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
	const cityCountry = [event.countryName, event.city].filter(Boolean).join(', ');

	return (
		<article className="min-h-[40vh] bg-bone">
			<div className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20">
				<BackLink to="/media/events" label={t('media.events.title')} />

				<div className="relative mt-8 overflow-hidden rounded-2xl bg-warm-ink p-8 text-bone sm:p-10">
					<div className="flex flex-wrap items-center gap-4">
						<span className="inline-flex flex-col items-center rounded-full bg-sun px-5 py-2.5 text-warm-ink">
							<span className="font-editorial text-2xl font-bold leading-none">
								{String(date.getDate()).padStart(2, '0')}
							</span>
							<span className="mt-0.5 text-xs font-medium">
								{month} {date.getFullYear()}
							</span>
						</span>
						<CategoryTag>
							{event.eventType?.name ?? t('media.events.title')}
						</CategoryTag>
					</div>
					<h1 className="mt-6 max-w-2xl font-editorial text-4xl font-semibold leading-[1.05] sm:text-5xl">
						{event.title}
					</h1>
					{event.subtitle ? (
						<p className="mt-3 font-editorial text-xl italic text-bone/70">
							{event.subtitle}
						</p>
					) : null}
					{cityCountry ? (
						<p className="mt-4 text-sm text-bone/70">{cityCountry}</p>
					) : null}
				</div>

				<div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
					<div className="min-w-0">
						{cover ? (
							<img
								src={cover}
								alt=""
								className="mb-10 aspect-[16/9] w-full rounded-2xl object-cover"
							/>
						) : // eslint-disable-next-line @next/next/no-img-element
						null}
						{event.description ? (
							<p className="font-editorial text-xl leading-relaxed text-warm-ink">
								{event.description}
							</p>
						) : null}
						{event.fullDescription ? (
							<div
								className="rich-content mt-8"
								dangerouslySetInnerHTML={{ __html: event.fullDescription }}
							/>
						) : null}
					</div>

					<aside className="lg:order-none">
						<div className="rounded-2xl border border-line-warm bg-card p-6 lg:sticky lg:top-24">
							<span className="font-editorial text-lg font-semibold text-warm-ink">
								{t('media.events.spec.title')}
							</span>
							<dl className="mt-3 divide-y divide-line-warm border-t border-line-warm">
								<SpecRow
									label={t('media.events.spec.date')}
									value={event.displayDate}
								/>
								<SpecRow
									label={t('media.events.spec.startDate')}
									value={formatDate(event.startDate, locale)}
								/>
								{event.endDate ? (
									<SpecRow
										label={t('media.events.spec.endDate')}
										value={formatDate(event.endDate, locale)}
									/>
								) : null}
								<SpecRow
									label={t('media.events.spec.type')}
									value={event.eventType?.name}
								/>
								<SpecRow
									label={t('media.events.spec.country')}
									value={event.countryName}
								/>
								<SpecRow label={t('media.events.spec.city')} value={event.city} />
								<SpecRow label={t('media.events.spec.venue')} value={event.venue} />
							</dl>
							<Link
								to="/contact"
								className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun px-6 py-3 font-editorial text-base font-semibold text-warm-ink transition-colors hover:bg-amber"
							>
								{t('media.events.cta')} →
							</Link>
						</div>
					</aside>
				</div>
			</div>
		</article>
	);
}
