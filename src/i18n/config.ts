import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en/translation.json';
import pt from '../locales/pt/translation.json';

const STORAGE_KEY = 'eneryetu-language';

const normalize = (lng: string) => (lng.toLowerCase().startsWith('pt') ? 'pt' : 'en');

const persist = (lng: string) => {
	try {
		localStorage.setItem(STORAGE_KEY, normalize(lng));
	} catch {
		/* storage unavailable (e.g. private mode) */
	}
};

let initialized = false;

export function initI18n() {
	if (initialized || typeof window === 'undefined') return;
	initialized = true;

	void i18n
		.use(LanguageDetector)
		.use(initReactI18next)
		.init({
			resources: {
				en: { translation: en },
				pt: { translation: pt },
			},
			fallbackLng: 'en',
			supportedLngs: ['en', 'pt'],
			load: 'languageOnly',
			nonExplicitSupportedLngs: true,
			detection: {
				order: ['localStorage', 'navigator'],
				caches: ['localStorage'],
				lookupLocalStorage: STORAGE_KEY,
			},
			interpolation: {
				escapeValue: false,
			},
			react: {
				useSuspense: false,
			},
		});

	const syncHtmlLang = (lng: string) => {
		document.documentElement.lang = normalize(lng);
	};

	persist(i18n.language ?? 'en');
	syncHtmlLang(i18n.language ?? 'en');

	i18n.on('languageChanged', (lng) => {
		persist(lng);
		syncHtmlLang(lng);
	});
}

export default i18n;
