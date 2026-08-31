import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireModule } from '@/server/auth';
import { destroyAsset } from '@/server/cloudinary';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';
import { uuidv7 } from 'uuidv7';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;

		const training = await prisma.training.findUnique({
			where: { id },
			include: { segments: { orderBy: { sortOrder: 'asc' } } },
		});
		if (!training) {
			return fail(404, 'Formação não encontrada');
		}

		return ok(training);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireModule(req, 'TRAININGS');
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.training.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Formação não encontrada');
		}

		if (
			typeof body.coverImage === 'string' &&
			body.coverImage !== existing.coverImage &&
			existing.coverImagePubId
		) {
			await destroyAsset(existing.coverImagePubId).catch(() => undefined);
		}

		const { segments, ...rest } = body;
		const data = { ...rest };
		if (typeof data.coverImage === 'string') {
			data.coverImagePubId =
				data.coverImage && data.coverImage !== existing.coverImage ? null : undefined;
		}

		const training = await prisma.$transaction(async (tx) => {
			if (Array.isArray(segments)) {
				await tx.trainingSegment.deleteMany({ where: { trainingId: id } });
				if (segments.length > 0) {
					await tx.trainingSegment.createMany({
						data: segments.map((s, index) => ({
							id: uuidv7(),
							trainingId: id,
							dayLabel: String(s.dayLabel ?? ''),
							daysCount: s.daysCount != null ? Number(s.daysCount) : null,
							mode: String(s.mode ?? 'presencial'),
							location: s.location || null,
							sortOrder: s.sortOrder != null ? Number(s.sortOrder) : index,
						})),
					});
				}
			}
			return tx.training.update({
				where: { id },
				data,
				include: { segments: { orderBy: { sortOrder: 'asc' } } },
			});
		});

		return ok(training);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireModule(req, 'TRAININGS');
		const { id } = await ctx.params;

		const training = await prisma.training.findUnique({ where: { id } });
		if (!training) {
			return fail(404, 'Formação não encontrada');
		}

		if (training.coverImagePubId) {
			await destroyAsset(training.coverImagePubId).catch(() => undefined);
		}

		await prisma.training.delete({ where: { id } });

		return okMessage('Formação eliminada');
	} catch (error) {
		return handleError(error);
	}
}
