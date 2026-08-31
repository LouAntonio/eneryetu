'use client';

import { useTranslation } from 'react-i18next';
import { Link } from '@/lib/routing';
import { ScrollReveal } from './ScrollReveal';

interface HeroImmersiveProps {
	backgroundImage: string;
}

/**
 * HeroImmersive — full-bleed industrial background image, two-layer headline
 * (Fraunces editorial line + Instrument Sans running line), two CTAs, and a
 * bottom meta strip with location, founded, sectors. Replaces the older hero
 * with a more cinematic composition.
 */
export function HeroImmersive({ backgroundImage }: HeroImmersiveProps) {
	const { t } = useTranslation();

	return (
		<section
			id="hero"
			className="relative isolate flex min-h-[92vh] items-center overflow-hidden text-paper lg:min-h-screen"
		>
			<div className="absolute inset-0 -z-30">
				<img
					src={backgroundImage}
					alt=""
					aria-hidden
					className="h-full w-full object-cover"
				/>
			</div>
			<div
				aria-hidden
				className="absolute inset-0 -z-20 bg-gradient-to-br from-ink-deep via-ink/80 to-ink/40"
			/>
			<div
				aria-hidden
				className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-deep/90 via-transparent to-transparent"
			/>

			<div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-28 sm:pt-32 lg:pt-40">
				<ScrollReveal animation="fade" delay={0}>
					<p className="mb-6 flex items-center gap-3 ui-label text-volt">
						<span className="node-live h-1.5 w-1.5 rounded-full bg-volt" />
						{t('solutions.hero.title')}
					</p>
				</ScrollReveal>

				<ScrollReveal animation="up" delay={80} className="max-w-5xl">
					<h1 className="font-editorial text-[clamp(2.75rem,6.5vw,5.75rem)] font-black leading-[0.92] tracking-[-0.02em] text-paper">
						{t('solutions.hero.headline')}
					</h1>
				</ScrollReveal>

				<ScrollReveal animation="up" delay={180} className="mt-6 max-w-2xl">
					<p className="text-base leading-relaxed text-paper/75 sm:text-lg lg:text-xl">
						{t('solutions.hero.lede')}
					</p>
				</ScrollReveal>

				<ScrollReveal animation="up" delay={260} className="mt-10">
					<div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
						<Link to="#proposal" className="btn-volt btn-volt-lg focus-ring">
							{t('solutions.requestProposal')}
						</Link>
						<Link to="#services" className="btn-ghost btn-ghost-lg focus-ring">
							{t('solutions.getInTouch')}
						</Link>
					</div>
				</ScrollReveal>

				<ScrollReveal animation="up" delay={360} className="mt-16">
					<dl className="grid max-w-3xl grid-cols-2 gap-x-10 gap-y-6 border-t border-paper/15 pt-6 sm:grid-cols-4">
						<div>
							<dt className="ui-label text-paper/45">
								{t('solutions.hero.meta.location')}
							</dt>
							<dd className="mt-2 font-mono text-sm text-paper/90">
								{t('solutions.hero.meta.locationValue')}
							</dd>
						</div>
						<div>
							<dt className="ui-label text-paper/45">
								{t('solutions.hero.meta.founded')}
							</dt>
							<dd className="mt-2 font-mono text-sm text-paper/90">
								{t('solutions.hero.meta.foundedValue')}
							</dd>
						</div>
						<div>
							<dt className="ui-label text-paper/45">
								{t('solutions.hero.meta.scope')}
							</dt>
							<dd className="mt-2 font-mono text-sm text-paper/90">
								{t('solutions.hero.meta.scopeValue')}
							</dd>
						</div>
						<div>
							<dt className="ui-label text-paper/45">
								{t('solutions.hero.meta.sectors')}
							</dt>
							<dd className="mt-2 font-mono text-sm text-paper/90">
								{t('solutions.hero.meta.sectorsValue')}
							</dd>
						</div>
					</dl>
				</ScrollReveal>
			</div>

			<div aria-hidden className="absolute inset-x-0 bottom-0 h-px w-full bg-volt/60" />
		</section>
	);
}
