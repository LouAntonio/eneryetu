import type { ReactNode } from 'react';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function SolutionsLayout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-void text-inklit min-h-screen">
			<ScrollToTop />
			<main>{children}</main>
		</div>
	);
}
