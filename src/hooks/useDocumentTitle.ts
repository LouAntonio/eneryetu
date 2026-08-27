'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const TITLE_KEYS: Record<string, string> = {
	'/': 'brand',
	'/about': 'navigation.about',
	'/sectors': 'navigation.sectors',
	'/services': 'navigation.services',
	'/products': 'navigation.products',
	'/training': 'navigation.training',
	'/careers': 'navigation.careers',
	'/contact': 'navigation.contact',
	'/media': 'navigation.media',
	'/media/blog': 'navigation.blog',
	'/media/news': 'navigation.news',
	'/media/events': 'navigation.events',
	'/media/gallery': 'navigation.gallery',
};

export function useDocumentTitle() {
	const pathname = usePathname();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		const key = TITLE_KEYS[pathname];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		document.title = key ? `${t(key as any)} | ENERYETU` : 'ENERYETU';
	}, [pathname, i18n.language, t]);
}
