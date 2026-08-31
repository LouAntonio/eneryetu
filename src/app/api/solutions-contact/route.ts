import type { NextRequest } from 'next/server';
import { sendMail } from '@/server/mailer';
import { okMessage, fail, readJson, handleError } from '@/server/http';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
	try {
		const { name, company, email, phone, service, deadline, message } = await readJson(req);

		if (!name || !email || !message) {
			return fail(400, 'Nome, email e mensagem são obrigatórios');
		}
		if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
			return fail(400, 'Email inválido');
		}

		const serviceLine = typeof service === 'string' && service ? service : 'Não especificado';
		const companyLine = typeof company === 'string' && company ? company : '—';
		const phoneLine = typeof phone === 'string' && phone ? phone : '—';
		const deadlineLine = typeof deadline === 'string' && deadline ? deadline : '—';

		await sendMail({
			subject: `Proposta via ENERYETU Solutions — ${serviceLine}`,
			html: `
				<h2>Solicitação de proposta — ENERYETU Solutions</h2>
				<table style="border-collapse:collapse;width:100%;max-width:600px">
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Nome</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Empresa</td><td style="padding:8px;border:1px solid #ddd">${companyLine}</td></tr>
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Telefone</td><td style="padding:8px;border:1px solid #ddd">${phoneLine}</td></tr>
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Serviço</td><td style="padding:8px;border:1px solid #ddd">${serviceLine}</td></tr>
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Local / Prazo</td><td style="padding:8px;border:1px solid #ddd">${deadlineLine}</td></tr>
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Mensagem</td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
				</table>
			`,
		});

		return okMessage('Pedido enviado com sucesso');
	} catch (error) {
		return handleError(error);
	}
}
