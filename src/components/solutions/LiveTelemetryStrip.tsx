'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * LiveTelemetryStrip — a thin sticky strip that sits just under the solutions
 * header. It replaces the previous vertical CircuitRail with a horizontal
 * "operations console" feel: a pulsing volt dot, a live UTC clock, a slow
 * ticker of mono labels, and a tiny scroll-progress indicator.
 */
export function LiveTelemetryStrip() {
	const { t } = useTranslation();
	const ticker = t('solutions.hero.ticker', { returnObjects: true }) as string[];

	const [now, setNow] = useState<string>(() => formatUtc(new Date()));
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const tick = () => setNow(formatUtc(new Date()));
		const id = window.setInterval(tick, 1000);
		return () => window.clearInterval(id);
	}, []);

	useEffect(() => {
		const onScroll = () => {
			const doc = document.documentElement;
			const max = doc.scrollHeight - doc.clientHeight;
			if (max <= 0) {
				setProgress(0);
				return;
			}
			setProgress(Math.min(1, Math.max(0, doc.scrollTop / max)));
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const items = Array.isArray(ticker) ? ticker : [];

	return (
		<div
			aria-hidden={false}
			role="status"
			className="sticky top-14 z-30 h-9 w-full border-b border-white/10 bg-ink-deep/95 text-paper backdrop-blur-md"
		>
			<div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4 sm:px-6">
				<span className="flex shrink-0 items-center gap-2 border-r border-white/10 pr-4">
					<span className="node-live h-1.5 w-1.5 rounded-full bg-volt" />
					<span className="ui-label text-volt">LIVE</span>
				</span>

				<span className="hidden shrink-0 items-center gap-2 sm:flex">
					<span className="ui-label text-paper/45">UTC</span>
					<span className="ui-label text-paper/85 tabular-nums">{now}</span>
				</span>

				<div className="relative flex-1 overflow-hidden">
					<div className="ticker-track">
						{[...items, ...items].map((item, i) => (
							<span key={i} className="flex items-center whitespace-nowrap pr-10">
								<span className="ui-label text-paper/65">{item}</span>
								<span className="ml-10 h-1 w-1 rounded-full bg-blue/60" />
							</span>
						))}
					</div>
				</div>

				<div className="hidden h-3 w-24 shrink-0 items-center sm:flex">
					<div className="strip-progress-track">
						<div
							className="strip-progress-fill"
							style={{ transform: `scaleX(${progress})` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function formatUtc(d: Date) {
	const pad = (n: number) => n.toString().padStart(2, '0');
	return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}
