export function formatDate(iso: string, locale = 'en-GB') {
	return new Date(iso).toLocaleDateString(locale, {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
}
