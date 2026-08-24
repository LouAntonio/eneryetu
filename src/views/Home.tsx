'use client';

import { useEffect, useState } from 'react';
import { Link } from '../lib/routing';
import { useTranslation } from 'react-i18next';

import { Chip } from '../components/Chip';
import { CtaBand } from '../components/CtaBand';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { StatRow } from '../components/StatRow';

const HERO_IMAGES = [
	'https://images.unsplash.com/photo-1592263904934-b00851dc93eb?q=80&w=2400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=2400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2400&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2400&auto=format&fit=crop',
];

export function Home() {
	const { t } = useTranslation();
	const stats = t('stats.rows', { returnObjects: true });
	const services = t('services.items', { returnObjects: true });
	const sectors = t('sectors.items', { returnObjects: true });
	const points = t('intro.points', { returnObjects: true });
	const trainingFeatures = t('training.features', { returnObjects: true });
	const partners = t('partners.items', { returnObjects: true });
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			{/* HERO — full-bleed rotating images behind a translucent header */}
			<section id="hero" className="relative isolate overflow-hidden bg-ink-deep text-paper">
				<div className="absolute inset-0 -z-20">
					{HERO_IMAGES.map((src, index) => (
						<img
							key={src}
							src={src}
							alt=""
							aria-hidden
							className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
								index === currentImage ? 'opacity-100' : 'opacity-0'
							}`}
							loading={index === 0 ? 'eager' : 'lazy'}
						/>
					))}
				</div>
				<div aria-hidden className="absolute inset-0 -z-10 bg-ink/70" />
				<div aria-hidden className="absolute inset-0 -z-10 grid-dark opacity-70" />

				<div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-28 sm:pt-32 lg:pt-36">
					<span className="ui-label text-paper/70">{t('hero.eyebrow')}</span>
					<h1 className="mt-5 max-w-4xl font-display text-6xl font-black uppercase leading-[0.92] tracking-tight text-paper sm:text-7xl lg:text-8xl">
						{t('hero.title')}
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">
						{t('hero.lede')}
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-4">
						<Link to="/contact" className="btn btn-sun px-6 py-3">
							{t('hero.ctaPrimary')}
						</Link>
						<Link to="/services" className="btn btn-paper px-6 py-3">
							{t('hero.ctaSecondary')}
						</Link>
					</div>
				</div>

				<div aria-hidden className="relative z-10 h-1 w-full bg-volt" />
			</section>

			{/* STATS — equipment nameplates */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('stats.eyebrow')}
						title={t('stats.title')}
						tone="sun"
					/>
					<div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
						{stats.map((row) => (
							<StatRow key={row.label} value={row.value} label={row.label} />
						))}
					</div>
				</div>
			</section>

			{/* WHO WE ARE */}
			<section className="border-b border-line">
				<div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">
					<SectionHeading
						eyebrow={t('intro.eyebrow')}
						title={t('intro.title')}
						body={t('intro.body')}
					/>
					<div className="flex flex-col justify-end">
						<ul className="divide-y divide-line border-y border-line">
							{points.map((point, index) => (
								<li
									key={point}
									className="flex items-center gap-4 bg-white py-4 pl-4 pr-6"
								>
									<span className="font-mono text-xs text-slate">
										{String(index + 1).padStart(2, '0')}
									</span>
									<span className="font-display text-lg font-semibold uppercase tracking-tight text-ink">
										{point}
									</span>
								</li>
							))}
						</ul>
						<Link
							to="/about"
							className="btn btn-mono mt-6 justify-self-start px-5 py-2.5"
						>
							{t('intro.cta')}
						</Link>
					</div>
				</div>
			</section>

			{/* SERVICES — equipment schedule */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
						<SectionHeading
							eyebrow={t('services.eyebrow')}
							title={t('services.title')}
							body={t('services.body')}
							tone="blue"
						/>
						<Link to="/services" className="btn btn-mono shrink-0 px-5 py-2.5">
							{t('common.exploreServices')}
						</Link>
					</div>
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
						{services.map((service, index) => (
							<ServiceCard
								key={service.title}
								index={index + 1}
								title={service.title}
								blurb={service.blurb}
								spec={service.spec}
							/>
						))}
					</div>
				</div>
			</section>

			{/* SECTORS */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('sectors.eyebrow')}
						title={t('sectors.title')}
						body={t('sectors.body')}
						tone="sun"
					/>
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
						{sectors.map((sector) => (
							<Link
								key={sector.title}
								to="/sectors"
								className="group block bg-white p-5 transition-colors hover:bg-ink"
							>
								<div>
									<h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-paper">
										{sector.title}
									</h3>
									<p className="mt-1 text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
										{sector.blurb}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* TRAINING */}
			<section className="border-b border-line bg-ink-deep text-paper">
				<div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-20">
					<div>
						<SectionHeading
							eyebrow={t('training.eyebrow')}
							title={t('training.title')}
							tone="volt"
							className="text-paper [&_.ui-label]:text-paper/60 [&_h2]:text-paper"
						/>
						<p className="mt-4 max-w-xl text-paper/70">{t('training.body')}</p>
					</div>
					<div className="justify-self-start">
						<div className="flex flex-wrap items-start gap-2">
							{trainingFeatures.map((feature) => (
								<Chip key={feature}>{feature}</Chip>
							))}
						</div>
						<Link to="/training" className="btn btn-sun mt-6 px-6 py-3">
							{t('common.learnMore')}
						</Link>
					</div>
				</div>
			</section>

			{/* PARTNERS */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
					<p className="ui-label text-sun-deep">{t('partners.eyebrow')}</p>
					<h2 className="mt-4 font-display text-4xl font-black uppercase tracking-tight text-ink sm:text-5xl">
						{t('partners.title')}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-slate">{t('partners.body')}</p>
					{Array.isArray(partners) && partners.length > 0 && (
						<div className="mx-auto mt-10 grid max-w-4xl gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
							{partners.map((name) => (
								<div key={name} className="bg-white p-5">
									<p className="font-display text-sm font-bold uppercase tracking-tight text-ink">
										{name}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</section>

			<CtaBand />
		</>
	);
}
