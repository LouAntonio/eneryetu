import type { Metadata } from 'next';
import { Home } from '@/views/Home';

export const metadata: Metadata = { title: 'ENERYETU' };

export default function Page() {
	return <Home />;
}
