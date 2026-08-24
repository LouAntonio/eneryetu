import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { ok, fail, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await ctx.params;

		const post = await prisma.post.findUnique({
			where: { slug },
			include: {
				author: { select: { id: true, name: true, surname: true } },
				category: true,
			},
		});
		if (!post) {
			return fail(404, 'Post não encontrado');
		}

		return ok(post);
	} catch (error) {
		return handleError(error);
	}
}
