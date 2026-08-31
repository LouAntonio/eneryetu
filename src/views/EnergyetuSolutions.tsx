'use client';

import { useTranslation } from 'react-i18next';

import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';

export function EnergyetuSolutions() {
	const { t } = useTranslation();
	const specificItems = t('eneryetuSolutions.specificItems', { returnObjects: true });
	const warehouseNave1 = t('eneryetuSolutions.warehouse.nave1.items', { returnObjects: true });
	const warehouseNave2 = t('eneryetuSolutions.warehouse.nave2.items', { returnObjects: true });
	const storageSilos = t('eneryetuSolutions.storageSilos.items', { returnObjects: true });
	const partners = t('eneryetuSolutions.partners.items', { returnObjects: true });
	const constructionItems = t('eneryetuSolutions.construction.items', { returnObjects: true });
	const valveItems = t('eneryetuSolutions.valves.items', { returnObjects: true });
	const maintenanceItems = t('eneryetuSolutions.maintenance.items', { returnObjects: true });

	return (
		<>
			<PageHero
				id="hero"
				eyebrow={t('eneryetuSolutions.eyebrow')}
				title={t('eneryetuSolutions.title')}
				body={t('eneryetuSolutions.subtitle')}
				image={t('eneryetuSolutions.heroImage')}
			/>

			{/* BUSINESS UNIT SPECIFIC SERVICES */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.specificTitle')}
						tone="blue"
					/>
					<p className="mt-4 text-base leading-relaxed text-slate">
						{t('eneryetuSolutions.specificServiceTitle')}
					</p>
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
						{specificItems.map((item) => (
							<div
								key={item.title}
								className="group bg-white p-6 transition-colors hover:bg-ink"
							>
								<h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-paper">
									{item.title}
								</h3>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* METAL STRUCTURE TREATMENT */}
			<section className="border-b border-line bg-ink-deep text-paper">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.metalTreatment.title')}
						tone="volt"
						className="text-paper [&_.ui-label]:text-paper/60 [&_h2]:text-paper"
					/>
					<p className="mt-4 max-w-4xl text-paper/75">
						{t('eneryetuSolutions.metalTreatment.body')}
					</p>
				</div>
			</section>

			{/* TANK CLEANING */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.tankCleaning.title')}
						tone="sun"
					/>
					<p className="mt-4 max-w-4xl text-slate">
						{t('eneryetuSolutions.tankCleaning.body')}
					</p>
				</div>
			</section>

			{/* WAREHOUSE SPACE */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.warehouse.title')}
						body={t('eneryetuSolutions.warehouse.body')}
						tone="blue"
					/>
					<div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-2">
						<div className="group bg-white p-8 transition-colors hover:bg-ink">
							<h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-paper">
								{t('eneryetuSolutions.warehouse.nave1.title')}
							</h3>
							<ul className="mt-4 space-y-2">
								{warehouseNave1.map((point) => (
									<li
										key={point}
										className="flex items-center gap-2 text-sm text-slate transition-colors group-hover:text-paper/70"
									>
										<span aria-hidden className="h-1 w-1 shrink-0 bg-volt" />
										{point}
									</li>
								))}
							</ul>
						</div>
						<div className="group bg-white p-8 transition-colors hover:bg-ink">
							<h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink transition-colors group-hover:text-paper">
								{t('eneryetuSolutions.warehouse.nave2.title')}
							</h3>
							<ul className="mt-4 space-y-2">
								{warehouseNave2.map((point) => (
									<li
										key={point}
										className="flex items-center gap-2 text-sm text-slate transition-colors group-hover:text-paper/70"
									>
										<span aria-hidden className="h-1 w-1 shrink-0 bg-volt" />
										{point}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* STORAGE SILOS */}
			<section className="border-b border-line bg-ink-deep text-paper">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.storageSilos.title')}
						tone="volt"
						className="text-paper [&_.ui-label]:text-paper/60 [&_h2]:text-paper"
					/>
					<ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
						{storageSilos.map((point) => (
							<li
								key={point}
								className="flex items-center gap-2 border border-paper/20 p-4 text-sm text-paper/80"
							>
								<span aria-hidden className="h-1 w-1 shrink-0 bg-volt" />
								{point}
							</li>
						))}
					</ul>
					<p className="mt-6 max-w-4xl text-paper/75">
						{t('eneryetuSolutions.storageSilos.description')}
					</p>
				</div>
			</section>

			{/* BUSINESS UNIT PARTNERS */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.partners.title')}
						tone="sun"
					/>
					<div className="mt-10 flex flex-wrap gap-3">
						{partners.map((name) => (
							<span
								key={name}
								className="border border-line bg-white px-4 py-2 font-mono text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink"
							>
								{name}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* CONSTRUCTION */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.construction.title')}
						body={t('eneryetuSolutions.construction.body')}
						tone="blue"
					/>
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
						{constructionItems.map((item) => (
							<div
								key={item}
								className="group flex items-center gap-3 bg-white p-5 transition-colors hover:bg-ink"
							>
								<span aria-hidden className="h-1 w-1 shrink-0 bg-volt" />
								<span className="text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* VALVES */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.valves.title')}
						body={t('eneryetuSolutions.valves.body')}
						tone="sun"
					/>
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
						{valveItems.map((item) => (
							<div
								key={item}
								className="group flex items-center gap-3 bg-white p-5 transition-colors hover:bg-ink"
							>
								<span aria-hidden className="h-1 w-1 shrink-0 bg-volt" />
								<span className="text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* MATERIALS */}
			<section className="border-b border-line">
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.materials.title')}
						tone="blue"
					/>
					<p className="mt-4 max-w-4xl text-slate">
						{t('eneryetuSolutions.materials.body')}
					</p>
				</div>
			</section>

			{/* MAINTENANCE */}
			<section>
				<div className="mx-auto w-full max-w-6xl px-6 py-16 lg:py-20">
					<SectionHeading
						eyebrow={t('eneryetuSolutions.eyebrow')}
						title={t('eneryetuSolutions.maintenance.title')}
						tone="sun"
					/>
					<div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
						{maintenanceItems.map((item) => (
							<div
								key={item}
								className="group flex items-center gap-3 bg-white p-6 transition-colors hover:bg-ink"
							>
								<span aria-hidden className="h-1 w-1 shrink-0 bg-volt" />
								<span className="text-sm leading-relaxed text-slate transition-colors group-hover:text-paper/70">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
