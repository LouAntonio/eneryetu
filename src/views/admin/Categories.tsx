'use client';

import { useTranslation } from 'react-i18next';
import { TaxonomyPage } from './TaxonomyPage';

export function Categories() {
	const { t } = useTranslation();
	return (
		<TaxonomyPage
			kind="category"
			eyebrow={t('admin.categories.eyebrow')}
			title={t('admin.categories.title')}
			addLabel={t('admin.categories.add')}
			nameLabel={t('admin.categories.name')}
			slugLabel={t('admin.categories.slug')}
			countLabel={t('admin.categories.posts')}
		/>
	);
}
