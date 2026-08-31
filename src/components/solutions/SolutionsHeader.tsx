'use client';

import { Link } from '@/lib/routing';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export function SolutionsHeader() {
	const { t } = useTranslation();

	return (
		<header className="fixed inset-x-0 top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
				<div className="flex items-center gap-4">
					<img
						src="/images/parceiros/eneryetusolutions.png"
						alt="ENERYETU Solutions"
						className="h-12 w-12 object-contain"
					/>
					<div className="hidden sm:block">
						<p className="ui-label text-blue-dark">ENERYETU</p>
						<p className="font-display text-xl font-black uppercase tracking-tight text-ink">Solutions</p>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<LanguageSwitcher dark={false} />
					<Link to="/contact" className="btn btn-sun px-4 py-2 text-sm">
						{t('solutions.requestProposal')}
					</Link>
				</div>
			</div>
			<div aria-hidden className="h-0.5 w-full bg-line" />
		</header>
	);
}