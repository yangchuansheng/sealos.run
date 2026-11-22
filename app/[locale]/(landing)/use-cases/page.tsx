import type { Metadata } from 'next';
import Image from 'next/image';
import { HeroBgImage } from '@/app/[locale]/(landing)/pricing/assets';
import { ChevronRightIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Badge } from '@/libs/components/ui/badge';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { HUB_PATH, SITE_NAME, SITE_URL, USE_CASES_PATH } from '@/libs/seo/deepseek-harness';
import { cn } from '@/libs/utils/styling';
import { buildUseCasesIndexJsonLd, USE_CASE_CARDS, USE_CASES_META } from './utils/use-cases.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';

	return {
		metadataBase: new URL(SITE_URL),
		title: USE_CASES_META.title,
		description: USE_CASES_META.description,
		alternates: {
			canonical: USE_CASES_PATH,
			languages: {
				zh: USE_CASES_PATH,
			},
		},
		openGraph: {
			type: 'website',
			siteName: SITE_NAME,
			url: `${SITE_URL}${USE_CASES_PATH}`,
			title: USE_CASES_META.title,
			description: USE_CASES_META.description,
			locale: 'zh_CN',
		},
		twitter: {
			card: 'summary_large_image',
			site: '@Sealos_io',
			title: USE_CASES_META.title,
			description: USE_CASES_META.description,
		},
		robots: {
			index: isIndexableLocale,
			follow: true,
			googleBot: {
				index: isIndexableLocale,
				follow: true,
				'max-image-preview': 'large',
				'max-snippet': -1,
				'max-video-preview': -1,
			},
		},
	};
}

export default async function UseCasesPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const isZh = getPrimaryLocale(locale) === 'zh';
	const jsonLd = buildUseCasesIndexJsonLd();

	return (
		<div className='flex w-full flex-col'>
			{isZh && (
				<script
					type='application/ld+json'
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires raw HTML injection
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}

			<section className='container mx-auto px-6 pt-12 pb-10'>
				<div className='relative flex flex-col gap-6 pt-8 pb-16 lg:pt-16 lg:pb-24'>
					<div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
						<Image
							src={HeroBgImage}
							alt=''
							fill
							className='object-cover object-center opacity-85 lg:object-right'
							priority
						/>
					</div>

					<nav
						aria-label='面包屑导航'
						className='text-muted-foreground flex items-center gap-1.5 text-sm'
					>
						<Link
							href='/'
							className='hover:text-foreground transition-colors'
						>
							首页
						</Link>
						<Icon
							src={ChevronRightIcon}
							className='size-3.5 shrink-0'
							aria-hidden
						/>
						<span className='text-foreground font-medium'>使用场景</span>
					</nav>

					<div className='flex max-w-3xl flex-col gap-5'>
						<Badge variant='outline'>
							<span className='bg-brand size-1.5 shrink-0 rounded-full' />
							<span className='text-foreground'>Sealos Desktop 高频实战场景</span>
						</Badge>

						<h1 className='text-foreground text-4xl leading-tight font-semibold tracking-tight sm:text-5xl sm:leading-none'>
							{USE_CASES_META.h1}
						</h1>

						<p className='text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg'>
							{USE_CASES_META.lead}
						</p>
					</div>
				</div>
			</section>

			<section className='container mx-auto px-6 pb-20'>
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
					{USE_CASE_CARDS.map((card) => (
						<article
							key={card.id}
							className={cn(
								'flex flex-col justify-between gap-6 rounded-xl border bg-white p-6 transition-colors lg:p-8',
								card.featured ? 'border-brand shadow-xs' : 'border-border hover:border-brand/60',
							)}
						>
							<div className='flex flex-col gap-4'>
								<div className='flex items-center justify-between gap-3'>
									<Badge
										variant={card.featured ? 'default' : 'outline'}
										className={card.featured ? 'border-brand bg-blue-50/70 text-brand' : undefined}
									>
										<span className='bg-brand size-1.5 shrink-0 rounded-full' />
										<span>{card.badge}</span>
									</Badge>
									{card.featured && (
										<span className='text-brand text-xs font-medium'>官方推荐入口</span>
									)}
								</div>

								<h2 className='text-foreground text-xl leading-snug font-semibold sm:text-2xl'>
									<Link
										href={card.href}
										className='hover:text-brand transition-colors'
									>
										{card.title}
									</Link>
								</h2>

								<p className='text-muted-foreground text-sm leading-relaxed sm:text-base'>
									{card.description}
								</p>

								<div className='flex flex-wrap gap-2 pt-1'>
									{card.highlights.map((item) => (
										<span
											key={item}
											className='border-border bg-zinc-50 text-foreground rounded-md border px-2.5 py-1 text-xs'
										>
											{item}
										</span>
									))}
								</div>
							</div>

							<div className='border-border flex flex-wrap items-center justify-between gap-3 border-t pt-5'>
								<LandingOutlineButton
									href={card.href}
									size='md'
									borderStyle={card.featured ? 'solid' : 'dashed'}
								>
									{card.ctaLabel}
								</LandingOutlineButton>
								{card.secondaryLink && (
									<Link
										href={card.secondaryLink.href}
										className='text-muted-foreground hover:text-brand inline-flex items-center gap-1 text-sm font-medium transition-colors'
									>
										<span>{card.secondaryLink.label}</span>
										<Icon
											src={ChevronRightIcon}
											className='size-4 shrink-0'
											aria-hidden
										/>
									</Link>
								)}
							</div>
						</article>
					))}
				</div>
			</section>

			<section className='flex w-full flex-col items-center bg-zinc-100 py-12'>
				<div className='container mx-auto px-6'>
					<div className='flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-end'>
						<div className='flex flex-col gap-3'>
							<p className='text-muted-foreground text-base font-medium'>Sealos Desktop</p>
							<h2 className='text-foreground text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl'>
								用自然语言把 <span className='text-brand'>AI 伴侣与全栈项目</span> 5 分钟送上云端
							</h2>
						</div>
						<div className='flex flex-wrap items-center gap-3'>
							<LandingOutlineButton
								href={HUB_PATH}
								size='lg'
							>
								查看大肥鱼部署方案
							</LandingOutlineButton>
							<LandingOutlineButton
								href='/downloads'
								size='lg'
								borderStyle='dashed'
							>
								下载桌面端
							</LandingOutlineButton>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
