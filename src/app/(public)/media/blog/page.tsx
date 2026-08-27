import type { Metadata } from 'next';
import { MediaBlog } from '@/views/media';

export const metadata: Metadata = { title: 'Blog | ENERYETU' };

export default function Page() {
	return <MediaBlog />;
}
