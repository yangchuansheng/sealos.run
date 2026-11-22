export const SITE_URL = 'https://sealos.run';
export const SITE_NAME = 'Sealos';
export const USE_CASES_PATH = '/use-cases';
export const HUB_PATH = '/use-cases/deepseek-harness';
export const HUB_CANONICAL_URL = `${SITE_URL}${HUB_PATH}`;

export const ORGANIZATION_SAME_AS = [
	'https://github.com/labring/sealos',
	'https://space.bilibili.com/1803388873',
	'https://mp.weixin.qq.com/s/kDOR9YmlpwRByYBhSH_bQA',
] as const;

export const GEO_DEFINITION_BLOCK =
	'通过 Sealos Desktop 部署 DeepSeek 大肥鱼，可一键拉起已预置的 AstrBot（v4.29.4）或 MaiBot（v1.4.5）官方持久化模板，并由内置 Agent 在同画布追加 NapCat 与托管数据库，实现电脑关机后 24 小时在线、跨重启保留记忆。';

export const DAFEIYU_TEMPLATE_SLUGS = ['astrbot', 'maibot'] as const;

export function isDafeiyuTemplateSlug(slug: string): boolean {
	const normalized = slug.toLowerCase();
	return DAFEIYU_TEMPLATE_SLUGS.some((item) => item === normalized);
}

export interface SpokeArticleMeta {
	slug: string;
	url: string;
	stage: string;
	shortLabel: string;
	title: string;
	seoTitle: string;
	summary: string;
	keywords: readonly string[];
	readingTime: number;
}

export const SPOKE_ARTICLES: readonly SpokeArticleMeta[] = [
	{
		slug: 'deepseek-harness-blue-whale-guide',
		url: '/blog/deepseek-harness-blue-whale-guide',
		stage: '01 认知 · 实体百科',
		shortLabel: '01 实体百科与黑话',
		title: '大肥鱼是什么？DeepSeek 蓝色大肥鱼梗、鱼灾始末与 DSH 架构全解',
		seoTitle: '大肥鱼是什么？DeepSeek 蓝色大肥鱼梗、鱼灾始末、黑话词典与 DSH 架构全解',
		summary:
			'一站式梳理蓝色大肥鱼起源、白饭/偷米/停在了那个夏天黑话词典、DSH 生物钟原理，以及为何玩家正转向云端 QQ 24 小时陪伴。',
		keywords: ['蓝色大肥鱼', '鱼灾', 'DeepSeek Harness'],
		readingTime: 8,
	},
	{
		slug: 'deploy-deepseek-qq-bot-astrbot-napcat',
		url: '/blog/deploy-deepseek-qq-bot-astrbot-napcat',
		stage: '02 实操 · QQ 接入',
		shortLabel: '02 AstrBot + NapCat 接 QQ',
		title: '大肥鱼怎么接入 QQ？5 分钟用 Sealos Desktop 部署 AstrBot + NapCat',
		seoTitle: '大肥鱼怎么接入 QQ？免挂电脑 5 分钟用 Sealos Desktop 部署 AstrBot + NapCat 保姆级教程',
		summary:
			'完整保姆级实操：AstrBot v4.29.4 模板初始化、同 Canvas 追加 NapCat 联通 QQ、配置 DeepSeek API 及 MaiBot v1.4.5 备选路径。',
		keywords: ['AstrBot', 'NapCat', 'QQ 接入'],
		readingTime: 10,
	},
	{
		slug: 'deepseek-bot-memory-database-rate-limit',
		url: '/blog/deepseek-bot-memory-database-rate-limit',
		stage: '03 排障 · 记忆与风控',
		shortLabel: '03 防失忆与 412 风控',
		title: '大肥鱼失忆、偷米烧 Token、412 风控怎么办？长期记忆库与冷却参数指南',
		seoTitle: '大肥鱼失忆、偷米烧 Token、412 风控怎么办？长期记忆库与冷却参数安全配置指南',
		summary:
			'拆解上下文压缩失忆根因，用持久化卷 + 内网托管 PostgreSQL 防失忆，配合上下文截断、作息时间窗与 412/429 安全限流策略控预算。',
		keywords: ['大肥鱼失忆', 'PostgreSQL 记忆库', '412 风控'],
		readingTime: 9,
	},
	{
		slug: 'deepseek-bot-hosting-cost-comparison',
		url: '/blog/deepseek-bot-hosting-cost-comparison',
		stage: '04 对比 · 账单与选型',
		shortLabel: '04 托管账单与框架对比',
		title: '养大肥鱼一个月多少钱？本地电脑 vs 旧手机 vs 云服务器 vs Sealos 实测对比',
		seoTitle: '养大肥鱼一个月多少钱？本地电脑 vs 安卓旧手机 vs 云服务器 vs Sealos 云端实测对比',
		summary:
			'拆清云端算力费与 DeepSeek API 白饭钱，横评四种挂机方案与三大框架（DSH / AstrBot / MaiBot），给出北京/广东/杭州区四档透明明细。',
		keywords: ['养大肥鱼多少钱', 'AstrBot vs MaiBot', '按量付费'],
		readingTime: 8,
	},
	{
		slug: 'deepseek-whale-persona-diary-template',
		url: '/blog/deepseek-whale-persona-diary-template',
		stage: '05 资产 · 模板与裂变',
		shortLabel: '05 人设与观察日记模板',
		title: '大肥鱼人设提示词（persona.md）与《观察日记》晒鱼网页模板',
		seoTitle: '大肥鱼人设提示词（persona.md）与《观察日记》晒鱼网页模板：1 分钟生成公网 HTTPS 链接',
		summary:
			'提供傲娇女仆/治愈陪伴/学习搭子三套即拷即用 persona.md 模板，附《大肥鱼观察日记》静态源码 1 分钟上线与邀请码裂变配置。',
		keywords: ['persona.md', '大肥鱼观察日记', '晒鱼网页'],
		readingTime: 7,
	},
] as const;
