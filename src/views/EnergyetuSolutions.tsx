'use client';

import { useTranslation } from 'react-i18next';
import { Link } from '@/lib/routing';

import { HeroImmersive } from '@/components/solutions/HeroImmersive';
import { MetricsBento, type BentoCell } from '@/components/solutions/MetricsBento';
import { ServicesGrid } from '@/components/solutions/ServicesGrid';
import { FeatureBlock, FeatureBlockCompact } from '@/components/solutions/FeatureBlock';
import { FacilitiesShowcase } from '@/components/solutions/FacilitiesShowcase';
import { CatalogList, SimpleCatalog } from '@/components/solutions/CatalogList';
import { StaggeredReveal } from '@/components/solutions/ScrollReveal';
import { PartnerMarqueeV2 } from '@/components/solutions/PartnerMarqueeV2';
import { SolutionsContactForm } from '@/components/solutions/SolutionsContactForm';

const HERO_IMAGE = '/images/others/Fabrication & construction of structures.jpeg';

export function EnergyetuSolutions() {
	const { t } = useTranslation();
	const services = t('eneryetuSolutions.specificItems', { returnObjects: true }) as {
		title: string;
	}[];
	const partners = t('eneryetuSolutions.partners.items', { returnObjects: true }) as Array<{
		name: string;
		logo: string;
	}>;
	const serviceTitles = services.map((svc) => svc.title);

	const bentoCells: BentoCell[] = [
		{
			id: 'nave-1',
			tag: t('solutions.facilities.nav1.title'),
			value: 50000,
			unit: 'm²',
			label: t('solutions.facilities.nav1.title'),
			note: t('solutions.facilities.nav1.note'),
			span: 'feature',
			tone: 'volt',
		},
		{
			id: 'nave-2',
			tag: t('solutions.facilities.nav2.title'),
			value: 2000,
			unit: 'm²',
			label: t('solutions.facilities.nav2.title'),
			note: t('solutions.facilities.nav2.note'),
			span: 'wide',
			tone: 'paper',
		},
		{
			id: 'silos',
			tag: t('solutions.facilities.silos.title'),
			value: 40000,
			unit: 'L',
			label: t('solutions.facilities.silos.title'),
			note: t('solutions.facilities.silos.note'),
			span: 'wide',
			tone: 'paper',
		},
		{
			id: 'services',
			tag: t('solutions.bento.servicesTag', { defaultValue: 'Service lines' }),
			value: 13,
			unit: 'Linhas',
			label: t('solutions.bento.servicesLabel', {
				defaultValue: 'Treze linhas de serviço',
			}),
			note: t('solutions.bento.servicesNote', {
				defaultValue: 'Tudo sob um único contrato.',
			}),
			span: 'standard',
			tone: 'paper',
		},
		{
			id: 'epc',
			tag: 'EPC',
			value: 3,
			unit: 'Modalidades',
			label: t('solutions.bento.epcLabel', {
				defaultValue: 'EPC, brownfield, fabrication',
			}),
			note: t('solutions.bento.epcNote', {
				defaultValue: 'Médio e grande porte · Oil & Gas · Mineração',
			}),
			span: 'standard',
			tone: 'paper',
		},
		{
			id: 'partners',
			tag: t('solutions.bento.partnersTag', { defaultValue: 'Partners' }),
			value: 6,
			unit: 'Parceiros',
			label: t('solutions.bento.partnersLabel', { defaultValue: 'Rede de execução' }),
			note: t('solutions.bento.partnersNote', {
				defaultValue: 'Logística, equipamentos, EPC.',
			}),
			span: 'standard',
			tone: 'paper',
		},
	];

	const facilityTiles: [
		{
			title: string;
			value: number;
			unit: string;
			note: string;
			image: string;
			imageAlt?: string;
			tag: string;
		},
		{
			title: string;
			value: number;
			unit: string;
			note: string;
			image: string;
			imageAlt?: string;
			tag: string;
		},
		{
			title: string;
			value: number;
			unit: string;
			note: string;
			image: string;
			imageAlt?: string;
			tag: string;
		},
	] = [
		{
			tag: 'Nave 1',
			title: t('solutions.facilities.nav1.title'),
			value: 50000,
			unit: 'm²',
			note: t('solutions.facilities.nav1.note'),
			image: '/images/others/Prancheta 5.jpg',
			imageAlt: 'Covered facility interior',
		},
		{
			tag: 'Nave 2',
			title: t('solutions.facilities.nav2.title'),
			value: 2000,
			unit: 'm²',
			note: t('solutions.facilities.nav2.note'),
			image: '/images/others/Prancheta 2.jpg',
			imageAlt: 'Workshop interior',
		},
		{
			tag: 'Silos',
			title: t('solutions.facilities.silos.title'),
			value: 40000,
			unit: 'L',
			note: t('solutions.facilities.silos.note'),
			image: '/images/others/Prancheta 6.jpg',
			imageAlt: 'Silos installation',
		},
	];

	const fabricationSections = [
		{
			label: t('solutions.fabrication.eyebrow') + ' — EPC',
			items: t('eneryetuSolutions.construction.items', { returnObjects: true }) as string[],
		},
		{
			label: 'Valves — hydraulic & pneumatic',
			items: t('eneryetuSolutions.valves.items', { returnObjects: true }) as string[],
		},
	];

	return (
		<div className="relative min-h-screen overflow-x-clip bg-paper">
			<HeroImmersive backgroundImage={HERO_IMAGE} />

			<MetricsBento
				eyebrow={t('solutions.bento.eyebrow', { defaultValue: 'Live capacity' })}
				title={t('solutions.bento.title', {
					defaultValue: 'O que a ENERYETU Solutions opera.',
				})}
				lead={t('solutions.bento.lead', {
					defaultValue:
						'Instalações, equipas e catálogo — uma leitura rápida do que está em operação no site de Cacuaco.',
				})}
				cells={bentoCells}
			/>

			<ServicesGrid
				eyebrow={t('solutions.services.eyebrow')}
				title={t('solutions.services.title')}
				lead={t('solutions.services.lead')}
				items={services}
			/>

			<section id="field" className="bg-paper">
				<FeatureBlock
					eyebrow={t('solutions.metal.eyebrow')}
					title={t('solutions.metal.title')}
					description={t('eneryetuSolutions.metalTreatment.body')}
					points={t('solutions.metal.points', { returnObjects: true }) as string[]}
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
			</section>

			<FacilitiesShowcase
				eyebrow={t('solutions.facilities.eyebrow')}
				title={t('solutions.facilities.title')}
				lead={t('solutions.facilities.lead')}
				site={t('solutions.facilities.site')}
				tiles={facilityTiles}
			/>

			<section
				id="fabrication"
				className="py-20 lg:py-28"
				aria-labelledby="fabrication-title"
			>
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-14 max-w-3xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-blue-dark">
							<span className="node-live h-1.5 w-1.5 rounded-full bg-volt" />
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

			<section
				id="maintenance"
				className="py-20 lg:py-28"
				aria-labelledby="maintenance-title"
			>
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-14 max-w-3xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-blue-dark">
							<span className="node-live h-1.5 w-1.5 rounded-full bg-volt" />
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
						{(
							t('eneryetuSolutions.maintenance.items', {
								returnObjects: true,
							}) as string[]
						).map((item) => (
							<FeatureBlockCompact key={item} title={item} />
						))}
					</StaggeredReveal>
				</div>
			</section>

			<section
				id="partners"
				className="relative overflow-hidden bg-ink-deep py-20 text-paper lg:py-28"
			>
				<div className="relative mx-auto max-w-7xl px-6">
					<div className="mb-12 max-w-3xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-volt">
							<span className="node-live h-1.5 w-1.5 rounded-full bg-volt" />
							{t('solutions.partners.eyebrow')}
						</p>
						<h2 className="font-display text-4xl font-black uppercase tracking-tight text-paper lg:text-5xl">
							{t('solutions.partners.title')}
						</h2>
					</div>

					<PartnerMarqueeV2 partners={partners} />
				</div>
			</section>

			<section id="proposal" className="relative overflow-hidden py-20 lg:py-28">
				<div className="relative z-10 mx-auto max-w-7xl px-6">
					<div className="relative overflow-hidden rounded-3xl bg-ink-deep p-8 text-paper lg:p-14">
						<div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
							<div>
								<p className="mb-3 flex items-center gap-3 ui-label text-volt">
									<span className="node-live h-1.5 w-1.5 rounded-full bg-volt" />
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

			<div className="sr-only">
				<Link to="/">{t('navigation.home')}</Link>
			</div>
		</div>
	);
}
