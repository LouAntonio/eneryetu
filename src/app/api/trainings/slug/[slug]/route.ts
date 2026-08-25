import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { ok, fail, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await ctx.params;

		const training = await prisma.training.findUnique({
			where: { slug },
		});
		if (!training) {
			return fail(404, 'Formação não encontrada');
		}

		return ok(training);
	} catch (error) {
		return handleError(error);
	}
}
