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
	tone?: 'volt' | 'blue' | 'paper';
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
	volt: 'drawing-plate-dark text-paper',
	blue: 'bg-blue/[0.12] text-ink',
	paper: 'drawing-plate text-ink',
};

export function MetricsBento({ eyebrow, title, lead, cells, delay = 0 }: MetricsBentoProps) {
	return (
		<section
			id="bento"
			className="relative isolate overflow-hidden bg-paper py-20 lg:py-28"
			aria-labelledby="bento-title"
		>
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl">
						<p className="mb-4 flex items-center gap-3">
							<span className="section-tag text-blue-dark">{eyebrow}</span>
						</p>
						<h2
							id="bento-title"
							className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl"
						>
							{title}
						</h2>
						{lead ? (
							<p className="mt-4 text-base text-slate sm:text-lg">{lead}</p>
						) : null}
					</div>
					<p className="ui-label max-w-xs text-slate/70">{`CAPACITY · LIVE PLANT`}</p>
				</div>

				<div className="bento-grid grid grid-cols-1 gap-3 sm:grid-cols-6 sm:grid-rows-2 sm:auto-rows-[180px] lg:auto-rows-[200px]">
					{cells.map((cell, index) => {
						const tone = cell.tone ?? (cell.span === 'feature' ? 'volt' : 'paper');
						const isFeature = cell.span === 'feature';
						const dark = tone === 'volt';
						return (
							<ScrollReveal
								key={cell.id}
								animation="up"
								delay={delay + index * 80}
								className={`${SPAN_CLASS[cell.span]}`}
							>
								<article
									className={`corner-plate group relative flex h-full w-full flex-col justify-between overflow-hidden p-5 lg:p-6 ${TONE_CLASS[tone]}`}
								>
									<div className="flex items-start justify-between gap-3">
										<span
											className={`ui-label ${dark ? 'text-blue' : 'text-blue-dark'}`}
										>
											{cell.tag}
										</span>
										<span
											className={`dim-value ${dark ? 'text-paper/45' : 'text-slate/60'}`}
										>
											{String(cell.value).padStart(2, '0')}
										</span>
									</div>

									<div className="mt-4 flex flex-col gap-3">
										<div className="flex items-baseline gap-2">
											<AnimatedCounter
												value={cell.value}
												delay={delay + index * 80 + 120}
												className={`font-display text-5xl font-bold leading-none tabular-nums lg:text-6xl ${dark ? 'text-paper' : 'text-ink'}`}
											/>
											<span
												className={`ui-label self-start pb-1 ${dark ? 'text-blue' : 'text-blue-dark'}`}
											>
												{cell.unit}
											</span>
										</div>
										<div>
											<p
												className={`font-display text-base font-bold uppercase leading-tight tracking-tight ${dark ? 'text-paper' : 'text-ink'} ${isFeature ? 'lg:text-lg' : ''}`}
											>
												{cell.label}
											</p>
											{cell.note ? (
												<p
													className={`mt-1.5 font-mono text-xs leading-relaxed ${dark ? 'text-paper/55' : 'text-slate'}`}
												>
													{cell.note}
												</p>
											) : null}
										</div>
									</div>

									<div
										aria-hidden
										className={`dimension mt-5 ${dark ? 'bg-blue' : 'bg-blue'}`}
									>
										<span
											className={`dim-value absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent px-2 text-[0.65rem] ${dark ? 'text-paper/60' : 'text-slate/60'}`}
										>
											{`${String(index + 1).padStart(2, '0')} / ${String(cells.length).padStart(2, '0')}`}
										</span>
									</div>
								</article>
							</ScrollReveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
