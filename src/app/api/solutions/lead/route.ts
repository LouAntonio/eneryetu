import type { NextRequest } from 'next/server';
import { sendMail } from '@/server/mailer';
import { okMessage, fail, readJson, handleError } from '@/server/http';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
	try {
		const body = await readJson(req);
		const name = String(body.name ?? '').trim();
		const company = String(body.company ?? '').trim();
		const email = String(body.email ?? '').trim();
		const phone = String(body.phone ?? '').trim();
		const service = String(body.service ?? '').trim();
		const deadline = String(body.deadline ?? '').trim();
		const message = String(body.message ?? '').trim();

		if (!name || !email || !message) {
			return fail(400, 'Nome, email e mensagem são obrigatórios');
		}
		if (!EMAIL_RE.test(email)) {
			return fail(400, 'Email inválido');
		}

		const subject = `[Solutions] Nova lead — ${name}${company ? ` / ${company}` : ''}`;

		const safe = (value: string) =>
			value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

		const html = `
			<h2 style="font-family:system-ui;margin:0 0 16px">Nova lead — ENERYETU Solutions</h2>
			<p style="font-family:system-ui;color:#555;margin:0 0 16px">Submissão recebida a partir do formulário de proposta da landing /eneryetu-solutions.</p>
			<table style="border-collapse:collapse;width:100%;max-width:640px;font-family:system-ui;font-size:14px">
				<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd;background:#f6f6f6">Nome</td><td style="padding:8px;border:1px solid #ddd">${safe(name)}</td></tr>
				${company ? `<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd;background:#f6f6f6">Empresa</td><td style="padding:8px;border:1px solid #ddd">${safe(company)}</td></tr>` : ''}
				<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd;background:#f6f6f6">Email</td><td style="padding:8px;border:1px solid #ddd">${safe(email)}</td></tr>
				${phone ? `<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd;background:#f6f6f6">Telefone</td><td style="padding:8px;border:1px solid #ddd">${safe(phone)}</td></tr>` : ''}
				${service ? `<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd;background:#f6f6f6">Serviço</td><td style="padding:8px;border:1px solid #ddd">${safe(service)}</td></tr>` : ''}
				${deadline ? `<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd;background:#f6f6f6">Local/Prazo</td><td style="padding:8px;border:1px solid #ddd">${safe(deadline)}</td></tr>` : ''}
				<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd;background:#f6f6f6;vertical-align:top">Mensagem</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${safe(message)}</td></tr>
			</table>
		`;

		const text = [
			'Nova lead — ENERYETU Solutions',
			'',
			`Nome: ${name}`,
			company ? `Empresa: ${company}` : null,
			`Email: ${email}`,
			phone ? `Telefone: ${phone}` : null,
			service ? `Serviço: ${service}` : null,
			deadline ? `Local/Prazo: ${deadline}` : null,
			'',
			'Mensagem:',
			message,
		]
			.filter(Boolean)
			.join('\n');

		await sendMail({ subject, html, text });

		return okMessage('Pedido enviado com sucesso');
	} catch (error) {
		return handleError(error);
	}
}

export function GET() {
	return fail(405, 'Método não permitido');
}
