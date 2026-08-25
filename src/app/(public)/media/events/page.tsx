import type { Metadata } from 'next';
import { MediaEvents } from '@/views/media';

export const metadata: Metadata = { title: 'Events | EnerYetu' };

export default function Page() {
	return <MediaEvents />;
}
