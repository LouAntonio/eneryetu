'use client';

import { useTranslation } from 'react-i18next';
import { Link } from '@/lib/routing';
import { useReveal } from '@/hooks/useReveal';

export function EnergyetuSolutions() {
	const { t } = useTranslation();
	const services = t('eneryetuSolutions.specificItems', { returnObjects: true });

	return (
		<div className="relative grid-draft">
			{/* HERO — Drawing Cover (Sheet 01) */}
			<section id="hero" className="relative min-h-[80vh] flex items-center justify-center px-6 py-20 lg:min-h-[90vh]">
				<div className="absolute inset-0 -z-10 grid-draft-fine" />
				<div className="absolute inset-0 -z-10 bg-gradient-to-b from-paper to-blue/5" />
				<div
					className="relative mx-auto max-w-6xl w-full drawing-frame notch p-8 lg:p-12 draft-reveal"
					style={{ animationDelay: '0ms' }}
				>
					{/* Drawing register header */}
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-6 border-b border-line">
						<div>
							<p className="ui-label text-blue-dark">{t('solutions.sheet')} <span className="font-bold">01</span> <span className="text-slate">{t('solutions.of')}</span> <span className="font-bold">07</span></p>
							<p className="mt-1 ui-label text-blue-dark">{t('solutions.rev')} <span className="font-bold text-volt">01</span> <span className="text-slate">|</span> {t('solutions.project')} <span className="font-mono text-xs text-slate ml-2">{t('solutions.projectValue')}</span></p>
						</div>
						<div className="flex items-center gap-4 text-right">
							<p className="ui-label text-blue-dark">{t('solutions.scale')} <span className="font-bold">{t('solutions.scaleValue')}</span></p>
							<div className="h-16 w-16 shrink-0 bg-ink rounded-[4px] flex items-center justify-center">
								<img src="/images/parceiros/eneryetusolutions.png" alt="ENERYETU Solutions" className="h-full w-full object-contain" />
							</div>
						</div>
					</div>

					{/* Title block */}
					<div className="draft-reveal" style={{ animationDelay: '80ms' }}>
						<span className="ui-label text-volt mb-2 block">{t('solutions.hero.title')}</span>
						<h1 className="font-display text-5xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.85] tracking-tight text-ink max-w-4xl">
							{t('solutions.hero.headline')}
						</h1>
						<p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
							{t('solutions.hero.lede')}
						</p>
						<p className="mt-8 ui-label text-slate">{t('solutions.hero.note')}</p>
					</div>

					{/* CTA band */}
					<div className="mt-10 flex flex-wrap gap-4 draft-reveal" style={{ animationDelay: '160ms' }}>
						<Link to="/contact" className="btn btn-sun px-6 py-3 text-base">
							{t('solutions.requestProposal')}
						</Link>
						<Link to="#contact" className="btn btn-mono px-6 py-3 text-base border-ink bg-transparent text-ink hover:border-blue hover:bg-blue-dark">
							{t('solutions.getInTouch')}
						</Link>
					</div>
				</div>
			</section>

			{/* SERVICES — Drawing Register (Sheet 02) */}
			<section id="services" className="px-6 py-16 lg:py-24">
				<div className="mx-auto max-w-6xl">
					<div className="drawing-frame notch p-6 lg:p-8 draft-reveal">
						<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-6 border-b border-line">
							<div>
								<p className="ui-label text-blue-dark">{t('solutions.sheet')} <span className="font-bold">02</span> <span className="text-slate">{t('solutions.of')}</span> <span className="font-bold">07</span></p>
								<p className="mt-1 ui-label text-blue-dark">{t('solutions.rev')} <span className="font-bold text-volt">01</span></p>
							</div>
							<div>
								<p className="ui-label text-slate text-right">{t('solutions.services.lead')}</p>
							</div>
						</div>

						<h2 className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight text-ink mb-2">{t('solutions.services.title')}</h2>
						<p className="ui-label text-blue-dark mb-6">{t('solutions.services.eyebrow')}</p>

						{/* Service register table */}
						<div className="border border-line overflow-hidden">
							<div className="grid grid-cols-[auto_1fr_auto] bg-line/50 border-b border-line px-4 py-3 text-xs font-mono uppercase tracking-[0.14em] text-slate">
								<span>TAG</span>
								<span className="px-4">SERVICE</span>
								<span className="text-right pr-4 w-24">SHEET</span>
							</div>
							{services.map((svc, idx) => (
								<div
									key={svc.title}
									className="grid grid-cols-[auto_1fr_auto] border-b border-line/50 px-4 py-4 transition-colors hover:bg-line/30 even:bg-white/50"
								>
									<div className="flex items-center">
										<span className="rev-chip text-blue-dark">
											{t('solutions.tag')}-{String(idx + 1).padStart(2, '0')}
										</span>
									</div>
									<div className="flex items-center py-2 px-4">
										<h3 className="font-display text-base font-bold uppercase tracking-tight text-ink">
											{svc.title}
										</h3>
									</div>
									<div className="flex items-center justify-end pr-4">
										<span className="ui-label text-slate">SHEET <span className="font-bold text-ink">{String(idx + 3).padStart(2, '0')}</span></span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* METAL TREATMENT — Sheet 03 */}
			<SheetSection
				sheetNum={3}
				rev="01"
				eyebrow={t('solutions.metal.eyebrow')}
				title={t('solutions.metal.title')}
				children={
					<>
						<p className="max-w-3xl text-slate leading-relaxed">
							{t('eneryetuSolutions.metalTreatment.body')}
						</p>
						<div className="mt-8 grid gap-4 sm:grid-cols-2">
							{t('solutions.metal.points', { returnObjects: true }).map((pt, i) => (
								<div
									key={i}
									className="drawing-frame notch p-5 draft-reveal bg-white/50"
									style={{ animationDelay: `${200 + i * 80}ms` }}
								>
									<p className="flex items-start gap-3 text-sm text-ink leading-relaxed">
										<span className="rev-chip text-volt shrink-0">{i + 1}</span>
										{pt}
									</p>
								</div>
							))}
						</div>
					</>
				}
			/>

			{/* TANK CLEANING — brief inline or small sheet */}
			<SheetSection
				sheetNum={3}
				rev="01"
				eyebrow="Sheet 03b · Tank cleaning"
				title={t('eneryetuSolutions.tankCleaning.title')}
				children={
					<div className="draft-reveal" style={{ animationDelay: '300ms' }}>
						<p className="max-w-3xl text-slate leading-relaxed">{t('eneryetuSolutions.tankCleaning.body')}</p>
						{/* Image figure placeholder */}
						<div className="mt-6 drawing-frame notch aspect-[4/3] overflow-hidden bg-line/30">
							<img
								src="/images/others/Industrial cleaning tank cleaning.jpeg"
								alt={t('eneryetuSolutions.tankCleaning.title')}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				}
			/>

			{/* FACILITIES / CAPABILITY SPEC — Sheet 04 */}
			<SheetSection
				sheetNum={4}
				rev="01"
				eyebrow={t('solutions.facilities.eyebrow')}
				title={t('solutions.facilities.title')}
				children={
					<>
						<p className="max-w-3xl text-slate leading-relaxed mb-8">{t('solutions.facilities.lead')}</p>

						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<FacilityCard
								title={t('solutions.facilities.nav1.title')}
								stat={t('solutions.facilities.nav1.stat')}
								unit={t('solutions.facilities.nav1.unit')}
								note={t('solutions.facilities.nav1.note')}
								delay={0}
								image="/images/others/Prancheta 5.jpg"
							/>
							<FacilityCard
								title={t('solutions.facilities.nav2.title')}
								stat={t('solutions.facilities.nav2.stat')}
								unit={t('solutions.facilities.nav2.unit')}
								note={t('solutions.facilities.nav2.note')}
								delay={80}
								image="/images/others/Prancheta 2.jpg"
							/>
							<FacilityCard
								title={t('solutions.facilities.silos.title')}
								stat={t('solutions.facilities.silos.stat')}
								unit={t('solutions.facilities.silos.unit')}
								note={t('solutions.facilities.silos.note')}
								delay={160}
								image="/images/others/Prancheta 6.jpg"
							/>
						</div>

						<p className="mt-8 max-w-3xl text-slate leading-relaxed">{t('solutions.facilities.site')}</p>
					</>
				}
			/>

			{/* FABRICATION & EQUIPMENT — Sheet 05 */}
			<SheetSection
				sheetNum={5}
				rev="01"
				eyebrow={t('solutions.fabrication.eyebrow')}
				title={t('solutions.fabrication.title')}
				children={
					<>
						<p className="max-w-3xl text-slate leading-relaxed mb-8">{t('solutions.fabrication.lead')}</p>

						<div className="mb-10">
							<h3 className="ui-label text-blue-dark mb-4">EQUIPMENT FABRICATION — EPC</h3>
							<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
								{t('eneryetuSolutions.construction.items', { returnObjects: true }).map((item, i) => (
									<div
										key={i}
										className="drawing-frame notch p-4 draft-reveal bg-white/50 transition-colors hover:bg-white"
										style={{ animationDelay: `${i * 60}ms` }}
									>
										<p className="text-sm text-ink leading-relaxed">{item}</p>
									</div>
								))}
							</div>
						</div>

						<div className="mb-10">
							<h3 className="ui-label text-blue-dark mb-4">VALVES — HYDRAULIC & PNEUMATIC</h3>
							<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
								{t('eneryetuSolutions.valves.items', { returnObjects: true }).map((item, i) => (
									<div
										key={i}
										className="drawing-frame notch p-4 draft-reveal bg-white/50 transition-colors hover:bg-white"
										style={{ animationDelay: `${i * 60}ms` }}
									>
										<p className="text-sm text-ink leading-relaxed">{item}</p>
									</div>
								))}
							</div>
						</div>

						<div className="drawing-frame notch p-5 bg-white/50 draft-reveal">
							<p className="text-sm text-ink">{t('solutions.materialsIntro')}</p>
						</div>
					</>
				}
			/>

			{/* MAINTENANCE — Sheet 06 */}
			<SheetSection
				sheetNum={6}
				rev="01"
				eyebrow={t('solutions.maintenance.eyebrow')}
				title={t('solutions.maintenance.title')}
				children={
					<div className="grid gap-4 sm:grid-cols-2">
						{t('eneryetuSolutions.maintenance.items', { returnObjects: true }).map((item, i) => (
							<div
								key={i}
								className="drawing-frame notch p-6 draft-reveal bg-white/50 transition-colors hover:bg-white"
								style={{ animationDelay: `${i * 100}ms` }}
							>
								<h4 className="font-display text-lg font-bold uppercase tracking-tight text-ink">{item}</h4>
								<p className="mt-2 text-sm text-slate">
									{/* Could add descriptions if available */}
								</p>
							</div>
						))}
					</div>
				}
			/>

			{/* PARTNERS — Sheet 07 */}
			<SheetSection
				sheetNum={7}
				rev="01"
				eyebrow={t('solutions.partners.eyebrow')}
				title={t('solutions.partners.title')}
				children={
					<div className="flex flex-wrap gap-3">
						{t('eneryetuSolutions.partners.items', { returnObjects: true }).map((name) => (
							<span
								key={name}
								className="drawing-frame notch px-4 py-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink bg-white/50 transition-colors hover:bg-white"
							>
								{name}
							</span>
						))}
					</div>
				}
			/>

			{/* CTA BAND */}
			<section id="contact" className="px-6 py-16 lg:py-24">
				<div className="mx-auto max-w-6xl">
					<div className="drawing-frame notch p-8 lg:p-12 draft-reveal bg-ink text-paper">
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
							<div className="max-w-2xl">
								<p className="ui-label text-volt">{t('solutions.cta.title')}</p>
								<h2 className="mt-4 font-display text-3xl lg:text-4xl font-black uppercase leading-[0.9] tracking-tight text-paper">
									{t('solutions.cta.title')}
								</h2>
								<p className="mt-4 max-w-lg text-paper/75">{t('solutions.cta.body')}</p>
							</div>
							<Link to="/contact" className="btn btn-sun shrink-0 px-8 py-4 text-lg">
								{t('solutions.cta.action')}
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

/* SheetSection — reusable wrapper for each "sheet" */
function SheetSection({
	sheetNum,
	rev,
	eyebrow,
	title,
	children,
}: {
	sheetNum: number;
	rev: string;
	eyebrow: string;
	title: string;
	children: React.ReactNode;
}) {
	const { ref, revealed } = useReveal<HTMLDivElement>();

	return (
		<section ref={ref} className="px-6 py-12 lg:py-16" aria-labelledby={`sheet-${sheetNum}`}>
			<div className="mx-auto max-w-6xl">
				<div
					className={`drawing-frame notch p-6 lg:p-8 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
				>
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-6 border-b border-line">
						<div>
							<p className="ui-label text-blue-dark">{`SHEET ${String(sheetNum).padStart(2, '0')} REV ${rev}`}</p>
							<p className="mt-1 ui-label text-slate">{eyebrow}</p>
						</div>
						<div className="text-right sm:text-left">
							<p className="ui-label text-slate">PROJECT: <span className="font-mono text-xs text-blue-dark">ENRY-SOL-BU</span></p>
						</div>
					</div>

					<h2 id={`sheet-${sheetNum}`} className="font-display text-3xl lg:text-4xl font-black uppercase tracking-tight text-ink mb-6">
						{title}
					</h2>

					<div className="draft-reveal">{children}</div>
				</div>
			</div>
		</section>
	);
}

/* FacilityCard — capability spec card */
function FacilityCard({
	title,
	stat,
	unit,
	note,
	delay,
	image,
}: {
	title: string;
	stat: string;
	unit: string;
	note: string;
	delay: number;
	image: string;
}) {
	return (
		<div className="drawing-frame notch overflow-hidden draft-reveal relative" style={{ animationDelay: `${delay}ms` }}>
			<div className="absolute inset-0 -z-10">
				<img src={image} alt={title} className="w-full h-full object-cover opacity-30" />
			</div>
			<div className="relative p-6">
				<h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink">{title}</h3>
				<div className="mt-4 flex items-baseline gap-2">
					<span className="font-display text-4xl lg:text-5xl font-black text-ink">{stat}</span>
					<span className="ui-label text-blue-dark self-start pb-1">{unit}</span>
				</div>
				<p className="mt-3 text-sm text-slate leading-relaxed">{note}</p>
			</div>
		</div>
	);
}