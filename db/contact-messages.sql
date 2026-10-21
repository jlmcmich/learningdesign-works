CREATE TABLE IF NOT EXISTS contact_messages (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	organization TEXT,
	message TEXT NOT NULL,
	emailed INTEGER NOT NULL DEFAULT 0,
	page_url TEXT,
	user_agent TEXT,
	ip_address TEXT
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
	ON contact_messages(created_at DESC);
