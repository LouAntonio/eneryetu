import type { NextRequest } from 'next/server';
import { sendMail } from '@/server/mailer';
import { okMessage, fail, readJson, handleError } from '@/server/http';

export async function POST(req: NextRequest) {
	try {
		const { name, email, phone, subject, message } = await readJson(req);

		if (!name || !email || !phone || !message) {
			return fail(400, 'Nome, email, telefone e mensagem são obrigatórios');
		}

		await sendMail({
			subject: `Contacto via site — ${name}`,
			html: `
				<h2>Contacto via site</h2>
				<table style="border-collapse:collapse;width:100%;max-width:600px">
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Nome</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
					${phone ? `<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Telefone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>` : ''}
					${subject ? `<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Assunto</td><td style="padding:8px;border:1px solid #ddd">${subject}</td></tr>` : ''}
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Mensagem</td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
				</table>
			`,
		});

		return okMessage('Mensagem enviada com sucesso');
	} catch (error) {
		return handleError(error);
	}
}
