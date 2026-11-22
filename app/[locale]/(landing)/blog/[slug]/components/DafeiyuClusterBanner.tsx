import { FlatArrowRightIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';
import { HUB_PATH, SPOKE_ARTICLES } from '@/libs/seo/deepseek-harness';

export interface DafeiyuClusterBannerProps {
	variant: 'top' | 'bottom';
	currentSlug: string;
}

export function DafeiyuClusterBanner({ variant, currentSlug }: DafeiyuClusterBannerProps) {
	const currentArticle = SPOKE_ARTICLES.find((item) => item.slug === currentSlug);
	const siblingArticles = SPOKE_ARTICLES.filter((item) => item.slug !== currentSlug);

	if (variant === 'top') {
		return (
			<aside
				aria-label='DeepSeek 大肥鱼云端部署专题导航'
				className='border-brand mb-10 rounded-xl border border-dashed bg-zinc-50 p-5'
			>
				<div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
					<div className='flex flex-col gap-1.5'>
						<div className='flex flex-wrap items-center gap-2'>
							<Badge
								variant='outline'
								size='sm'
							>
								<span className='bg-brand size-1.5 shrink-0 rounded-full' />
								<span>DeepSeek 大肥鱼云端部署专题</span>
							</Badge>
							{currentArticle && (
								<span className='text-muted-foreground text-xs'>{currentArticle.stage}</span>
							)}
						</div>
						<p className='text-foreground text-sm leading-relaxed'>
							查看完整 5 分钟上线流程、四档按量计费估算与《大肥鱼观察日记》演示站。
						</p>
					</div>

					<Link
						href={HUB_PATH}
						className='border-brand text-brand hover:bg-blue-50/70 inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-white px-4 py-2 text-xs font-medium transition-colors sm:text-sm'
					>
						<span>返回大肥鱼部署总览页</span>
						<Icon
							src={FlatArrowRightIcon}
							className='size-4'
							aria-hidden
						/>
					</Link>
				</div>

				<div className='border-border mt-4 flex flex-wrap items-center gap-2 border-t pt-3.5 text-xs'>
					<span className='text-muted-foreground font-medium'>同专题导览：</span>
					{siblingArticles.map((article) => (
						<Link
							key={article.slug}
							href={article.url}
							className='border-border text-foreground hover:border-brand hover:text-brand rounded-full border bg-white px-2.5 py-1 transition-colors'
						>
							{article.shortLabel}
						</Link>
					))}
				</div>
			</aside>
		);
	}

	return (
		<aside
			aria-label='专题下一步行动与延伸阅读'
			className='border-border mt-14 flex flex-col gap-6 rounded-xl border bg-zinc-50 p-6'
		>
			<div className='flex flex-col justify-between gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center'>
				<div className='flex flex-col gap-1'>
					<p className='text-brand text-xs font-semibold'>下一步行动</p>
					<p className='text-foreground text-lg font-semibold'>
						用 Sealos Desktop 5 分钟部署 24 小时在线大肥鱼
					</p>
					<p className='text-muted-foreground text-sm'>
						首登实名即领 ¥10 体验金（永久有效），一键拉起 AstrBot / MaiBot 持久化模板。
					</p>
				</div>
				<LandingOutlineButton
					href={HUB_PATH}
					size='md'
				>
					进入大肥鱼部署专题页
				</LandingOutlineButton>
			</div>

			<div className='flex flex-col gap-3'>
				<p className='text-foreground text-sm font-semibold'>同专题其他深度指南</p>
				<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
					{siblingArticles.map((article) => (
						<Link
							key={article.slug}
							href={article.url}
							className='border-border hover:border-brand flex flex-col gap-1 rounded-lg border bg-white p-3.5 transition-colors'
						>
							<span className='text-brand text-xs font-medium'>{article.stage}</span>
							<span className='text-foreground text-sm leading-snug font-medium'>{article.title}</span>
						</Link>
					))}
				</div>
			</div>
		</aside>
	);
}
