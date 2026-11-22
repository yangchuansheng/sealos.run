// Controlled endpoints for the invite landing page. Visitors can never override
// these targets (the fixed console path only receives the invite code as a
// whitelisted query parameter), so open redirects are impossible by construction.
const CHINA_CONSOLE_BASE_URL = 'https://bja.sealos.run';

// Same alphabet the cloud backend uses for invite codes (no 0/O/1/I/L).
const INVITE_CODE_PATTERN = /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{8}$/;

export const isPlausibleInviteCode = (code: string) => INVITE_CODE_PATTERN.test(code);

// Read-only preview endpoint (no accept side effects). The cloud deployment
// provides it; until then the page degrades gracefully without inviter info.
export const consoleInvitePreviewUrl = (code: string) =>
	`${CHINA_CONSOLE_BASE_URL}/api/platform/invite/preview?code=${encodeURIComponent(code)}`;
