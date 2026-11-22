'use client';

import React from 'react';
import { CpuIcon, PortIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';
import {
	calculateTierCost,
	DAFEIYU_CREDIT_CNY,
	DAFEIYU_TIERS,
	type DafeiyuTierId,
	DOMESTIC_REGION_IDS,
	DOMESTIC_REGION_META,
	type DomesticRegionId,
	formatCny,
} from '@/libs/pricing/deepseek-harness';
import { cn } from '@/libs/utils/styling';

export function CostEstimatorClient() {
	const [regionId, setRegionId] = React.useState<DomesticRegionId>('bja');
	const [tierId, setTierId] = React.useState<DafeiyuTierId>('astrbot-basic');

	React.useEffect(() => {
		const syncFromHash = () => {
			if (window.location.hash === '#maibot') {
				setTierId('maibot-companion');
			}
		};
		syncFromHash();
		window.addEventListener('hashchange', syncFromHash);
		return () => window.removeEventListener('hashchange', syncFromHash);
	}, []);

	const breakdown = React.useMemo(() => calculateTierCost(tierId, regionId), [tierId, regionId]);
	const inviteBonusNote = 'inviteBonusNote' in breakdown.tier ? breakdown.tier.inviteBonusNote : undefined;
	const cleanTierTitle = breakdown.tier.label.replace(/^档位 \d+：/, '');

	return (
		<div className='mt-7 w-full'>
			<div className='flex flex-wrap items-end justify-center border-b border-zinc-200'>
				<fieldset
					id='maibot'
					className='m-0 flex scroll-mt-24 flex-wrap items-end justify-center gap-x-8 gap-y-2 border-0 p-0'
				>
					<legend className='sr-only'>配置档位</legend>
					{DAFEIYU_TIERS.map((tier) => {
						const active = tier.id === tierId;
						return (
							<button
								key={tier.id}
								type='button'
								aria-pressed={active}
								onClick={() => setTierId(tier.id)}
								className={cn(
									'focus-visible:outline-brand -mb-px cursor-pointer border-b-2 pb-2.5 text-sm leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-base',
									active
										? 'border-foreground text-foreground font-semibold'
										: 'hover:text-foreground border-transparent font-normal text-zinc-600',
								)}
							>
								{tier.shortLabel}
							</button>
						);
					})}
				</fieldset>
			</div>

			<div className='grid grid-cols-1 divide-y divide-zinc-200 border-b border-zinc-200 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:divide-x lg:divide-y-0'>
				<div className='flex flex-col justify-between gap-4 py-5 lg:py-6 lg:pr-12'>
					<div>
						<div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2'>
							<h3 className='text-foreground text-xl leading-none font-semibold tracking-tight text-balance'>
								{cleanTierTitle}
							</h3>
							<fieldset className='m-0 flex flex-wrap items-center gap-x-4 border-0 p-0'>
								<legend className='sr-only'>国内可用区</legend>
								{DOMESTIC_REGION_IDS.map((id) => {
									const meta = DOMESTIC_REGION_META[id];
									const active = id === regionId;
									return (
										<button
											key={id}
											type='button'
											onClick={() => setRegionId(id)}
											aria-pressed={active}
											className={cn(
												'focus-visible:outline-brand inline-flex cursor-pointer items-center pb-0.5 text-xs leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
												active
													? 'border-foreground text-foreground border-b-[1.5px] font-semibold'
													: 'hover:text-foreground border-b-[1.5px] border-transparent font-normal text-zinc-600',
											)}
										>
											<span>{meta.label}</span>
										</button>
									);
								})}
							</fieldset>
						</div>
						<p className='mt-2 text-sm text-zinc-600 tabular-nums sm:text-[15px]'>
							{breakdown.tier.specSummary}
						</p>
					</div>

					<dl className='w-full divide-y divide-dashed divide-zinc-300 border-t border-dashed border-zinc-300 text-sm sm:text-[15px]'>
						<div className='flex items-center justify-between gap-4 py-2.5'>
							<dt className='flex items-center gap-2.5 text-zinc-700'>
								<Icon
									src={CpuIcon}
									className='text-foreground/75 size-4 shrink-0'
									aria-hidden
								/>
								<span>算力 + 存储</span>
							</dt>
							<dd className='text-foreground text-right text-base font-medium whitespace-nowrap tabular-nums'>
								{formatCny(breakdown.computeAndStorageMonthly)} / 月
							</dd>
						</div>
						<div className='flex items-center justify-between gap-4 pt-2.5'>
							<dt className='flex items-center gap-2.5 text-zinc-700'>
								<Icon
									src={PortIcon}
									className='text-foreground/75 size-4 shrink-0'
									aria-hidden
								/>
								<span>公网端口</span>
							</dt>
							<dd className='text-foreground text-right text-base font-medium whitespace-nowrap tabular-nums'>
								{formatCny(breakdown.portMonthly)} / 月
							</dd>
						</div>
					</dl>
				</div>

				<div className='flex flex-col justify-between gap-4 py-5 lg:py-6 lg:pl-12'>
					<div>
						<p className='flex items-baseline gap-2'>
							<span
								data-cost-kpi-value='monthly'
								className='text-foreground text-4xl leading-none font-semibold tracking-tight tabular-nums lg:text-[44px]'
							>
								{formatCny(breakdown.monthlyTotal)}
							</span>
							<span className='text-sm font-normal text-zinc-600 sm:text-base'>/ 月</span>
						</p>
						<p className='mt-2.5 text-sm leading-relaxed text-zinc-700 tabular-nums sm:text-[15px]'>
							<span data-cost-kpi-value='daily'>{formatCny(breakdown.dailyAverage)}</span>
							{` / 天 · ¥${DAFEIYU_CREDIT_CNY} 体验金约 `}
							<span data-cost-kpi-value='days'>{breakdown.creditCoverageDays}</span>
							{' 天'}
						</p>
						<p className='mt-1 text-xs leading-relaxed text-zinc-600'>不含大模型 API</p>
						{inviteBonusNote && <p className='text-brand mt-1.5 text-sm'>{inviteBonusNote}</p>}
					</div>

					<div className='flex items-center'>
						<LandingOutlineButton
							href='/pricing/payg'
							size='md'
							borderStyle='solid'
							className='bg-white text-sm font-medium'
						>
							完整计价
						</LandingOutlineButton>
					</div>
				</div>
			</div>
		</div>
	);
}
