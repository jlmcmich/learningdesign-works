const json = (data, init = {}) =>
	new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': 'no-store',
		},
		...init,
	});

const badRequest = (message, status = 400) => json({ ok: false, error: message }, { status });

const normalize = (value) => (typeof value === 'string' ? value.trim() : '');

// For single-line fields: collapse any line breaks or runs of whitespace.
const singleLine = (value) => normalize(value).replace(/\s+/g, ' ');

// Checkbox values from ContactForm.astro, and how they read in the saved message and email.
const INTERESTS = {
	walkthrough: 'A 30-minute walkthrough',
	workshop: 'A sandbox workshop',
	'run-it-yourselves': 'Running it yourselves',
	talk: 'A talk',
	curious: 'Just curious',
};

const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export async function onRequestPost(context) {
	const contentType = context.request.headers.get('content-type') || '';
	if (!contentType.includes('form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
		return badRequest('Unsupported form submission.');
	}

	const formData = await context.request.formData();
	const name = singleLine(formData.get('name'));
	const email = normalize(formData.get('email'));
	const organization = singleLine(formData.get('organization'));
	const note = normalize(formData.get('message'));
	const interests = formData
		.getAll('interests')
		.map((value) => INTERESTS[normalize(value)])
		.filter(Boolean);
	const pageUrl = normalize(formData.get('pageUrl'));
	const honeypot = normalize(formData.get('website'));

	if (honeypot) {
		return json({ ok: true });
	}

	if (!name) return badRequest('Please add your name.');
	if (!EMAIL_PATTERN.test(email)) return badRequest('Please add an email address I can reply to.');
	if (!note && !interests.length) return badRequest('Please add a message or pick what you are interested in.');
	if (note.length > 4000) return badRequest('Please keep your message under 4000 characters.');
	if (name.length > 200 || email.length > 320 || organization.length > 200) {
		return badRequest('One of the fields is too long.');
	}

	// Interests ride along at the top of the message, so storage and the mailer stay unchanged.
	const message = [interests.length ? `Interested in: ${interests.join(', ')}` : '', note].filter(Boolean).join('\n\n');

	const db = context.env.FEEDBACK_DB;
	const mailer = context.env.CONTACT_MAILER;
	if (!db || !mailer) {
		return badRequest('The contact form is not configured yet.', 500);
	}

	const ipAddress = context.request.headers.get('cf-connecting-ip') || '';
	const userAgent = context.request.headers.get('user-agent') || '';

	const saved = await db
		.prepare(
			`INSERT INTO contact_messages (name, email, organization, message, page_url, user_agent, ip_address)
			VALUES (?, ?, ?, ?, ?, ?, ?)`
		)
		.bind(name, email, organization || null, message, pageUrl || null, userAgent || null, ipAddress || null)
		.run();

	// The message is saved either way, so a mail failure is logged rather than shown as an error.
	try {
		const response = await mailer.fetch('https://contact-mailer/send', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ name, email, organization, message, pageUrl }),
		});
		if (!response.ok) throw new Error(`Mailer returned ${response.status}: ${await response.text()}`);
		await db.prepare('UPDATE contact_messages SET emailed = 1 WHERE id = ?').bind(saved.meta.last_row_id).run();
	} catch (error) {
		console.error('Contact email failed', error);
	}

	return json({ ok: true });
}

export async function onRequestGet(context) {
	const token = new URL(context.request.url).searchParams.get('token');
	if (!token || token !== context.env.FEEDBACK_ADMIN_TOKEN) {
		return badRequest('Unauthorized.', 401);
	}

	const db = context.env.FEEDBACK_DB;
	if (!db) {
		return badRequest('Storage is not configured yet.', 500);
	}

	const results = await db
		.prepare(
			`SELECT id, created_at, name, email, organization, message, emailed, page_url
			FROM contact_messages
			ORDER BY created_at DESC
			LIMIT 250`
		)
		.all();

	return json({ ok: true, messages: results.results ?? [] });
}
