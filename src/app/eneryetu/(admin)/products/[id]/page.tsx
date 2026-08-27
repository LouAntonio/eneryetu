import type { Metadata } from 'next';
import { ProductForm } from '@/views/admin/ProductForm';

export const metadata: Metadata = { title: 'Editar Produto | Admin' };

export default function EditProductPage() {
	return <ProductForm />;
}
