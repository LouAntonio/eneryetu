import type { Metadata } from 'next';
import { Home } from '@/views/Home';

export const metadata: Metadata = { title: 'EnerYetu' };

export default function Page() {
	return <Home />;
}
