'use client';

import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { FormModal } from './FormModal';

const inputClass =
	'mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

export function ChangePasswordDialog({ onClose }: { onClose: () => void }) {
	const { t } = useTranslation();
	const { logout } = useAuth();
	const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const onField =
		(field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
			setForm((prev) => ({ ...prev, [field]: event.target.value }));

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError('');
		setMessage('');

		if (!form.currentPassword || !form.newPassword || !form.confirm) {
			setError(t('admin.password.empty'));
			return;
		}
		if (form.newPassword !== form.confirm) {
			setError(t('admin.password.mismatch'));
			return;
		}
		if (form.newPassword.length < 6) {
			setError(t('admin.password.minLength'));
			return;
		}

		setLoading(true);
		try {
			await api.put('/auth/password', {
				currentPassword: form.currentPassword,
				newPassword: form.newPassword,
			});
			setMessage(t('admin.password.success'));
			setTimeout(() => void logout(), 1200);
		} catch (err: unknown) {
			const msg =
				err instanceof Error && 'response' in err
					? ((err as { response?: { data?: { message?: string } } }).response?.data
							?.message ?? t('admin.password.error'))
					: t('admin.password.error');
			setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<FormModal title={t('admin.password.title')} onClose={onClose}>
			{error ? (
				<p className="mb-4 border border-sun-deep/50 bg-sun-deep/10 px-3 py-2 font-mono text-xs text-sun-deep">
					{error}
				</p>
			) : null}
			{message ? (
				<p className="mb-4 border border-volt/50 bg-volt/10 px-3 py-2 font-mono text-xs text-volt">
					{message}
				</p>
			) : null}
			<form onSubmit={onSubmit} noValidate>
				<div>
					<label htmlFor="pw-current" className="ui-label text-slate">
						{t('admin.password.current')}
					</label>
					<input
						id="pw-current"
						type="password"
						required
						autoComplete="current-password"
						value={form.currentPassword}
						onChange={onField('currentPassword')}
						className={inputClass}
					/>
				</div>
				<div className="mt-5">
					<label htmlFor="pw-new" className="ui-label text-slate">
						{t('admin.password.new')}
					</label>
					<input
						id="pw-new"
						type="password"
						required
						minLength={6}
						autoComplete="new-password"
						value={form.newPassword}
						onChange={onField('newPassword')}
						className={inputClass}
					/>
				</div>
				<div className="mt-5">
					<label htmlFor="pw-confirm" className="ui-label text-slate">
						{t('admin.password.confirm')}
					</label>
					<input
						id="pw-confirm"
						type="password"
						required
						minLength={6}
						autoComplete="new-password"
						value={form.confirm}
						onChange={onField('confirm')}
						className={inputClass}
					/>
				</div>
				<div className="mt-6 flex items-center justify-end gap-3">
					<button
						type="button"
						className="btn btn-paper border-ink bg-transparent px-5 py-2.5 text-ink hover:border-ink"
						onClick={onClose}
					>
						{t('admin.cancel')}
					</button>
					<button type="submit" disabled={loading} className="btn btn-sun px-5 py-2.5">
						{loading ? '…' : t('admin.save')}
					</button>
				</div>
			</form>
		</FormModal>
	);
}
