import { EmailMessage } from 'cloudflare:email';

const FROM = 'contact@learningdesign.works';
const FROM_NAME = 'learningdesign.works contact form';

// Header values come from form input, so strip anything that could start a new header.
const headerSafe = (value) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim();

const encodeHeader = (value) => {
	const safe = headerSafe(value);
	return /^[\x20-\x7e]*$/.test(safe)
		? safe
		: `=?UTF-8?B?${btoa(String.fromCharCode(...new TextEncoder().encode(safe)))}?=`;
};

// Display names go in quotes so characters like ':' or '@' can't be read as address syntax.
const quotedName = (value) => {
	const safe = headerSafe(value).replace(/["\\]/g, '');
	return /^[\x20-\x7e]*$/.test(safe) ? `"${safe}"` : encodeHeader(safe);
};

const base64Lines = (text) => {
	const bytes = new TextEncoder().encode(text);
	let binary = '';
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary).replace(/.{1,76}/g, '$&\r\n');
};

export default {
	async fetch(request, env) {
		if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
		if (!env.CONTACT_TO) return new Response('CONTACT_TO is not set', { status: 500 });

		const { name, email, organization, message, pageUrl } = await request.json();
		const subject = `Website message from ${headerSafe(name)}${organization ? ` (${headerSafe(organization)})` : ''}`;
		const body = [
			`Name: ${name}`,
			`Email: ${email}`,
			organization ? `Campus or organization: ${organization}` : null,
			pageUrl ? `Sent from: ${pageUrl}` : null,
			'',
			message,
			'',
			'Reply to this email to answer them directly.',
		]
			.filter((line) => line !== null)
			.join('\r\n');

		const raw = [
			`From: ${FROM_NAME} <${FROM}>`,
			`To: <${env.CONTACT_TO}>`,
			`Reply-To: ${quotedName(name)} <${headerSafe(email)}>`,
			`Subject: ${encodeHeader(subject)}`,
			`Date: ${new Date().toUTCString()}`,
			`Message-ID: <${crypto.randomUUID()}@learningdesign.works>`,
			'MIME-Version: 1.0',
			'Content-Type: text/plain; charset=UTF-8',
			'Content-Transfer-Encoding: base64',
			'',
			base64Lines(body),
		].join('\r\n');

		await env.SEND_EMAIL.send(new EmailMessage(FROM, env.CONTACT_TO, raw));
		return Response.json({ ok: true });
	},
};
