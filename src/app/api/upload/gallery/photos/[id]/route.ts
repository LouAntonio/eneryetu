import type { NextRequest } from 'next/server';
import { ok, handleError } from '@/server/http';
import { handleUploadGalleryPhoto, handleDeleteGalleryPhoto } from '@/server/uploads';

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		const formData = await req.formData();
		const photo = await handleUploadGalleryPhoto(req, id, {
			title: (formData.get('title') as string) ?? undefined,
			categoryId: (formData.get('categoryId') as string) ?? undefined,
			sortOrder: formData.get('sortOrder') ? Number(formData.get('sortOrder')) : undefined,
		});
		return ok(photo);
	} catch (error) {
		return handleError(error);
	}
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await ctx.params;
		await handleDeleteGalleryPhoto(req, id);
		return ok(null);
	} catch (error) {
		return handleError(error);
	}
}
