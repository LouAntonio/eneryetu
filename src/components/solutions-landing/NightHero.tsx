'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@/lib/routing';
import { LanguageSwitcher } from '../LanguageSwitcher';

const HERO_IMG =
	'/images/others/Fabrication%20%26%20construction%20of%20structures.jpeg';
const BRAND_IMG = '/images/parceiros/eneryetusolutions.png';

interface ServiceItem {
	en: string;
	pt: string;
}
interface ServiceGroup {
	name: string;
	items: ServiceItem[];
}

export function NightHero() {
	const { t } = useTranslation();
	const groups = useMemo(
		() =>
			t('solutionsLanding.services.groups', { returnObjects: true }) as ServiceGroup[],
		[t],
	);
	const tickerItems = useMemo(
		() => groups.flatMap((g) => g.items.map((it) => it.en)),
		[groups],
	);

	const nav = [
		{ href: '#servicos', label: t('solutionsLanding.nav.services') },
		{ href: '#instalacoes', label: t('solutionsLanding.nav.facilities') },
		{ href: '#fabrico', label: t('solutionsLanding.nav.manufacturing') },
		{ href: '#parceiros', label: t('solutionsLanding.nav.partners') },
	];

	const readouts = [
		{ value: '13', label: t('solutionsLanding.hero.readoutServices') },
		{ value: '50 000 m²', label: t('solutionsLanding.hero.readoutArea') },
		{ value: '6', label: t('solutionsLanding.hero.readoutPartners') },
	];

	return (
		<header className="relative flex min-h-screen flex-col overflow-hidden">
			{/* Background image + dark overlay */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: `url(${HERO_IMG})` }}
				aria-hidden
			/>
			<div
				className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/78 to-void"
				aria-hidden
			/>
			<div
				className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(76,201,240,0.18),transparent_60%)]"
				aria-hidden
			/>

			{/* Top bar */}
			<div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
				<Link to="/eneryetu-solutions" className="flex items-center gap-3" aria-label="ENERYETU Solutions">
					<img src={BRAND_IMG} alt="ENERYETU Solutions" className="h-9 w-9 rounded-full bg-inklit/10 object-contain" />
					<span className="font-display-alt text-lg uppercase tracking-tight text-inklit">
						Ener<span className="text-volt">Yetu</span> Solutions
					</span>
				</Link>

				<div className="hidden items-center gap-6 md:flex">
					<nav className="flex items-center gap-6">
						{nav.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="font-mono text-xs uppercase tracking-[0.2em] text-inklit/70 transition-colors hover:text-volt"
							>
								{item.label}
							</a>
						))}
					</nav>
					<LanguageSwitcher dark />
					<Link
						to="#proposta"
						className="night-cta font-mono text-xs font-semibold uppercase tracking-[0.15em] px-4 py-2 transition-transform hover:-translate-y-0.5"
					>
						{t('solutionsLanding.hero.ctaProposal')}
					</Link>
				</div>

				<div className="md:hidden">
					<LanguageSwitcher dark />
				</div>
			</div>

			{/* Hero content */}
			<div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-16 pb-14 sm:px-8">
				<RevealPlate>
					<p className="font-mono text-xs uppercase tracking-[0.35em] text-volt">
						{t('solutionsLanding.hero.eyebrow')} · {t('solutionsLanding.hero.location')}
					</p>
					<h1 className="font-display-alt mt-5 max-w-4xl text-5xl uppercase leading-[0.92] tracking-tight text-inklit sm:text-7xl lg:text-8xl">
						{t('solutionsLanding.hero.headline1')}
						<br />
						<span className="text-glow">{t('solutionsLanding.hero.headline2')}</span>
					</h1>
					<p className="mt-6 max-w-2xl text-lg leading-relaxed text-inklit/75 sm:text-xl">
						{t('solutionsLanding.hero.lede')}
					</p>

					<div className="mt-9 flex flex-wrap items-center gap-4">
						<Link
							to="#proposta"
							className="night-cta font-mono text-sm font-semibold uppercase tracking-[0.15em] px-7 py-4 transition-transform hover:-translate-y-0.5"
						>
							{t('solutionsLanding.hero.ctaProposal')}
						</Link>
						<a
							href="#servicos"
							className="border border-glow/40 px-7 py-4 font-mono text-sm uppercase tracking-[0.15em] text-glow transition-colors hover:bg-glow/10"
						>
							{t('solutionsLanding.hero.ctaServices')}
						</a>
					</div>
				</RevealPlate>

				{/* Readout strip */}
				<div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-3">
					{readouts.map((r) => (
						<div key={r.label} className="bg-void-deep/70 px-6 py-5">
							<div className="font-display-alt text-3xl text-inklit sm:text-4xl">{r.value}</div>
							<div className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
								{r.label}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Ambient services ticker */}
			<div className="relative z-10 border-t border-edge bg-void-deep/80 backdrop-blur">
				<div className="overflow-hidden py-3">
					<div className="ambient-ticker-track">
						<TickerRun items={tickerItems} prefix />
						<TickerRun items={tickerItems} prefix={false} />
					</div>
				</div>
			</div>
		</header>
	);
}

function RevealPlate({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="dark-reveal"
			style={{
				animation: 'reveal-up 0.9s cubic-bezier(0.16,1,0.3,1) both',
			}}
		>
			{children}
		</div>
	);
}

function TickerRun({ items, prefix }: { items: string[]; prefix: boolean }) {
	return (
		<div className="flex shrink-0 items-center">
			{(prefix ? items : items).map((item, i) => (
				<div key={i} className="flex items-center">
					<span className="mx-5 font-mono text-xs uppercase tracking-[0.25em] text-inklit/55">
						{item}
					</span>
					<span className="voltage-node h-1.5 w-1.5 rounded-full bg-volt" />
				</div>
			))}
		</div>
	);
}
