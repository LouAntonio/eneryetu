'use client';

import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

type Values = {
	name: string;
	company: string;
	email: string;
	phone: string;
	service: string;
	deadline: string;
	message: string;
};

type Errors = Partial<Pick<Values, 'name' | 'email' | 'message'>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_CLASS =
	'mt-2 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 font-mono text-sm text-ink placeholder:text-slate/50 focus:border-blue-dark focus:outline-none focus:ring-1 focus:ring-blue/30 transition-colors';

export function SolutionsContactForm({ services = [] }: { services?: string[] }) {
	const { t } = useTranslation();
	const [values, setValues] = useState<Values>({
		name: '',
		company: '',
		email: '',
		phone: '',
		service: '',
		deadline: '',
		message: '',
	});
	const [errors, setErrors] = useState<Errors>({});
	const [sent, setSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const update =
		(field: keyof Values) =>
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			setValues((prev) => ({ ...prev, [field]: event.target.value }));
		};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const next: Errors = {};
		if (!values.name.trim()) next.name = t('solutions.form.errors.name');
		if (!values.email.trim() || !EMAIL_RE.test(values.email))
			next.email = t('solutions.form.errors.email');
		if (!values.message.trim()) next.message = t('solutions.form.errors.message');
		setErrors(next);
		if (Object.keys(next).length > 0) return;

		setLoading(true);
		setServerError('');
		try {
			const response = await fetch('/api/solutions-contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			});
			if (!response.ok) {
				const data = await response.json().catch(() => null);
				throw new Error(
					data?.message || 'Não foi possível enviar o pedido. Tente novamente.',
				);
			}
			setSent(true);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Não foi possível enviar o pedido.';
			setServerError(msg);
		} finally {
			setLoading(false);
		}
	};

	if (sent) {
		return (
			<div className="border-2 border-volt bg-ink p-8 text-paper">
				<div className="flex items-center gap-3">
					<span aria-hidden className="node-live h-3 w-3 rounded-full bg-volt" />
					<h3 className="font-display text-3xl font-black uppercase tracking-tight">
						{t('solutions.form.successTitle')}
					</h3>
				</div>
				<p className="mt-3 text-paper/70">{t('solutions.form.successBody')}</p>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} noValidate className="space-y-5">
			<div className="grid gap-5 sm:grid-cols-2">
				<div>
					<label htmlFor="solutions-name" className="ui-label text-slate">
						{t('solutions.form.name')}
					</label>
					<input
						id="solutions-name"
						type="text"
						value={values.name}
						onChange={update('name')}
						autoComplete="name"
						className={FIELD_CLASS}
					/>
					{errors.name ? (
						<p className="mt-1 text-sm font-semibold text-sun-deep">{errors.name}</p>
					) : null}
				</div>

				<div>
					<label htmlFor="solutions-company" className="ui-label text-slate">
						{t('solutions.form.company')}
					</label>
					<input
						id="solutions-company"
						type="text"
						value={values.company}
						onChange={update('company')}
						autoComplete="organization"
						className={FIELD_CLASS}
					/>
				</div>
			</div>

			<div className="grid gap-5 sm:grid-cols-2">
				<div>
					<label htmlFor="solutions-email" className="ui-label text-slate">
						{t('solutions.form.email')}
					</label>
					<input
						id="solutions-email"
						type="email"
						value={values.email}
						onChange={update('email')}
						autoComplete="email"
						className={FIELD_CLASS}
					/>
					{errors.email ? (
						<p className="mt-1 text-sm font-semibold text-sun-deep">{errors.email}</p>
					) : null}
				</div>

				<div>
					<label htmlFor="solutions-phone" className="ui-label text-slate">
						{t('solutions.form.phone')}
					</label>
					<input
						id="solutions-phone"
						type="tel"
						value={values.phone}
						onChange={update('phone')}
						autoComplete="tel"
						className={FIELD_CLASS}
					/>
				</div>
			</div>

			<div className="grid gap-5 sm:grid-cols-2">
				<div>
					<label htmlFor="solutions-service" className="ui-label text-slate">
						{t('solutions.form.service')}
					</label>
					<select
						id="solutions-service"
						value={values.service}
						onChange={update('service')}
						className={FIELD_CLASS}
					>
						<option value="">{t('solutions.form.servicePlaceholder')}</option>
						{services.map((service) => (
							<option key={service} value={service}>
								{service}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="solutions-deadline" className="ui-label text-slate">
						{t('solutions.form.deadline')}
					</label>
					<input
						id="solutions-deadline"
						type="text"
						value={values.deadline}
						onChange={update('deadline')}
						placeholder="Luanda · 30 days"
						className={FIELD_CLASS}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="solutions-message" className="ui-label text-slate">
					{t('solutions.form.message')}
				</label>
				<textarea
					id="solutions-message"
					value={values.message}
					onChange={update('message')}
					rows={5}
					className={`${FIELD_CLASS} resize-y`}
				/>
				{errors.message ? (
					<p className="mt-1 text-sm font-semibold text-sun-deep">{errors.message}</p>
				) : null}
			</div>

			{serverError && (
				<p className="rounded border border-red bg-red/10 px-3 py-2 font-mono text-sm text-red">
					{serverError}
				</p>
			)}

			<button
				type="submit"
				disabled={loading}
				className="btn-volt focus-ring w-full py-4 text-lg"
			>
				{loading ? t('solutions.form.sending') : t('solutions.form.submit')}
			</button>
		</form>
	);
}
