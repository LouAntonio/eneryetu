import type { Metadata } from 'next';
import { ProductForm } from '@/views/admin/ProductForm';

export const metadata: Metadata = { title: 'Novo Produto | Admin' };

export default function NewProductPage() {
	return <ProductForm />;
}
