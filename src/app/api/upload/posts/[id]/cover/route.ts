import type { NextRequest } from 'next/server';
import { ok, okMessage, handleError } from '@/server/http';
import { handleUploadPostCover, handleDeletePostCover } from '@/server/uploads';

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		const url = await handleUploadPostCover(req, id);
		return ok({ url });
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		await handleDeletePostCover(req, id);
		return okMessage('Capa removida');
	} catch (error) {
		return handleError(error);
	}
}