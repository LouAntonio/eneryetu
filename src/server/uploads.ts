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

export interface GalleryItem {
	url?: string;
	publicId?: string;
	name?: string;
	size?: number;
}

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

function resourceTypeOf(publicId?: string): 'image' | 'raw' {
	return publicId?.includes('/documents') ? 'raw' : 'image';
}

async function destroyStored(publicId?: string, url?: string) {
	const id = publicId ?? publicIdFromUrl(url ?? '');
	if (!id) return;
	try {
		await destroyAsset(id, resourceTypeOf(id));
	} catch {
		try {
			await destroyAsset(id, resourceTypeOf(id) === 'raw' ? 'image' : 'raw');
		} catch {
			/* asset pode já não existir */
		}
	}
}

async function loadEvent(id: string) {
	const event = await prisma.event.findUnique({ where: { id } });
	if (!event) {
		throw new HttpError(404, 'Evento não encontrado');
	}
	return event;
}

async function loadPost(id: string) {
	const post = await prisma.post.findUnique({ where: { id } });
	if (!post) {
		throw new HttpError(404, 'Post não encontrado');
	}
	return post;
}

function galleryOf(event: { gallery: unknown }): GalleryItem[] {
	return Array.isArray(event.gallery) ? [...(event.gallery as GalleryItem[])] : [];
}

function documentsOf(event: { documents: unknown }): GalleryItem[] {
	return Array.isArray(event.documents) ? [...(event.documents as GalleryItem[])] : [];
}

