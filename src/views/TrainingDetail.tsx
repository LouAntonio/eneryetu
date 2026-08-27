'use client';

import { Link, useParams } from '../lib/routing';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { api } from '../services/api';
import type { Training } from '../types';
import { BackLink, LoadingBoard, SpecRow } from './media/shared';

function parseJsonArray(value: string | null | undefined): string[] {
	if (!value) return [];
	try {
		const parsed = JSON.parse(value);
		if (Array.isArray(parsed)) return parsed;
		return [];
	} catch {
		return [];
	}
}

function formatCurrency(price: number | null, currency: string): string {
	if (!price) return '';
	return new Intl.NumberFormat('pt-AO', {
		style: 'currency',
		currency: currency || 'AOA',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);
}

export function TrainingDetail() {
	const { t } = useTranslation();
	const { slug } = useParams<{ slug: string }>();
	const { data: training, isLoading } = useQuery({
		queryKey: ['training', 'detail', slug],
		enabled: Boolean(slug),
		queryFn: async () => (await api.get<{ data: Training }>(`/trainings/slug/${slug}`)).data,
	});

	if (isLoading) {
		return <LoadingBoard label={t('media.loading')} />;
	}

	if (!training) {
		return (
			<section className="min-h-[40vh] bg-bone">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="rounded-2xl border border-line-warm bg-card p-8 sm:p-12">
						<h1 className="font-editorial text-3xl font-semibold text-warm-ink">
							{t('training.detail.notFound')}
						</h1>
						<p className="mt-4 text-sand">{t('training.detail.notFoundBody')}</p>
						<Link to="/training" className="btn btn-sun mt-6 px-6 py-3">
							← {t('training.detail.back')}
						</Link>
					</div>
				</div>
			</section>
		);
	}

	const outcomes = parseJsonArray(training.learningOutcomes);
	const modules = parseJsonArray(training.modules);
	const prerequisites = training.prerequisites;

	return (
		<article className="min-h-[40vh] bg-bone">
			<div className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20">
				<BackLink to="/training" label={t('training.eyebrow')} />

				{training.coverImage && (
					<div className="relative mt-8 overflow-hidden rounded-2xl">
						<img
							src={training.coverImage}
							alt=""
							className="aspect-[16/9] w-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-warm-ink/60 to-transparent" />
					</div>
				)}

				<div className="mt-8">
					<div className="flex flex-wrap items-center gap-3">
						<span className="inline-flex items-center rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
							{training.deliveryMode}
						</span>
						{training.durationDays ? (
							<span className="text-sm text-sand">
								{training.durationDays}{' '}
								{t('training.days', { count: training.durationDays })}
							</span>
						) : null}
					</div>

					<h1 className="mt-5 max-w-3xl font-editorial text-4xl font-semibold leading-[1.05] text-warm-ink sm:text-5xl">
						{training.title}
					</h1>

					{training.price ? (
						<div className="mt-6 inline-flex items-center rounded-xl bg-amber/10 px-5 py-3">
							<span className="font-mono text-lg font-bold text-amber">
								{formatCurrency(training.price, training.currency)}
							</span>
						</div>
					) : null}

					<div className="mt-6 flex flex-wrap gap-3">
						{training.includesCert && (
							<span className="inline-flex items-center gap-1.5 rounded-full bg-volt/15 px-3 py-1.5 text-xs font-semibold text-volt">
								✓ {t('training.detail.certificate')}
							</span>
						)}
						{training.includesExam && (
							<span className="inline-flex items-center gap-1.5 rounded-full bg-blue/15 px-3 py-1.5 text-xs font-semibold text-blue">
								✓ {t('training.detail.exam')}
							</span>
						)}
					</div>
				</div>

				<div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
					<div className="min-w-0">
						{training.description && (
							<div
								className="rich-content font-editorial text-lg leading-relaxed text-warm-ink"
								dangerouslySetInnerHTML={{ __html: training.description }}
							/>
						)}

						{outcomes.length > 0 && (
							<div className="mt-10">
								<h2 className="font-editorial text-2xl font-semibold text-warm-ink">
									{t('training.detail.outcomes')}
								</h2>
								<ul className="mt-4 space-y-2">
									{outcomes.map((item, i) => (
										<li key={i} className="flex items-start gap-2 text-sand">
											<span className="mt-1 text-amber">•</span>
											{item}
										</li>
									))}
								</ul>
							</div>
						)}

						{modules.length > 0 && (
							<div className="mt-10">
								<h2 className="font-editorial text-2xl font-semibold text-warm-ink">
									{t('training.detail.modules')}
								</h2>
								<ol className="mt-4 space-y-3">
									{modules.map((item, i) => (
										<li key={i} className="flex items-start gap-3 text-sand">
											<span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber/15 font-mono text-xs font-bold text-amber">
												{i + 1}
											</span>
											{item}
										</li>
									))}
								</ol>
							</div>
						)}

						{prerequisites && (
							<div className="mt-10">
								<h2 className="font-editorial text-2xl font-semibold text-warm-ink">
									{t('training.detail.prerequisites')}
								</h2>
								<p className="mt-4 leading-relaxed text-sand">{prerequisites}</p>
							</div>
						)}
					</div>

					<aside className="order-first lg:order-none">
						<div className="rounded-2xl border border-line-warm bg-card p-6 lg:sticky lg:top-24">
							<span className="font-editorial text-lg font-semibold text-warm-ink">
								{t('training.detail.specSheet')}
							</span>
							<dl className="mt-3 divide-y divide-line-warm border-t border-line-warm">
								<SpecRow
									label={t('training.detail.modality')}
									value={training.deliveryMode}
								/>
								<SpecRow
									label={t('training.detail.duration')}
									value={
										training.durationDays
											? `${training.durationDays} ${t('training.days', { count: training.durationDays })}`
											: null
									}
								/>
								{training.price ? (
									<SpecRow
										label={t('training.detail.price')}
										value={formatCurrency(training.price, training.currency)}
									/>
								) : null}
								{(training.pduCredits || training.ceuCredits) && (
									<SpecRow
										label={t('training.detail.credits')}
										value={[
											training.pduCredits
												? `${training.pduCredits} PDU`
												: null,
											training.ceuCredits
												? `${training.ceuCredits} CEU`
												: null,
										]
											.filter(Boolean)
											.join(' / ')}
									/>
								)}
								{training.pmiProgramNumber && (
									<SpecRow
										label={t('training.detail.pmi')}
										value={training.pmiProgramNumber}
									/>
								)}
							</dl>
							<Link
								to="/contact"
								className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun px-6 py-3 font-editorial text-base font-semibold text-warm-ink transition-colors hover:bg-amber"
							>
								{t('training.detail.enroll')} →
							</Link>
						</div>
					</aside>
				</div>
			</div>
		</article>
	);
}
