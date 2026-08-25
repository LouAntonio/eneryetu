import type { Metadata } from 'next';
import { Products } from '@/views/Products';

export const metadata: Metadata = { title: 'Products | EnerYetu' };

export default function Page() {
	return <Products />;
}