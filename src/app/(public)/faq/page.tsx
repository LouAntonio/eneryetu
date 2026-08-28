import type { Metadata } from 'next';
import { FAQ } from '@/views/FAQ';

export const metadata: Metadata = { title: 'FAQ | ENERYETU' };

export default function Page() {
	return <FAQ />;
}
