import type { Metadata } from 'next';
import { TrainingDetail } from '@/views/TrainingDetail';

export function generateMetadata(): Metadata {
	return { title: 'Training | ENERYETU' };
}

export default function Page() {
	return <TrainingDetail />;
}
