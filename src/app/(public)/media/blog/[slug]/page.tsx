import type { Metadata } from 'next';
import { Contact } from '@/views/Contact';

export function generateMetadata(): Metadata {
	return { title: 'Blog Post | EnerYetu' };
}

export default function Page() {
	return <Contact />;
}
