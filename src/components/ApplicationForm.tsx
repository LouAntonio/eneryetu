'use client';

import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';

type Field = 'name' | 'email' | 'phone' | 'area' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<'name' | 'email' | 'cv', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CV_ACCEPT =
	'.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const FIELD_CLASS =
	'w-full rounded-none border border-line bg-paper px-3 py-2.5 font-mono text-sm text-ink placeholder:text-slate/60 focus:border-blue focus:outline-none';

const FILE_CLASS =
	'w-full rounded-none border border-line bg-paper px-2.5 py-2 font-mono text-sm text-slate file:mr-4 file:border-0 file:bg-ink file:px-4 file:py-2 file:font-mono file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-paper hover:file:bg-blue-dark focus:border-blue focus:outline-none';

export function ApplicationForm() {
	const { t } = useTranslation();
	const [values, setValues] = useState<Values>({
		name: '',
		email: '',
		phone: '',
		area: '',
		message: '',
	});
	const [errors, setErrors] = useState<Errors>({});
	const [cv, setCv] = useState<File | null>(null);
	const [sent, setSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState('');

	const update =
		(field: Field) =>
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			setValues((prev) => ({ ...prev, [field]: event.target.value }));
		};

	const pickCv = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCv(event.target.files?.[0] ?? null);
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const next: Errors = {};
		if (!values.name.trim()) next.name = t('careers.form.nameRequired');
		if (!values.email.trim() || !EMAIL_RE.test(values.email))
			next.email = t('careers.form.emailInvalid');
		if (!cv) next.cv = t('careers.form.cvRequired');
		setErrors(next);
		if (Object.keys(next).length > 0) return;

		setLoading(true);
		setServerError('');
		try {
			const formData = new FormData();
			formData.append('nome', values.name);
			formData.append('email', values.email);
			formData.append('telefone', values.phone);
			formData.append('area', values.area);
			formData.append('mensagem', values.message);
			if (cv) formData.append('curriculum', cv);

			await api.post('/carreiras', formData);
			setSent(true);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : t('common.errorSendingApplication');
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
						{t('careers.form.successTitle')}
					</h3>
				</div>
				<p className="mt-3 text-paper/70">{t('careers.form.successBody')}</p>
			</div>
		);
	}

	return (
		<form onSubmit={onSubmit} noValidate className="border border-line bg-white p-6 sm:p-8">
			<h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-ink">
				{t('careers.form.title')}
			</h3>

			{serverError && (
				<p className="mt-4 rounded border border-red bg-red/10 px-3 py-2 font-mono text-sm text-red">
					{serverError}
				</p>
			)}

			<div className="mt-6 grid gap-5 sm:grid-cols-2">
				<div>
					<label htmlFor="apply-name" className="ui-label text-slate">
						{t('careers.form.name')}
					</label>
					<input
						id="apply-name"
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
					<label htmlFor="apply-email" className="ui-label text-slate">
						{t('careers.form.email')}
					</label>
					<input
						id="apply-email"
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
			</div>

			<div className="mt-5 grid gap-5 sm:grid-cols-2">
				<div>
					<label htmlFor="apply-phone" className="ui-label text-slate">
						{t('careers.form.phone')}
					</label>
					<input
						id="apply-phone"
						type="tel"
						value={values.phone}
						onChange={update('phone')}
						autoComplete="tel"
						className={`mt-2 ${FIELD_CLASS}`}
					/>
				</div>

				<div>
					<label htmlFor="apply-area" className="ui-label text-slate">
						{t('careers.form.area')}
					</label>
					<input
						id="apply-area"
						type="text"
						value={values.area}
						onChange={update('area')}
						placeholder={t('careers.form.areaPlaceholder')}
						className={`mt-2 ${FIELD_CLASS}`}
					/>
				</div>
			</div>

			<div className="mt-5">
				<label htmlFor="apply-cv" className="ui-label text-slate">
					{t('careers.form.cv')}
				</label>
				<input
					id="apply-cv"
					type="file"
					accept={CV_ACCEPT}
					onChange={pickCv}
					className={`mt-2 ${FILE_CLASS}`}
				/>
				{cv ? (
					<p className="mt-2 font-mono text-xs text-ink">{cv.name}</p>
				) : (
					<p className="mt-2 font-mono text-xs text-slate/60">
						{t('careers.form.cvHint')}
					</p>
				)}
				{errors.cv ? (
					<p className="mt-1 text-sm font-semibold text-sun-deep">{errors.cv}</p>
				) : null}
			</div>

			<div className="mt-5">
				<label htmlFor="apply-message" className="ui-label text-slate">
					{t('careers.form.message')}
				</label>
				<textarea
					id="apply-message"
					value={values.message}
					onChange={update('message')}
					rows={4}
					placeholder={t('careers.form.messagePlaceholder')}
					className={`mt-2 resize-y ${FIELD_CLASS}`}
				/>
			</div>

			<button type="submit" disabled={loading} className="btn btn-sun mt-6 px-6 py-3">
				{loading ? '...' : t('careers.form.submit')}
			</button>
		</form>
	);
}
