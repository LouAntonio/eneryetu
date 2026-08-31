import type { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/server/prisma';
import { getAuthUser, requireModule } from '@/server/auth';
import { ok, readJson, handleError } from '@/server/http';
import { uuidv7 } from 'uuidv7';

export async function GET(req: NextRequest) {
	try {
		const user = getAuthUser(req);
		const url = new URL(req.url);

		const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '', 10) || 1);
		const limit = Math.min(
			100,
			Math.max(1, parseInt(url.searchParams.get('limit') ?? '', 10) || 10),
		);
		const skip = (page - 1) * limit;

		const isAdminAll =
			url.searchParams.get('all') === 'true' && user?.role === 'SUPERADMIN';
		const where = isAdminAll ? {} : { status: 'PUBLICADO' as const };
		const type = url.searchParams.get('type');
		if (type === 'NOTICIA' || type === 'BLOG') {
			Object.assign(where, { type });
		}

		const [posts, total] = await Promise.all([
			prisma.post.findMany({
				where,
				skip,
				take: limit,
				orderBy: { createdAt: 'desc' },
				include: {
					author: { select: { id: true, name: true, surname: true } },
					category: true,
				},
			}),
			prisma.post.count({ where }),
		]);

		return Response.json({
			success: true,
			data: posts,
			pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
		});
	} catch (error) {
		return handleError(error);
	}
}

export async function POST(req: NextRequest) {
	try {
		const user = await requireModule(req, 'POSTS');
		const body = await readJson(req);

		const data = {
			id: uuidv7(),
			authorId: user.id,
			...body,
		} as Prisma.PostUncheckedCreateInput;
		const post = await prisma.post.create({ data });

		return ok(post, 201);
	} catch (error) {
		return handleError(error);
	}
}
