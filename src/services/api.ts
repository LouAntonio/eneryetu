import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken } from '../lib/authStore';

export const API_BASE_URL = '/api';

const instance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 15000,
});

instance.interceptors.request.use((config) => {
	const token = getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

instance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const original = error.config as RetryConfig | undefined;
		if (!original || error.response?.status !== 401 || original._retry) {
			return Promise.reject(error);
		}

		original._retry = true;
		const refreshToken = getRefreshToken();
		if (!refreshToken) {
			clearTokens();
			return Promise.reject(error);
		}

		try {
			const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
			const newAccess = data.data?.accessToken;
			if (!newAccess) throw new Error('Sem access token na resposta');
			setAccessToken(newAccess);
			original.headers.Authorization = `Bearer ${newAccess}`;
			return instance(original);
		} catch (refreshError) {
			clearTokens();
			return Promise.reject(refreshError);
		}
	},
);

async function request<T>(config: AxiosRequestConfig): Promise<T> {
	const response = await instance.request<T>(config);
	return response.data;
}

export const api = {
	get: <T>(url: string, config?: AxiosRequestConfig) =>
		request<T>({ ...config, method: 'GET', url }),
	post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		request<T>({ ...config, method: 'POST', url, data }),
	put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		request<T>({ ...config, method: 'PUT', url, data }),
	patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		request<T>({ ...config, method: 'PATCH', url, data }),
	delete: <T = void>(url: string, config?: AxiosRequestConfig) =>
		request<T>({ ...config, method: 'DELETE', url }),
};
