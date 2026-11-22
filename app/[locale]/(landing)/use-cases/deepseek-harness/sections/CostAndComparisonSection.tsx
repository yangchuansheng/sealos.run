import { cn } from '@/libs/utils/styling';
import { CostEstimatorClient } from '../components/CostEstimatorClient';
import { COMPARISON_ROWS } from '../utils/cluster.config';
import styles from './ComparisonTable.module.css';
import { GeneralCapabilitiesSection } from './GeneralCapabilitiesSection';

const COMPARISON_COLUMNS = ['本地电脑', '闲置手机', '云服务器包月'] as const;

export function CostAndComparisonSection() {
	return (
		<>
			<section
				id='cost-estimator'
				className='scroll-mt-20 py-12'
			>
				<div className='container mx-auto px-6'>
					<h2 className='text-foreground text-center text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl'>
						按量计费，算得明白
					</h2>
					<CostEstimatorClient />
				</div>
			</section>

			<section className='py-12 lg:pb-16'>
				<div className='container mx-auto px-6'>
					<h2
						id='comparison-heading'
						className='text-foreground text-center text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl'
					>
						四种挂机方案横评
					</h2>

					<section
						// biome-ignore lint/a11y/noNoninteractiveTabindex: Scrollable data table region requires keyboard focusability per WCAG
						tabIndex={0}
						aria-labelledby='comparison-heading'
						className={cn(styles['wrapper'], 'relative mt-8 w-full')}
					>
						<table
							className={cn(styles['table'], 'w-full text-left text-sm md:table-fixed sm:text-[15px]')}
						>
							<caption className='sr-only'>四种 DeepSeek 大肥鱼挂机部署方案横向对比</caption>
							<colgroup>
								<col className='w-[14%]' />
								<col className='w-[26%]' />
								<col className='w-[20%]' />
								<col className='w-[20%]' />
								<col className='w-[20%]' />
							</colgroup>
							<thead>
								<tr className='text-foreground text-sm font-semibold sm:text-base'>
									<td className='border-border h-20 border-r border-b px-4' />
									<th
										scope='col'
										className='border-border text-brand h-20 border-r border-b border-l bg-white/90 px-6 text-base font-bold sm:text-lg'
									>
										Sealos
									</th>
									{COMPARISON_COLUMNS.map((column, colIdx) => (
										<th
											key={column}
											scope='col'
											className={cn(
												'border-border text-foreground h-20 border-b px-5 font-semibold',
												colIdx < COMPARISON_COLUMNS.length - 1 && 'border-r border-zinc-200/70',
											)}
										>
											{column}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{COMPARISON_ROWS.map((row) => (
									<tr
										key={row.dimension}
										className='group text-sm sm:text-[15px]'
									>
										<th
											scope='row'
											className='border-border h-14 border-r border-b px-4 py-3.5 align-middle leading-relaxed font-normal text-zinc-600 group-last:border-b-0'
										>
											{row.dimension}
										</th>
										<td className='border-border text-foreground h-14 border-r border-b border-l bg-white/90 px-6 py-3.5 align-middle leading-relaxed font-normal text-pretty group-last:border-b-0'>
											<span>{row.sealos}</span>
										</td>
										{[row.localPc, row.oldAndroid, row.traditionalVps].map((cell, colIdx) => (
											<td
												key={cell}
												className={cn(
													'border-border h-14 border-b px-5 py-3.5 align-middle leading-relaxed text-pretty text-zinc-600 group-last:border-b-0',
													colIdx < 2 && 'border-r border-zinc-200/70',
												)}
											>
												{cell}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
						<div
							aria-hidden='true'
							className='pointer-events-none absolute inset-y-0 left-[14%] hidden w-[26%] md:block'
							style={{
								border: '1.5px solid transparent',
								borderImage: 'linear-gradient(to bottom, var(--color-brand), rgb(191, 219, 254)) 1',
							}}
						/>
					</section>

					<GeneralCapabilitiesSection />
				</div>
			</section>
		</>
	);
}
