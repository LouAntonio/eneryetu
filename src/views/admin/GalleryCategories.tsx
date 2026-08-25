'use client';

import { useTranslation } from 'react-i18next';
import { TaxonomyPage } from './TaxonomyPage';

export function GalleryCategories() {
	const { t } = useTranslation();
	return (
		<TaxonomyPage
			kind="galleryCategory"
			eyebrow={t('admin.galleryCategories.eyebrow')}
			title={t('admin.galleryCategories.title')}
			addLabel={t('admin.galleryCategories.add')}
			nameLabel={t('admin.galleryCategories.name')}
			slugLabel={t('admin.galleryCategories.slug')}
			countLabel={t('admin.galleryCategories.photos')}
		/>
	);
}
