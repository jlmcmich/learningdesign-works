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

export async function onRequestPost(context) {
	const contentType = context.request.headers.get('content-type') || '';
	if (!contentType.includes('form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
		return badRequest('Unsupported form submission.');
	}

	const formData = await context.request.formData();
	const message = normalize(formData.get('message'));
	const tutorialSlug = normalize(formData.get('tutorialSlug'));
	const tutorialTitle = normalize(formData.get('tutorialTitle'));
	const tutorialCategory = normalize(formData.get('tutorialCategory'));
	const pageUrl = normalize(formData.get('pageUrl'));
	const name = normalize(formData.get('name'));
	const email = normalize(formData.get('email'));
	const feedbackType = normalize(formData.get('feedbackType')) || 'suggestion';
	const honeypot = normalize(formData.get('organization'));

	if (honeypot) {
		return json({ ok: true });
	}

	if (!message) return badRequest('Please add a message.');
	if (!tutorialSlug || !tutorialTitle) return badRequest('Missing tutorial information.');
	if (message.length > 4000) return badRequest('Please keep feedback under 4000 characters.');
	if (name.length > 200 || email.length > 320) return badRequest('One of the fields is too long.');

	const db = context.env.FEEDBACK_DB;
	if (!db) {
		return badRequest('Feedback storage is not configured yet.', 500);
	}

	const ipAddress =
		context.request.headers.get('cf-connecting-ip') ||
		context.request.headers.get('x-forwarded-for') ||
		'';
	const userAgent = context.request.headers.get('user-agent') || '';
	const referer = context.request.headers.get('referer') || '';

	await db
		.prepare(
			`INSERT INTO tutorial_feedback (
				tutorial_slug,
				tutorial_title,
				tutorial_category,
				page_url,
				feedback_type,
				name,
				email,
				message,
				referer,
				user_agent,
				ip_address
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		)
		.bind(
			tutorialSlug,
			tutorialTitle,
			tutorialCategory,
			pageUrl,
			feedbackType,
			name || null,
			email || null,
			message,
			referer || null,
			userAgent || null,
			ipAddress || null
		)
		.run();

	return json({ ok: true });
}

export async function onRequestGet(context) {
	const token = new URL(context.request.url).searchParams.get('token');
	if (!token || token !== context.env.FEEDBACK_ADMIN_TOKEN) {
		return badRequest('Unauthorized.', 401);
	}

	const db = context.env.FEEDBACK_DB;
	if (!db) {
		return badRequest('Feedback storage is not configured yet.', 500);
	}

	const results = await db
		.prepare(
			`SELECT
				id,
				created_at,
				tutorial_slug,
				tutorial_title,
				tutorial_category,
				feedback_type,
				name,
				email,
				message,
				page_url
			FROM tutorial_feedback
			ORDER BY created_at DESC
			LIMIT 250`
		)
		.all();

	return json({ ok: true, submissions: results.results ?? [] });
}
