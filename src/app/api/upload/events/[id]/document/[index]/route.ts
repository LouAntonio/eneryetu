import type { NextRequest } from 'next/server';
import { okMessage, handleError } from '@/server/http';
import { handleDeleteDocument } from '@/server/uploads';

export async function DELETE(
	req: NextRequest,
	ctx: { params: Promise<{ id: string; index: string }> },
) {
	try {
		const { id, index } = await ctx.params;
		await handleDeleteDocument(req, id, index);
		return okMessage('Documento removido');
	} catch (error) {
		return handleError(error);
	}
}