import type { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/server/prisma';
import { requireAdmin } from '@/server/auth';
import { ok, readJson, handleError } from '@/server/http';
import { uuidv7 } from 'uuidv7';

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url);

		const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '', 10) || 1);
		const limit = Math.min(
			100,
			Math.max(1, parseInt(url.searchParams.get('limit') ?? '', 10) || 10),
		);
		const skip = (page - 1) * limit;

		const categorySlug = url.searchParams.get('category');
		const where: Prisma.GalleryPhotoWhereInput = {};

		if (categorySlug) {
			const cat = await prisma.galleryCategory.findUnique({ where: { slug: categorySlug } });
			if (cat) {
				where.categoryId = cat.id;
			}
		}

		const [photos, total] = await Promise.all([
			prisma.galleryPhoto.findMany({
				where,
				skip,
				take: limit,
				orderBy: { sortOrder: 'asc' },
				include: { category: true },
			}),
			prisma.galleryPhoto.count({ where }),
		]);

		return Response.json({
			success: true,
			data: photos,
			pagination: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		return handleError(error);
	}
}

export async function POST(req: NextRequest) {
	try {
		await requireAdmin(req);
		const body = await readJson(req);

		const data = { id: uuidv7(), ...body } as Prisma.GalleryPhotoUncheckedCreateInput;

		const photo = await prisma.galleryPhoto.create({
			data,
			include: { category: true },
		});

		return ok(photo, 201);
	} catch (error) {
		return handleError(error);
	}
}
