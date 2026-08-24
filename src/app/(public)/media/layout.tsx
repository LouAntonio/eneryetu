import type { ReactNode } from 'react';
import { MediaLayout } from '@/views/media';

export default function Layout({ children }: { children: ReactNode }) {
	return <MediaLayout>{children}</MediaLayout>;
}