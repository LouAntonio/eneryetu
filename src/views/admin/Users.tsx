'use client';

import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import type { User, ModuleKey, Role } from '../../types';
import { AdminPage } from '../../components/admin/AdminPage';
import { DataTable } from '../../components/admin/DataTable';
import { FormModal } from '../../components/admin/FormModal';
import { useAuth } from '../../hooks/useAuth';
import { ALL_MODULES, roleLabelKey } from '../../lib/permissions';

const inputClass =
	'mt-2 w-full border border-line bg-white px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

interface UserFormState {
	id?: string;
	name: string;
	surname: string;
	email: string;
	password: string;
	role: Role;
	modules: ModuleKey[];
}

const emptyForm: UserFormState = {
	name: '',
	surname: '',
	email: '',
	password: '',
	role: 'ADMIN',
	modules: [],
};

export function Users() {
	const { t } = useTranslation();
	const { user: me } = useAuth();
	const queryClient = useQueryClient();
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState<UserFormState>({ ...emptyForm });
	const [error, setError] = useState('');

	const { data, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: async () =>
			(await api.get<{ data: User[] }>('/auth/users')).data as User[],
	});

	const createUser = useMutation({
		mutationFn: async () =>
			api.post('/auth/register', {
				name: form.name,
				surname: form.surname,
				email: form.email,
				password: form.password,
				role: form.role,
				modules: form.modules,
			}),
		onSuccess: () => {
			setShowForm(false);
			setForm({ ...emptyForm });
			void queryClient.invalidateQueries({ queryKey: ['users'] });
		},
		onError: (err: unknown) => setError(extractError(err, t('admin.errors.generic'))),
	});

	const updateUser = useMutation({
		mutationFn: async () =>
			api.patch(`/auth/users/${form.id}`, {
				name: form.name,
				surname: form.surname,
				email: form.email,
				role: form.role,
				modules: form.modules,
			}),
		onSuccess: () => {
			setShowForm(false);
			setForm({ ...emptyForm });
			void queryClient.invalidateQueries({ queryKey: ['users'] });
		},
		onError: (err: unknown) => setError(extractError(err, t('admin.errors.generic'))),
	});

	const deleteUser = useMutation({
		mutationFn: async (id: string) => api.delete(`/auth/users/${id}`),
		onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['users'] }),
	});

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		setError('');
		if (form.role === 'ADMIN' && form.modules.length === 0) {
			setError(t('admin.modules.hint'));
			return;
		}
		if (form.id) updateUser.mutate();
		else createUser.mutate();
	};

	const update = (field: keyof UserFormState) => (event: React.ChangeEvent<HTMLInputElement>) =>
		setForm((prev) => ({ ...prev, [field]: event.target.value }));

	const openCreate = () => {
		setForm({ ...emptyForm });
		setError('');
		setShowForm(true);
	};

	const openEdit = (row: User) => {
		setForm({
			id: row.id,
			name: row.name,
			surname: row.surname,
			email: row.email,
			password: '',
			role: row.role,
			modules: (row.modules ?? []).map((m) => m.module),
		});
		setError('');
		setShowForm(true);
	};

	const toggleModule = (module: ModuleKey) => {
		setForm((prev) => ({
			...prev,
			modules: prev.modules.includes(module)
				? prev.modules.filter((m) => m !== module)
				: [...prev.modules, module],
		}));
	};

	return (
		<AdminPage
			eyebrow={t('admin.users.eyebrow')}
			title={t('admin.users.title')}
			actions={
				<button type="button" className="btn btn-sun px-5 py-2.5" onClick={openCreate}>
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
						label: t('admin.roles.role'),
						render: (row) => (
							<span className="font-mono text-xs uppercase tracking-[0.16em] text-blue group-hover:text-paper/60">
								{t(roleLabelKey(row.role))}
							</span>
						),
					},
					{
						key: 'actions',
						label: '',
						render: (row) => (
							<div className="flex items-center gap-4">
								<button
									type="button"
									onClick={() => openEdit(row)}
									className="font-mono text-xs uppercase tracking-[0.16em] text-slate underline decoration-line underline-offset-4 transition-colors hover:text-volt group-hover:text-paper"
								>
									{t('admin.edit')}
								</button>
								{row.id !== me?.id ? (
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
								)}
							</div>
						),
					},
				]}
			/>

			{showForm ? (
				<FormModal
					title={form.id ? t('admin.users.edit') : t('admin.users.add')}
					onClose={() => setShowForm(false)}
				>
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
						{!form.id ? (
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
						) : null}
						<div className="mt-5">
							<label htmlFor="user-role" className="ui-label text-slate">
								{t('admin.roles.role')}
							</label>
							<select
								id="user-role"
								value={form.role}
								onChange={(event) =>
									setForm((prev) => ({
										...prev,
										role: event.target.value as Role,
										modules: event.target.value === 'ADMIN' ? prev.modules : [],
									}))
								}
								className={inputClass}
							>
								<option value="SUPERADMIN">{t('admin.roles.SUPERADMIN')}</option>
								<option value="ADMIN">{t('admin.roles.ADMIN')}</option>
							</select>
						</div>
						{form.role === 'ADMIN' ? (
							<div className="mt-5">
								<p className="ui-label text-slate">{t('admin.modules.label')}</p>
								<p className="mt-1 font-mono text-xs text-slate">
									{t('admin.modules.hint')}
								</p>
								<div className="mt-3 grid grid-cols-1 gap-2 border border-line bg-white p-3">
									{ALL_MODULES.map((module) => (
										<label
											key={module}
											className="flex cursor-pointer items-center gap-3 font-mono text-sm text-ink"
										>
											<input
												type="checkbox"
												checked={form.modules.includes(module)}
												onChange={() => toggleModule(module)}
												className="h-4 w-4 accent-ink"
											/>
											{t(`admin.modules.${module}`)}
										</label>
									))}
								</div>
							</div>
						) : null}
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
								disabled={createUser.isPending || updateUser.isPending}
								className="btn btn-sun px-5 py-2.5"
							>
								{createUser.isPending || updateUser.isPending
									? '…'
									: t('admin.save')}
							</button>
						</div>
					</form>
				</FormModal>
			) : null}
		</AdminPage>
	);
}

function extractError(err: unknown, fallback: string): string {
	if (err instanceof Error && 'response' in err) {
		return (
			(err as { response?: { data?: { message?: string } } }).response?.data?.message ??
			fallback
		);
	}
	return fallback;
}
