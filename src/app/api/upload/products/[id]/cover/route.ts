import type { NextRequest } from 'next/server';
import { ok, handleError } from '@/server/http';
import { handleUploadProductCover, handleDeleteProductCover } from '@/server/uploads';

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		const url = await handleUploadProductCover(req, id);
		return ok({ url });
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		await handleDeleteProductCover(req, id);
		return ok(null);
	} catch (error) {
		return handleError(error);
	}
}
