'use client';

import { useTranslation } from 'react-i18next';

import { EmptyBoard } from './shared';

export function MediaGallery() {
	const { t } = useTranslation();

	return <EmptyBoard titleKey="gallery" cta={{ label: t('media.ctaContact'), to: '/contact' }} />;
}
