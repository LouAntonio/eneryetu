'use client';

import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { User } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { DataTable } from '../../components/admin/DataTable';
import { FormModal } from '../../components/admin/FormModal';
import { useAuth } from '../../hooks/useAuth';

const inputClass =
	'mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

export function Users() {
	const { t } = useTranslation();
	const { user: me } = useAuth();
	const queryClient = useQueryClient();
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });
	const [error, setError] = useState('');

	const { data, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: async () => (await api.get<{ data: User[] }>('/auth/users')).data,
	});

	const createUser = useMutation({
		mutationFn: async () => api.post('/auth/register', form),
		onSuccess: () => {
			setShowForm(false);
			setForm({ name: '', surname: '', email: '', password: '' });
			void queryClient.invalidateQueries({ queryKey: ['users'] });
		},
		onError: (err: unknown) => {
			const msg =
				err instanceof Error && 'response' in err
					? ((err as { response?: { data?: { message?: string } } }).response?.data
							?.message ?? t('admin.errors.generic'))
					: t('admin.errors.generic');
			setError(msg);
		},
	});

	const deleteUser = useMutation({
		mutationFn: async (id: string) => api.delete(`/auth/users/${id}`),
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['users'] }),
	});

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		setError('');
		createUser.mutate();
	};

	const update = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
		setForm((prev) => ({ ...prev, [field]: event.target.value }));

	return (
		<AdminPage
			eyebrow={t('admin.users.eyebrow')}
			title={t('admin.users.title')}
			actions={
				<button
					type="button"
					className="btn btn-sun px-5 py-2.5"
					onClick={() => setShowForm(true)}
				>
					{t('admin.users.add')}
				</button>
			}
		>
			<DataTable<User>
				loading={isLoading}
				rows={data ?? []}
				rowKey={(row) => row.id}
				columns={[
					{
						key: 'name',
						label: t('admin.users.name'),
						render: (row) => (
							<span className="font-mono text-sm font-semibold text-ink group-hover:text-paper">
								{row.name} {row.surname}
							</span>
						),
					},
					{
						key: 'email',
						label: t('admin.users.email'),
						render: (row) => (
							<span className="font-mono text-sm text-slate group-hover:text-paper/70">
								{row.email}
							</span>
						),
					},
					{
						key: 'role',
						label: t('admin.users.role'),
						render: (row) => (
							<span className="font-mono text-xs uppercase tracking-[0.16em] text-blue group-hover:text-paper/60">
								{row.role}
							</span>
						),
					},
					{
						key: 'actions',
						label: '',
						render: (row) =>
							row.id !== me?.id ? (
								<button
									type="button"
									onClick={() => {
										if (window.confirm(t('admin.users.deleteConfirm')))
											deleteUser.mutate(row.id);
									}}
									className="font-mono text-xs uppercase tracking-[0.16em] text-slate underline decoration-line underline-offset-4 transition-colors hover:text-volt group-hover:text-paper"
								>
									{t('admin.delete')}
								</button>
							) : (
								<span className="font-mono text-xs uppercase tracking-[0.16em] text-slate/50 group-hover:text-paper/50">
									{t('admin.you')}
								</span>
							),
					},
				]}
			/>

			{showForm ? (
				<FormModal title={t('admin.users.add')} onClose={() => setShowForm(false)}>
					<form onSubmit={onSubmit} noValidate>
						{error ? (
							<p className="mb-4 border border-sun-deep/50 bg-sun-deep/10 px-3 py-2 font-mono text-xs text-sun-deep">
								{error}
							</p>
						) : null}
						<div className="grid gap-5 sm:grid-cols-2">
							<div>
								<label htmlFor="user-name" className="ui-label text-slate">
									{t('admin.users.name')}
								</label>
								<input
									id="user-name"
									type="text"
									required
									value={form.name}
									onChange={update('name')}
									className={inputClass}
								/>
							</div>
							<div>
								<label htmlFor="user-surname" className="ui-label text-slate">
									{t('admin.users.surname')}
								</label>
								<input
									id="user-surname"
									type="text"
									required
									value={form.surname}
									onChange={update('surname')}
									className={inputClass}
								/>
							</div>
						</div>
						<div className="mt-5">
							<label htmlFor="user-email" className="ui-label text-slate">
								{t('admin.users.email')}
							</label>
							<input
								id="user-email"
								type="email"
								required
								value={form.email}
								onChange={update('email')}
								className={inputClass}
							/>
						</div>
						<div className="mt-5">
							<label htmlFor="user-password" className="ui-label text-slate">
								{t('admin.users.password')}
							</label>
							<input
								id="user-password"
								type="password"
								required
								minLength={6}
								value={form.password}
								onChange={update('password')}
								className={inputClass}
							/>
						</div>
						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								className="btn btn-paper border-ink bg-transparent px-5 py-2.5 text-ink hover:border-ink"
								onClick={() => setShowForm(false)}
							>
								{t('admin.cancel')}
							</button>
							<button
								type="submit"
								disabled={createUser.isPending}
								className="btn btn-sun px-5 py-2.5"
							>
								{createUser.isPending ? '…' : t('admin.save')}
							</button>
						</div>
					</form>
				</FormModal>
			) : null}
		</AdminPage>
	);
}
