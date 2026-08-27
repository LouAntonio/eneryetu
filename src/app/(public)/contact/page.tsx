import type { Metadata } from 'next';
import { Contact } from '@/views/Contact';

export const metadata: Metadata = { title: 'Contact | ENERYETU' };

export default function Page() {
	return <Contact />;
}
