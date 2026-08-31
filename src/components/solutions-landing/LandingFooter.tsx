'use client';

import { useTranslation } from 'react-i18next';
import { Link } from '@/lib/routing';

export function LandingFooter() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-edge bg-void-deep">
			<div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
				<div className="grid gap-8 md:grid-cols-3">
					<div>
						<p className="font-display-alt text-xl uppercase text-inklit">
							{t('solutionsLanding.footer.brand')}
						</p>
						<p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
							{t('solutionsLanding.footer.tagline')}
						</p>
					</div>

					<div>
						<p className="font-mono text-xs uppercase tracking-[0.3em] text-glow">
							{t('solutionsLanding.footer.contact')}
						</p>
						<ul className="mt-3 space-y-2 text-sm text-inklit/80">
							<li>
								<a href="tel:+244923734199" className="transition-colors hover:text-volt">
									{t('solutionsLanding.footer.phone')}
								</a>
							</li>
							<li>
								<a
									href="mailto:contact@eneryetu.com"
									className="transition-colors hover:text-volt"
								>
									contact@eneryetu.com
								</a>
							</li>
						</ul>
					</div>

					<div>
						<p className="font-mono text-xs uppercase tracking-[0.3em] text-glow">ENERYETU</p>
						<Link
							to="/"
							className="mt-3 inline-flex items-center gap-2 text-sm text-inklit/80 transition-colors hover:text-volt"
						>
							<span className="text-glow">&larr;</span>
							{t('solutionsLanding.footer.backHome')}
						</Link>
					</div>
				</div>

				<div className="mt-10 border-t border-edge pt-6 text-center font-mono text-xs text-muted/60">
					{t('solutionsLanding.footer.rights', { year: String(year) })}
				</div>
			</div>
		</footer>
	);
}
