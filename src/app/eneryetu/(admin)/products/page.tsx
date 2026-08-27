import type { Metadata } from 'next';
import { Products } from '@/views/admin/Products';

export const metadata: Metadata = { title: 'Produtos | Admin' };

export default function AdminProductsPage() {
	return <Products />;
}
