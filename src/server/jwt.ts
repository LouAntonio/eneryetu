import jwt, { type JwtPayload } from 'jsonwebtoken';

export interface AuthUser {
	id: string;
	email: string;
	role: 'ADMIN' | 'EDITOR';
}

interface AccessPayload extends JwtPayload {
	sub: string;
	email: string;
	role: AuthUser['role'];
}

interface RefreshPayload extends JwtPayload {
	sub: string;
	type: 'refresh';
}

export function getSecret(): string {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error('JWT_SECRET não definido nas variáveis de ambiente');
	}
	return secret;
}

export function generateAccessToken(user: { id: string; email: string; role: AuthUser['role'] }) {
	return jwt.sign({ sub: user.id, email: user.email, role: user.role }, getSecret(), {
		expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as jwt.SignOptions['expiresIn'],
	});
}

export function generateRefreshToken(user: { id: string }) {
	return jwt.sign({ sub: user.id, type: 'refresh' }, getSecret(), {
		expiresIn: '7d' as jwt.SignOptions['expiresIn'],
	});
}

export function verifyAccessToken(token: string): AccessPayload {
	return jwt.verify(token, getSecret()) as AccessPayload;
}

export function verifyRefreshToken(token: string): RefreshPayload {
	const payload = jwt.verify(token, getSecret()) as RefreshPayload;
	if (payload.type !== 'refresh') {
		throw new Error('Token inválido');
	}
	return payload;
}
