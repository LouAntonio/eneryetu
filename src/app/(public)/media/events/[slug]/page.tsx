import type { Metadata } from 'next';
import { MediaBlog } from '@/views/media';

export function generateMetadata(): Metadata {
	return { title: 'Event | EnerYetu' };
}

export default function Page() {
	return <MediaBlog />;
}
