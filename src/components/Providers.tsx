'use client';

import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { AuthProvider } from '../contexts/AuthContext';
import { initI18n, default as i18n } from '../i18n/config';

const emptySubscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () => true;

export function Providers({ children }: { children: ReactNode }) {
	useEffect(() => {
		initI18n();
	}, []);

	const hydrated = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

	if (!hydrated || !i18n.isInitialized) return null;

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	);
}
