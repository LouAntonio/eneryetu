'use client';

import { useTranslation } from 'react-i18next';

export function SolutionsFooter() {
	const { t } = useTranslation();

	return (
		<footer className="border-t border-line bg-paper/80">
			<div className="mx-auto w-full max-w-6xl px-6 py-10">
				<div className="grid gap-6 md:grid-cols-3">
					<div>
						<p className="ui-label text-blue-dark">{t('solutions.footer.unit')}</p>
						<p className="mt-2 text-sm text-slate">
							{t('solutions.cta.body')}
						</p>
					</div>
					<div>
						<p className="ui-label text-blue-dark">{t('solutions.footer.contactTitle')}</p>
						<ul className="mt-2 space-y-1 text-sm text-slate">
							<li>Tel: {t('solutions.footer.phone')}</li>
							<li>Email: <a href="mailto:{t('solutions.footer.email')}" className="underline hover:text-blue">{t('solutions.footer.email')}</a></li>
						</ul>
					</div>
					<div className="md:col-span-1">
						<p className="ui-label text-blue-dark">ENERYETU</p>
						<p className="mt-2 text-sm text-slate">
							<a href="/" className="underline hover:text-blue transition-colors">
								Voltar ao site principal ENERYETU
							</a>
						</p>
					</div>
				</div>
				<div className="mt-8 pt-6 border-t border-line text-center text-sm text-slate">
					{t('solutions.footer.rights')}
				</div>
			</div>
		</footer>
	);
}