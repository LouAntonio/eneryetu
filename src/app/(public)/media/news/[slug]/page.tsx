import type { Metadata } from 'next';
import { MediaGallery } from '@/views/media';

export function generateMetadata(): Metadata {
	return { title: 'News | ENERYETU' };
}

export default function Page() {
	return <MediaGallery />;
}
