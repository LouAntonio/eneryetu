'use client';

import { ScrollReveal } from './ScrollReveal';

interface FacilityTile {
	title: string;
	value: number;
	unit: string;
	note: string;
	image: string;
	imageAlt?: string;
	tag: string;
}

interface FacilitiesShowcaseProps {
	eyebrow: string;
	title: string;
	lead: string;
	site: string;
	tiles: [FacilityTile, FacilityTile, FacilityTile];
	delay?: number;
}

/**
 * FacilitiesShowcase — one dominant tile on the left (Nave 1, the largest by
 * area) and two stacked tiles on the right (Nave 2 + Silos). The composition
 * is a single asymmetric row on desktop and stacked on mobile.
 */
export function FacilitiesShowcase({
	eyebrow,
	title,
	lead,
	site,
	tiles,
	delay = 0,
}: FacilitiesShowcaseProps) {
	return (
		<section
			id="facilities"
			className="relative bg-paper py-20 lg:py-28"
			aria-labelledby="facilities-title"
		>
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl">
						<p className="mb-3 flex items-center gap-3 ui-label text-blue-dark">
							<span className="node-live h-1.5 w-1.5 rounded-full bg-volt" />
							{eyebrow}
						</p>
						<h2
							id="facilities-title"
							className="font-display text-4xl font-black uppercase tracking-tight text-ink lg:text-5xl"
						>
							{title}
						</h2>
						{lead ? (
							<p className="mt-4 text-base text-slate sm:text-lg">{lead}</p>
						) : null}
					</div>
				</div>

				<div className="grid gap-5 lg:grid-cols-5">
					<ScrollReveal
						animation="up"
						delay={delay}
						className="lg:col-span-3 lg:row-span-2"
					>
						<article className="group relative h-full min-h-[420px] overflow-hidden rounded-2xl border-2 border-ink bg-ink text-paper lg:min-h-[560px]">
							<div className="absolute inset-0 -z-10">
								<img
									src={tiles[0].image}
									alt={tiles[0].imageAlt || tiles[0].title}
									className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
								/>
								<div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/80 to-ink/10" />
							</div>
							<div className="relative flex h-full flex-col justify-between p-7 lg:p-10">
								<div className="flex items-center justify-between">
									<span className="ui-label text-volt">{tiles[0].tag}</span>
									<span className="node-live h-2 w-2 rounded-full bg-volt" />
								</div>
								<div>
									<p className="ui-label text-paper/60">01 / 03</p>
									<h3 className="mt-2 font-display text-3xl font-black uppercase leading-tight tracking-tight text-paper lg:text-4xl">
										{tiles[0].title}
									</h3>
									<div className="mt-6 flex items-baseline gap-2">
										<span className="font-display text-7xl font-black leading-none text-volt lg:text-8xl">
											{tiles[0].value.toLocaleString()}
										</span>
										<span className="ui-label pb-1 text-paper/70">
											{tiles[0].unit}
										</span>
									</div>
									<p className="mt-4 max-w-md text-sm text-paper/75 sm:text-base">
										{tiles[0].note}
									</p>
								</div>
							</div>
						</article>
					</ScrollReveal>

					{tiles.slice(1).map((tile, idx) => (
						<ScrollReveal
							key={tile.title}
							animation="up"
							delay={delay + (idx + 1) * 100}
							className="lg:col-span-2"
						>
							<article className="group relative h-full overflow-hidden rounded-2xl border-2 border-line bg-white">
								<div className="grid h-full grid-cols-1 sm:grid-cols-[1fr_auto]">
									<div className="flex flex-col justify-between p-6 lg:p-7">
										<div>
											<div className="mb-3 flex items-center justify-between">
												<span className="ui-label text-blue-dark">
													{tagForIndex(idx + 2)}
												</span>
												<span className="ui-label text-slate">
													{String(idx + 2).padStart(2, '0')} / 03
												</span>
											</div>
											<h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink lg:text-2xl">
												{tile.title}
											</h3>
										</div>
										<div className="mt-6">
											<div className="flex items-baseline gap-2">
												<span className="font-display text-5xl font-black leading-none text-ink lg:text-6xl">
													{tile.value.toLocaleString()}
												</span>
												<span className="ui-label pb-1 text-slate">
													{tile.unit}
												</span>
											</div>
											<p className="mt-3 text-sm text-slate">{tile.note}</p>
										</div>
									</div>
									<div className="relative h-32 w-full sm:h-auto sm:w-44 lg:w-52">
										<img
											src={tile.image}
											alt={tile.imageAlt || tile.title}
											className="absolute inset-0 h-full w-full object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/30 sm:bg-gradient-to-r" />
									</div>
								</div>
							</article>
						</ScrollReveal>
					))}
				</div>

				{site ? (
					<ScrollReveal animation="fade" delay={delay + 400} className="mt-10">
						<p className="border-l-2 border-volt pl-4 text-sm text-slate sm:text-base">
							{site}
						</p>
					</ScrollReveal>
				) : null}
			</div>
		</section>
	);
}

function tagForIndex(idx: number) {
	if (idx === 2) return 'Nave 2';
	if (idx === 3) return 'Silos';
	return `Tile ${idx}`;
}
