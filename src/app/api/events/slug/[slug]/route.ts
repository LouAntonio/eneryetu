import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { ok, fail, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await ctx.params;

		const event = await prisma.event.findUnique({
			where: { slug },
			include: { eventType: true },
		});
		if (!event) {
			return fail(404, 'Evento não encontrado');
		}

		return ok(event);
	} catch (error) {
		return handleError(error);
	}
}
