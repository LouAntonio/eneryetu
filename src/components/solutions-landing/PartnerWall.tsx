'use client';

import { useTranslation } from 'react-i18next';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

const PARTNERS = [
	{ name: 'ENERYETU', logo: '/images/parceiros/eneryetusolutions.png' },
	{ name: 'RICO ORGANIZAÇÕES', logo: '/images/parceiros/rico.png' },
	{ name: 'DallOIL', logo: '/images/parceiros/dalloil.png' },
	{ name: 'OCEAN ATLANTIC PETROLEUM', logo: '/images/parceiros/OAT.png' },
	{ name: 'ELITE FLOW CONTROL', logo: '/images/parceiros/elite.png' },
	{ name: 'ELITE PROJECT ENGINEERING', logo: '/images/parceiros/elite.png' },
];

export function PartnerWall() {
	const { t } = useTranslation();

	return (
		<section id="parceiros" className="relative py-20 sm:py-28">
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<Reveal>
					<SectionHead
						eyebrow={t('solutionsLanding.partners.eyebrow')}
						title={t('solutionsLanding.partners.title')}
						lead={t('solutionsLanding.partners.lead')}
					/>
				</Reveal>

				<div className="grid grid-cols-2 gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-3">
					{PARTNERS.map((p, i) => (
						<Reveal key={p.name} delay={i * 40}>
							<div className="group flex h-28 flex-col items-center justify-center gap-2 bg-panel px-4 py-5 transition-colors hover:bg-panel-raised">
								<img
									src={p.logo}
									alt={p.name}
									className="h-10 max-w-full object-contain opacity-55 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
								/>
								<span className="text-center font-mono text-[0.62rem] uppercase tracking-[0.15em] text-muted">
									{p.name}
								</span>
							</div>
						</Reveal>
					))}
				</div>

				<Reveal>
					<p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
						{t('solutionsLanding.partners.note')}
					</p>
				</Reveal>
			</div>
		</section>
	);
}
