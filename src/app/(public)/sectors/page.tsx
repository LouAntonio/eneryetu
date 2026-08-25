import type { Metadata } from 'next';
import { Sectors } from '@/views/Sectors';

export const metadata: Metadata = { title: 'Sectors | EnerYetu' };

export default function Page() {
	return <Sectors />;
}