export async function handleUploadCover(req: NextRequest, id: string) {
	await requireAdmin(req);
	const event = await loadEvent(id);
	const file = await getEventFile(req, 'file', IMAGE_EXTENSIONS, MAX_IMAGE_SIZE);

	await destroyStored(event.coverImagePublicId ?? undefined, event.coverImage ?? undefined);

	const buffer = Buffer.from(await file.arrayBuffer());
	const result = await uploadToCloudinary(buffer, id, 'cover', false);

	await prisma.event.update({
		where: { id },
		data: { coverImage: result.secure_url, coverImagePublicId: result.public_id },
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
	gallery.push({ url: result.secure_url, publicId: result.public_id });

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

	const item = gallery[index];
	await destroyStored(item?.publicId, item?.url);
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
	documents.push({
		url: result.secure_url,
		publicId: result.public_id,
		name: file.name,
		size: file.size,
	});

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

	const item = documents[index];
	await destroyStored(item?.publicId, item?.url);
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

export async function handleUploadPostCover(req: NextRequest, id: string) {
	await requireAdmin(req);
	const post = await loadPost(id);
	const file = await getEventFile(req, 'file', IMAGE_EXTENSIONS, MAX_IMAGE_SIZE);

	await destroyStored(post.coverImagePublicId ?? undefined, post.coverImage ?? undefined);

	const buffer = Buffer.from(await file.arrayBuffer());
	const result = await uploadToCloudinary(buffer, id, 'cover', false);

	await prisma.post.update({
		where: { id },
		data: { coverImage: result.secure_url, coverImagePublicId: result.public_id },
	});

	return result.secure_url;
}

export async function handleDeletePostCover(req: NextRequest, id: string) {
	await requireAdmin(req);
	const post = await loadPost(id);

	if (!post.coverImage && !post.coverImagePublicId) {
		throw new HttpError(400, 'O post não tem imagem de capa');
	}

	await destroyStored(post.coverImagePublicId ?? undefined, post.coverImage ?? undefined);

	await prisma.post.update({
		where: { id },
		data: { coverImage: null, coverImagePublicId: null },
	});
}

export async function handleUploadGalleryPhoto(
	req: NextRequest,
	id: string | null,
	formDataFields?: { title?: string; categoryId?: string; sortOrder?: number },
) {
	await requireAdmin(req);
	const file = await getEventFile(req, 'file', IMAGE_EXTENSIONS, MAX_IMAGE_SIZE);

	const buffer = Buffer.from(await file.arrayBuffer());
	const result = await uploadToCloudinary(buffer, id ?? 'gallery', 'photo', false);

	const photo = await prisma.galleryPhoto.create({
		data: {
			title: formDataFields?.title ?? null,
			imageUrl: result.secure_url,
			publicId: result.public_id,
			categoryId: formDataFields?.categoryId ?? '',
			sortOrder: formDataFields?.sortOrder ?? 0,
		},
		include: { category: true },
	});

	return photo;
}

export async function handleUploadGalleryPhotoOnly(req: NextRequest) {
	await requireAdmin(req);
	const file = await getEventFile(req, 'file', IMAGE_EXTENSIONS, MAX_IMAGE_SIZE);

	const buffer = Buffer.from(await file.arrayBuffer());
	const result = await uploadToCloudinary(buffer, 'gallery', 'photo', false);

	return { url: result.secure_url, publicId: result.public_id };
}

export async function handleDeleteGalleryPhoto(req: NextRequest, id: string) {
	await requireAdmin(req);

	const photo = await prisma.galleryPhoto.findUnique({ where: { id } });
	if (!photo) {
		throw new HttpError(404, 'Foto não encontrada');
	}

	await destroyStored(photo.publicId ?? undefined, photo.imageUrl ?? undefined);
	await prisma.galleryPhoto.delete({ where: { id } });
}

export async function handleUploadTrainingCover(req: NextRequest, id: string) {
	await requireAdmin(req);
	const training = await prisma.training.findUnique({ where: { id } });
	if (!training) {
		throw new HttpError(404, 'Formação não encontrada');
	}

	const file = await getEventFile(req, 'file', IMAGE_EXTENSIONS, MAX_IMAGE_SIZE);

	await destroyStored(training.coverImagePubId ?? undefined, training.coverImage ?? undefined);

	const buffer = Buffer.from(await file.arrayBuffer());
	const result = await uploadToCloudinary(buffer, id, 'cover', false);

	await prisma.training.update({
		where: { id },
		data: { coverImage: result.secure_url, coverImagePubId: result.public_id },
	});

	return result.secure_url;
}

export async function handleDeleteTrainingCover(req: NextRequest, id: string) {
	await requireAdmin(req);
	const training = await prisma.training.findUnique({ where: { id } });
	if (!training) {
		throw new HttpError(404, 'Formação não encontrada');
	}

	if (!training.coverImage && !training.coverImagePubId) {
		throw new HttpError(400, 'A formação não tem imagem de capa');
	}

	await destroyStored(training.coverImagePubId ?? undefined, training.coverImage ?? undefined);

	await prisma.training.update({
		where: { id },
		data: { coverImage: null, coverImagePubId: null },
	});
}

export async function handleUploadProductCover(req: NextRequest, id: string) {
	await requireAdmin(req);
	const product = await prisma.product.findUnique({ where: { id } });
	if (!product) {
		throw new HttpError(404, 'Produto não encontrado');
	}

	const file = await getEventFile(req, 'file', IMAGE_EXTENSIONS, MAX_IMAGE_SIZE);

	await destroyStored(product.coverImagePubId ?? undefined, product.coverImage ?? undefined);

	const buffer = Buffer.from(await file.arrayBuffer());
	const result = await uploadToCloudinary(buffer, id, 'cover', false);

	await prisma.product.update({
		where: { id },
		data: { coverImage: result.secure_url, coverImagePubId: result.public_id },
	});

	return result.secure_url;
}

export async function handleDeleteProductCover(req: NextRequest, id: string) {
	await requireAdmin(req);
	const product = await prisma.product.findUnique({ where: { id } });
	if (!product) {
		throw new HttpError(404, 'Produto não encontrado');
	}

	if (!product.coverImage && !product.coverImagePubId) {
		throw new HttpError(400, 'O produto não tem imagem de capa');
	}

	await destroyStored(product.coverImagePubId ?? undefined, product.coverImage ?? undefined);

	await prisma.product.update({
		where: { id },
		data: { coverImage: null, coverImagePubId: null },
	});
}
