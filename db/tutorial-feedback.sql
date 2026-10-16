CREATE TABLE IF NOT EXISTS tutorial_feedback (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	tutorial_slug TEXT NOT NULL,
	tutorial_title TEXT NOT NULL,
	tutorial_category TEXT,
	page_url TEXT,
	feedback_type TEXT NOT NULL DEFAULT 'suggestion',
	name TEXT,
	email TEXT,
	message TEXT NOT NULL,
	referer TEXT,
	user_agent TEXT,
	ip_address TEXT
);

CREATE INDEX IF NOT EXISTS idx_tutorial_feedback_created_at
	ON tutorial_feedback(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_tutorial_feedback_tutorial_slug
	ON tutorial_feedback(tutorial_slug);

CREATE INDEX IF NOT EXISTS idx_tutorial_feedback_feedback_type
	ON tutorial_feedback(feedback_type);
