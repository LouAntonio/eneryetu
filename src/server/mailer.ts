import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend() {
	if (!resendClient) {
		resendClient = new Resend(process.env.RESEND_API_KEY);
	}
	return resendClient;
}

export interface MailAttachment {
	filename: string;
	content: string;
}

export interface SendMailOptions {
	to?: string;
	subject: string;
	html?: string;
	text?: string;
	from?: string;
	attachments?: MailAttachment[];
}

export async function sendMail({ to, subject, html, text, from, attachments }: SendMailOptions) {
	const fromAddress = from || process.env.MAIL_FROM_DEFAULT || 'noreply@eneryetu.co.ao';
	const toAddress = to || process.env.MAIL_TO_DEFAULT;

	if (!toAddress) {
		throw new Error('Destinatário não definido (to ou MAIL_TO_DEFAULT)');
	}

	const resend = getResend();
	const payload = {
		from: fromAddress,
		to: [toAddress],
		subject,
		...(html && { html }),
		...(text && { text }),
		...(attachments && { attachments }),
	};

	const { data, error } = await resend.emails.send(
		payload as Parameters<typeof resend.emails.send>[0],
	);

	if (error) {
		throw new Error(error.message);
	}

	return data;
}
