import type { Metadata } from 'next';
import { MediaBlog } from '@/views/media';

export function generateMetadata(): Metadata {
	return { title: 'Event | ENERYETU' };
}

export default function Page() {
	return <MediaBlog />;
}
