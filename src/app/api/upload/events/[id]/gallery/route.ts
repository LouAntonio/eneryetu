import type { NextRequest } from 'next/server';
import { ok, handleError } from '@/server/http';
import { handleUploadGallery } from '@/server/uploads';

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		const url = await handleUploadGallery(req, id);
		return ok({ url }, 201);
	} catch (error) {
		return handleError(error);
	}
}