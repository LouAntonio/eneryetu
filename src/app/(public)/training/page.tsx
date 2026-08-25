import type { Metadata } from 'next';
import { Training } from '@/views/Training';

export const metadata: Metadata = { title: 'Training | EnerYetu' };

export default function Page() {
	return <Training />;
}
