'use client';

import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';

type Field = 'name' | 'company' | 'email' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_CLASS =
	'w-full rounded-none border border-line bg-paper px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

export function ContactForm() {
	const { t } = useTranslation();
	const [values, setValues] = useState<Values>({ name: '', company: '', email: '', message: '' });
	const [errors, setErrors] = useState<Errors>({});
	const [sent, setSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const update =
		(field: Field) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setValues((prev) => ({ ...prev, [field]: event.target.value }));
		};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const next: Errors = {};
		if (!values.name.trim()) next.name = t('contact.form.nameRequired');
		if (!values.email.trim() || !EMAIL_RE.test(values.email))
			next.email = t('contact.form.emailInvalid');
		if (!values.message.trim()) next.message = t('contact.form.messageRequired');
		setErrors(next);
		if (Object.keys(next).length > 0) return;

		setLoading(true);
		setServerError('');
		try {
			await api.post('/contact', {
				name: values.name,
				email: values.email,
				phone: values.company,
				message: values.message,
			});
			setSent(true);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Erro ao enviar mensagem';
			setServerError(msg);
		} finally {
			setLoading(false);
		}
	};

	if (sent) {
		return (
			<div className="border-2 border-volt bg-ink p-8 text-paper">
				<div className="flex items-center gap-3">
					<span aria-hidden className="node-live h-2.5 w-2.5 rounded-full bg-volt" />
					<h3 className="font-display text-3xl font-black uppercase tracking-tight">
						{t('contact.form.successTitle')}
					</h3>
				</div>
				<p className="mt-3 text-paper/70">{t('contact.form.successBody')}</p>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} noValidate className="border border-line bg-white p-6 sm:p-8">
			<h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-ink">
				{t('contact.form.title')}
			</h3>

			{serverError && (
				<p className="mt-4 rounded border border-red bg-red/10 px-3 py-2 font-mono text-sm text-red">
					{serverError}
				</p>
			)}

			<div className="mt-6 grid gap-5 sm:grid-cols-2">
				<div>
					<label htmlFor="contact-name" className="ui-label text-slate">
						{t('contact.form.name')}
					</label>
					<input
						id="contact-name"
						type="text"
						value={values.name}
						onChange={update('name')}
						autoComplete="name"
						className={`mt-2 ${FIELD_CLASS}`}
					/>
					{errors.name ? (
						<p className="mt-1 text-sm font-semibold text-sun-deep">{errors.name}</p>
					) : null}
				</div>

				<div>
					<label htmlFor="contact-company" className="ui-label text-slate">
						{t('contact.form.company')}
					</label>
					<input
						id="contact-company"
						type="text"
						value={values.company}
						onChange={update('company')}
						autoComplete="organization"
						className={`mt-2 ${FIELD_CLASS}`}
					/>
				</div>
			</div>

			<div className="mt-5">
				<label htmlFor="contact-email" className="ui-label text-slate">
					{t('contact.form.email')}
				</label>
				<input
					id="contact-email"
					type="email"
					value={values.email}
					onChange={update('email')}
					autoComplete="email"
					className={`mt-2 ${FIELD_CLASS}`}
				/>
				{errors.email ? (
					<p className="mt-1 text-sm font-semibold text-sun-deep">{errors.email}</p>
				) : null}
			</div>

			<div className="mt-5">
				<label htmlFor="contact-message" className="ui-label text-slate">
					{t('contact.form.message')}
				</label>
				<textarea
					id="contact-message"
					value={values.message}
					onChange={update('message')}
					rows={5}
					placeholder={t('contact.form.messagePlaceholder')}
					className={`mt-2 resize-y ${FIELD_CLASS}`}
				/>
				{errors.message ? (
					<p className="mt-1 text-sm font-semibold text-sun-deep">{errors.message}</p>
				) : null}
			</div>

			<button type="submit" disabled={loading} className="btn btn-sun mt-6 px-6 py-3">
				{loading ? '...' : t('contact.form.submit')}
			</button>
		</form>
	);
}
