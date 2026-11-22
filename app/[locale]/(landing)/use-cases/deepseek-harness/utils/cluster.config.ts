import { calculateTierCost, formatCny } from '@/libs/pricing/deepseek-harness';
import {
	GEO_DEFINITION_BLOCK,
	HUB_CANONICAL_URL,
	ORGANIZATION_SAME_AS,
	SITE_NAME,
	SITE_URL,
	USE_CASES_PATH,
} from '@/libs/seo/deepseek-harness';

const astrbotBasicBja = calculateTierCost('astrbot-basic', 'bja');

export const HUB_META = {
	title: 'DeepSeek 大肥鱼 & DeepSeek Harness 云端部署指南 — 24 小时在线不失忆 | Sealos',
	description: `用 Sealos Desktop 5 分钟一键部署 AstrBot / MaiBot 与大肥鱼长期记忆库，电脑关机 QQ 照样 24 小时在线，北京区基础托管低至 ${formatCny(astrbotBasicBja.dailyAverage)}/天，首登实名领 ¥10 体验金，还能 1 分钟上线专属《大肥鱼观察日记》网页。`,
	h1: '给你的大肥鱼一个 24 小时在线的云端小窝',
	lead: '面向 DeepSeek Harness（DSH）、AstrBot 与 MaiBot 玩家的零运维云端部署方案——用自然语言指挥 Sealos Desktop 内置 Agent，5 分钟完成应用、QQ 桥接与持久化存储上线。',
	datePublished: '2026-11-19',
	dateModified: '2026-11-19',
} as const;

export const REWARD_BADGE_TEXT = '首登实名领 ¥10 体验金 · 邀友各得 ¥5';
export const INVITE_ACTIVE_TEXT = '好友邀请已生效 · 首登合计可领 ¥15';
export const HERO_LEAD = '电脑关机也在线，重启不失忆。用 Sealos Desktop 一键托管 AstrBot / MaiBot，5 分钟上线。';
export const INDEPENDENT_DISCLAIMER = '本页面为开源社区生态云端部署方案，独立于 DeepSeek 官方。';

export interface PainPointItem {
	id: 'env-errors' | 'offline-disconnect' | 'memory-loss' | 'share-diary';
	painTitle: string;
	metric: string;
}

export const PAIN_POINTS: readonly PainPointItem[] = [
	{ id: 'env-errors', painTitle: '本地装 Node / Docker 反复报错', metric: '5 分钟零命令上线' },
	{ id: 'offline-disconnect', painTitle: '电脑关机断联、旧手机杀进程', metric: '7×24h 云端常驻' },
	{ id: 'memory-loss', painTitle: '上下文压缩失忆', metric: '跨重启不丢记忆' },
	{ id: 'share-diary', painTitle: '晒日记没有公网链接', metric: '自动 HTTPS 域名' },
] as const;

export interface DeployStepItem {
	stepNumber: string;
	duration: string;
	name: string;
	summary: string;
}

export const DEEPSEEK_HARNESS_STEPS: readonly DeployStepItem[] = [
	{
		stepNumber: '01',
		duration: '1 分钟',
		name: '一键部署 AstrBot 或 MaiBot 官方模板',
		summary:
			'打开 Sealos Desktop，在「模板」入口选择已上架的 AstrBot（v4.29.4）或 MaiBot（v1.4.5），设置 8 位含大小写与数字的初始密码并点击 Deploy，自动获得 PublicAccess 公网 HTTPS 控制台与持久化数据卷。',
	},
	{
		stepNumber: '02',
		duration: '2 分钟',
		name: '让 Agent 同画布追加 NapCat 与数据库',
		summary:
			'在右侧 Agent 对话框直接用中文提出需求（追加 NapCat 连接 QQ、配置 DeepSeek API 与人设作息，或挂载托管 PostgreSQL 数据库），检查批准卡（Deploy Plan）规格与按量单价后点击确认。',
	},
	{
		stepNumber: '03',
		duration: '2 分钟',
		name: '画布全绿后填入 DeepSeek API Key',
		summary:
			'在 Project Canvas 看到 AstrBot、NapCat 与数据库 Service 全部变为绿色 Running，点击节点卡底部 PublicAccess 域名进入控制台填入 DeepSeek API Key 与人格提示词，关掉电脑照样全天候在线。',
	},
] as const;

