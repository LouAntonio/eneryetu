import type { Metadata } from 'next';
import { MediaNews } from '@/views/media';

export const metadata: Metadata = { title: 'News | ENERYETU' };

export default function Page() {
	return <MediaNews />;
}
