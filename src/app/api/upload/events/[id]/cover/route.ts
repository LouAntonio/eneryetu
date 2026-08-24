import type { NextRequest } from 'next/server';
import { ok, handleError } from '@/server/http';
import { handleUploadCover } from '@/server/uploads';

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		const url = await handleUploadCover(req, id);
		return ok({ url });
	} catch (error) {
		return handleError(error);
	}
}
