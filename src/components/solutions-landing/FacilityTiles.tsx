'use client';

import { useTranslation } from 'react-i18next';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

interface Unit {
	name: string;
	area: string;
	sub: string;
	features: string[];
}

const UNIT_KEYS = ['nave1', 'nave2', 'silos'] as const;

export function FacilityTiles() {
	const { t } = useTranslation();
	const units = UNIT_KEYS.map((key) => {
		const u = t(`solutionsLanding.facilities.units.${key}`, {
			returnObjects: true,
		}) as Unit;
		return { key, ...u };
	});

	return (
		<section id="instalacoes" className="relative py-20 sm:py-28">
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<Reveal>
					<SectionHead
						eyebrow={t('solutionsLanding.facilities.eyebrow')}
						title={t('solutionsLanding.facilities.title')}
						lead={t('solutionsLanding.facilities.lead')}
					/>
				</Reveal>

				<div className="grid gap-4 md:grid-cols-3">
					{units.map((unit, i) => (
						<Reveal key={unit.key} delay={i * 60}>
							<div className="night-panel-raised flex h-full flex-col p-6">
								<div className="flex items-start justify-between gap-3">
									<h3 className="font-mono text-sm uppercase tracking-[0.2em] text-inklit">
										{unit.name}
									</h3>
									<span className="voltage-node h-2 w-2 rounded-full bg-volt" />
								</div>
								<div className="font-display-alt mt-4 text-4xl text-glow">
									{unit.area}
								</div>
								<div className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
									{unit.sub}
								</div>
								<ul className="mt-5 flex flex-wrap gap-2 border-t border-edge pt-4">
									{unit.features.map((f) => (
										<li
											key={f}
											className="rounded-full border border-edge px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-inklit/70"
										>
											{f}
										</li>
									))}
								</ul>
							</div>
						</Reveal>
					))}
				</div>

				<Reveal>
					<p className="mt-6 border-l-2 border-volt pl-4 text-muted">
						{t('solutionsLanding.facilities.site')}
					</p>
				</Reveal>
			</div>
		</section>
	);
}
