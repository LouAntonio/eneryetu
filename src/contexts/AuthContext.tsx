'use client';

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '../services/api';
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '../lib/authStore';
import type { User } from '../types';

interface AuthContextValue {
	user: User | null;
	initializing: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

interface LoginResponse {
	success: boolean;
	data: { user: User; accessToken: string; refreshToken: string };
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [initializing, setInitializing] = useState(true);

	useEffect(() => {
		const restore = async () => {
			const access = getAccessToken();
			const refresh = getRefreshToken();
			if (!access || !refresh) {
				setInitializing(false);
				return;
			}

			try {
				const res = await api.post<{ data: { accessToken: string } }>('/auth/refresh', {
					refreshToken: refresh,
				});
				setTokens(res.data.accessToken, refresh);
				const me = await api.get<{ data: User }>('/auth/me');
				setUser(me.data);
			} catch {
				clearTokens();
			} finally {
				setInitializing(false);
			}
		};
		void restore();
	}, []);

	const login = useCallback(async (email: string, password: string) => {
		const res = await api.post<LoginResponse>('/auth/login', { email, password });
		const { user: loggedUser, accessToken, refreshToken } = res.data;
		setTokens(accessToken, refreshToken);
		setUser(loggedUser);
	}, []);

	const logout = useCallback(async () => {
		try {
			await api.post('/auth/logout');
		} catch {
			/* ignorar falhas no logout */
		}
		clearTokens();
		setUser(null);
	}, []);

	const value = useMemo(
		() => ({ user, initializing, login, logout }),
		[user, initializing, login, logout],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
