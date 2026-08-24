'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { AuthProvider } from '../contexts/AuthContext';
import { initI18n } from '../i18n/config';

export function Providers({ children }: { children: ReactNode }) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		initI18n();
		setReady(true);
	}, []);

	if (!ready) return null;

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	);
}
