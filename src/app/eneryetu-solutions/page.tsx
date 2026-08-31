import type { Metadata } from 'next';
import { SolutionsLanding } from '@/views/SolutionsLanding';

export const metadata: Metadata = { title: 'ENERYETU Solutions | ENERYETU' };

export default function Page() {
	return <SolutionsLanding />;
}
