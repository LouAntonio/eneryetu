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

export interface Post {
	id: string;
	type: PostType;
	title: string;
	slug: string;
	excerpt?: string | null;
	content: string;
	coverImage?: string | null;
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
	country: string;
	countryName: string;
	city?: string | null;
	venue?: string | null;
	latitude?: number | null;
	longitude?: number | null;
	coverImage?: string | null;
	gallery?: unknown[] | null;
	documents?: unknown[] | null;
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
