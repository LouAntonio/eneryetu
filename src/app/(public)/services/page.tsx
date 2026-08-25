import type { Metadata } from 'next';
import { Services } from '@/views/Services';

export const metadata: Metadata = { title: 'Services | EnerYetu' };

export default function Page() {
	return <Services />;
}
