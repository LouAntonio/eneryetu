'use client';

import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

const KEYS = ['metal', 'tank', 'pump', 'maintenance', 'materials'] as const;

export function CapabilityStrips() {
	const { t } = useTranslation();

	return (
		<section className="relative py-16 sm:py-20">
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<Reveal>
					<p className="mb-8 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-glow">
						{t('solutionsLanding.capabilities.eyebrow')}
					</p>
				</Reveal>
				<div className="grid gap-4 md:grid-cols-2">
					{KEYS.map((key, i) => (
						<Reveal key={key} delay={i * 50}>
							<div className="night-panel flex h-full flex-col justify-between p-6 transition-colors hover:border-glow/40">
								<h3 className="font-display-alt text-xl uppercase leading-tight text-inklit">
									{t(`solutionsLanding.capabilities.${key}.title`)}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-muted">
									{t(`solutionsLanding.capabilities.${key}.body`)}
								</p>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
