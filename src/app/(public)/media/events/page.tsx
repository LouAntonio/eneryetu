import type { Metadata } from 'next';
import { MediaEvents } from '@/views/media';

export const metadata: Metadata = { title: 'Events | ENERYETU' };

export default function Page() {
	return <MediaEvents />;
}