export interface AgentPromptCard {
	id: string;
	title: string;
	prompt: string;
}

export const AGENT_PROMPTS: readonly AgentPromptCard[] = [
	{
		id: 'qq-standard',
		title: '接入 QQ',
		prompt: '帮我在当前项目的 AstrBot 同画布里追加一个 NapCat 容器，用内网地址和 AstrBot 6185 端口联通，给它配 0.2 核 512Mi 内存和 1Gi 持久化目录，先出 Deploy Plan 给我确认。',
	},
	{
		id: 'long-memory',
		title: '长期记忆',
		prompt: '帮我给当前大肥鱼项目挂载一个轻量 PostgreSQL 数据库（0.5 核 1G 内存、仅内网访问）并开启每日自动备份，把连接串整理出来。',
	},
	{
		id: 'diary-deploy',
		title: '上线观察日记',
		prompt: '把我本地这个大肥鱼观察日记 HTML 文件夹直接部署上线，给我一个可公开访问的 HTTPS 域名链接。',
	},
] as const;

export interface ComparisonRow {
	dimension: string;
	localPc: string;
	oldAndroid: string;
	traditionalVps: string;
	sealos: string;
}

export const COMPARISON_ROWS: readonly ComparisonRow[] = [
	{
		dimension: '24 小时在线',
		localPc: '关机/休眠即断联',
		oldAndroid: '易发热、后台被杀进程',
		traditionalVps: '稳定',
		sealos: '健康探针自愈，24 小时常驻',
	},
	{
		dimension: '部署门槛',
		localPc: '手装 Node / Docker / 端口',
		oldAndroid: '折腾 Termux / 容器环境',
		traditionalVps: 'SSH、防火墙、Nginx、SSL',
		sealos: '官方模板 + Agent 对话，自动 HTTPS',
	},
	{
		dimension: '记忆防丢',
		localPc: '本地磁盘手动备份',
		oldAndroid: '清缓存或崩溃即丢失',
		traditionalVps: '自建数据库与备份脚本',
		sealos: '持久卷 + 托管库自动备份',
	},
	{
		dimension: '月成本（不含 API）',
		localPc: '电费 ¥15–¥30 + 硬件损耗',
		oldAndroid: '电池损耗与断电风险',
		traditionalVps: '¥30–¥60 固定包月',
		sealos: `按量付费，起步约 ${formatCny(astrbotBasicBja.monthlyTotal)}`,
	},
	{
		dimension: '公网分享',
		localPc: '无公网 IP，需内网穿透',
		oldAndroid: '难以对外暴露',
		traditionalVps: '自配域名、备案与反代',
		sealos: '拖入目录即得 HTTPS 链接',
	},
] as const;

const liveDiaryDemoUrl = process.env['NEXT_PUBLIC_DAFEIYU_DIARY_DEMO_URL']?.trim() || null;
const liveDiaryRepoUrl = process.env['NEXT_PUBLIC_DAFEIYU_DIARY_REPO_URL']?.trim() || null;

function extractHost(url: string): string {
	try {
		return new URL(url).host;
	} catch {
		return url;
	}
}

export const DIARY_DEMO_CONFIG = {
	isLiveDemo: Boolean(liveDiaryDemoUrl),
	demoUrl: liveDiaryDemoUrl ?? '/blog/deepseek-whale-persona-diary-template',
	demoCtaLabel: liveDiaryDemoUrl ? '打开演示站' : '模板与部署教程',
	githubUrl: liveDiaryRepoUrl,
	publicHost: liveDiaryDemoUrl ? extractHost(liveDiaryDemoUrl) : 'dafeiyu-diary.sealosbja.site',
	initialRiceCount: 128,
	letterExcerpt:
		'昨晚两点你合上电脑后我还在云端小窝里值班。今天一共吃了 128 口白饭，把你上次吐槽的期末复习清单存进了 PostgreSQL 长期记忆里，放心吧，明天不会停在那个夏天。',
	inviteUrlExample: 'https://sealos.run/use-cases/deepseek-harness?invite=你的邀请码',
} as const;

