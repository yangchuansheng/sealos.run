import { FlatArrowRightIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';
import { SPOKE_ARTICLES } from '@/libs/seo/deepseek-harness';
import { cn } from '@/libs/utils/styling';
import { DshArchitectureBlueprint } from '../components/PainPointIsometricArt';

function EditorialIndexGlyph({ index }: { index: number }) {
	const secondDigitPaths = [
		'M15.5 4.2L17.5 2.5V13.5M15 13.5H20', // 1
		'M14.5 5.2C14.5 3.6 15.8 2.5 17.5 2.5C19.2 2.5 20.5 3.6 20.5 5.1C20.5 6.4 19.6 7.4 18 8.7L14.5 11.7V13.5H20.8', // 2
		'M14.8 4.4C15.4 3.2 16.5 2.5 17.8 2.5C19.4 2.5 20.5 3.5 20.5 4.9C20.5 6.3 19.4 7.4 17.6 7.7C19.6 7.9 20.8 9.1 20.8 10.7C20.8 12.4 19.4 13.5 17.5 13.5C16 13.5 14.9 12.8 14.4 11.6', // 3
		'M19.3 13.5V2.5L14 10H21', // 4
		'M20.2 2.5H15.2L14.8 7.3C15.5 6.7 16.4 6.4 17.4 6.4C19.4 6.4 20.8 7.7 20.8 9.8C20.8 12 19.3 13.5 17.2 13.5C15.7 13.5 14.6 12.7 14.2 11.5', // 5
	] as const;

	return (
		<svg
			aria-hidden='true'
			viewBox='0 0 24 16'
			fill='none'
			className='group-hover:text-brand h-3.5 w-5.5 shrink-0 text-zinc-400 transition-colors'
		>
			{/* Leading zero */}
			<rect
				x='2.5'
				y='2.5'
				width='6.5'
				height='11'
				rx='3.25'
				stroke='currentColor'
				strokeWidth='1.55'
			/>
			{/* Second digit 1–5 */}
			<path
				d={secondDigitPaths[index] ?? secondDigitPaths[0]}
				stroke='currentColor'
				strokeWidth='1.55'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export function SpokeArticlesSection() {
	return (
		<div className='w-full'>
			<h2 className='text-foreground text-center text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl'>
				深度教程
			</h2>

			{/* Centered-header Launchpad-aligned open Swiss editorial index with bespoke 30° isometric DSH blueprint */}
			<ol className='mt-8 grid w-full grid-cols-1 border-y border-zinc-200 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-4'>
				{SPOKE_ARTICLES.map((article, index) => {
					const isFeatured = index === 0;
					return (
						<li
							key={article.slug}
							className={cn(
								isFeatured
									? 'border-b border-zinc-200 lg:row-span-4 lg:border-r lg:border-b-0'
									: 'border-b border-zinc-200 last:border-b-0',
							)}
						>
							{isFeatured ? (
								<Link
									href={article.url}
									className='group focus-visible:outline-brand flex h-full flex-col justify-between gap-3 py-5 transition-colors hover:bg-zinc-100/50 focus-visible:outline-2 focus-visible:-outline-offset-2 lg:pr-10'
								>
									<div className='flex items-center justify-between gap-4'>
										<EditorialIndexGlyph index={index} />
										<span className='group-hover:text-brand inline-flex items-center gap-1.5 text-xs leading-none whitespace-nowrap text-zinc-600 tabular-nums transition-colors sm:text-sm'>
											<span>{article.readingTime} 分钟</span>
											<Icon
												src={FlatArrowRightIcon}
												className='size-3.5 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5'
												aria-hidden
											/>
										</span>
									</div>

									<div className='flex items-center justify-center py-1'>
										<DshArchitectureBlueprint className='h-44 w-auto' />
									</div>

									<h3 className='text-foreground group-hover:text-brand text-lg leading-snug font-semibold text-pretty transition-colors sm:text-xl'>
										{article.title}
									</h3>
								</Link>
							) : (
								<Link
									href={article.url}
									className='group focus-visible:outline-brand flex h-full items-center justify-between gap-6 py-3.5 transition-colors hover:bg-zinc-100/50 focus-visible:outline-2 focus-visible:-outline-offset-2 lg:pl-10'
								>
									<div className='flex min-w-0 flex-1 items-center gap-4'>
										<EditorialIndexGlyph index={index} />
										<h3 className='text-foreground group-hover:text-brand text-[15px] leading-snug font-medium text-pretty transition-colors'>
											{article.title}
										</h3>
									</div>

									<span className='group-hover:text-brand inline-flex shrink-0 items-center gap-1.5 text-xs leading-none whitespace-nowrap text-zinc-600 tabular-nums transition-colors sm:text-sm'>
										<span>{article.readingTime} 分钟</span>
										<Icon
											src={FlatArrowRightIcon}
											className='size-3.5 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5'
											aria-hidden
										/>
									</span>
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</div>
	);
}
