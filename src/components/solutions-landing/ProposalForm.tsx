'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

interface ServiceItem {
	en: string;
	pt: string;
}
interface ServiceGroup {
	name: string;
	items: ServiceItem[];
}

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

const INITIAL: Values = {
	name: '',
	company: '',
	email: '',
	phone: '',
	service: '',
	deadline: '',
	message: '',
};

export function ProposalForm() {
	const { t } = useTranslation();
	const services = useMemo(() => {
		const groups = t('solutionsLanding.services.groups', {
			returnObjects: true,
		}) as ServiceGroup[];
		return groups.flatMap((g) => g.items.map((it: ServiceItem) => it.en));
	}, [t]);

	const [values, setValues] = useState<Values>(INITIAL);
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
		if (!values.name.trim()) next.name = t('solutionsLanding.proposal.errors.name');
		if (!values.email.trim() || !EMAIL_RE.test(values.email))
			next.email = t('solutionsLanding.proposal.errors.email');
		if (!values.message.trim()) next.message = t('solutionsLanding.proposal.errors.message');
		setErrors(next);
		if (Object.keys(next).length > 0) return;

		setLoading(true);
		setServerError('');
		try {
			const response = await fetch('/api/solutions/lead', {
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

	const field =
		'w-full border border-edge bg-void-deep/60 px-4 py-3 font-body-alt text-inklit placeholder:text-muted/60 focus:border-glow focus:outline-none transition-colors';

	return (
		<section id="proposta" className="relative py-20 sm:py-28">
			<div className="mx-auto max-w-6xl px-5 sm:px-8">
				<Reveal>
					<SectionHead
						eyebrow={t('solutionsLanding.proposal.eyebrow')}
						title={t('solutionsLanding.proposal.title')}
						lead={t('solutionsLanding.proposal.lead')}
					/>
				</Reveal>

				<Reveal delay={60}>
					{/* The signature busbar terminates at this panel */}
					<div className="relative border border-edge bg-panel p-6 sm:p-10">
						<span className="voltage-node absolute -left-1 top-1/2 h-2.5 w-2.5 rounded-full bg-volt" />
						{sent ? (
							<div className="py-12 text-center">
								<div className="voltage-node mx-auto mb-6 h-12 w-12 rounded-full bg-volt/90" />
								<h3 className="font-display-alt text-3xl uppercase text-inklit">
									{t('solutionsLanding.proposal.successTitle')}
								</h3>
								<p className="mx-auto mt-3 max-w-md text-muted">
									{t('solutionsLanding.proposal.successBody')}
								</p>
							</div>
						) : (
							<form onSubmit={onSubmit} noValidate className="space-y-6">
								<div className="grid gap-6 sm:grid-cols-2">
									<div>
										<label
											htmlFor="sln-name"
											className="font-mono text-xs uppercase tracking-[0.2em] text-inklit/70"
										>
											{t('solutionsLanding.proposal.name')}
										</label>
										<input
											id="sln-name"
											type="text"
											value={values.name}
											onChange={update('name')}
											autoComplete="name"
											className={`mt-2 ${field}`}
										/>
										{errors.name && (
											<p className="mt-1 text-sm text-sun">{errors.name}</p>
										)}
									</div>
									<div>
										<label
											htmlFor="sln-company"
											className="font-mono text-xs uppercase tracking-[0.2em] text-inklit/70"
										>
											{t('solutionsLanding.proposal.company')}
										</label>
										<input
											id="sln-company"
											type="text"
											value={values.company}
											onChange={update('company')}
											autoComplete="organization"
											className={`mt-2 ${field}`}
										/>
									</div>
								</div>

								<div className="grid gap-6 sm:grid-cols-2">
									<div>
										<label
											htmlFor="sln-email"
											className="font-mono text-xs uppercase tracking-[0.2em] text-inklit/70"
										>
											{t('solutionsLanding.proposal.email')}
										</label>
										<input
											id="sln-email"
											type="email"
											value={values.email}
											onChange={update('email')}
											autoComplete="email"
											className={`mt-2 ${field}`}
										/>
										{errors.email && (
											<p className="mt-1 text-sm text-sun">{errors.email}</p>
										)}
									</div>
									<div>
										<label
											htmlFor="sln-phone"
											className="font-mono text-xs uppercase tracking-[0.2em] text-inklit/70"
										>
											{t('solutionsLanding.proposal.phone')}
										</label>
										<input
											id="sln-phone"
											type="tel"
											value={values.phone}
											onChange={update('phone')}
											autoComplete="tel"
											className={`mt-2 ${field}`}
										/>
									</div>
								</div>

								<div className="grid gap-6 sm:grid-cols-2">
									<div>
										<label
											htmlFor="sln-service"
											className="font-mono text-xs uppercase tracking-[0.2em] text-inklit/70"
										>
											{t('solutionsLanding.proposal.service')}
										</label>
										<select
											id="sln-service"
											value={values.service}
											onChange={update('service')}
											className={`mt-2 ${field}`}
										>
											<option value="" className="bg-panel">
												{t('solutionsLanding.proposal.servicePlaceholder')}
											</option>
											{services.map((service) => (
												<option
													key={service}
													value={service}
													className="bg-panel"
												>
													{service}
												</option>
											))}
										</select>
									</div>
									<div>
										<label
											htmlFor="sln-deadline"
											className="font-mono text-xs uppercase tracking-[0.2em] text-inklit/70"
										>
											{t('solutionsLanding.proposal.deadline')}
										</label>
										<input
											id="sln-deadline"
											type="text"
											value={values.deadline}
											onChange={update('deadline')}
											placeholder={t(
												'solutionsLanding.proposal.deadlinePlaceholder',
											)}
											className={`mt-2 ${field}`}
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="sln-message"
										className="font-mono text-xs uppercase tracking-[0.2em] text-inklit/70"
									>
										{t('solutionsLanding.proposal.message')}
									</label>
									<textarea
										id="sln-message"
										value={values.message}
										onChange={update('message')}
										rows={5}
										placeholder={t(
											'solutionsLanding.proposal.messagePlaceholder',
										)}
										className={`mt-2 ${field} resize-y`}
									/>
									{errors.message && (
										<p className="mt-1 text-sm text-sun">{errors.message}</p>
									)}
								</div>

								{serverError && (
									<p className="border border-sun/40 bg-sun/10 px-3 py-2 font-mono text-sm text-sun">
										{serverError}
									</p>
								)}

								<p className="font-mono text-xs text-muted/70">
									{t('solutionsLanding.proposal.privacy')}
								</p>

								<button
									type="submit"
									disabled={loading}
									className="night-cta w-full px-6 py-4 font-mono text-sm font-semibold uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
								>
									{loading
										? t('solutionsLanding.proposal.sending')
										: t('solutionsLanding.proposal.submit')}
								</button>
							</form>
						)}
					</div>
				</Reveal>
			</div>
		</section>
	);
}
