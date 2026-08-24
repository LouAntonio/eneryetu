import type { NextRequest } from 'next/server';
import { ok, handleError } from '@/server/http';
import { handleUploadDocument } from '@/server/uploads';

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		const data = await handleUploadDocument(req, id);
		return ok(data, 201);
	} catch (error) {
		return handleError(error);
	}
}
