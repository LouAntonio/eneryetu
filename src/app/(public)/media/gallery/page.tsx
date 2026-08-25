import type { Metadata } from 'next';
import { MediaGallery } from '@/views/media';

export const metadata: Metadata = { title: 'Gallery | EnerYetu' };

export default function Page() {
	return <MediaGallery />;
}
