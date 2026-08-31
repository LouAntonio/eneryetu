import type { Metadata } from 'next';
import { MediaEventDetail } from '@/views/media';

export function generateMetadata(): Metadata {
	return { title: 'Event | ENERYETU' };
}

export default function Page() {
	return <MediaEventDetail />;
}
