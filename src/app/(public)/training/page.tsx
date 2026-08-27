import type { Metadata } from 'next';
import { Training } from '@/views/Training';

export const metadata: Metadata = { title: 'Training | ENERYETU' };

export default function Page() {
	return <Training />;
}
