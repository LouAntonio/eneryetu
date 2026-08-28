'use client';

import { useTranslation } from 'react-i18next';

const LANGUAGES = ['en', 'pt'] as const;

interface LanguageSwitcherProps {
	dark?: boolean;
}

export function LanguageSwitcher({ dark = false }: LanguageSwitcherProps) {
	const { i18n } = useTranslation();
	const active = i18n.language?.startsWith('pt') ? 'pt' : 'en';

	const changeLanguage = (code: (typeof LANGUAGES)[number]) => {
		if (code === active) return;
		void i18n.changeLanguage(code);
	};

	const tone = dark ? 'border-paper/25 text-paper' : 'border-ink text-ink';

	return (
		<div
			className={`inline-flex items-center border-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] ${tone}`}
			role="group"
			aria-label="Language"
		>
			{LANGUAGES.map((code) => {
				const isActive = active === code;
				return (
					<button
						key={code}
						type="button"
						onClick={() => changeLanguage(code)}
						aria-pressed={isActive}
						className={`px-3 py-1.5 transition-colors ${
							isActive
								? 'bg-volt text-ink'
								: dark
									? 'text-paper/60 hover:text-volt'
									: 'text-slate hover:text-ink'
						}`}
					>
						{code.toUpperCase()}
					</button>
				);
			})}
		</div>
	);
}
