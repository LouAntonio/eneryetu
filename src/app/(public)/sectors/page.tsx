import type { Metadata } from 'next';
import { Sectors } from '@/views/Sectors';

export const metadata: Metadata = { title: 'Sectors | ENERYETU' };

export default function Page() {
	return <Sectors />;
}
