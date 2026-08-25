import type { Metadata } from 'next';
import { Careers } from '@/views/Careers';

export const metadata: Metadata = { title: 'Careers | EnerYetu' };

export default function Page() {
	return <Careers />;
}
