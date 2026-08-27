export type Role = 'ADMIN' | 'EDITOR';
export type Status = 'RASCUNHO' | 'PUBLICADO' | 'ARQUIVADO';
export type PostType = 'NOTICIA' | 'BLOG';

export interface User {
	id: string;
	name: string;
	surname: string;
	email: string;
	role: Role;
	lastLogin?: string;
	createdAt?: string;
}

export interface Category {
	id: string;
	name: string;
	slug: string;
	_count?: { posts: number };
}

export interface EventType {
	id: string;
	name: string;
	slug: string;
	_count?: { events: number };
}

export interface CloudinaryAsset {
	url?: string;
	publicId?: string;
	name?: string;
	size?: number;
}

export interface Post {
	id: string;
	type: PostType;
	title: string;
	slug: string;
	excerpt?: string | null;
	content: string;
	coverImage?: string | null;
	coverImagePublicId?: string | null;
	status: Status;
	featured: boolean;
	metaTitle?: string | null;
	metaDescription?: string | null;
	authorId: string;
	categoryId?: string | null;
	createdAt: string;
	updatedAt: string;
	publishedAt?: string | null;
	author?: Pick<User, 'id' | 'name' | 'surname'>;
	category?: Category | null;
}

export interface Event {
	id: string;
	title: string;
	subtitle?: string | null;
	slug: string;
	description: string;
	fullDescription?: string | null;
	startDate: string;
	endDate?: string | null;
	displayDate: string;
	status: Status;
	featured: boolean;
	countryName: string;
	city?: string | null;
	venue?: string | null;
	coverImage?: string | null;
	coverImagePublicId?: string | null;
	gallery?: CloudinaryAsset[] | null;
	documents?: CloudinaryAsset[] | null;
	metaTitle?: string | null;
	metaDescription?: string | null;
	eventTypeId: string;
	eventType?: EventType;
	createdAt: string;
	updatedAt: string;
	publishedAt?: string | null;
}

export interface Paginated<T> {
	success: boolean;
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface GalleryCategory {
	id: string;
	name: string;
	slug: string;
	sortOrder: number;
	_count?: { photos: number };
	createdAt?: string;
	updatedAt?: string;
}

export interface GalleryPhoto {
	id: string;
	title?: string | null;
	imageUrl: string;
	publicId?: string | null;
	categoryId: string;
	category?: GalleryCategory;
	sortOrder: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface Training {
	id: string;
	title: string;
	slug: string;
	description?: string | null;
	coverImage?: string | null;
	coverImagePubId?: string | null;
	durationDays?: number | null;
	dayPattern?: string | null;
	dailyStartTime?: string | null;
	dailyEndTime?: string | null;
	deliveryMode: string;
	price?: number | null;
	currency: string;
	includesCert: boolean;
	includesExam: boolean;
	learningOutcomes?: string | null;
	modules?: string | null;
	prerequisites?: string | null;
	pduCredits?: number | null;
	ceuCredits?: number | null;
	pmiProgramNumber?: string | null;
	status: Status;
	featured: boolean;
	sortOrder: number;
	metaTitle?: string | null;
	metaDescription?: string | null;
	createdBy?: string | null;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string | null;
}

export interface JobListing {
	id: string;
	title: string;
	slug: string;
	description: string;
	department?: string | null;
	location?: string | null;
	jobType: string;
	status: Status;
	featured: boolean;
	metaTitle?: string | null;
	metaDescription?: string | null;
	createdBy?: string | null;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string | null;
}

export interface Product {
	id: string;
	title: string;
	slug: string;
	description?: string | null;
	blurb?: string | null;
	coverImage?: string | null;
	coverImagePubId?: string | null;
	status: Status;
	featured: boolean;
	sortOrder: number;
	metaTitle?: string | null;
	metaDescription?: string | null;
	createdBy?: string | null;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string | null;
}
