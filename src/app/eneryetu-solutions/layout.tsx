import type { ReactNode } from 'react';
import { SolutionsHeader } from '@/components/solutions/SolutionsHeader';
import { SolutionsFooter } from '@/components/solutions/SolutionsFooter';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function SolutionsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-paper">
			<ScrollToTop />
			<SolutionsHeader />
			<main className="flex-1 pt-16 pb-12">{children}</main>
			<SolutionsFooter />
		</div>
	);
}
