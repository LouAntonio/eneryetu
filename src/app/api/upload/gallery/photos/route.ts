import type { NextRequest } from 'next/server';
import { ok, handleError } from '@/server/http';
import { handleUploadGalleryPhotoOnly } from '@/server/uploads';

export async function POST(req: NextRequest) {
	try {
		const result = await handleUploadGalleryPhotoOnly(req);
		return ok(result);
	} catch (error) {
		return handleError(error);
	}
}
