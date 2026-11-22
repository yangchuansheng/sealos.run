import { type RegionId, unitPricesByRegion } from './payg-prices';

export const DOMESTIC_REGION_IDS = ['bja', 'gzg', 'hzh'] as const satisfies readonly RegionId[];
export type DomesticRegionId = (typeof DOMESTIC_REGION_IDS)[number];

export const DOMESTIC_REGION_META: Record<DomesticRegionId, { label: string; vendor: string }> = {
	bja: { label: '北京可用区', vendor: '火山引擎' },
	gzg: { label: '广东可用区', vendor: '腾讯云' },
	hzh: { label: '杭州可用区', vendor: '阿里云' },
};

export const MONTHLY_HOURS = 720;
export const MONTHLY_DAYS = 30;
export const DAFEIYU_CREDIT_CNY = 10;

export interface DafeiyuTierPreset {
	id: string;
	label: string;
	shortLabel: string;
	specSummary: string;
	description: string;
	cpuCores: number;
	memoryGiB: number;
	storageGiB: number;
	ports: number;
	inviteBonusNote?: string;
}

export const DAFEIYU_TIERS = [
	{
		id: 'astrbot-basic',
		label: '档位 1：AstrBot 基础常驻',
		shortLabel: 'AstrBot 基础版',
		specSummary: '0.1 核 / 512Mi 内存 / 1Gi 持久卷 + 1 公网端口',
		description: '内置 WebUI、官方通道与 SQLite 持久化，适合零基础玩家 24 小时常驻。',
		cpuCores: 0.1,
		memoryGiB: 0.5,
		storageGiB: 1,
		ports: 1,
	},
	{
		id: 'maibot-companion',
		label: '档位 2：MaiBot 数字伴侣',
		shortLabel: 'MaiBot 伴侣版',
		specSummary: '0.1 核 / 512Mi 内存 / 2Gi 持久卷 + 1 公网端口',
		description: '官方 MaiBot v1.4.5 持久化模板，自带多 Bot 工作区与插件生态。',
		cpuCores: 0.1,
		memoryGiB: 0.5,
		storageGiB: 2,
		ports: 1,
	},
	{
		id: 'astrbot-napcat',
		label: '档位 3：AstrBot + NapCat（QQ 个人号）',
		shortLabel: 'AstrBot + NapCat',
		specSummary: '0.3 核 / 1Gi 内存 / 2Gi 持久卷 + 1 公网端口（NapCat 纯内网）',
		description: '同 Canvas 追加 NapCat 个人 QQ 桥接容器，内网毫秒级直连，零额外端口费。',
		cpuCores: 0.3,
		memoryGiB: 1,
		storageGiB: 2,
		ports: 1,
		inviteBonusNote: '邀请 2 位好友再得 ¥10，可扩至约 38 天',
	},
	{
		id: 'astrbot-napcat-pg',
		label: '档位 4：进阶永生记忆全家桶',
		shortLabel: '含托管 PG 全家桶',
		specSummary: '0.8 核 / 2Gi 内存 / 7Gi 持久卷 + 1 公网端口（托管 PG 仅内网）',
		description: '同 Canvas 挂载托管 PostgreSQL（0.5C/1G/5Gi）与定时备份，支撑长期记忆与观察日记后端。',
		cpuCores: 0.8,
		memoryGiB: 2,
		storageGiB: 7,
		ports: 1,
	},
] as const satisfies readonly DafeiyuTierPreset[];

export type DafeiyuTierId = (typeof DAFEIYU_TIERS)[number]['id'];

export interface TierCostBreakdown {
	tier: (typeof DAFEIYU_TIERS)[number];
	regionId: DomesticRegionId;
	computeAndStorageMonthly: number;
	portMonthly: number;
	monthlyTotal: number;
	dailyAverage: number;
	creditCoverageDays: number;
}

export function formatCny(value: number): string {
	return `¥${value.toFixed(2)}`;
}

export function calculateTierCost(tierId: DafeiyuTierId, regionId: DomesticRegionId): TierCostBreakdown {
	const tier = DAFEIYU_TIERS.find((item) => item.id === tierId) ?? DAFEIYU_TIERS[0];
	const prices = unitPricesByRegion[regionId];

	const computeAndStorageMonthly =
		MONTHLY_HOURS *
		(tier.cpuCores * prices.cpuCoreHour +
			tier.memoryGiB * prices.memoryGiBHour +
			tier.storageGiB * prices.storageGiBHour);
	const portMonthly = MONTHLY_HOURS * tier.ports * prices.portHour;
	const monthlyTotal = computeAndStorageMonthly + portMonthly;
	const dailyAverage = monthlyTotal / MONTHLY_DAYS;
	const creditCoverageDays = Math.floor(DAFEIYU_CREDIT_CNY / dailyAverage);

	return {
		tier,
		regionId,
		computeAndStorageMonthly,
		portMonthly,
		monthlyTotal,
		dailyAverage,
		creditCoverageDays,
	};
}
