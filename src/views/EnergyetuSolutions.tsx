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

export function EnergyetuSolutions() {
	const { t } = useTranslation();
	const services = t('eneryetuSolutions.specificItems', { returnObjects: true });
	const partners = t('eneryetuSolutions.partners.items', { returnObjects: true });

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
		<div className="relative min-h-screen bg-paper">
			{/* HERO */}
			<section
				id="hero"
				className="relative min-h-screen flex items-center px-6 pt-16 pb-24 overflow-hidden"
			>
				{/* Background image */}
				<div className="absolute inset-0 -z-20">
					<img
						src="/images/others/Fabrication & construction of structures.jpeg"
						alt="Industrial structure fabrication"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
					<div className="absolute inset-0 grid-dark opacity-30" />
				</div>

				<div className="relative mx-auto max-w-7xl w-full">
					<div className="max-w-3xl">
						<ScrollReveal animation="fade" delay={0}>
							<span className="ui-label text-volt mb-6 inline-block tracking-[0.2em]">
								{t('solutions.hero.title')}
							</span>
						</ScrollReveal>

						<ScrollReveal animation="up" delay={100} className="mb-8">
							<h1 className="font-display text-5xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.85] tracking-tight text-paper">
								{t('solutions.hero.headline')}
							</h1>
						</ScrollReveal>

						<ScrollReveal animation="up" delay={200} className="mb-12 max-w-2xl">
							<p className="text-lg lg:text-xl text-paper/80 leading-relaxed">
								{t('solutions.hero.lede')}
							</p>
						</ScrollReveal>

						<ScrollReveal animation="up" delay={300}>
							<div className="flex flex-col sm:flex-row items-start gap-4">
								<Link to="#proposal" className="btn-volt-lg focus-ring">
									{t('solutions.requestProposal')}
								</Link>
								<Link
									to="#services"
									className="btn-outline px-8 py-4 text-lg focus-ring"
								>
									{t('solutions.getInTouch') || 'Explore Services'}
								</Link>
							</div>
						</ScrollReveal>
					</div>
				</div>

				{/* Volt Line pulse — signature */}
				<div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6">
					<VoltLine variant="divider" className="opacity-60" glow />
				</div>
			</section>

			{/* SERVICES */}
			<section id="services" className="py-20 lg:py-28">
				<div className="mx-auto max-w-7xl px-6">
					<div className="max-w-3xl mb-14">
						<p className="ui-label text-blue-dark mb-3">
							{t('solutions.services.eyebrow')}
						</p>
						<h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-4">
							{t('solutions.services.title')}
						</h2>
						<p className="text-lg text-slate">{t('solutions.services.lead')}</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
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

			{/* METAL TREATMENT */}
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

			{/* TANK CLEANING */}
			<FeatureBlock
				eyebrow={t('solutions.tankCleaning.eyebrow')}
				title={t('eneryetuSolutions.tankCleaning.title')}
				description={t('eneryetuSolutions.tankCleaning.body')}
				image="/images/others/Industrial cleaning tank cleaning.jpeg"
				imageAlt="Industrial tank cleaning operation"
				reverse={true}
				delay={0}
			/>

			{/* FACILITIES */}
			<MetricsGrid
				title={t('solutions.facilities.title')}
				eyebrow={t('solutions.facilities.eyebrow')}
				description={t('solutions.facilities.lead')}
				items={facilityMetrics}
				delay={0}
			/>

			{/* FABRICATION & EQUIPMENT */}
			<section className="py-20 lg:py-28" aria-labelledby="fabrication-title">
				<div className="mx-auto max-w-7xl px-6">
					<div className="max-w-3xl mb-14">
						<p className="ui-label text-blue-dark mb-3">
							{t('solutions.fabrication.eyebrow')}
						</p>
						<h2
							id="fabrication-title"
							className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-4"
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
					<div className="max-w-3xl mb-14">
						<p className="ui-label text-blue-dark mb-3">
							{t('solutions.maintenance.eyebrow')}
						</p>
						<h2
							id="maintenance-title"
							className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-4"
						>
							{t('solutions.maintenance.title')}
						</h2>
					</div>

					<StaggeredReveal stagger={100} className="grid sm:grid-cols-2 gap-6">
						{t('eneryetuSolutions.maintenance.items', { returnObjects: true }).map(
							(item) => (
								<FeatureBlockCompact key={item} title={item} />
							),
						)}
					</StaggeredReveal>
				</div>
			</section>

			{/* PARTNERS */}
			<section className="py-20 lg:py-28 bg-ink-deep">
				<div className="mx-auto max-w-7xl px-6">
					<div className="max-w-3xl mb-12">
						<p className="ui-label text-volt mb-3">{t('solutions.partners.eyebrow')}</p>
						<h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-paper">
							{t('solutions.partners.title')}
						</h2>
					</div>

					<ScrollReveal animation="fade" delay={0}>
						<PartnerMarqueeV2 partners={partners} />
					</ScrollReveal>
				</div>
			</section>

			{/* PROPOSAL FORM */}
			<section id="proposal" className="relative py-20 lg:py-28 overflow-hidden">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl">
					<VoltLine variant="divider" className="opacity-30" />
				</div>

				<div className="mx-auto max-w-7xl px-6 relative z-10">
					<div className="bg-ink text-paper rounded-3xl p-8 lg:p-14 relative overflow-hidden">
						<div className="absolute inset-0 -z-10 grid-dark opacity-5" />

						<div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
							<div>
								<p className="ui-label text-volt mb-3">
									{t('solutions.requestProposal')}
								</p>
								<h2 className="font-display text-4xl lg:text-5xl font-black uppercase leading-[0.9] tracking-tight text-paper mb-6">
									{t('solutions.cta.title')}
								</h2>
								<p className="text-lg text-paper/75 mb-8">
									{t('solutions.cta.body')}
								</p>

								<div className="space-y-4 border-t border-paper/15 pt-8">
									<p className="ui-label text-volt">
										{t('solutions.footer.contactTitle')}
									</p>
									<div className="space-y-2 text-paper/80 font-mono text-sm">
										<p>+244 923 734 199 · +244 945 459 270</p>
										<p>geral@eneryetu.com</p>
									</div>
								</div>
							</div>

							<div className="bg-paper/5 border border-paper/10 rounded-2xl p-6 lg:p-8">
								<h3 className="font-display text-2xl font-bold uppercase tracking-tight text-paper mb-6">
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
