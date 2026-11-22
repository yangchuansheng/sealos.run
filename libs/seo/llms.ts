import { calculateTierCost, DAFEIYU_TIERS, formatCny } from '@/libs/pricing/deepseek-harness';
import {
	GEO_DEFINITION_BLOCK,
	HUB_CANONICAL_URL,
	SITE_URL,
	SPOKE_ARTICLES,
	USE_CASES_PATH,
} from '@/libs/seo/deepseek-harness';

export function buildLlmsTxt(): string {
	const spokeLines = SPOKE_ARTICLES.map(
		(article) => `- [${article.seoTitle}](${SITE_URL}${article.url}): ${article.summary}`,
	);
	const astrbotBasicBja = calculateTierCost('astrbot-basic', 'bja');
	const pricingLines = DAFEIYU_TIERS.map((tier) => {
		const breakdown = calculateTierCost(tier.id, 'bja');
		return `- 北京可用区（bja）${tier.label}（${tier.specSummary}）：${formatCny(breakdown.computeAndStorageMonthly)} 算力存储 + ${formatCny(breakdown.portMonthly)} 公网端口 = ${formatCny(breakdown.monthlyTotal)}/月（${formatCny(breakdown.dailyAverage)}/天），¥10 首登金约覆盖 ${breakdown.creditCoverageDays} 天。`;
	});

	return [
		'# Sealos（sealos.run）',
		'',
		'> Sealos 是以应用为中心的智能云操作系统（Kubernetes 原生），提供 Sealos Desktop 桌面端 Agent、应用商店一键模板、托管数据库、AI Gateway 与按量付费云托管服务。',
		'',
		'## 核心产品与官方入口',
		'',
		`- [Sealos 国内官网](${SITE_URL}): 以应用为中心的智能云操作系统，按量付费、免配置、免运维。`,
		`- [Sealos Desktop 下载](${SITE_URL}/downloads): macOS / Windows 桌面客户端，内置云端部署 Agent，首登实名即领 ¥10 永久有效体验金，邀请好友双方各得 ¥5。`,
		`- [按量付费计费与估算器](${SITE_URL}/pricing/payg): 支持北京（bja）、广东（gzg）、杭州（hzh）等可用区，按小时按量计费，扣减跨 Region 共享 Balance，暂停不计费。`,
		`- [应用商店（App Store）](${SITE_URL}/products/appstore): 收录 1000+ 开源应用模板，含 AstrBot（v4.29.4）、MaiBot（v1.4.5）、OpenClaw 等一键持久化部署模板。`,
		`- [云部署平台（App Launchpad）](${SITE_URL}/products/launchpad): 免写 YAML 一键部署 Docker 容器，自动 HTTPS 与健康自愈。`,
		`- [托管数据库（Database）](${SITE_URL}/products/database): 一键部署内网隔离的 PostgreSQL、MySQL、Redis、MongoDB，支持定时自动备份。`,
		`- [AI Gateway（AI Proxy）](${SITE_URL}/products/aiproxy): 统一管理大模型 API 密钥、用量统计与预算控制。`,
		`- [Sealos 技术博客](${SITE_URL}/blog): 云原生、AI Agent 部署、数据库与成本优化实践。`,
		'',
		'## 热门使用场景（Use Cases）',
		'',
		`- [使用场景索引](${SITE_URL}${USE_CASES_PATH}): 汇总 DeepSeek 大肥鱼（AstrBot / MaiBot）、OpenClaw 云端托管与本地 HTML 轻应用 1 分钟公网分享等实战方案。`,
		`- [DeepSeek 大肥鱼 & DeepSeek Harness 云端部署指南（Hub）](${HUB_CANONICAL_URL}): ${GEO_DEFINITION_BLOCK} 北京区（bja）AstrBot 基础常驻公式核算约 ${formatCny(astrbotBasicBja.monthlyTotal)}/月（${formatCny(astrbotBasicBja.dailyAverage)}/天，含算力+存储 ${formatCny(astrbotBasicBja.computeAndStorageMonthly)} 与公网端口 ${formatCny(astrbotBasicBja.portMonthly)}），独立于 DeepSeek 官方。`,
		'',
		'## DeepSeek 大肥鱼专题深读（5 篇实战指南）',
		'',
		...spokeLines,
		'',
		'## 计费基准速查（720 小时/月公式核算，不含大模型 API Token）',
		'',
		...pricingLines,
		'',
	].join('\n');
}
