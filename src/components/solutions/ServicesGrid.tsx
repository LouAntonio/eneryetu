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
	tone: 'volt' | 'sun' | 'blue' | 'paper';
}

const CATEGORIES: CategoryGroup[] = [
	{ id: 'field', label: 'Field operations', tone: 'volt' },
	{ id: 'workshop', label: 'Workshop & maintenance', tone: 'sun' },
	{ id: 'epc', label: 'EPC & fabrication', tone: 'blue' },
	{ id: 'support', label: 'Supply & support', tone: 'paper' },
];

const TONE_ACCENT: Record<CategoryGroup['tone'], string> = {
	volt: 'border-volt text-volt',
	sun: 'border-sun text-sun-deep',
	blue: 'border-blue-deep text-blue-dark',
	paper: 'border-ink text-ink',
};

const TONE_NUMBER: Record<CategoryGroup['tone'], string> = {
	volt: 'bg-volt text-ink',
	sun: 'bg-sun text-ink',
	blue: 'bg-blue text-ink',
	paper: 'bg-ink text-paper',
};

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
		<section id="services" className="py-20 lg:py-28" aria-labelledby="services-title">
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-14 max-w-3xl">
					<p className="mb-3 flex items-center gap-3 ui-label text-blue-dark">
						<span className="node-live h-1.5 w-1.5 rounded-full bg-volt" />
						{eyebrow}
					</p>
					<h2
						id="services-title"
						className="font-display mb-4 text-4xl font-black uppercase tracking-tight text-ink lg:text-5xl"
					>
						{title}
					</h2>
					<p className="text-base text-slate sm:text-lg">{lead}</p>
				</div>

				<div className="grid gap-6 lg:grid-cols-2">
					{buckets.map((bucket, bucketIdx) => (
						<div
							key={bucket.id}
							className={`relative overflow-hidden rounded-2xl border-2 ${TONE_ACCENT[bucket.tone]} bg-white p-6 lg:p-7`}
						>
							<div className="mb-5 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<span
										className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${TONE_NUMBER[bucket.tone]}`}
									>
										{String(bucketIdx + 1).padStart(2, '0')}
									</span>
									<h3 className="font-display text-xl font-bold uppercase tracking-tight text-ink lg:text-2xl">
										{bucket.label}
									</h3>
								</div>
								<span className="ui-label text-slate">
									{String(bucket.items.length).padStart(2, '0')} items
								</span>
							</div>

							<ul className="space-y-2">
								{bucket.items.map((item, idx) => (
									<li
										key={item.title}
										className="flex items-start gap-3 border-t border-line/60 pt-2.5 first:border-t-0 first:pt-0"
									>
										<span className="ui-label pt-1.5 text-slate">
											{String(idx + 1).padStart(2, '0')}
										</span>
										<span className="flex-1 text-sm text-ink sm:text-base">
											{item.title}
										</span>
									</li>
								))}
							</ul>
						</div>
					))}
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
