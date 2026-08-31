'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

export function MaterialList() {
	const { t } = useTranslation();
	const equipment = useMemo(
		() => t('solutionsLanding.manufacturing.equipment', { returnObjects: true }) as string[],
		[t],
	);
	const valves = useMemo(
		() => t('solutionsLanding.manufacturing.valves', { returnObjects: true }) as string[],
		[t],
	);

	return (
		<section id="fabrico" className="relative py-20 sm:py-28">
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<Reveal>
					<SectionHead
						eyebrow={t('solutionsLanding.manufacturing.eyebrow')}
						title={t('solutionsLanding.manufacturing.title')}
						lead={t('solutionsLanding.manufacturing.lead')}
					/>
				</Reveal>

				<div className="grid gap-10 lg:grid-cols-2">
					<Reveal>
						<div className="night-panel p-6 sm:p-8">
							<p className="font-mono text-xs uppercase tracking-[0.3em] text-volt">
								{t('solutionsLanding.manufacturing.equipmentTitle')}
							</p>
							<ul className="mt-5 divide-y divide-edge">
								{equipment.map((item, i) => (
									<li key={item} className="flex items-baseline gap-3 py-3">
										<span className="font-mono text-xs text-glow/60">
											{String(i + 1).padStart(2, '0')}
										</span>
										<span className="text-inklit/85">{item}</span>
									</li>
								))}
							</ul>
						</div>
					</Reveal>

					<Reveal delay={80}>
						<div className="night-panel p-6 sm:p-8">
							<p className="font-mono text-xs uppercase tracking-[0.3em] text-volt">
								{t('solutionsLanding.manufacturing.valvesTitle')}
							</p>
							<ul className="mt-5 divide-y divide-edge">
								{valves.map((item, i) => (
									<li key={item} className="flex items-baseline gap-3 py-3">
										<span className="font-mono text-xs text-glow/60">
											{String(i + 1).padStart(2, '0')}
										</span>
										<span className="text-inklit/85">{item}</span>
									</li>
								))}
							</ul>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
