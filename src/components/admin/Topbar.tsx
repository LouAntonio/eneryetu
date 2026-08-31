'use client';

import { useState } from 'react';
import { Link } from '../../lib/routing';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { ChangePasswordDialog } from './ChangePasswordDialog';
import { roleLabelKey } from '../../lib/permissions';

interface TopbarProps {
	title: string;
	eyebrow: string;
}

export function Topbar({ title, eyebrow }: TopbarProps) {
	const { t } = useTranslation();
	const { user, logout } = useAuth();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
			<div className="flex items-center justify-between gap-6 px-6 py-4 lg:px-10">
				<div>
					<span className="ui-label text-slate">{eyebrow}</span>
					<h1 className="mt-1 font-display text-2xl font-black uppercase leading-none tracking-tight text-ink">
						{title}
					</h1>
				</div>
				<div className="flex items-center gap-3">
					{user ? (
						<div className="hidden text-right sm:block">
							<p className="font-mono text-xs font-semibold text-ink">
								{user.name} {user.surname}
							</p>
							<p className="ui-label text-slate">{t(roleLabelKey(user.role))}</p>
						</div>
					) : null}
					<div aria-hidden className="hidden h-8 w-px bg-line sm:block" />
					<button
						type="button"
						onClick={() => setShowPassword(true)}
						className="btn btn-mono px-4 py-2 text-xs"
					>
						{t('admin.password.title')}
					</button>
					<Link to="/" className="btn btn-mono px-4 py-2 text-xs">
						↗ {t('admin.backToSite')}
					</Link>
					<button
						type="button"
						onClick={() => void logout()}
						className="btn btn-mono px-4 py-2 text-xs"
					>
						{t('admin.logout')}
					</button>
				</div>
			</div>
			{showPassword ? <ChangePasswordDialog onClose={() => setShowPassword(false)} /> : null}
		</header>
	);
}
