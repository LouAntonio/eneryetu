import type { Metadata } from 'next';
import { MediaPostDetail } from '@/views/media';

export function generateMetadata(): Metadata {
	return { title: 'Blog Post | ENERYETU' };
}

export default function Page() {
	return <MediaPostDetail />;
}
