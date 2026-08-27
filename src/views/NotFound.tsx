'use client';

import { Link } from '../lib/routing';
import { useTranslation } from 'react-i18next';

export function NotFound() {
	const { t } = useTranslation();

	return (
		<section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-ink-deep py-28 text-paper">
			<div aria-hidden className="absolute inset-0 -z-10 grid-dark" />
			<div className="mx-auto w-full max-w-6xl px-6 text-center">
				<svg viewBox="0 0 200 24" aria-hidden className="mx-auto h-6 w-48" fill="none">
					<path
						d="M4 16 H84"
						className="stroke-blue"
						strokeWidth="2"
						strokeDasharray="4 4"
					/>
					<circle cx="99" cy="16" r="4" className="fill-sun" />
					<path
						d="M116 16 H196"
						className="stroke-sun"
						strokeWidth="2"
						strokeDasharray="4 4"
					/>
					<path d="M116 16 H196" className="pulse-path stroke-volt" strokeWidth="1.6" />
				</svg>
				<span className="mt-8 block ui-label text-volt">ENERYETU — network</span>
				<h1 className="mx-auto mt-4 max-w-3xl font-display text-6xl font-black uppercase leading-[0.92] tracking-tight text-paper sm:text-8xl">
					{t('notFound.title')}
				</h1>
				<p className="mx-auto mt-6 max-w-xl text-lg text-paper/70">{t('notFound.body')}</p>
				<Link to="/" className="btn btn-sun mt-10 px-6 py-3">
					{t('notFound.cta')}
				</Link>
			</div>
		</section>
	);
}
