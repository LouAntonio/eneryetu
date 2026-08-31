import type { ReactNode } from 'react';
import { SolutionsHeader } from '@/components/solutions/SolutionsHeader';
import { SolutionsFooter } from '@/components/solutions/SolutionsFooter';
import { LiveTelemetryStrip } from '@/components/solutions/LiveTelemetryStrip';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function SolutionsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-paper">
			<ScrollToTop />
			<SolutionsHeader />
			<LiveTelemetryStrip />
			<main className="flex-1 pb-12">{children}</main>
			<SolutionsFooter />
		</div>
	);
}
