'use client';

import { useTranslation } from 'react-i18next';
import { Link } from '@/lib/routing';

import { VoltLine } from '@/components/solutions/VoltLine';
import { ScrollReveal, StaggeredReveal } from '@/components/solutions/ScrollReveal';
import { AnimatedCounter, StatItem } from '@/components/solutions/AnimatedCounter';
import { ServiceCard, serviceIcons } from '@/components/solutions/ServiceCard';
import { FeatureBlock, FeatureBlockCompact } from '@/components/solutions/FeatureBlock';
import { MetricsGrid, MetricCard } from '@/components/solutions/MetricCard';
import { CatalogList, SimpleCatalog } from '@/components/solutions/CatalogList';
import { PartnerMarqueeV2, PartnerGrid } from '@/components/solutions/PartnerMarqueeV2';

export function EnergyetuSolutions() {
	const { t } = useTranslation();
	const services = t('eneryetuSolutions.specificItems', { returnObjects: true });

	// Service categories for color coding
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

	// Facility metrics
	const facilityMetrics = [
		{
			title: t('solutions.facilities.nav1.title'),
			value: 50000,
			unit: 'm²',
			note: t('solutions.facilities.nav1.note'),
			image: '/images/others/Prancheta 5.jpg',
			imageAlt: 'Nave 1 warehouse interior',
		},
		{
			title: t('solutions.facilities.nav2.title'),
			value: 2000,
			unit: 'm²',
			note: t('solutions.facilities.nav2.note'),
			image: '/images/others/Prancheta 2.jpg',
			imageAlt: 'Nave 2 warehouse interior',
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

	// Hero stats
	const heroStats = [
		{ label: t('solutions.hero.stat1Label') || 'Services', value: 13, unit: '', delay: 0 },
		{
			label: t('solutions.hero.stat2Label') || 'Storage (m²)',
			value: 50000,
			unit: '+',
			delay: 100,
		},
		{ label: t('solutions.hero.stat3Label') || 'Partners', value: 6, unit: '', delay: 200 },
		{ label: t('solutions.hero.stat4Label') || 'EPC Ready', value: 1, unit: '', delay: 300 },
	];

	// Catalog sections
	const fabricationSections = [
		{
			label: 'EQUIPMENT FABRICATION — EPC',
			items: t('eneryetuSolutions.construction.items', { returnObjects: true }),
		},
		{
			label: 'VALVES — HYDRAULIC & PNEUMATIC',
			items: t('eneryetuSolutions.valves.items', { returnObjects: true }),
		},
	];

	return (
		<div className="relative min-h-screen bg-paper">
			{/* Background atmosphere */}
			<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
				{/* Subtle radial gradients for depth */}
				<div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue/10 blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sun/10 blur-3xl" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-volt/5 blur-3xl" />
			</div>

			{/* HERO — The Spark */}
			<section
				id="hero"
				className="relative min-h-screen flex items-center justify-center px-6 pt-16 pb-20 lg:pb-28 overflow-hidden"
			>
				{/* Volt Line weaving through hero */}
				<div className="absolute inset-0 -z-10 flex items-center justify-center">
					<VoltLine variant="hero" className="w-full max-w-7xl h-64" glow />
				</div>

				<div className="relative mx-auto max-w-7xl w-full">
					<div className="text-center">
						{/* Logo & Eyebrow */}
						<ScrollReveal animation="fade" delay={0}>
							<div className="inline-flex items-center gap-3 mb-6">
								<img
									src="/images/parceiros/eneryetusolutions.png"
									alt="ENERYETU Solutions"
									className="h-14 w-14 object-contain drop-shadow-lg"
								/>
								<span className="ui-label text-volt self-center">
									{t('solutions.hero.title')}
								</span>
							</div>
						</ScrollReveal>

						{/* Headline */}
						<ScrollReveal animation="up" delay={100} className="mb-6">
							<h1 className="font-display text-5xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.85] tracking-tight text-ink max-w-5xl mx-auto">
								{t('solutions.hero.headline')}
							</h1>
						</ScrollReveal>

						{/* Sub-headline */}
						<ScrollReveal
							animation="up"
							delay={200}
							className="mb-10 max-w-3xl mx-auto"
						>
							<p className="text-lg lg:text-xl text-slate leading-relaxed">
								{t('solutions.hero.lede')}
							</p>
						</ScrollReveal>

						{/* Stats Row */}
						<ScrollReveal animation="fade" delay={300} className="mb-12">
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
								{heroStats.map((stat) => (
									<StatItem
										key={stat.label}
										label={stat.label}
										value={stat.value}
										unit={stat.unit}
										delay={stat.delay}
									/>
								))}
							</div>
						</ScrollReveal>

						{/* CTAs */}
						<ScrollReveal animation="up" delay={400} className="mb-16">
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Link to="/contact" className="btn-volt-lg focus-ring">
									{t('solutions.requestProposal')}
									<svg
										className="w-5 h-5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path d="M5 12h14M12 5l7 7-7 7" />
									</svg>
								</Link>
								<Link
									to="#services"
									className="btn-outline px-8 py-4 text-lg focus-ring"
								>
									{t('solutions.getInTouch') || 'Explore Services'}
									<svg
										className="w-5 h-5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path d="M12 5v14M19 12l-7 7-7-7" />
									</svg>
								</Link>
							</div>
						</ScrollReveal>

						{/* Scroll indicator */}
						<ScrollReveal animation="fade" delay={600} className="animate-bounce">
							<div className="flex flex-col items-center gap-2 text-slate/50">
								<svg
									className="w-6 h-6"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M12 5v14M19 12l-7 7-7-7" />
								</svg>
								<span className="ui-label">Scroll</span>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* SERVICES — Capability Grid */}
			<section id="services" className="relative py-20 lg:py-28">
				{/* Section divider */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl">
					<VoltLine variant="divider" className="opacity-30" />
				</div>

				<ScrollReveal animation="up" delay={0}>
					<div className="mx-auto max-w-7xl px-6">
						<div className="text-center mb-16">
							<p className="ui-label text-blue-dark mb-3">
								{t('solutions.services.eyebrow')}
							</p>
							<h2 className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight text-ink mb-4">
								{t('solutions.services.title')}
							</h2>
							<p className="text-lg text-slate max-w-2xl mx-auto">
								{t('solutions.services.lead')}
							</p>
						</div>

						{/* Masonry Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
							{services.map((svc, index) => (
								<ServiceCard
									key={svc.title}
									index={index}
									title={svc.title}
									icon={serviceIcons[svc.title]}
									category={serviceCategories[svc.title] || 'support'}
									delay={index * 80}
								/>
							))}
						</div>
					</div>
				</ScrollReveal>
			</section>

			{/* METAL TREATMENT — Deep Dive */}
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

			{/* TANK CLEANING — Deep Dive */}
			<FeatureBlock
				eyebrow="SHEET 03B · TANK CLEANING"
				title={t('eneryetuSolutions.tankCleaning.title')}
				description={t('eneryetuSolutions.tankCleaning.body')}
				image="/images/others/Industrial cleaning tank cleaning.jpeg"
				imageAlt="Industrial tank cleaning operation"
				reverse={true}
				delay={0}
			/>

			{/* FACILITIES — Metrics Grid */}
			<MetricsGrid
				title={t('solutions.facilities.title')}
				eyebrow={t('solutions.facilities.eyebrow')}
				description={t('solutions.facilities.lead')}
				items={facilityMetrics}
				delay={0}
			/>

			{/* FABRICATION & EQUIPMENT — Catalog */}
			<ScrollReveal animation="up" delay={0}>
				<section className="py-20 lg:py-28" aria-labelledby="fabrication-title">
					<div className="mx-auto max-w-7xl px-6">
						<div className="text-center mb-16">
							<p className="ui-label text-blue-dark mb-3">
								{t('solutions.fabrication.eyebrow')}
							</p>
							<h2
								id="fabrication-title"
								className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight text-ink mb-4"
							>
								{t('solutions.fabrication.title')}
							</h2>
							<p className="text-lg text-slate max-w-2xl mx-auto">
								{t('solutions.fabrication.lead')}
							</p>
						</div>

						<CatalogList sections={fabricationSections} delay={0} />

						{/* Materials */}
						<SimpleCatalog
							title={t('solutions.materialsIntro')}
							items={
								t('eneryetuSolutions.materials.body', { returnObjects: false })
									? []
									: [
											'Fabrication and supply of metal sheets, pipework and angle bars',
										]
							}
							delay={200}
						/>
					</div>
				</section>
			</ScrollReveal>

			{/* MAINTENANCE — Compact Blocks */}
			<ScrollReveal animation="up" delay={0}>
				<section
					id="maintenance"
					className="py-20 lg:py-28"
					aria-labelledby="maintenance-title"
				>
					<div className="mx-auto max-w-7xl px-6">
						<div className="text-center mb-16">
							<p className="ui-label text-blue-dark mb-3">
								{t('solutions.maintenance.eyebrow')}
							</p>
							<h2
								id="maintenance-title"
								className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight text-ink mb-4"
							>
								{t('solutions.maintenance.title')}
							</h2>
						</div>

						<StaggeredReveal stagger={100} className="grid sm:grid-cols-2 gap-6">
							{t('eneryetuSolutions.maintenance.items', { returnObjects: true }).map(
								(item, index) => (
									<FeatureBlockCompact
										key={item}
										eyebrow={`SERVICE ${String(index + 1).padStart(2, '0')}`}
										title={item}
										delay={index * 100}
									/>
								),
							)}
						</StaggeredReveal>
					</div>
				</section>
			</ScrollReveal>

			{/* PARTNERS — Marquee */}
			<section className="relative py-20 lg:py-28 bg-ink-deep">
				<ScrollReveal animation="fade" delay={0}>
					<div className="mx-auto max-w-7xl px-6">
						<div className="text-center mb-12">
							<p className="ui-label text-volt mb-3">
								{t('solutions.partners.eyebrow')}
							</p>
							<h2 className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight text-paper mb-4">
								{t('solutions.partners.title')}
							</h2>
						</div>

						<PartnerMarqueeV2
							partners={t('eneryetuSolutions.partners.items', {
								returnObjects: true,
							})}
						/>
					</div>
				</ScrollReveal>
			</section>

			{/* CTA BAND — Volt Block */}
			<section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
				{/* Volt Line frame top */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl">
					<VoltLine variant="frame" className="opacity-50" glow />
				</div>

				<ScrollReveal animation="up" delay={0}>
					<div className="mx-auto max-w-7xl px-6 relative z-10">
						<div className="surface bg-ink text-paper rounded-3xl p-8 lg:p-16 relative overflow-hidden">
							{/* Background pattern */}
							<div className="absolute inset-0 -z-10 grid-dark opacity-5" />

							<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
								<div className="max-w-2xl text-center lg:text-left">
									<p className="ui-label text-volt mb-3">
										{t('solutions.cta.title')}
									</p>
									<h2 className="font-display text-3xl lg:text-4xl font-black uppercase leading-[0.9] tracking-tight text-paper mb-4">
										{t('solutions.cta.title')}
									</h2>
									<p className="text-lg text-paper/75">
										{t('solutions.cta.body')}
									</p>
								</div>

								<Link to="/contact" className="btn-volt-lg shrink-0 focus-ring">
									{t('solutions.cta.action')}
									<svg
										className="w-6 h-6"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path d="M5 12h14M12 5l7 7-7 7" />
									</svg>
								</Link>
							</div>

							{/* Volt Line frame bottom */}
							<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl">
								<VoltLine variant="frame" className="opacity-50" glow />
							</div>
						</div>
					</div>
				</ScrollReveal>
			</section>
		</div>
	);
}
