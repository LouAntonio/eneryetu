'use client';
import { useEffect } from 'react';
import { useLocation } from '../lib/routing';

const TITLES: Record<string, string> = {
	'/': 'EnerYetu',
	'/about': 'About | EnerYetu',
	'/sectors': 'Sectors | EnerYetu',
	'/services': 'Services | EnerYetu',
	'/products': 'Products | EnerYetu',
	'/training': 'Training | EnerYetu',
	'/careers': 'Careers | EnerYetu',
	'/contact': 'Contact | EnerYetu',
	'/media': 'Media | EnerYetu',
	'/media/blog': 'Blog | EnerYetu',
	'/media/news': 'News | EnerYetu',
	'/media/events': 'Events | EnerYetu',
	'/media/gallery': 'Gallery | EnerYetu',
};

export function useDocumentTitle() {
	const { pathname } = useLocation();
	useEffect(() => {
		document.title = TITLES[pathname] ?? 'EnerYetu';
	}, [pathname]);
}
