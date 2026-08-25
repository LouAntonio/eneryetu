import type { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/server/prisma';
import { getAuthUser, requireAdmin } from '@/server/auth';
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

		const isAdminAll = url.searchParams.get('all') === 'true' && user?.role === 'ADMIN';
		const where = isAdminAll ? {} : { status: 'PUBLICADO' as const };

		const [trainings, total] = await Promise.all([
			prisma.training.findMany({
				where,
				skip,
				take: limit,
				orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
			}),
			prisma.training.count({ where }),
		]);

		return Response.json({
			success: true,
			data: trainings,
			pagination: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		return handleError(error);
	}
}

export async function POST(req: NextRequest) {
	try {
		await requireAdmin(req);
		const body = await readJson(req);

		const data = { id: uuidv7(), ...body } as Prisma.TrainingUncheckedCreateInput;

		const training = await prisma.training.create({ data });

		return ok(training, 201);
	} catch (error) {
		return handleError(error);
	}
}
