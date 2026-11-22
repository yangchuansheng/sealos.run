'use client';

import Image from 'next/image';
import React from 'react';
import {
	DatabaseIcon,
	DeepseekIcon,
	GlobalIcon,
	LayersIcon,
	Number01Icon,
	Number02Icon,
	Number03Icon,
} from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import type { InlinedSvgData } from '@/libs/types';
import { cn } from '@/libs/utils/styling';
import { WorkflowSidebarImage } from '../assets';
import type { AgentPromptCard, DeployStepItem } from '../utils/cluster.config';
import { PromptCopyCards } from './PromptCopyCards';

const STEP_NUMBER_ICONS = [Number01Icon, Number02Icon, Number03Icon] as const;

function CanvasNode({
	id,
	name,
	image,
	icon,
	highlighted,
	footer,
}: {
	id: string;
	name: string;
	image: string;
	icon: InlinedSvgData;
	highlighted?: boolean;
	footer?: React.ReactNode;
}) {
	return (
		<div className='relative'>
			<div
				data-canvas-node={id}
				className={cn(
					'relative flex flex-col justify-between overflow-hidden bg-white transition-colors duration-300',
					highlighted ? 'border-brand border' : 'border border-zinc-200',
				)}
			>
				<div className='flex items-center gap-3.5 px-5 py-4'>
					<span
						className={cn(
							'flex size-10 shrink-0 items-center justify-center border transition-colors',
							highlighted
								? 'border-brand/40 text-brand bg-white'
								: 'text-foreground/75 border-zinc-200 bg-white',
						)}
					>
						<Icon
							src={icon}
							className='size-5 shrink-0'
							aria-hidden
						/>
					</span>
					<div className='min-w-0 flex-1'>
						<p className='text-foreground text-lg leading-snug font-semibold tracking-tight'>{name}</p>
						<p className='mt-0.5 truncate text-xs text-zinc-600 tabular-nums sm:text-sm'>{image}</p>
					</div>
				</div>
				{footer}
			</div>
		</div>
	);
}

export function CanvasPreviewCard({ activeStep = 0 }: { activeStep?: number }) {
	const astrbotActive = activeStep === 0 || activeStep === 2;
	const secondaryActive = activeStep === 1 || activeStep === 2;
	const wireActive = activeStep >= 1;
	const runningActive = activeStep === 2;

	return (
		<figure className='relative mt-7 w-full bg-zinc-100 p-3 sm:p-4'>
			<div className='border border-zinc-200 bg-white'>
				<div className='flex h-10 items-center justify-between border-b border-zinc-200/80 bg-white px-5'>
					<span className='inline-flex items-center gap-2.5 text-sm font-semibold text-zinc-800'>
						<svg
							aria-hidden='true'
							viewBox='0 0 16 16'
							fill='none'
							className='size-3.5 text-zinc-500'
						>
							<path
								d='M10 3.5L5.5 8L10 12.5M5.5 8H13.5'
								stroke='currentColor'
								strokeWidth='1.4'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<span>dafeiyu-home</span>
					</span>
					<span
						className={cn(
							'inline-flex items-center gap-2 text-sm font-medium tabular-nums transition-colors',
							runningActive ? 'text-brand' : 'text-zinc-700',
						)}
					>
						<span
							aria-hidden='true'
							className={cn(
								'size-2 rounded-full transition-colors',
								runningActive ? 'bg-brand' : 'bg-zinc-500',
							)}
						/>
						<span>3 Running</span>
					</span>
				</div>

				{/* Compact full-fidelity Sealos Desktop Step Console: Left Deploy Inspector + Right calm topology */}
				<div className='grid min-h-[280px] grid-cols-1 lg:grid-cols-[224px_minmax(0,1fr)] lg:divide-x lg:divide-zinc-200/80'>
					<div
						aria-hidden='true'
						className='hidden items-center justify-center bg-[#fafafa] lg:flex'
					>
						<Image
							src={WorkflowSidebarImage}
							alt=''
							loading='lazy'
							className='block h-[288px] w-[224px] object-contain select-none'
						/>
					</div>

					<div
						className='flex items-center bg-zinc-50/40 px-5 py-5 sm:px-8 sm:py-6'
						style={{
							backgroundImage: 'radial-gradient(#e4e4e7 1px, transparent 1px)',
							backgroundSize: '18px 18px',
						}}
					>
						<div className='mx-auto grid w-full max-w-3xl grid-cols-1 items-center gap-5 sm:grid-cols-[minmax(0,1.05fr)_4rem_minmax(0,1fr)] sm:gap-0'>
							<CanvasNode
								id='astrbot'
								name='astrbot'
								image='soulter/astrbot:v4.29.4'
								icon={DeepseekIcon}
								highlighted={astrbotActive}
								footer={
									<div
										className={cn(
											'border-t-hairline flex items-center gap-2 border-zinc-200 bg-zinc-50/70 px-5 py-2 text-xs transition-colors sm:text-sm',
											runningActive ? 'text-brand' : 'text-zinc-700',
										)}
									>
										<Icon
											src={GlobalIcon}
											className='size-3.5 shrink-0 text-zinc-600'
											aria-hidden
										/>
										<span className='truncate'>*.sealosbja.site</span>
									</div>
								}
							/>

							<svg
								aria-hidden='true'
								viewBox='0 0 80 150'
								preserveAspectRatio='none'
								className='hidden h-36 w-full sm:block'
							>
								<path
									d='M 0 75 L 40 75 M 40 34 L 40 116 M 40 34 L 80 34 M 40 116 L 80 116'
									fill='none'
									stroke={wireActive ? 'var(--color-brand)' : '#A1A1AA'}
									strokeWidth='1.35'
									vectorEffect='non-scaling-stroke'
								/>
							</svg>

							<div className='grid grid-rows-2 gap-3'>
								<CanvasNode
									id='napcat'
									name='napcat'
									image='QQ Bridge'
									icon={LayersIcon}
									highlighted={secondaryActive}
								/>
								<CanvasNode
									id='dafeiyu-pg'
									name='dafeiyu-pg'
									image='PostgreSQL 16'
									icon={DatabaseIcon}
									highlighted={secondaryActive}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</figure>
	);
}

