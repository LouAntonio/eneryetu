import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = { title: 'Media | ENERYETU' };

export default function Page() {
	redirect('/media/blog');
}
