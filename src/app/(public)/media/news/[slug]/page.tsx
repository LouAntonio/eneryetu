import type { Metadata } from 'next';
import { MediaGallery } from '@/views/media';

export function generateMetadata(): Metadata {
	return { title: 'News | EnerYetu' };
}

export default function Page() {
	return <MediaGallery />;
}
