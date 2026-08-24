const ACCESS_KEY = 'eneryetu-access-token';
const REFRESH_KEY = 'eneryetu-refresh-token';

export function getAccessToken(): string | null {
	try {
		return localStorage.getItem(ACCESS_KEY);
	} catch {
		return null;
	}
}

export function getRefreshToken(): string | null {
	try {
		return localStorage.getItem(REFRESH_KEY);
	} catch {
		return null;
	}
}

export function setTokens(access: string, refresh: string) {
	try {
		localStorage.setItem(ACCESS_KEY, access);
		localStorage.setItem(REFRESH_KEY, refresh);
	} catch {
		/* storage unavailable */
	}
}

export function setAccessToken(access: string) {
	try {
		localStorage.setItem(ACCESS_KEY, access);
	} catch {
		/* storage unavailable */
	}
}

export function clearTokens() {
	try {
		localStorage.removeItem(ACCESS_KEY);
		localStorage.removeItem(REFRESH_KEY);
	} catch {
		/* storage unavailable */
	}
}
