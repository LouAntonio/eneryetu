'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { api } from '../services/api';
import type { JobListing, Paginated } from '../types';
import { ApplicationForm } from '../components/ApplicationForm';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { LoadingBoard } from './media/shared';

const JOB_TYPE_LABELS: Record<string, string> = {
	FULLTIME: 'Full-time',
	PARTTIME: 'Part-time',
	ESTAGIO: 'Estágio',
	CONTRATO: 'Contrato',
};

function JobCard({ job }: { job: JobListing }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<article className="rounded-2xl border border-line-warm bg-card p-6 transition-shadow hover:shadow-lg">
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0">
					<h3 className="font-editorial text-lg font-semibold text-warm-ink">
						{job.title}
					</h3>
					<div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-sand">
						{job.department && <span>{job.department}</span>}
						{job.department && job.location && <span aria-hidden>·</span>}
						{job.location && <span>{job.location}</span>}
					</div>
				</div>
				<span className="shrink-0 inline-flex items-center rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
					{JOB_TYPE_LABELS[job.jobType] ?? job.jobType}
				</span>
			</div>
			<button
				type="button"
				onClick={() => setExpanded(!expanded)}
				className="mt-4 inline-flex items-center gap-2 font-editorial text-sm font-semibold text-warm-ink transition-colors hover:text-amber"
			>
				{expanded ? 'Fechar' : 'Ver detalhes'}
				<span
					aria-hidden
					className={`transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
				>
					→
				</span>
			</button>
			{expanded && (
				<div className="mt-4 border-t border-line-warm pt-4">
					<div
						className="rich-content text-sm leading-relaxed text-sand"
						dangerouslySetInnerHTML={{ __html: job.description }}
					/>
				</div>
			)}
		</article>
	);
}

export function Careers() {
	const { t } = useTranslation();
	const { data: jobs, isLoading } = useQuery({
		queryKey: ['careers', 'jobs'],
		queryFn: async () =>
			(await api.get<Paginated<JobListing>>('/jobs', { params: { status: 'PUBLICADO' } }))
				.data,
	});

	return (
		<>
			<PageHero
				id="hero"
				eyebrow={t('careers.eyebrow')}
				title={t('careers.title')}
				body={t('careers.body')}
				image={t('careers.heroImage')}
			/>

			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('careers.eyebrow')}
						title="Vagas Abertas"
						tone="blue"
					/>

					{isLoading ? (
						<LoadingBoard label={t('media.loading')} />
					) : !jobs || jobs.length === 0 ? (
						<p className="mt-6 text-sand">De momento não há vagas abertas.</p>
					) : (
						<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{jobs.map((job) => (
								<JobCard key={job.id} job={job} />
							))}
						</div>
					)}

					<div className="mt-16 border-t border-line pt-16">
						<p className="font-mono text-sm text-slate">
							{t('careers.applyLabel')}{' '}
							<a
								href="mailto:geral@eneryetu.com"
								className="text-ink underline decoration-volt decoration-2 underline-offset-4 transition-colors hover:text-blue"
							>
								geral@eneryetu.com
							</a>
						</p>
						<p className="mt-2 font-mono text-xs text-slate/70">
							{t('careers.applyHint')}
						</p>
					</div>

					<div className="mt-16 border-t border-line pt-16">
						<SectionHeading
							eyebrow={t('careers.eyebrow')}
							title={t('careers.form.title')}
							tone="blue"
						/>
						<p className="mt-4 max-w-2xl text-slate">{t('careers.form.subtitle')}</p>
						<div className="mt-10 max-w-3xl">
							<ApplicationForm />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
