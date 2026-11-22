import { calculateTierCost, formatCny } from '@/libs/pricing/deepseek-harness';
import { HUB_PATH, SITE_URL, USE_CASES_PATH } from '@/libs/seo/deepseek-harness';

const astrbotBasicBja = calculateTierCost('astrbot-basic', 'bja');
const maibotCompanionBja = calculateTierCost('maibot-companion', 'bja');

export const USE_CASES_META = {
	title: 'Sealos 热门使用场景 — AI 伴侣、开源 Agent 与轻应用 5 分钟上线 | Sealos',
	description:
		'探索 Sealos Desktop 高频实战场景：DeepSeek 大肥鱼（AstrBot / MaiBot）24 小时云端托管、OpenClaw 云端部署、本地 HTML 轻应用一键公网分享与全栈带库上线。',
	h1: '用 Sealos Desktop 5 分钟上线高频云端场景',
	lead: '围绕 AI 伴侣、开源 Agent、个人工具与全栈带库项目，提供开箱即用的官方模板、自然语言同画布编排与按量付费托管方案。',
} as const;

export interface UseCaseCardItem {
	id: string;
	badge: string;
	title: string;
	description: string;
	href: string;
	ctaLabel: string;
	secondaryLink?: {
		href: string;
		label: string;
	};
	highlights: readonly string[];
	featured?: boolean;
}

export const USE_CASE_CARDS: readonly UseCaseCardItem[] = [
	{
		id: 'deepseek-harness',
		badge: '热门主推',
		title: 'DeepSeek 大肥鱼 & DeepSeek Harness 云端部署',
		description:
			'一键拉起官方 AstrBot（v4.29.4）或 MaiBot（v1.4.5）持久化模板，同 Canvas 追加 NapCat 与托管 PostgreSQL，电脑关机 QQ 照样 24 小时在线不失忆。',
		href: HUB_PATH,
		ctaLabel: '查看 24 小时云端部署方案',
		highlights: [`北京区起步约 ${formatCny(astrbotBasicBja.dailyAverage)}/天`, '首登实名领 ¥10', '含晒鱼日记模板'],
		featured: true,
	},
	{
		id: 'openclaw',
		badge: 'AI Agent',
		title: 'OpenClaw 私人 AI Agent 24 小时云端托管',
		description:
			'告别本机常开与网络受限，通过应用商店模板快速在云端拉起 OpenClaw 私人 Agent，自动配置 PublicAccess 公网 HTTPS 访问与持久卷。',
		href: '/products/appstore?q=openclaw#templates',
		ctaLabel: '查看应用商店 OpenClaw 模板',
		highlights: ['免写 YAML', '自动 HTTPS 域名', '按量付费随时启停'],
	},
	{
		id: 'maibot',
		badge: '数字伴侣',
		title: 'MaiBot 开源数字伴侣云端托管',
		description:
			'基于已上架的 MaiBot（v1.4.5）官方持久化模板，内置 2Gi 双持久卷与多 Bot 工作区，轻松对比 AstrBot 与 MaiBot 的成本与玩法边界。',
		href: `${HUB_PATH}#maibot`,
		ctaLabel: '查看 MaiBot 配置与对比',
		secondaryLink: {
			href: '/products/appstore?q=maibot#templates',
			label: '前往应用商店 MaiBot 模板',
		},
		highlights: ['v1.4.5 官方模板', '2Gi 持久化存储', `北京区约 ${formatCny(maibotCompanionBja.monthlyTotal)}/月`],
	},
	{
		id: 'local-html-share',
		badge: '轻应用分享',
		title: '本地 HTML / 交互汇报页 1 分钟公网分享',
		description:
			'将本地《大肥鱼观察日记》、课程展示页或 AI 生成的交互原型文件夹拖入 Sealos Desktop，无需买域名备案，1 分钟生成公网 HTTPS 分享链接。',
		href: '/downloads#download',
		ctaLabel: '查看桌面端本地代码上线演示',
		highlights: ['拖入目录自动构建', '自动签发 SSL 证书', '适合社媒与群内分享'],
	},
] as const;

export function buildUseCasesIndexJsonLd() {
	const canonicalUrl = `${SITE_URL}${USE_CASES_PATH}`;
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'CollectionPage',
				'@id': `${canonicalUrl}#collection`,
				url: canonicalUrl,
				name: USE_CASES_META.title,
				description: USE_CASES_META.description,
				inLanguage: 'zh-CN',
				mainEntity: {
					'@type': 'ItemList',
					itemListElement: USE_CASE_CARDS.map((card, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: card.title,
						url: `${SITE_URL}${card.href}`,
					})),
				},
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${canonicalUrl}#breadcrumb`,
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
						item: canonicalUrl,
					},
				],
			},
		],
	};
}
