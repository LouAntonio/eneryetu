'use client';

import { useTranslation } from 'react-i18next';
import { TaxonomyPage } from './TaxonomyPage';

export function EventTypes() {
	const { t } = useTranslation();
	return (
		<TaxonomyPage
			kind="eventType"
			eyebrow={t('admin.eventTypes.eyebrow')}
			title={t('admin.eventTypes.title')}
			addLabel={t('admin.eventTypes.add')}
			nameLabel={t('admin.eventTypes.name')}
			slugLabel={t('admin.eventTypes.slug')}
			countLabel={t('admin.eventTypes.events')}
		/>
	);
}
