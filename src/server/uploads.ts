import type { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/server/prisma';
import { requireAdmin, HttpError } from '@/server/auth';
import {
	uploadToCloudinary,
	publicIdFromUrl,
	destroyAsset,
	IMAGE_EXTENSIONS,
	DOCUMENT_EXTENSIONS,
	extensionOf,
} from '@/server/cloudinary';

const MAX_IMAGE_SIZE = parseInt(process.env.MAX_FILE_SIZE ?? '', 10) || 10 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = MAX_IMAGE_SIZE * 2;

export async function getEventFile(
	req: NextRequest,
	field: string,
	allowedExtensions: string[],
	maxSize: number,
) {
	const formData = await req.formData();
	const file = formData.get(field);

	if (!(file instanceof File)) {
		throw new HttpError(400, 'Ficheiro não enviado');
	}

	const ext = extensionOf(file.name);
	if (!allowedExtensions.includes(ext)) {
		throw new HttpError(
			400,
			allowedExtensions === IMAGE_EXTENSIONS
				? 'Formato de imagem não suportado. Use: jpg, jpeg, png, webp, gif'
				: 'Formato de documento não suportado. Use: pdf, doc, docx',
		);
	}

	if (file.size > maxSize) {
		throw new HttpError(400, 'Ficheiro demasiado grande');
	}

	return file;
}

export async function loadEvent(id: string) {
	const event = await prisma.event.findUnique({ where: { id } });
	if (!event) {
		throw new HttpError(404, 'Evento não encontrado');
	}
	return event;
}

interface GalleryItem {
	url?: string;
	name?: string;
	size?: number;
}

function galleryOf(event: { gallery: unknown }): GalleryItem[] {
	return Array.isArray(event.gallery) ? [...(event.gallery as GalleryItem[])] : [];
}

function documentsOf(event: { documents: unknown }): GalleryItem[] {
	return Array.isArray(event.documents) ? [...(event.documents as GalleryItem[])] : [];
}

async function removeStoredAsset(url: string | undefined) {
	if (!url) return;
	const publicId = publicIdFromUrl(url);
	if (!publicId) return;
	try {
		await destroyAsset(publicId, url.includes('/raw/upload/') ? 'raw' : 'image');
	} catch {
		/* asset pode já não existir */
	}
}

export async function handleUploadCover(req: NextRequest, id: string) {
	await requireAdmin(req);
	const event = await loadEvent(id);
	const file = await getEventFile(req, 'file', IMAGE_EXTENSIONS, MAX_IMAGE_SIZE);

	await removeStoredAsset(event.coverImage ?? undefined);

	const buffer = Buffer.from(await file.arrayBuffer());
	const result = await uploadToCloudinary(buffer, id, 'cover', false);

	await prisma.event.update({
		where: { id },
		data: { coverImage: result.secure_url },
	});

	return result.secure_url;
}

export async function handleUploadGallery(req: NextRequest, id: string) {
	await requireAdmin(req);
	const event = await loadEvent(id);
	const file = await getEventFile(req, 'file', IMAGE_EXTENSIONS, MAX_IMAGE_SIZE);

	const buffer = Buffer.from(await file.arrayBuffer());
	const result = await uploadToCloudinary(buffer, id, 'gallery', false);

	const gallery = galleryOf(event);
	gallery.push({ url: result.secure_url });

	await prisma.event.update({
		where: { id },
		data: { gallery: gallery as unknown as Prisma.InputJsonValue },
	});

	return result.secure_url;
}

export async function handleDeleteGalleryImage(req: NextRequest, id: string, rawIndex: string) {
	await requireAdmin(req);
	const event = await loadEvent(id);
	const index = parseInt(rawIndex, 10);

	const gallery = galleryOf(event);
	if (Number.isNaN(index) || index < 0 || index >= gallery.length) {
		throw new HttpError(400, 'Índice inválido');
	}

	await removeStoredAsset(gallery[index]?.url);
	gallery.splice(index, 1);

	await prisma.event.update({
		where: { id },
		data: { gallery: gallery as unknown as Prisma.InputJsonValue },
	});
}

export async function handleUploadDocument(req: NextRequest, id: string) {
	await requireAdmin(req);
	const event = await loadEvent(id);
	const file = await getEventFile(req, 'file', DOCUMENT_EXTENSIONS, MAX_DOCUMENT_SIZE);

	const buffer = Buffer.from(await file.arrayBuffer());
	const result = await uploadToCloudinary(buffer, id, 'documents', true);

	const documents = documentsOf(event);
	documents.push({ url: result.secure_url, name: file.name, size: file.size });

	await prisma.event.update({
		where: { id },
		data: { documents: documents as unknown as Prisma.InputJsonValue },
	});

	return { url: result.secure_url, name: file.name, size: file.size };
}

export async function handleDeleteDocument(req: NextRequest, id: string, rawIndex: string) {
	await requireAdmin(req);
	const event = await loadEvent(id);
	const index = parseInt(rawIndex, 10);

	const documents = documentsOf(event);
	if (Number.isNaN(index) || index < 0 || index >= documents.length) {
		throw new HttpError(400, 'Índice inválido');
	}

	await removeStoredAsset(documents[index]?.url);
	documents.splice(index, 1);

	await prisma.event.update({
		where: { id },
		data: { documents: documents as unknown as Prisma.InputJsonValue },
	});
}

export async function handleDeleteEventAssets(req: NextRequest, id: string) {
	await requireAdmin(req);
	const { destroyEventAssets } = await import('@/server/cloudinary');
	await destroyEventAssets(id).catch(() => undefined);
}

