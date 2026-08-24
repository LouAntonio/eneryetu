import type { NextRequest } from 'next/server';
import { okMessage, handleError } from '@/server/http';
import { handleDeleteEventAssets } from '@/server/uploads';

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		await handleDeleteEventAssets(req, id);
		return okMessage('Assets removidos');
	} catch (error) {
		return handleError(error);
	}
}