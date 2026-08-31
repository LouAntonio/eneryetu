'use client';

import { Link } from '@/lib/routing';
import { useTranslation } from 'react-i18next';

export function SolutionsFooter() {
	const { t } = useTranslation();

	return (
		<footer className="bg-ink-deep text-paper border-t border-blue-dark/30">
			<div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
				{/* Top Volt Line */}
				<div className="mb-10 max-w-4xl mx-auto">
					<svg
						className="w-full h-2"
						viewBox="0 0 1200 60"
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<path
							d="M 0 30 Q 200 0 400 30 T 800 30 T 1200 30"
							stroke="#fff110"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							fill="none"
							className="volt-line--static"
						/>
					</svg>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					{/* Unit Info */}
					<div className="md:col-span-2 lg:col-span-1">
						<p className="ui-label text-volt mb-3">{t('solutions.footer.unit')}</p>
						<p className="text-slate/80 leading-relaxed text-sm">
							{t('solutions.cta.body')}
						</p>
					</div>

					{/* Contact */}
					<div>
						<p className="ui-label text-volt mb-3">
							{t('solutions.footer.contactTitle')}
						</p>
						<ul className="space-y-2 text-sm text-slate/80">
							<li className="flex items-center gap-2">
								<span className="w-5 h-5 flex-shrink-0 text-volt">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										className="w-full h-full"
									>
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
									</svg>
								</span>
								<a
									href="tel:+244923734199"
									className="hover:text-volt transition-colors"
								>
									{t('solutions.footer.phone').split(' · ')[0]}
								</a>
							</li>
							<li className="flex items-center gap-2">
								<span className="w-5 h-5 flex-shrink-0 text-volt">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										className="w-full h-full"
									>
										<rect x="2" y="4" width="20" height="16" rx="2" />
										<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
									</svg>
								</span>
								<a
									href="mailto:{t('solutions.footer.email')}"
									className="hover:text-volt transition-colors"
								>
									{t('solutions.footer.email')}
								</a>
							</li>
						</ul>
					</div>

					{/* Back to Main Site */}
					<div className="md:col-span-1 lg:col-span-1">
						<p className="ui-label text-volt mb-3">ENERYETU</p>
						<p className="text-sm text-slate/80">
							<Link
								to="/"
								className="flex items-center gap-2 hover:text-volt transition-colors focus-ring rounded px-2 py-1"
							>
								<svg
									className="w-4 h-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path d="M19 12H5M12 19l-7-7 7-7" />
								</svg>
								{t('navigation.home')}
							</Link>
						</p>
					</div>
				</div>

				{/* Bottom */}
				<div className="mt-12 pt-8 border-t border-blue-dark/30 text-center text-sm text-slate/60">
					{t('solutions.footer.rights')}
				</div>
			</div>
		</footer>
	);
}
