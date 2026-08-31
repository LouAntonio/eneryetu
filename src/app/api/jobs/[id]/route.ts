import type { NextRequest } from 'next/server';
import { prisma } from '@/server/prisma';
import { requireModule } from '@/server/auth';
import { ok, okMessage, fail, readJson, handleError } from '@/server/http';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;

		const job = await prisma.jobListing.findUnique({ where: { id } });
		if (!job) {
			return fail(404, 'Vaga não encontrada');
		}

		return ok(job);
	} catch (error) {
		return handleError(error);
	}
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireModule(req, 'JOBS');
		const { id } = await ctx.params;
		const body = await readJson(req);

		const existing = await prisma.jobListing.findUnique({ where: { id } });
		if (!existing) {
			return fail(404, 'Vaga não encontrada');
		}

		const data = { ...body };
		if (data.publishedAt) data.publishedAt = new Date(data.publishedAt as string);

		const job = await prisma.jobListing.update({ where: { id }, data });

		return ok(job);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		await requireModule(req, 'JOBS');
		const { id } = await ctx.params;

		const job = await prisma.jobListing.findUnique({ where: { id } });
		if (!job) {
			return fail(404, 'Vaga não encontrada');
		}

		await prisma.jobListing.delete({ where: { id } });

		return okMessage('Vaga eliminada');
	} catch (error) {
		return handleError(error);
	}
}
