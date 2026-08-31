import type { ModuleKey, User } from '../types';

export const ALL_MODULES: ModuleKey[] = [
	'POSTS',
	'EVENTS',
	'TRAININGS',
	'PRODUCTS',
	'JOBS',
	'GALLERY',
	'TAXONOMY',
];

export function roleLabelKey(role: User['role']): 'admin.roles.SUPERADMIN' | 'admin.roles.ADMIN' {
	return `admin.roles.${role}`;
}

// SUperADMIN acede a tudo; ADMIN apenas aos módulos atribuídos.
export function canManage(user: User | null, module: ModuleKey): boolean {
	if (!user) return false;
	if (user.role === 'SUPERADMIN') return true;
	return Boolean(user.modules?.some((m) => m.module === module));
}

export function managedModules(user: User | null): ModuleKey[] {
	if (!user) return [];
	if (user.role === 'SUPERADMIN') return ALL_MODULES;
	return ALL_MODULES.filter((m) => canManage(user, m));
}

// Mapeia um caminho do admin para o módulo de conteúdo que protege.
export function moduleForPath(pathname: string): ModuleKey | 'ACCESS' | null {
	if (pathname.startsWith('/eneryetu/users')) return 'ACCESS';
	if (pathname.startsWith('/eneryetu/posts')) return 'POSTS';
	if (pathname.startsWith('/eneryetu/events')) return 'EVENTS';
	if (pathname.startsWith('/eneryetu/trainings')) return 'TRAININGS';
	if (pathname.startsWith('/eneryetu/products')) return 'PRODUCTS';
	if (pathname.startsWith('/eneryetu/jobs')) return 'JOBS';
	if (pathname.startsWith('/eneryetu/gallery')) return 'GALLERY';
	if (
		pathname.startsWith('/eneryetu/categories') ||
		pathname.startsWith('/eneryetu/event-types')
	) {
		return 'TAXONOMY';
	}
	return null;
}
