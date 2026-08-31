'use client';

import { AnimatedCounter } from './AnimatedCounter';
import { ScrollReveal } from './ScrollReveal';

export interface BentoCell {
	id: string;
	tag: string;
	value: number;
	unit: string;
	label: string;
	note?: string;
	/**
	 * Bento placement. The grid is a 6-col / 2-row desktop layout.
	 * `feature` is the dominant top-left cell.
	 * `wide` spans 4 cols, `tall` spans 2 rows, `standard` is 2x1.
	 */
	span: 'feature' | 'wide' | 'tall' | 'standard' | 'compact';
	tone?: 'volt' | 'sun' | 'blue' | 'paper';
}

interface MetricsBentoProps {
	eyebrow: string;
	title: string;
	lead: string;
	cells: BentoCell[];
	delay?: number;
}

const SPAN_CLASS: Record<BentoCell['span'], string> = {
	feature: 'sm:col-span-3 sm:row-span-2',
	wide: 'sm:col-span-3 sm:row-span-1',
	tall: 'sm:col-span-3 sm:row-span-2',
	standard: 'sm:col-span-3 sm:row-span-1',
	compact: 'sm:col-span-2 sm:row-span-1',
};

const TONE_CLASS: Record<NonNullable<BentoCell['tone']>, string> = {
	volt: 'bg-ink-deep text-paper',
	sun: 'bg-sun text-ink',
	blue: 'bg-blue text-ink',
	paper: 'bg-white text-ink',
};

export function MetricsBento({ eyebrow, title, lead, cells, delay = 0 }: MetricsBentoProps) {
	return (
		<section
			id="bento"
			className="relative isolate overflow-hidden bg-ink-deep py-20 text-paper lg:py-28"
			aria-labelledby="bento-title"
		>
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-volt">
							<span className="node-live h-1.5 w-1.5 rounded-full bg-volt" />
							{eyebrow}
						</p>
						<h2
							id="bento-title"
							className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-paper sm:text-5xl"
						>
							{title}
						</h2>
						{lead ? (
							<p className="mt-4 text-base text-paper/70 sm:text-lg">{lead}</p>
						) : null}
					</div>
					<p className="ui-label max-w-xs text-paper/50">{`// 6 cells · live capacity snapshot`}</p>
				</div>

				<div className="bento-grid grid grid-cols-1 gap-4 sm:grid-cols-6 sm:grid-rows-2 sm:auto-rows-[180px] lg:auto-rows-[200px]">
					{cells.map((cell, index) => {
						const tone = cell.tone ?? (cell.span === 'feature' ? 'volt' : 'paper');
						const isFeature = cell.span === 'feature';
						return (
							<ScrollReveal
								key={cell.id}
								animation="up"
								delay={delay + index * 80}
								className={`${SPAN_CLASS[cell.span]}`}
							>
								<article
									className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl p-5 ring-1 ring-inset ring-white/5 transition-transform duration-500 hover:-translate-y-1 lg:p-6 ${TONE_CLASS[tone]}`}
								>
									<div className="flex items-center justify-between">
										<span
											className={`ui-label ${tone === 'volt' || tone === 'blue' ? 'text-ink/70' : 'text-slate'}`}
										>
											{cell.tag}
										</span>
										<span
											className={`ui-label ${tone === 'volt' || tone === 'blue' ? 'text-ink/60' : 'text-slate/60'}`}
										>
											{String(index + 1).padStart(2, '0')} /{' '}
											{String(cells.length).padStart(2, '0')}
										</span>
									</div>

									<div className="mt-4 flex flex-col gap-3">
										<div className="flex items-baseline gap-2">
											<AnimatedCounter
												value={cell.value}
												delay={delay + index * 80 + 120}
												className={`font-display text-5xl font-black leading-none lg:text-6xl ${tone === 'volt' || tone === 'sun' || tone === 'blue' ? 'text-ink' : 'text-ink'}`}
											/>
											<span
												className={`ui-label self-start pb-1 ${tone === 'volt' || tone === 'sun' || tone === 'blue' ? 'text-ink/70' : 'text-slate'}`}
											>
												{cell.unit}
											</span>
										</div>
										<div>
											<p
												className={`font-display text-base font-bold uppercase leading-tight tracking-tight ${tone === 'volt' || tone === 'sun' || tone === 'blue' ? 'text-ink' : 'text-ink'} ${isFeature ? 'lg:text-lg' : ''}`}
											>
												{cell.label}
											</p>
											{cell.note ? (
												<p
													className={`mt-1.5 text-sm leading-relaxed ${tone === 'volt' || tone === 'sun' || tone === 'blue' ? 'text-ink/70' : 'text-slate'}`}
												>
													{cell.note}
												</p>
											) : null}
										</div>
									</div>

									<div
										aria-hidden
										className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${
											tone === 'volt' || tone === 'sun' || tone === 'blue'
												? 'bg-ink'
												: 'bg-volt'
										}`}
									/>
								</article>
							</ScrollReveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
