'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

interface ServiceItem {
	en: string;
	pt: string;
}
interface ServiceGroup {
	name: string;
	items: ServiceItem[];
}

export function ServiceRoster() {
	const { t } = useTranslation();
	const groups = useMemo(
		() => t('solutionsLanding.services.groups', { returnObjects: true }) as ServiceGroup[],
		[t],
	);

	let runningIndex = 0;

	return (
		<section id="servicos" className="relative py-20 sm:py-28">
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<Reveal>
					<SectionHead
						eyebrow={t('solutionsLanding.services.eyebrow')}
						title={t('solutionsLanding.services.title')}
						lead={t('solutionsLanding.services.lead')}
					/>
				</Reveal>

				<div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
					{groups.map((group, gi) => (
						<Reveal key={group.name} delay={gi * 60}>
							<div>
								<p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-volt">
									{group.name}
								</p>
								<ul className="divide-y divide-edge border-t border-edge">
									{group.items.map((item) => {
										const idx = runningIndex++;
										return (
											<li
												key={item.en}
												className="group flex items-start gap-4 py-4"
											>
												<span className="font-mono text-xs leading-6 text-glow/70">
													{String(idx + 1).padStart(2, '0')}
												</span>
												<div>
													<p className="font-mono text-sm uppercase tracking-[0.12em] text-inklit/85 transition-colors group-hover:text-volt">
														{item.en}
													</p>
													<p className="mt-1 text-sm text-muted">
														{item.pt}
													</p>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
