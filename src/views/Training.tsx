'use client';

import { useState } from 'react';
import { Link } from '../lib/routing';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { api } from '../services/api';
import type { Training as TrainingType, Paginated } from '../types';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { LoadingBoard } from './media/shared';

function formatCurrency(price: number | null, currency: string): string {
	if (!price) return '';
	return new Intl.NumberFormat('pt-AO', {
		style: 'currency',
		currency: currency || 'AOA',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
}

function TrainingCard({ training }: { training: TrainingType }) {
	const { t } = useTranslation();

	return (
		<article className="group flex flex-col overflow-hidden rounded-2xl border border-line-warm bg-card transition-shadow hover:shadow-lg">
			{training.coverImage ? (
				<img
					src={training.coverImage}
					alt=""
					className="aspect-[16/10] w-full object-cover"
				/>
			) : (
				<div className="aspect-[16/10] w-full bg-gradient-to-br from-evergreen/10 to-sand/10" />
			)}
			<div className="flex flex-1 flex-col p-6">
				<div className="flex flex-wrap items-center gap-2">
					<span className="inline-flex items-center rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
						{training.deliveryMode}
					</span>
					{training.durationDays ? (
						<span className="text-xs text-sand">{training.durationDays} {t('training.days', { count: training.durationDays })}</span>
					) : null}
				</div>
				<h3 className="mt-4 font-editorial text-xl font-semibold leading-[1.15] text-warm-ink">
					{training.title}
				</h3>
				{training.price ? (
					<p className="mt-3 font-mono text-sm font-medium text-amber">
						{formatCurrency(training.price, training.currency)}
					</p>
				) : null}
				<div className="mt-auto pt-4">
					<Link
						to={`/training/${training.slug}`}
						className="inline-flex items-center gap-2 font-editorial text-base font-semibold text-warm-ink transition-colors hover:text-amber"
					>
						{t('common.readMore')}
						<span
							aria-hidden
							className="text-amber transition-transform duration-200 group-hover:translate-x-1"
						>
							→
						</span>
					</Link>
				</div>
			</div>
		</article>
	);
}

export function Training() {
	const { t } = useTranslation();
	const [filter, setFilter] = useState<string>('all');

	const FILTER_OPTIONS = [
		{ key: 'all', label: t('training.all') },
		{ key: 'PRESENCIAL', label: t('training.presencial') },
		{ key: 'ONLINE', label: t('training.online') },
		{ key: 'AUTOFORMACAO', label: t('training.autoformacao') },
	] as const;

	const { data: trainings, isLoading } = useQuery({
		queryKey: ['training', 'list'],
		queryFn: async () =>
			(
				await api.get<Paginated<TrainingType>>('/trainings', {
					params: { status: 'PUBLICADO' },
				})
			).data,
	});

	const filtered = trainings?.filter((tr) => {
		if (filter === 'all') return true;
		return tr.deliveryMode?.toUpperCase() === filter;
	});

	return (
		<>
			<PageHero
				id="hero"
				eyebrow={t('training.eyebrow')}
				title={t('training.title')}
				body={t('training.body')}
				image={t('training.heroImage')}
			/>

			<section className="border-b border-line">
				<div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
					<SectionHeading
						eyebrow={t('training.eyebrow')}
						title={t('training.title')}
						body={t('training.body')}
						tone="volt"
					/>
					<div className="flex flex-wrap gap-2 justify-self-start lg:pt-2">
						{FILTER_OPTIONS.map((opt) => (
							<button
								key={opt.key}
								type="button"
								onClick={() => setFilter(opt.key)}
								className={`inline-flex items-center rounded-full border px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
									filter === opt.key
										? 'border-amber bg-amber/10 text-amber'
										: 'border-line bg-white text-sand hover:border-amber/50'
								}`}
							>
								{opt.label}
							</button>
						))}
					</div>
				</div>
			</section>

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					{isLoading ? (
						<LoadingBoard label={t('media.loading')} />
					) : !filtered || filtered.length === 0 ? (
						<div className="rounded-2xl border border-line-warm bg-card p-8 sm:p-12">
							<p className="font-editorial text-xl italic text-sand">
								{t('training.emptyNotFound')}
							</p>
						</div>
					) : (
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{filtered.map((training) => (
								<TrainingCard key={training.id} training={training} />
							))}
						</div>
					)}
				</div>
			</section>

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="border-2 border-paper/20 bg-ink-deep p-8 text-paper sm:p-12">
						<div className="flex items-center gap-3">
							<span
								aria-hidden
								className="node-live h-2.5 w-2.5 rounded-full bg-volt"
							/>
							<span className="ui-label text-volt">{t('training.eyebrow')}</span>
						</div>
						<p className="mt-6 max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
							{t('training.title')}
						</p>
						<p className="mt-4 max-w-2xl text-paper/70">{t('training.body')}</p>
						<Link to="/contact" className="btn btn-sun mt-8 px-6 py-3">
							{t('common.requestQuote')}
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
