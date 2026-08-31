'use client';

import { useTranslation } from 'react-i18next';
import { Link } from '@/lib/routing';

import { VoltLine } from '@/components/solutions/VoltLine';
import { ScrollReveal, StaggeredReveal } from '@/components/solutions/ScrollReveal';
import { ServiceCard, serviceIcons } from '@/components/solutions/ServiceCard';
import { FeatureBlock, FeatureBlockCompact } from '@/components/solutions/FeatureBlock';
import { MetricsGrid } from '@/components/solutions/MetricCard';
import { CatalogList, SimpleCatalog } from '@/components/solutions/CatalogList';
import { PartnerMarqueeV2 } from '@/components/solutions/PartnerMarqueeV2';
import { SolutionsContactForm } from '@/components/solutions/SolutionsContactForm';
import { CircuitRail } from '@/components/solutions/CircuitRail';
import { EnergySweep } from '@/components/solutions/EnergySweep';
import { MetricTicker } from '@/components/solutions/MetricTicker';

export function EnergyetuSolutions() {
	const { t } = useTranslation();
	const services = t('eneryetuSolutions.specificItems', { returnObjects: true });
	const partners = t('eneryetuSolutions.partners.items', { returnObjects: true });
	const ticker = t('solutions.hero.ticker', { returnObjects: true });
	const nav = t('solutions.nav', { returnObjects: true });

	// Service categories for subtle icon/accent color
	const serviceCategories: Record<string, 'field' | 'workshop' | 'epc' | 'support'> = {
		'Manpower (Provision & Training)': 'support',
		'Tank and Pipework Cleaning Services': 'field',
		'General Maintenance & Technical Support': 'workshop',
		'Generator Maintenance': 'workshop',
		'HVAC (Heating, Ventilation & Air Conditioning)': 'field',
		'General Logistics & Material Supply': 'support',
		'Supply of Consumables, Paints, WDs, Moy Cotes, Grease, Fittings & Connectors': 'support',
		'Scaffolding Erection': 'field',
		'Structural Repair & Painting': 'field',
		'Instrumentation & Calibration': 'workshop',
		'Equipment Fabrication & Installation': 'epc',
		'Oil & Gas Structure Construction (Medium & Large-Scale) – EPC Projects': 'epc',
		'Brownfield EPC: Modification & Maintenance': 'epc',
	};

	// Busbar sections (must match section ids below)
	const railSections = [
		'services',
		'field',
		'facilities',
		'fabrication',
		'maintenance',
		'partners',
		'proposal',
	].map((id, i) => ({ id, label: nav[i] }));

	// Facility metrics — real telemetry readout
	const heroMetrics = [
		{ label: t('solutions.hero.telemetry.area'), value: 50000, unit: ' m²' },
		{ label: t('solutions.hero.telemetry.workshops'), value: 2000, unit: ' m²' },
		{ label: t('solutions.hero.telemetry.capacity'), value: 40000, unit: ' L' },
	];

	const facilityMetrics = [
		{
			title: t('solutions.facilities.nav1.title'),
			value: 50000,
			unit: 'm²',
			note: t('solutions.facilities.nav1.note'),
			image: '/images/others/Prancheta 5.jpg',
			imageAlt: 'Covered facility interior',
		},
		{
			title: t('solutions.facilities.nav2.title'),
			value: 2000,
			unit: 'm²',
			note: t('solutions.facilities.nav2.note'),
			image: '/images/others/Prancheta 2.jpg',
			imageAlt: 'Workshop interior',
		},
		{
			title: t('solutions.facilities.silos.title'),
			value: 40000,
			unit: 'L',
			note: t('solutions.facilities.silos.note'),
			image: '/images/others/Prancheta 6.jpg',
			imageAlt: 'Silos installation',
		},
	];

	// Catalog sections
	const fabricationSections = [
		{
			label: 'Equipment fabrication — EPC',
			items: t('eneryetuSolutions.construction.items', { returnObjects: true }),
		},
		{
			label: 'Valves — hydraulic & pneumatic',
			items: t('eneryetuSolutions.valves.items', { returnObjects: true }),
		},
	];

	const serviceTitles = services.map((svc) => svc.title);

	return (
		<div className="relative min-h-screen overflow-x-clip bg-paper">
			<CircuitRail sections={railSections} />

			{/* HERO */}
			<section
				id="hero"
				className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-24"
			>
				{/* Background image */}
				<div className="absolute inset-0 -z-20">
					<img
						src="/images/others/Fabrication & construction of structures.jpeg"
						alt="Industrial structure fabrication"
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
				</div>
				<div className="absolute inset-0 -z-10">
					<EnergySweep />
				</div>

				<div className="relative mx-auto w-full max-w-7xl">
					<div className="max-w-3xl">
						<ScrollReveal animation="fade" delay={0}>
							<span className="ui-label inline-block text-volt">
								{t('solutions.hero.title')}
							</span>
						</ScrollReveal>

						<ScrollReveal animation="up" delay={100} className="mb-8 mt-6">
							<h1 className="font-display text-5xl font-black uppercase leading-[0.85] tracking-tight text-paper lg:text-7xl xl:text-8xl">
								{t('solutions.hero.headline')}
							</h1>
						</ScrollReveal>

						<ScrollReveal animation="up" delay={200} className="mb-10 max-w-2xl">
							<p className="text-lg leading-relaxed text-paper/80 lg:text-xl">
								{t('solutions.hero.lede')}
							</p>
						</ScrollReveal>

						<ScrollReveal animation="up" delay={300}>
							<div className="flex flex-col items-start gap-4 sm:flex-row">
								<Link to="#proposal" className="btn-volt-lg focus-ring">
									{t('solutions.requestProposal')}
								</Link>
								<Link to="#services" className="btn-ghost btn-ghost-lg focus-ring">
									{t('solutions.getInTouch')}
								</Link>
							</div>
						</ScrollReveal>
					</div>

					{/* Capability telemetry ticker */}
					<ScrollReveal animation="fade" delay={400} className="mt-14">
						<div className="flex items-center gap-3 overflow-hidden border-y border-paper/15 py-3">
							<span className="flex shrink-0 items-center gap-2 pr-4">
								<span className="node-live h-2 w-2 rounded-full bg-volt" />
								<span className="ui-label text-volt">Live</span>
							</span>
							<div className="overflow-hidden">
								<div className="ticker-track">
									{[...ticker, ...ticker].map((item, i) => (
										<span
											key={i}
											className="flex items-center whitespace-nowrap pr-8"
										>
											<span className="ui-label text-paper/70">{item}</span>
											<span className="ml-8 h-1 w-1 rounded-full bg-blue/60" />
										</span>
									))}
								</div>
							</div>
						</div>
					</ScrollReveal>

					{/* Telemetry readout */}
					<ScrollReveal animation="up" delay={480} className="mt-8">
						<MetricTicker items={heroMetrics} />
					</ScrollReveal>
				</div>

				{/* Volt Line signature — main feed */}
				<div className="absolute bottom-6 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">
					<VoltLine variant="divider" className="opacity-70" glow />
				</div>
			</section>

			{/* SERVICES */}
			<section id="services" className="py-20 lg:py-28">
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-14 max-w-3xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-blue-dark">
							<span className="node-live h-2 w-2 rounded-full bg-volt" />
							{t('solutions.services.eyebrow')}
						</p>
						<h2 className="font-display mb-4 text-4xl font-black uppercase tracking-tight text-ink lg:text-5xl">
							{t('solutions.services.title')}
						</h2>
						<p className="text-lg text-slate">{t('solutions.services.lead')}</p>
					</div>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
						{services.map((svc, index) => (
							<ServiceCard
								key={svc.title}
								title={svc.title}
								icon={serviceIcons[svc.title]}
								category={serviceCategories[svc.title] || 'support'}
								delay={index * 60}
							/>
						))}
					</div>
				</div>
			</section>

			{/* FIELD — metal + tank */}
			<div id="field" className="bg-paper">
				<FeatureBlock
					eyebrow={t('solutions.metal.eyebrow')}
					title={t('solutions.metal.title')}
					description={t('eneryetuSolutions.metalTreatment.body')}
					points={t('solutions.metal.points', { returnObjects: true })}
					image="/images/others/Integrity management.jpg"
					imageAlt="Metal structure treatment and painting"
					reverse={false}
					delay={0}
				/>

				<FeatureBlock
					eyebrow={t('solutions.tankCleaning.eyebrow')}
					title={t('eneryetuSolutions.tankCleaning.title')}
					description={t('eneryetuSolutions.tankCleaning.body')}
					image="/images/others/Industrial cleaning tank cleaning.jpeg"
					imageAlt="Industrial tank cleaning operation"
					reverse={true}
					delay={0}
				/>
			</div>

			{/* FACILITIES */}
			<div id="facilities">
				<MetricsGrid
					title={t('solutions.facilities.title')}
					eyebrow={t('solutions.facilities.eyebrow')}
					description={t('solutions.facilities.lead')}
					items={facilityMetrics}
					delay={0}
				/>
			</div>

			{/* FABRICATION & EQUIPMENT */}
			<section
				id="fabrication"
				className="py-20 lg:py-28"
				aria-labelledby="fabrication-title"
			>
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-14 max-w-3xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-blue-dark">
							<span className="node-live h-2 w-2 rounded-full bg-volt" />
							{t('solutions.fabrication.eyebrow')}
						</p>
						<h2
							id="fabrication-title"
							className="font-display mb-4 text-4xl font-black uppercase tracking-tight text-ink lg:text-5xl"
						>
							{t('solutions.fabrication.title')}
						</h2>
						<p className="text-lg text-slate">{t('solutions.fabrication.lead')}</p>
					</div>

					<CatalogList sections={fabricationSections} delay={0} />

					<div className="mt-8">
						<SimpleCatalog
							title={t('solutions.materialsIntro')}
							items={[
								'Fabrication and supply of metal sheets, pipework and angle bars',
							]}
							delay={200}
						/>
					</div>
				</div>
			</section>

			{/* MAINTENANCE */}
			<section
				id="maintenance"
				className="py-20 lg:py-28"
				aria-labelledby="maintenance-title"
			>
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-14 max-w-3xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-blue-dark">
							<span className="node-live h-2 w-2 rounded-full bg-volt" />
							{t('solutions.maintenance.eyebrow')}
						</p>
						<h2
							id="maintenance-title"
							className="font-display mb-4 text-4xl font-black uppercase tracking-tight text-ink lg:text-5xl"
						>
							{t('solutions.maintenance.title')}
						</h2>
					</div>

					<StaggeredReveal stagger={100} className="grid gap-6 sm:grid-cols-2">
						{t('eneryetuSolutions.maintenance.items', {
							returnObjects: true,
						}).map((item) => (
							<FeatureBlockCompact key={item} title={item} />
						))}
					</StaggeredReveal>
				</div>
			</section>

			{/* PARTNERS */}
			<section id="partners" className="relative overflow-hidden bg-ink-deep py-20 lg:py-28">
				<EnergySweep sweep={false} scanline={false} opacity="opacity-25" />
				<div className="relative mx-auto max-w-7xl px-6">
					<div className="mb-12 max-w-3xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-volt">
							<span className="node-live h-2 w-2 rounded-full bg-volt" />
							{t('solutions.partners.eyebrow')}
						</p>
						<h2 className="font-display text-4xl font-black uppercase tracking-tight text-paper lg:text-5xl">
							{t('solutions.partners.title')}
						</h2>
					</div>

					<ScrollReveal animation="fade" delay={0}>
						<PartnerMarqueeV2 partners={partners} />
					</ScrollReveal>
				</div>
			</section>

			{/* PROPOSAL FORM */}
			<section id="proposal" className="relative overflow-hidden py-20 lg:py-28">
				<div className="relative z-10 mx-auto max-w-7xl px-6">
					<div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-paper lg:p-14">
						<div className="absolute inset-0 -z-10">
							<EnergySweep opacity="opacity-30" />
						</div>

						<div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
							<div>
								<p className="mb-3 flex items-center gap-3 ui-label text-volt">
									<span className="node-live h-2 w-2 rounded-full bg-volt" />
									{t('solutions.requestProposal')}
								</p>
								<h2 className="font-display mb-6 text-4xl font-black uppercase leading-[0.9] tracking-tight text-paper lg:text-5xl">
									{t('solutions.cta.title')}
								</h2>
								<p className="mb-8 text-lg text-paper/75">
									{t('solutions.cta.body')}
								</p>

								<div className="space-y-4 border-t border-paper/15 pt-8">
									<p className="ui-label text-volt">
										{t('solutions.footer.contactTitle')}
									</p>
									<div className="space-y-2 font-mono text-sm text-paper/80">
										<p>+244 923 734 199 · +244 945 459 270</p>
										<p>geral@eneryetu.com</p>
									</div>
								</div>
							</div>

							<div className="rounded-2xl border border-paper/10 bg-paper/5 p-6 lg:p-8">
								<h3 className="font-display mb-6 text-2xl font-bold uppercase tracking-tight text-paper">
									{t('solutions.form.title')}
								</h3>
								<SolutionsContactForm services={serviceTitles} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