export function WorkflowStepperClient({
	steps,
	prompts,
	promptHeading,
}: {
	steps: readonly DeployStepItem[];
	prompts?: readonly AgentPromptCard[];
	promptHeading?: string;
}) {
	const [activeStep, setActiveStep] = React.useState(0);

	return (
		<div className='mt-12 w-full'>
			<ol className='relative grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-0'>
				<span
					aria-hidden='true'
					className='border-border pointer-events-none absolute top-3.5 right-1/6 left-1/6 hidden border-t border-dashed md:block'
				/>
				{activeStep > 0 && (
					<span
						aria-hidden='true'
						className='pointer-events-none absolute top-[13px] left-1/6 hidden h-0.5 md:block'
						style={{
							width: activeStep === 1 ? '33.333%' : '66.666%',
							background: 'linear-gradient(to right, rgb(191 219 254), var(--color-brand))',
						}}
					/>
				)}
				{steps.map((step, index) => {
					const isActive = index === activeStep;
					const isReached = index <= activeStep;
					const StepIcon = STEP_NUMBER_ICONS[index] ?? Number01Icon;
					return (
						<li
							key={step.stepNumber}
							className='relative'
						>
							<button
								type='button'
								onClick={() => setActiveStep(index)}
								aria-pressed={isActive}
								className='focus-visible:outline-brand flex w-full cursor-pointer items-start gap-3.5 px-4 text-left transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 md:flex-col md:items-center md:gap-2.5 md:px-6 md:text-center'
							>
								<span className='bg-background relative z-10 inline-flex shrink-0 items-center justify-center px-3'>
									<Icon
										src={StepIcon}
										className={cn(
											'size-7 transition-colors',
											isReached ? 'text-brand' : 'text-muted-foreground',
										)}
										aria-hidden
									/>
								</span>
								<span className='min-w-0'>
									<span
										className={cn(
											'block text-sm leading-snug sm:text-base',
											isActive ? 'text-foreground font-semibold' : 'font-normal text-zinc-600',
										)}
									>
										{step.name}
									</span>
									<span className='mt-1 block text-xs text-zinc-500 tabular-nums'>
										{step.duration}
									</span>
								</span>
							</button>
						</li>
					);
				})}
			</ol>

			<CanvasPreviewCard activeStep={activeStep} />

			{prompts && prompts.length > 0 && (
				<PromptCopyCards
					prompts={prompts}
					heading={promptHeading}
					activeIndex={activeStep}
				/>
			)}
		</div>
	);
}
