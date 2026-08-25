import type { Metadata } from 'next';
import { MediaNews } from '@/views/media';

export const metadata: Metadata = { title: 'News | EnerYetu' };

export default function Page() {
	return <MediaNews />;
}
