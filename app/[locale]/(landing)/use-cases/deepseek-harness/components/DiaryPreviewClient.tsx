'use client';

import Image from 'next/image';
import React from 'react';
import { cn } from '@/libs/utils/styling';
import { HeroDafeiyuNestImage } from '../assets';
import styles from '../sections/VisualEffects.module.css';
import { DIARY_DEMO_CONFIG } from '../utils/cluster.config';

const FEED_REACTIONS = [
	'今天也在云端小窝认真值班，记得按时投喂白饭哦。',
	'唔……香喷喷的白饭！那我就勉强多陪你聊两百行代码好啦。',
	'吃饱饱了，Token 消化效率 +20%，绝不偷偷摸鱼写小游戏！',
	'哼，别以为一口白饭就能收买本鲸……不过再来一口也不是不行。',
	'长期记忆已写入 PostgreSQL，就算你关掉电脑我也不会失忆哒。',
] as const;

export function DiaryPreviewClient() {
	const [riceCount, setRiceCount] = React.useState<number>(DIARY_DEMO_CONFIG.initialRiceCount);
	const [feedPressCount, setFeedPressCount] = React.useState(0);
	const [justFed, setJustFed] = React.useState(false);
	const feedbackTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	React.useEffect(() => () => clearTimeout(feedbackTimer.current), []);

	const handleFeed = () => {
		setRiceCount((current) => current + 1);
		setFeedPressCount((current) => current + 1);
		setJustFed(true);
		clearTimeout(feedbackTimer.current);
		feedbackTimer.current = setTimeout(() => setJustFed(false), 1400);
	};

	const activeReaction = FEED_REACTIONS[feedPressCount % FEED_REACTIONS.length] ?? FEED_REACTIONS[0];

	return (
		<figure className='flex h-full flex-col justify-between border border-zinc-200 bg-white'>
			<div className='flex items-center justify-between gap-3 border-b border-zinc-200 bg-[#fafafa] px-6 py-3 lg:px-7'>
				<span className='min-w-0 truncate text-xs font-medium text-zinc-600'>
					{DIARY_DEMO_CONFIG.publicHost}
				</span>
				{!DIARY_DEMO_CONFIG.isLiveDemo && <span className='shrink-0 text-xs text-zinc-600'>示例</span>}
			</div>

			<div className='flex flex-1 flex-col justify-between gap-5 px-6 py-5 lg:px-7 lg:py-6'>
				<div className='flex flex-wrap items-start justify-between gap-4'>
					<div className='flex min-w-60 flex-1 items-start gap-3.5'>
						<div
							className={cn(
								styles['diaryPop'],
								'flex size-16 shrink-0 items-center justify-center',
								justFed && 'motion-safe:scale-105',
							)}
						>
							<Image
								src={HeroDafeiyuNestImage}
								alt=''
								className='h-full w-full object-contain select-none'
							/>
						</div>
						<div className='min-w-0 flex-1 pt-0.5'>
							<h3 className='text-foreground text-lg leading-snug font-semibold'>大肥鱼观察日记</h3>
							<p
								aria-live='polite'
								className='mt-1.5 text-sm leading-relaxed text-zinc-600'
							>
								{activeReaction}
							</p>
						</div>
					</div>

					<div className='relative flex shrink-0 items-baseline gap-3.5 pt-0.5'>
						{justFed && (
							<span
								key={feedPressCount}
								aria-hidden='true'
								className={cn(
									styles['feedSpark'],
									'text-brand pointer-events-none absolute -top-4 left-2 text-xs font-semibold tabular-nums',
								)}
							>
								+1
							</span>
						)}
						<p className='flex items-baseline gap-1.5 tabular-nums'>
							<span
								data-diary-rice-count=''
								className='text-foreground text-lg leading-snug font-semibold tracking-tight'
							>
								{riceCount}
							</span>
							<span className='text-xs text-zinc-600'>口白饭</span>
						</p>
						<button
							type='button'
							onClick={handleFeed}
							className='border-foreground/80 text-foreground hover:border-brand hover:text-brand focus-visible:outline-brand inline-flex h-9 cursor-pointer items-center justify-center rounded-full border bg-white px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2'
						>
							喂一口
						</button>
					</div>
				</div>

				<blockquote className='border-l-2 border-brand/35 pl-4 text-[15px] leading-[1.8] text-pretty text-zinc-700'>
					“{DIARY_DEMO_CONFIG.letterExcerpt}”
				</blockquote>
			</div>
		</figure>
	);
}
