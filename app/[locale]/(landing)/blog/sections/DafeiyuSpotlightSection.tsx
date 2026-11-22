import { FlatArrowRightIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';
import { HUB_PATH, SPOKE_ARTICLES } from '@/libs/seo/deepseek-harness';

export default function DafeiyuSpotlightSection() {
	return (
		<section className='container mb-20'>
			<div className='border-brand rounded-xl border border-dashed bg-white p-6 lg:p-8'>
				<div className='flex flex-col justify-between gap-6 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end'>
					<div className='flex flex-col gap-3'>
						<Badge variant='outline'>
							<span className='bg-brand size-1.5 shrink-0 rounded-full' />
							<span className='text-foreground'>置顶专题 · DeepSeek 大肥鱼云端部署</span>
						</Badge>
						<h2 className='text-foreground text-2xl font-semibold sm:text-3xl'>
							DeepSeek 大肥鱼 &amp; DeepSeek Harness 24 小时云端部署专题
						</h2>
						<p className='text-muted-foreground max-w-2xl text-sm leading-relaxed sm:text-base'>
							从梗百科、AstrBot + NapCat QQ 接入、PostgreSQL
							长期记忆防失忆、四档成本核算到《观察日记》公网模板，一站式读完。
						</p>
					</div>

					<LandingOutlineButton
						href={HUB_PATH}
						size='md'
					>
						进入专题总览页
					</LandingOutlineButton>
				</div>

				<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
					{SPOKE_ARTICLES.map((article) => (
						<Link
							key={article.slug}
							href={article.url}
							className='border-border hover:border-brand group flex flex-col justify-between gap-3 rounded-lg border bg-zinc-50/70 p-4 transition-colors hover:bg-white'
						>
							<div className='flex flex-col gap-2'>
								<span className='text-brand text-xs font-semibold'>{article.stage}</span>
								<h3 className='text-foreground group-hover:text-brand line-clamp-2 text-sm leading-snug font-medium transition-colors'>
									{article.title}
								</h3>
							</div>
							<span className='text-muted-foreground group-hover:text-brand inline-flex items-center gap-1 text-xs transition-colors'>
								<span>阅读文章</span>
								<Icon
									src={FlatArrowRightIcon}
									className='size-3.5'
									aria-hidden
								/>
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
