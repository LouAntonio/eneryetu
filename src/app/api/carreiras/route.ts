import type { NextRequest } from 'next/server';
import { sendMail, type MailAttachment } from '@/server/mailer';
import { DOCUMENT_EXTENSIONS, extensionOf } from '@/server/cloudinary';
import { okMessage, fail, handleError } from '@/server/http';

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const get = (key: string) => {
			const value = formData.get(key);
			return typeof value === 'string' ? value : '';
		};

		const nome = get('nome');
		const email = get('email');
		const telefone = get('telefone');
		const area = get('area');
		const linkedin = get('linkedin');
		const mensagem = get('mensagem');

		if (!nome || !email || !telefone || !area || !mensagem) {
			return fail(400, 'Nome, email, telefone, área de interesse e mensagem são obrigatórios');
		}

		let cvName: string | null = null;
		const attachments: MailAttachment[] = [];

		const cvEntry = formData.get('curriculum');
		if (cvEntry instanceof File && cvEntry.size > 0) {
			if (!DOCUMENT_EXTENSIONS.includes(extensionOf(cvEntry.name))) {
				return fail(400, 'Formato de documento não suportado. Use: pdf, doc, docx');
			}
			if (cvEntry.size > 5 * 1024 * 1024) {
				return fail(400, 'Ficheiro demasiado grande');
			}
			cvName = cvEntry.name;
			const buffer = Buffer.from(await cvEntry.arrayBuffer());
			attachments.push({
				filename: cvEntry.name,
				content: buffer.toString('base64'),
			});
		}

		await sendMail({
			subject: `Candidatura via site — ${nome}`,
			html: `
				<h2>Candidatura espontânea — EnerYetu</h2>
				<table style="border-collapse:collapse;width:100%;max-width:600px">
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Nome</td><td style="padding:8px;border:1px solid #ddd">${nome}</td></tr>
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
					${telefone ? `<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Telefone</td><td style="padding:8px;border:1px solid #ddd">${telefone}</td></tr>` : ''}
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Área de interesse</td><td style="padding:8px;border:1px solid #ddd">${area}</td></tr>
					${linkedin ? `<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">LinkedIn / Portfólio</td><td style="padding:8px;border:1px solid #ddd">${linkedin}</td></tr>` : ''}
					<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Mensagem</td><td style="padding:8px;border:1px solid #ddd">${mensagem}</td></tr>
					${cvName ? `<tr><td style="padding:8px;font-weight:700;border:1px solid #ddd">Curriculum</td><td style="padding:8px;border:1px solid #ddd">${cvName}</td></tr>` : ''}
				</table>
			`,
			attachments: attachments.length > 0 ? attachments : undefined,
		});

		return okMessage('Candidatura enviada com sucesso');
	} catch (error) {
		return handleError(error);
	}
}
