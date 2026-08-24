import { NextResponse, type NextRequest } from 'next/server';
import { HttpError } from './auth';
import type { AuthUser } from './jwt';

export function ok<T>(data: T, status = 200) {
	return NextResponse.json({ success: true, data }, { status });
}

export function okMessage(message: string) {
	return NextResponse.json({ success: true, message });
}

export function fail(status: number, message: string) {
	return NextResponse.json({ success: false, message }, { status });
}

export function paginated<T>(
	data: T[],
	pagination: { page: number; limit: number; total: number; totalPages: number },
) {
	return NextResponse.json({ success: true, data, pagination });
}

export async function readJson(req: NextRequest): Promise<Record<string, unknown>> {
	try {
		const body = await req.json();
		if (body && typeof body === 'object' && !Array.isArray(body)) {
			return body as Record<string, unknown>;
		}
		return {};
	} catch {
		return {};
	}
}

export function handleError(error: unknown) {
	if (error instanceof HttpError) {
		return fail(error.status, error.message);
	}
	const message = error instanceof Error ? error.message : 'Erro interno do servidor';
	console.error('[api]', message);
	return fail(500, message);
}

export interface RouteContextWithId {
	params: Promise<{ id: string }>;
}

export type Handler = (req: NextRequest, ctx?: RouteContextWithId) => Promise<Response> | Response;

export function withUser(
	handler: (user: AuthUser, req: NextRequest, ctx?: RouteContextWithId) => Promise<Response>,
) {
	return async (req: NextRequest, ctx?: RouteContextWithId) => {
		try {
			const { requireAdmin } = await import('./auth');
			return await handler(requireAdmin(req), req, ctx);
		} catch (error) {
			return handleError(error);
		}
	};
}
