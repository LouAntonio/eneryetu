import type { Metadata } from 'next';
import { MediaBlog } from '@/views/media';

export const metadata: Metadata = { title: 'Blog | EnerYetu' };

export default function Page() {
	return <MediaBlog />;
}
