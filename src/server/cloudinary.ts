import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

const BASE_FOLDER = 'eneryetu/events';

export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
export const DOCUMENT_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export function extensionOf(name: string) {
	const dot = name.lastIndexOf('.');
	return dot === -1 ? '' : name.slice(dot).toLowerCase();
}

export async function uploadToCloudinary(
	buffer: Buffer,
	eventId: string,
	subfolder: string,
	rawResourceType: boolean,
) {
	const result = await cloudinary.uploader.upload(`data:application/octet-stream;base64,${buffer.toString('base64')}`, {
		folder: `${BASE_FOLDER}/${eventId}/${subfolder}`,
		public_id: `${Date.now()}`,
		resource_type: rawResourceType ? 'raw' : 'image',
	});
	return result;
}

export function publicIdFromUrl(url: string): string | null {
	try {
		const marker = '/upload/';
		const idx = url.indexOf(marker);
		if (idx === -1) return null;
		let rest = url.slice(idx + marker.length);
		rest = rest.replace(/^v\d+\//, '');
		rest = rest.replace(/\.[a-zA-Z0-9]+$/, '');
		return rest;
	} catch {
		return null;
	}
}

export async function destroyAsset(publicId: string, resourceType: 'image' | 'raw' = 'image') {
	await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export async function destroyEventAssets(eventId: string) {
	await cloudinary.api.delete_resources_by_prefix(`${BASE_FOLDER}/${eventId}`);
}