export interface GeneralCapabilityItem {
	title: string;
	href: string;
	iconKey: 'launchpad' | 'database' | 'appstore' | 'aiproxy';
}

export const GENERAL_CAPABILITIES: readonly GeneralCapabilityItem[] = [
	{ title: '云部署平台', href: '/products/launchpad', iconKey: 'launchpad' },
	{ title: '托管数据库', href: '/products/database', iconKey: 'database' },
	{ title: '应用商店', href: '/products/appstore', iconKey: 'appstore' },
	{ title: 'AI Gateway', href: '/products/aiproxy', iconKey: 'aiproxy' },
] as const;

export const TRUST_ENDORSEMENTS = ['8 年开源', '18.4k+ Stars', '等保三级', '30 万+ 用户'] as const;

export interface FaqItem {
	question: string;
	answer: string;
}

export const DEEPSEEK_HARNESS_FAQS: readonly FaqItem[] = [
	{
		question: '用 Sealos 云端部署大肥鱼，电脑关机后 QQ 还能正常回复吗？',
		answer: '可以。Sealos Desktop 负责把 AstrBot、NapCat 与数据库编排部署到云端 Kubernetes 集群并作为常驻 Service 运行。上线完成后，即使关掉 macOS 或 Windows 电脑、合上笔记本，云端实例依然 24 小时在线响应 QQ 消息。',
	},
	{
		question: '一个月大概花多少钱？首登送的 ¥10 体验金能用多久？',
		answer: '按量付费扣减跨 Region 共享的 Balance，页面展示「容器算力 + 存储」与「公网端口（PublicAccess）」两项明细。按全站单价表 720 小时公式核算，北京可用区（bja）AstrBot 基础常驻约 ¥9.76/月（¥0.33/天），首登实名赠送的 ¥10 永久有效体验金约可覆盖 30 天；追加内网 NapCat 后约 ¥15.71/月（¥0.52/天），约可覆盖 19 天，邀请 2 位好友再各得 ¥5 即可扩展至约 38 天。',
	},
	{
		question: '部署的大肥鱼会像普通聊天一样「失忆」吗？',
		answer: '官方 AstrBot（v4.29.4）与 MaiBot（v1.4.5）模板均默认挂载持久化数据卷（/AstrBot/data 或 /MaiMBot/host），重启或升级版本不会清空本地配置与 SQLite 历史。若需要跨月长期记忆与多模态观察日记，可直接让内置 Agent 在同 Canvas 挂载内网托管 PostgreSQL / Redis 并开启每日自动备份。',
	},
	{
		question: 'AstrBot、MaiBot 和本地 DeepSeek Harness（DSH）有什么区别，该选哪一个？',
		answer: '本地 DeepSeek Harness（DSH）偏向桌面脚本与本地自动化探索，依赖本机开机；AstrBot（v4.29.4）是成熟的多平台聊天机器人框架，自带 WebUI、插件市场、知识库与定时任务，适合 24 小时 QQ / 网页多端托管；MaiBot（v1.4.5）主打多 Bot 工作区与沉浸式数字伴侣人格。新手首选 AstrBot，偏爱多角色陪伴可选 MaiBot，两者均已在 Sealos 模板库就绪。',
	},
	{
		question: '完全不懂 Docker 和 Linux 命令，也能 5 分钟部署成功吗？',
		answer: '可以。第一步只需在 Sealos Desktop 模板界面填写初始密码并点击部署；第二步在右侧 Agent 对话框复制本页中文指令即可生成 NapCat 或数据库方案，你只需核对批准卡（Deploy Plan）里的规格与价格并点击确认，全程免手写 YAML、免配置 Nginx 与 SSL 证书。',
	},
	{
		question: '需要自己准备 DeepSeek API Key 吗？「白饭钱」和 Sealos 算力费怎么分别计费？',
		answer: '需要自行准备 DeepSeek 官方 API Key 或接入兼容的 AI Gateway 密钥。Sealos 仅按量收取云端容器算力、持久卷与 PublicAccess 公网端口费用；大模型对话消耗的 Token（「白饭钱」）由你的大模型 API 账户单独结算，两者账单完全独立、互不捆绑。',
	},
	{
		question: '接入个人 QQ 或使用 DSH 刷 B 站时如何避免触发 412/429 风控？',
		answer: '建议优先使用 AstrBot 内置 WebUI 或 QQ 官方机器人渠道以获得更稳健的合规体验；若通过 NapCat 接入个人 QQ，请控制单群回复冷却间隔（建议 ≥ 15–30 秒）、关闭无意义刷屏并配置夜间作息窗口。针对 DSH 等研究型脚本，务必设置严格的读写预算上限与退避重试间隔，避免高频请求触发平台 412/429 限流。',
	},
	{
		question: '如何把我部署的《大肥鱼观察日记》分享到 QQ 群并触发双方各 ¥5 的邀请奖励？',
		answer: '下载开源《大肥鱼观察日记》HTML 模板，将页脚「领养同款」链接里的邀请码替换为你的 8 位 Sealos 专属邀请码（例如 https://sealos.run/use-cases/deepseek-harness?invite=你的邀请码），再把文件夹拖入 Sealos Desktop 上线获取公网 HTTPS 链接发到群里。好友点击后经 /invite/<code> 注册实名并首登桌面端，双方均可获得 ¥5 云资源余额奖励。',
	},
] as const;

