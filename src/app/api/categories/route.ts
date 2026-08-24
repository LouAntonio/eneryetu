import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, readJson, handleError } from '@/server/http';
import { uuidv7 } from 'uuidv7';
import { Prisma } from '@prisma/client';

export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			orderBy: { name: 'asc' },
			include: { _count: { select: { posts: true } } },
		});
		return ok(categories);
	} catch (error) {
		return handleError(error);
	}
}

export async function POST(req: Request) {
	try {
		await requireAdmin(req as never);
		const body = await readJson(req as never);

		const category = await prisma.category.create({
			data: { id: uuidv7(), ...body } as Prisma.CategoryUncheckedCreateInput,
		});

		return ok(category, 201);
	} catch (error) {
		return handleError(error);
	}
}