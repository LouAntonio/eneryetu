import type { NextRequest } from 'next/server';
import { verifyAccessToken, type AuthUser } from './jwt';

export function getAuthUser(req: NextRequest): AuthUser | null {
	try {
		const header = req.headers.get('authorization');
		const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
		if (!token) return null;
		const payload = verifyAccessToken(token);
		return { id: payload.sub, email: payload.email, role: payload.role };
	} catch {
		return null;
	}
}

export class HttpError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

export function requireAuth(req: NextRequest): AuthUser {
	const user = getAuthUser(req);
	if (!user) {
		throw new HttpError(401, 'Token não fornecido');
	}
	return user;
}

export function requireAdmin(req: NextRequest): AuthUser {
	const user = requireAuth(req);
	if (user.role !== 'ADMIN') {
		throw new HttpError(403, 'Acesso restrito a administradores');
	}
	return user;
}
