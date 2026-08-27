import type { Metadata } from 'next';
import { About } from '@/views/About';

export const metadata: Metadata = { title: 'About | ENERYETU' };

export default function Page() {
	return <About />;
}
