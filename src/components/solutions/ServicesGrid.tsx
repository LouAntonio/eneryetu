'use client';

import { serviceIcons, ServiceCard } from './ServiceCard';

interface ServicesGridProps {
	eyebrow: string;
	title: string;
	lead: string;
	items: { title: string }[];
}

interface CategoryGroup {
	id: 'field' | 'workshop' | 'epc' | 'support';
	label: string;
	tone: 'volt' | 'blue' | 'paper';
}

const CATEGORIES: CategoryGroup[] = [
	{ id: 'field', label: 'Field operations', tone: 'blue' },
	{ id: 'workshop', label: 'Workshop & maintenance', tone: 'paper' },
	{ id: 'epc', label: 'EPC & fabrication', tone: 'volt' },
	{ id: 'support', label: 'Supply & support', tone: 'paper' },
];

export function ServicesGrid({ eyebrow, title, lead, items }: ServicesGridProps) {
	const buckets = CATEGORIES.map((cat) => ({
		...cat,
		items: items.filter((_, idx) => {
			const order: CategoryGroup['id'][] = [
				'field',
				'field',
				'workshop',
				'workshop',
				'field',
				'support',
				'support',
				'field',
				'field',
				'workshop',
				'epc',
				'epc',
				'epc',
			];
			return order[idx] === cat.id;
		}),
	}));

	return (
		<section
			id="services"
			className="relative py-20 lg:py-28"
			aria-labelledby="services-title"
		>
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-14 max-w-3xl">
					<p className="mb-4 flex items-center gap-3">
						<span className="section-tag text-blue-dark">{eyebrow}</span>
					</p>
					<h2
						id="services-title"
						className="font-display mb-4 text-4xl font-bold uppercase tracking-tight text-ink lg:text-5xl"
					>
						{title}
					</h2>
					<p className="text-base text-slate sm:text-lg">{lead}</p>
				</div>

				<div className="grid gap-5 lg:grid-cols-2">
					{buckets.map((bucket) => {
						const dark = bucket.tone === 'volt';
						return (
							<div
								key={bucket.id}
								className={`corner-plate relative overflow-hidden p-6 lg:p-7 ${
									dark ? 'drawing-plate-dark' : 'drawing-plate'
								}`}
							>
								<div className="mb-6 flex items-center justify-between gap-3 border-b border-current/10 pb-4">
									<h3
										className={`font-display text-xl font-bold uppercase tracking-tight lg:text-2xl ${
											dark ? 'text-paper' : 'text-ink'
										}`}
									>
										{bucket.label}
									</h3>
									<span
										className={`dim-value ${dark ? 'text-blue' : 'text-blue-dark'}`}
									>
										{String(bucket.items.length).padStart(2, '0')}
									</span>
								</div>

								<ul className="space-y-0">
									{bucket.items.map((item, idx) => (
										<li
											key={item.title}
											className={`flex items-baseline gap-4 border-t py-3 first:border-t-0 first:pt-0 ${
												dark ? 'border-white/10' : 'border-line/70'
											}`}
										>
											<span
												className={`dim-value ${dark ? 'text-paper/40' : 'text-slate/50'}`}
											>
												{String(idx + 1).padStart(2, '0')}
											</span>
											<span
												className={`flex-1 text-sm sm:text-base ${
													dark ? 'text-paper/85' : 'text-ink'
												}`}
											>
												{item.title}
											</span>
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>

				<div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
					{items.map((svc) => (
						<ServiceCard
							key={svc.title}
							title={svc.title}
							icon={serviceIcons[svc.title]}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
