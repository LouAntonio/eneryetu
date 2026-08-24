'use client';

import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from '../../lib/routing';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';

export function Login() {
	const { t } = useTranslation();
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const from =
		(location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/eneryetu';

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError('');
		setLoading(true);
		try {
			await login(email, password);
			navigate(from, { replace: true });
		} catch {
			setError(t('admin.login.invalid'));
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-ink-deep px-6 py-16 text-paper">
			<div aria-hidden className="absolute inset-0 -z-10 grid-dark" />
			<div className="w-full max-w-md">
				<div className="flex items-center gap-3">
					<img src="/logo.png" alt={t('brand')} className="h-12 w-12 object-contain" />
					<span className="ui-label text-paper/50">{t('admin.login.eyebrow')}</span>
				</div>
				<h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.92] tracking-tight">
					{t('admin.login.title')}
				</h1>

				<form
					onSubmit={onSubmit}
					noValidate
					className="mt-8 border border-paper/20 bg-ink p-6 sm:p-8"
				>
					{error ? (
						<p className="mb-5 border border-sun-deep/50 bg-sun-deep/10 px-3 py-2 font-mono text-xs text-sun">
							{error}
						</p>
					) : null}

					<div>
						<label htmlFor="login-email" className="ui-label text-paper/60">
							{t('admin.login.email')}
						</label>
						<input
							id="login-email"
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							autoComplete="email"
							required
							className="mt-2 w-full border border-paper/25 bg-transparent px-3 py-2.5 font-mono text-sm text-paper placeholder:text-paper/40 focus:border-volt focus:outline-none"
						/>
					</div>

					<div className="mt-5">
						<label htmlFor="login-password" className="ui-label text-paper/60">
							{t('admin.login.password')}
						</label>
						<input
							id="login-password"
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							autoComplete="current-password"
							required
							className="mt-2 w-full border border-paper/25 bg-transparent px-3 py-2.5 font-mono text-sm text-paper placeholder:text-paper/40 focus:border-volt focus:outline-none"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="btn btn-sun mt-6 w-full px-6 py-3"
					>
						{loading ? '…' : t('admin.login.submit')}
					</button>
				</form>

				<Link
					to="/"
					className="mt-6 inline-block font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em] text-paper/50 transition-colors hover:text-volt"
				>
					← {t('admin.backToSite')}
				</Link>
			</div>
		</section>
	);
}