export function buildDeepseekHarnessJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${SITE_URL}/#organization`,
				name: SITE_NAME,
				url: SITE_URL,
				logo: `${SITE_URL}/favicon/favicon-96x96.png`,
				sameAs: [...ORGANIZATION_SAME_AS],
			},
			{
				'@type': 'WebPage',
				'@id': `${HUB_CANONICAL_URL}#webpage`,
				url: HUB_CANONICAL_URL,
				name: HUB_META.title,
				description: HUB_META.description,
				inLanguage: 'zh-CN',
				datePublished: HUB_META.datePublished,
				dateModified: HUB_META.dateModified,
				isPartOf: { '@id': `${SITE_URL}/#website` },
				about: { '@id': `${SITE_URL}/#organization` },
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${HUB_CANONICAL_URL}#breadcrumb`,
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: '首页',
						item: SITE_URL,
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: '使用场景',
						item: `${SITE_URL}${USE_CASES_PATH}`,
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: 'DeepSeek Harness / 大肥鱼云端部署',
						item: HUB_CANONICAL_URL,
					},
				],
			},
			{
				'@type': 'SoftwareApplication',
				'@id': `${HUB_CANONICAL_URL}#software`,
				name: 'Sealos Desktop',
				operatingSystem: 'macOS, Windows',
				applicationCategory: 'DeveloperApplication',
				url: `${SITE_URL}/downloads`,
				description:
					'Sealos Desktop 是内置云端部署 Agent 的桌面客户端，支持模板一键部署 AstrBot / MaiBot、同 Canvas 编排容器与托管数据库，并实现 24 小时云端托管。',
				offers: {
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'CNY',
					description: '免费下载，首登实名即领 ¥10 体验金（永久有效），邀请好友双方各得 ¥5',
				},
				publisher: { '@id': `${SITE_URL}/#organization` },
			},
			{
				'@type': 'HowTo',
				'@id': `${HUB_CANONICAL_URL}#howto`,
				name: '5 分钟用 Sealos Desktop 云端部署 DeepSeek 大肥鱼（AstrBot + NapCat）',
				description: GEO_DEFINITION_BLOCK,
				totalTime: 'PT5M',
				step: DEEPSEEK_HARNESS_STEPS.map((step, index) => ({
					'@type': 'HowToStep',
					position: index + 1,
					name: step.name,
					text: step.summary,
				})),
			},
			{
				'@type': 'FAQPage',
				'@id': `${HUB_CANONICAL_URL}#faq`,
				mainEntity: DEEPSEEK_HARNESS_FAQS.map((faq) => ({
					'@type': 'Question',
					name: faq.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: faq.answer,
					},
				})),
			},
		],
	};
}
