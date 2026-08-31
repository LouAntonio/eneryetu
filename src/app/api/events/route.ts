import type { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/server/prisma';
import { getAuthUser, requireModule, canManageModule } from '@/server/auth';
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
			url.searchParams.get('all') === 'true' &&
			(user?.role === 'SUPERADMIN' ||
				(user ? await canManageModule(user, 'EVENTS') : false));
		const where = isAdminAll ? {} : { status: 'PUBLICADO' as const };

		const [events, total] = await Promise.all([
			prisma.event.findMany({
				where,
				skip,
				take: limit,
				orderBy: { startDate: 'asc' },
				include: { eventType: true },
			}),
			prisma.event.count({ where }),
		]);

		return Response.json({
			success: true,
			data: events,
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
		await requireModule(req, 'EVENTS');
		const body = await readJson(req);

		const data = { id: uuidv7(), ...body } as Prisma.EventUncheckedCreateInput;
		if (data.startDate) data.startDate = new Date(data.startDate as string);
		if (data.endDate) data.endDate = new Date(data.endDate as string);

		const event = await prisma.event.create({ data, include: { eventType: true } });

		return ok(event, 201);
	} catch (error) {
		return handleError(error);
	}
}
