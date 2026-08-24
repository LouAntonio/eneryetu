import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, readJson, handleError } from '@/server/http';
import { uuidv7 } from 'uuidv7';
import { Prisma } from '@prisma/client';

export async function GET() {
	try {
		const eventTypes = await prisma.eventType.findMany({
			orderBy: { name: 'asc' },
			include: { _count: { select: { events: true } } },
		});
		return ok(eventTypes);
	} catch (error) {
		return handleError(error);
	}
}

export async function POST(req: Request) {
	try {
		await requireAdmin(req as never);
		const body = await readJson(req as never);

		const eventType = await prisma.eventType.create({
			data: { id: uuidv7(), ...body } as Prisma.EventTypeUncheckedCreateInput,
		});

		return ok(eventType, 201);
	} catch (error) {
		return handleError(error);
	}
}