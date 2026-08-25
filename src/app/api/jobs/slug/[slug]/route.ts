import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { ok, fail, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await ctx.params;

		const job = await prisma.jobListing.findUnique({ where: { slug } });
		if (!job) {
			return fail(404, 'Vaga não encontrada');
		}

		return ok(job);
	} catch (error) {
		return handleError(error);
	}
}
