import type { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/server/prisma';
import { requireAuth } from '@/server/auth';
import { okMessage, fail, readJson, handleError } from '@/server/http';

export async function PUT(req: NextRequest) {
	try {
		const auth = requireAuth(req);
		const { currentPassword, newPassword } = await readJson(req);

		if (!currentPassword || !newPassword) {
			return fail(400, 'Palavra-passe atual e nova são obrigatórias');
		}

		if ((newPassword as string).length < 6) {
			return fail(400, 'A nova palavra-passe deve ter pelo menos 6 caracteres');
		}

		const user = await prisma.user.findUnique({ where: { id: auth.id } });
		if (!user) {
			return fail(404, 'Utilizador não encontrado');
		}

		const valid = await bcrypt.compare(currentPassword as string, user.password);
		if (!valid) {
			return fail(401, 'Palavra-passe atual incorreta');
		}

		const hashedPassword = await bcrypt.hash(newPassword as string, 10);
		await prisma.user.update({
			where: { id: auth.id },
			data: { password: hashedPassword },
		});

		return okMessage('Palavra-passe alterada com sucesso');
	} catch (error) {
		return handleError(error);
	}
}
