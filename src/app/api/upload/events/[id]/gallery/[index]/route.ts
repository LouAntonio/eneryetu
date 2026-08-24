import type { NextRequest } from 'next/server';
import { okMessage, handleError } from '@/server/http';
import { handleDeleteGalleryImage } from '@/server/uploads';

export async function DELETE(
	req: NextRequest,
	ctx: { params: Promise<{ id: string; index: string }> },
) {
	try {
		const { id, index } = await ctx.params;
		await handleDeleteGalleryImage(req, id, index);
		return okMessage('Imagem removida');
	} catch (error) {
		return handleError(error);
	}
}
