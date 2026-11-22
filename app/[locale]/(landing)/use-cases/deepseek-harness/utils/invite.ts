import { isPlausibleInviteCode } from '@/app/[locale]/(invite)/invite/[code]/utils/invite.config';
import { HUB_CANONICAL_URL } from '@/libs/seo/deepseek-harness';

export function parseValidInviteCode(raw: string | string[] | undefined): string | null {
	const candidate = Array.isArray(raw) ? raw[0] : raw;
	if (typeof candidate !== 'string') {
		return null;
	}
	const trimmed = candidate.trim();
	return isPlausibleInviteCode(trimmed) ? trimmed : null;
}

export function buildInviteHandoffHref(raw: string | string[] | undefined): string | null {
	const validCode = parseValidInviteCode(raw);
	return validCode ? `/invite/${encodeURIComponent(validCode)}` : null;
}

export function buildShareCopyPayload(raw: string | string[] | undefined): string {
	const validCode = parseValidInviteCode(raw);
	const targetUrl = validCode ? `${HUB_CANONICAL_URL}?invite=${encodeURIComponent(validCode)}` : HUB_CANONICAL_URL;

	return [
		`Sealos Desktop 云端养大肥鱼 5 分钟部署入口：${targetUrl}`,
		'电脑端（macOS / Windows）打开后：',
		'1. 下载并登录 Sealos Desktop，首登实名领 ¥10 体验金；',
		'2. 模板一键部署 AstrBot（v4.29.4）或 MaiBot（v1.4.5）；',
		'3. 对话指令让内置 Agent 同画布追加 NapCat 与托管数据库，关机 24 小时在线。',
	].join('\n');
}
