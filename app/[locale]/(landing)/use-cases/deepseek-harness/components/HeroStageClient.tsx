'use client';

import Image from 'next/image';
import React from 'react';
import { HeroBgImage } from '@/app/[locale]/(landing)/products/launchpad/assets';
import { calculateTierCost, formatCny } from '@/libs/pricing/deepseek-harness';
import { cn } from '@/libs/utils/styling';
import { HeroDafeiyuStageImage } from '../assets';
import styles from '../sections/VisualEffects.module.css';
import { HeroOceanShaderCanvas } from './HeroOceanShaderCanvas';

const STARTER_DAILY_PRICE = formatCny(calculateTierCost('astrbot-basic', 'bja').dailyAverage);

export interface HeroStageClientProps {
	children: React.ReactNode;
}

export function HeroStageClient({ children }: HeroStageClientProps) {
	const sectionRef = React.useRef<HTMLElement>(null);
	const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
	const [reducedMotion, setReducedMotion] = React.useState(false);

	React.useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		setReducedMotion(mq.matches);
		const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);

	const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
		if (reducedMotion || event.pointerType !== 'mouse') return;
		const rect = event.currentTarget.getBoundingClientRect();
		if (rect.width <= 0 || rect.height <= 0) return;
		const nx = (event.clientX - rect.left) / rect.width - 0.5;
		const ny = (event.clientY - rect.top) / rect.height - 0.5;
		setTilt({
			rx: Number((-ny * 3.2).toFixed(2)),
			ry: Number((nx * 4.2).toFixed(2)),
		});
	};

	const handlePointerLeave = () => {
		setTilt({ rx: 0, ry: 0 });
	};

	return (
		<section
			ref={sectionRef}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			className='bg-background relative isolate overflow-x-clip'
		>
			<HeroOceanShaderCanvas
				paused={reducedMotion}
				containerRef={sectionRef}
				className='-z-20'
			/>

			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 opacity-55'
			>
				<Image
					src={HeroBgImage}
					alt=''
					fill
					priority
					className='object-cover object-top lg:object-contain'
				/>
			</div>

			<div className='container mx-auto px-6 pt-8 pb-12 lg:pt-10 lg:pb-14'>
				<div>{children}</div>

				<figure
					className='relative mt-10 flex w-full flex-col items-center lg:mt-12'
					style={{ perspective: '1400px' }}
				>
					<div
						className={cn(styles['heroTiltStage'], 'relative w-full max-w-[820px]')}
						style={
							reducedMotion
								? undefined
								: {
										transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
									}
						}
					>
						<Image
							src={HeroDafeiyuStageImage}
							alt='DeepSeek 蓝色大肥鱼端坐于 Sealos 30° 等距云端小窝架构中央，左右连接容器与持久化数据库节点'
							priority
							sizes='(max-width: 768px) 100vw, 820px'
							className='block h-auto w-full select-none'
						/>
					</div>

					<figcaption className='mt-2 inline-flex items-center justify-center gap-4 border-t border-zinc-300 px-6 pt-2.5 font-mono text-[13px] font-medium tracking-wide text-zinc-700 tabular-nums'>
						<span>24h Running</span>
						<span
							aria-hidden='true'
							className='h-3 w-px bg-zinc-300'
						/>
						<span>{STARTER_DAILY_PRICE} / 天</span>
					</figcaption>
				</figure>
			</div>
		</section>
	);
}
