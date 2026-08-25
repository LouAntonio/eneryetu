import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Media | EnerYetu' };

export default function Page() {
	redirect('/media/blog');
}
