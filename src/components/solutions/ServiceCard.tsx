'use client';

import { ScrollReveal } from './ScrollReveal';

interface ServiceCardProps {
	title: string;
	icon?: React.ReactNode;
	delay?: number;
	category?: 'field' | 'workshop' | 'epc' | 'support';
}

const CATEGORY_COLORS = {
	field: 'text-blue-deep',
	workshop: 'text-sun-deep',
	epc: 'text-blue-deep',
	support: 'text-slate',
};

const CATEGORY_BG = {
	field: 'bg-blue/10',
	workshop: 'bg-sun/15',
	epc: 'bg-volt/12',
	support: 'bg-paper',
};

const CATEGORY_ACCENT = {
	field: 'from-blue to-blue-deep',
	workshop: 'from-sun to-sun-deep',
	epc: 'from-volt to-sun',
	support: 'from-slate to-blue-dark',
};

export function ServiceCard({ title, icon, delay = 0, category = 'support' }: ServiceCardProps) {
	return (
		<ScrollReveal animation="up" delay={delay} className="group h-full">
			<article className="surface-elevated p-6 lg:p-7 relative overflow-hidden h-full flex flex-col">
				{/* Top accent bar */}
				<div
					className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${CATEGORY_ACCENT[category]} opacity-70 group-hover:opacity-100 transition-opacity`}
				/>

				{/* Status light */}
				<span
					aria-hidden
					className={`node-live absolute right-4 top-5 h-2 w-2 rounded-full ${
						category === 'workshop' ? 'bg-sun' : 'bg-volt'
					}`}
				/>

				{/* Icon */}
				<div
					className={`mb-5 h-12 w-12 rounded-lg ${CATEGORY_BG[category]} flex items-center justify-center ${CATEGORY_COLORS[category]} group-hover:scale-105 transition-transform duration-300`}
				>
					{icon || (
						<svg
							className="h-7 w-7"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
						>
							<rect x="3" y="3" width="18" height="18" rx="2" />
							<path d="M9 12h6M12 9v6" />
						</svg>
					)}
				</div>

				{/* Title */}
				<h3 className="font-display text-xl lg:text-2xl font-bold uppercase tracking-tight text-ink mb-3 group-hover:text-blue-dark transition-colors duration-300">
					{title}
				</h3>

				{/* Live current running along the node */}
				<div className="current-line mt-auto pt-4" />
			</article>
		</ScrollReveal>
	);
}

/* Default service icons for the 13 services */
export const serviceIcons: Record<string, React.ReactNode> = {
	'Manpower (Provision & Training)': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	),
	'Tank and Pipework Cleaning Services': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M12 2v20" />
			<path d="M5 8h14" />
			<path d="M5 16h14" />
			<ellipse cx="12" cy="12" rx="6" ry="4" />
		</svg>
	),
	'General Maintenance & Technical Support': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
		</svg>
	),
	'Generator Maintenance': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M12 2v4" />
			<path d="M12 18v4" />
			<path d="M4.93 4.93l2.83 2.83" />
			<path d="M16.24 16.24l2.83 2.83" />
			<path d="M2 12h4" />
			<path d="M18 12h4" />
			<path d="M4.93 19.07l2.83-2.83" />
			<path d="M16.24 7.76l2.83-2.83" />
			<circle cx="12" cy="12" r="4" />
		</svg>
	),
	'HVAC (Heating, Ventilation & Air Conditioning)': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M12 3v6" />
			<path d="M12 15v6" />
			<path d="M4.93 4.93l2.83 2.83" />
			<path d="M16.24 16.24l2.83 2.83" />
			<path d="M2 12h6" />
			<path d="M16 12h6" />
			<path d="M4.93 19.07l2.83-2.83" />
			<path d="M16.24 7.76l2.83-2.83" />
			<circle cx="12" cy="12" r="4" />
		</svg>
	),
	'General Logistics & Material Supply': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
			<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
			<line x1="12" y1="22.08" x2="12" y2="12" />
		</svg>
	),
	'Supply of Consumables, Paints, WDs, Moy Cotes, Grease, Fittings & Connectors': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 6v6l4 2" />
		</svg>
	),
	'Scaffolding Erection': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M4 21V3h16v18" />
			<path d="M4 9h16" />
			<path d="M4 15h16" />
		</svg>
	),
	'Structural Repair & Painting': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M12 3v18" />
			<path d="M3 12h18" />
			<path d="M3 3l18 18" />
			<path d="M21 3l-18 18" />
		</svg>
	),
	'Instrumentation & Calibration': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 6v6l4 2" />
			<path d="M12 18a6 6 0 0 0 0-12v12" />
		</svg>
	),
	'Equipment Fabrication & Installation': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<rect x="3" y="3" width="7" height="9" rx="1" />
			<rect x="14" y="3" width="7" height="5" rx="1" />
			<rect x="14" y="12" width="7" height="9" rx="1" />
			<rect x="3" y="16" width="7" height="5" rx="1" />
		</svg>
	),
	'Oil & Gas Structure Construction (Medium & Large-Scale) – EPC Projects': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M4 21V3h16v18" />
			<path d="M8 21V7" />
			<path d="M12 21V11" />
			<path d="M16 21V15" />
		</svg>
	),
	'Brownfield EPC: Modification & Maintenance': (
		<svg
			className="h-8 w-8"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
		>
			<path d="M12 3v18" />
			<path d="M3 12h18" />
			<path d="M12 3a6 6 0 0 0 0 12v6" />
		</svg>
	),
};
