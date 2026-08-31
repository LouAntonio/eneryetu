import type { NextRequest } from 'next/server';
import { verifyAccessToken, type AuthUser } from './jwt';
import { prisma } from './prisma';
import type { ModuleKey } from '@prisma/client';

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
	if (user.role !== 'SUPERADMIN') {
		throw new HttpError(403, 'Acesso restrito a superadministradores');
	}
	return user;
}

// Verifica se o utilizador tem acesso a um módulo de conteúdo.
// SUPERADMIN acede a tudo; ADMIN apenas aos módulos que lhe forem atribuídos.
export async function canManageModule(user: AuthUser, module: ModuleKey): Promise<boolean> {
	if (user.role === 'SUPERADMIN') return true;
	try {
		const found = await prisma.userModule.findUnique({
			where: { userId_module: { userId: user.id, module } },
		});
		return Boolean(found);
	} catch {
		return false;
	}
}

// Exige acesso de superadmin OU permissão de módulo atribuída.
export async function requireModule(req: NextRequest, module: ModuleKey): Promise<AuthUser> {
	const user = requireAuth(req);
	if (user.role === 'SUPERADMIN') return user;
	if (await canManageModule(user, module)) return user;
	throw new HttpError(403, 'Acesso restrito: não tem permissão para este módulo');
}
