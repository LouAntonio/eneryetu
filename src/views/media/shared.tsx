'use client';

import { Fragment, type ReactNode } from 'react';
import { Link } from '../../lib/routing';
import { useTranslation } from 'react-i18next';

export function Postmark({ place, className = '' }: { place?: string; className?: string }) {
	return (
		<span className={`inline-flex flex-col items-center ${className}`} aria-hidden>
			<svg viewBox="0 0 96 96" className="h-20 w-20" fill="none">
				<circle
					cx="48"
					cy="48"
					r="42"
					stroke="#d9822b"
					strokeWidth="1.5"
					strokeDasharray="2 5"
				/>
				<circle cx="48" cy="48" r="26" fill="#ffb43a" />
				<g stroke="#d9822b" strokeWidth="3" strokeLinecap="round">
					<path d="M48 12v6" />
					<path d="M48 12v6" transform="rotate(45 48 48)" />
					<path d="M48 12v6" transform="rotate(90 48 48)" />
					<path d="M48 12v6" transform="rotate(135 48 48)" />
					<path d="M48 12v6" transform="rotate(180 48 48)" />
					<path d="M48 12v6" transform="rotate(225 48 48)" />
					<path d="M48 12v6" transform="rotate(270 48 48)" />
					<path d="M48 12v6" transform="rotate(315 48 48)" />
				</g>
			</svg>
			{place ? (
				<span className="mt-1 font-editorial text-sm italic text-sand">{place}</span>
			) : null}
		</span>
	);
}

export function SunGlyph({ className = '' }: { className?: string }) {
	return (
		<svg viewBox="0 0 160 160" className={className} fill="none" aria-hidden>
			<circle cx="80" cy="80" r="40" fill="#ffb43a" opacity="0.92" />
			<circle
				cx="80"
				cy="80"
				r="40"
				stroke="#d9822b"
				strokeWidth="1.5"
				strokeDasharray="3 6"
				opacity="0.7"
			/>
			<g stroke="#d9822b" strokeWidth="4" strokeLinecap="round" opacity="0.85">
				<path d="M80 20v10" />
				<path d="M80 20v10" transform="rotate(45 80 80)" />
				<path d="M80 20v10" transform="rotate(90 80 80)" />
				<path d="M80 20v10" transform="rotate(135 80 80)" />
				<path d="M80 20v10" transform="rotate(180 80 80)" />
				<path d="M80 20v10" transform="rotate(225 80 80)" />
				<path d="M80 20v10" transform="rotate(270 80 80)" />
				<path d="M80 20v10" transform="rotate(315 80 80)" />
			</g>
		</svg>
	);
}

export function CategoryTag({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex items-center rounded-full bg-amber px-3 py-1 text-xs font-semibold text-ink">
			{children}
		</span>
	);
}

export function Byline({
	items,
	className = '',
}: {
	items: Array<ReactNode | null>;
	className?: string;
}) {
	const visible = items.filter(Boolean);

	return (
		<p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-sand ${className}`}>
			{visible.map((item, index) => (
				<Fragment key={index}>
					{index > 0 ? (
						<span aria-hidden className="text-line-warm">
							—
						</span>
					) : null}
					{item}
				</Fragment>
			))}
		</p>
	);
}

export function CtaPill({ to, children }: { to: string; children: ReactNode }) {
	return (
		<Link
			to={to}
			className="inline-flex items-center gap-2 rounded-full bg-warm-ink px-6 py-3 font-editorial text-base font-semibold text-bone transition-colors hover:bg-amber hover:text-warm-ink"
		>
			{children}
		</Link>
	);
}

export function LoadingBoard({ label }: { label: string }) {
	return (
		<section className="min-h-[40vh] bg-bone">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="flex items-center gap-3 rounded-2xl bg-card px-5 py-6">
					<span aria-hidden className="node-live h-2.5 w-2.5 rounded-full bg-amber" />
					<span className="text-sm font-medium text-sand">{label}</span>
				</div>
			</div>
		</section>
	);
}

interface EmptyBoardProps {
	titleKey: 'blog' | 'news' | 'events' | 'gallery';
	cta?: { label: string; to: string };
}

export function EmptyBoard({ titleKey, cta }: EmptyBoardProps) {
	const { t } = useTranslation();
	const section = t(`media.${titleKey}`, { returnObjects: true });

	return (
		<section className="min-h-[40vh] bg-bone">
			<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
				<div className="relative overflow-hidden rounded-2xl border border-line-warm bg-card p-8 sm:p-12">
					<SunGlyph className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 opacity-40" />
					<div className="relative max-w-2xl">
						<CategoryTag>{section.title}</CategoryTag>
						<h1 className="mt-5 font-editorial text-4xl font-semibold leading-[1.05] text-warm-ink sm:text-5xl">
							{section.emptyTitle}
						</h1>
						<p className="mt-4 text-lg leading-relaxed text-sand">
							{section.emptyBody}
						</p>
						{cta ? (
							<div className="mt-8">
								<CtaPill to={cta.to}>{cta.label}</CtaPill>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
}

export function BackLink({ to, label }: { to: string; label: string }) {
	return (
		<Link
			to={to}
			className="inline-flex items-center gap-2 text-sm font-medium text-sand transition-colors hover:text-amber"
		>
			<span aria-hidden className="text-amber">
				←
			</span>
			{label}
		</Link>
	);
}

export function SpecRow({ label, value }: { label: string; value?: string | null }) {
	return (
		<div className="flex items-baseline justify-between gap-6 py-3">
			<dt className="shrink-0 text-sm text-sand">{label}</dt>
			<dd className="text-right font-mono text-[0.78rem] text-warm-ink">{value || '—'}</dd>
		</div>
	);
}
