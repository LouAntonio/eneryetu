'use client';

import { Link } from '@/lib/routing';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export function SolutionsHeader() {
	const { t } = useTranslation();

	return (
		<header className="fixed inset-x-0 top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-line/30">
			<div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-6">
				<Link
					to="/eneryetu-solutions"
					className="flex items-center gap-3 focus-ring"
					aria-label="ENERYETU Solutions"
				>
					<img
						src="/images/parceiros/eneryetusolutions.png"
						alt="ENERYETU Solutions"
						className="h-8 w-8 object-contain"
					/>
					<span className="hidden sm:block font-display text-xl font-black uppercase tracking-tight text-ink">
						Solutions
					</span>
				</Link>

				<div className="flex items-center gap-4">
					<LanguageSwitcher dark={false} />
					<Link to="/contact" className="btn-volt px-5 py-2 text-sm focus-ring">
						{t('solutions.requestProposal')}
					</Link>
				</div>
			</div>
			<div aria-hidden className="h-px w-full bg-line/30" />
		</header>
	);
}
