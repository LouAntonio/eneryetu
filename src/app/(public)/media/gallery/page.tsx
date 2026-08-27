import type { Metadata } from 'next';
import { MediaGallery } from '@/views/media';

export const metadata: Metadata = { title: 'Gallery | ENERYETU' };

export default function Page() {
	return <MediaGallery />;
}
