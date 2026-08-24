'use client';

import { Link } from '../../lib/routing';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../services/api';
import type { Event, Paginated } from '../../types';
import { CategoryTag, EmptyBoard, LoadingBoard } from './shared';

function Ticket({ event, index }: { event: Event; index: number }) {
	const { t, i18n } = useTranslation();
	const locale = i18n.resolvedLanguage ?? 'en';
	const date = new Date(event.startDate);
	const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
	const year = date.getFullYear();
	const featured = index === 0;
	const location = [event.countryName, event.city, event.venue].filter(Boolean).join(' · ');

	return (
		<li className="relative">
			<Link
				to={`/media/events/${event.slug}`}
				className={`group relative block rounded-2xl p-6 transition-colors sm:p-8 ${
					featured ? 'bg-warm-ink text-bone' : 'border border-line-warm bg-card'
				}`}
			>
				<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
					<div className="inline-flex shrink-0 flex-col items-center self-start rounded-full bg-sun px-5 py-3 text-warm-ink sm:self-center">
						<span className="font-editorial text-3xl font-bold leading-none">
							{String(date.getDate()).padStart(2, '0')}
						</span>
						<span className="mt-1 text-xs font-medium">
							{month} {year}
						</span>
					</div>
					<div className="min-w-0 flex-1">
						<div className="flex flex-wrap items-center gap-3">
							<CategoryTag>
								{event.eventType?.name ?? t('media.events.title')}
							</CategoryTag>
							{location ? (
								<span
									className={`text-sm ${featured ? 'text-bone/70' : 'text-sand'}`}
								>
									{location}
								</span>
							) : null}
						</div>
						<h3
							className={`mt-3 font-editorial text-2xl font-semibold leading-[1.15] sm:text-3xl ${
								featured ? 'text-bone' : 'text-warm-ink group-hover:text-amber'
							}`}
						>
							{event.title}
						</h3>
						{event.subtitle ? (
							<p
								className={`mt-1 font-editorial text-base italic ${
									featured ? 'text-bone/70' : 'text-sand'
								}`}
							>
								{event.subtitle}
							</p>
						) : null}
						{event.description ? (
							<p
								className={`mt-3 text-sm leading-relaxed ${
									featured ? 'text-bone/70' : 'text-sand'
								}`}
							>
								{event.description}
							</p>
						) : null}
					</div>
					<span
						className={`hidden shrink-0 items-center justify-self-end font-editorial text-lg font-semibold sm:inline-flex ${
							featured ? 'text-sun' : 'text-warm-ink group-hover:text-amber'
						}`}
					>
						{t('common.readMore')} →
					</span>
				</div>
			</Link>
			<span aria-hidden className="absolute -bottom-2 left-8 h-4 w-4 rounded-full bg-bone" />
			<span aria-hidden className="absolute -bottom-2 right-8 h-4 w-4 rounded-full bg-bone" />
		</li>
	);
}

export function MediaEvents() {
	const { t } = useTranslation();
	const { data, isLoading } = useQuery({
		queryKey: ['media', 'events'],
		queryFn: async () =>
			(await api.get<Paginated<Event>>('/events', { params: { limit: 12 } })).data,
	});

	if (isLoading) {
		return <LoadingBoard label={t('media.loading')} />;
	}

	if (!data || data.length === 0) {
		return (
			<EmptyBoard titleKey="events" cta={{ label: t('media.ctaContact'), to: '/contact' }} />
		);
	}

	return (
		<section className="min-h-[40vh] bg-bone">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="flex items-center justify-between">
					<span className="font-editorial text-xl font-semibold italic text-sand">
						{t('media.events.title')}
					</span>
					<span className="rounded-full bg-card px-3 py-1 text-sm font-medium text-sand tabular-nums">
						{data.length}
					</span>
				</div>
				<ul className="mt-8 grid gap-6">
					{data.map((event, index) => (
						<Ticket key={event.id} event={event} index={index} />
					))}
				</ul>
			</div>
		</section>
	);
}
