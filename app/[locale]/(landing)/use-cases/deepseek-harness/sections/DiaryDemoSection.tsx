import { ArrowUpRightIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';
import { DiaryPreviewClient } from '../components/DiaryPreviewClient';
import { DIARY_DEMO_CONFIG } from '../utils/cluster.config';

export function DiaryDemoSection() {
	return (
		<section
			id='diary-demo'
			className='scroll-mt-20 py-12'
		>
			<div className='container mx-auto px-6'>
				<div className='mx-auto max-w-2xl text-center'>
					<h2 className='text-foreground text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl'>
						上线你的《大肥鱼观察日记》
					</h2>
					<p className='mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base'>
						拖入本地目录，1 分钟拿到公网 HTTPS 链接。
					</p>
				</div>

				<div className='mt-8 grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12'>
					<DiaryPreviewClient />

					<div className='flex flex-col justify-center gap-5'>
						<div>
							<h3 className='text-foreground text-xl leading-snug font-semibold tracking-tight text-balance'>
								页脚换上你的邀请码，好友首登双方各得 ¥5
							</h3>
							<code
								data-invite-url=''
								className='mt-4 flex h-11 w-full items-center overflow-x-auto border border-zinc-200 bg-white px-4 font-sans text-sm tracking-tight whitespace-nowrap text-zinc-700'
							>
								{DIARY_DEMO_CONFIG.inviteUrlExample}
							</code>
						</div>

						<div className='flex flex-wrap items-center gap-x-6 gap-y-3'>
							<LandingOutlineButton
								href={DIARY_DEMO_CONFIG.demoUrl}
								target={DIARY_DEMO_CONFIG.isLiveDemo ? '_blank' : undefined}
								rel={DIARY_DEMO_CONFIG.isLiveDemo ? 'noopener noreferrer' : undefined}
								size='md'
								borderStyle='solid'
								className='bg-white text-sm font-medium'
							>
								{DIARY_DEMO_CONFIG.demoCtaLabel}
							</LandingOutlineButton>

							{DIARY_DEMO_CONFIG.githubUrl && (
								<a
									href={DIARY_DEMO_CONFIG.githubUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='hover:text-brand focus-visible:outline-brand inline-flex min-h-8 items-center gap-1.5 rounded-sm text-sm font-medium text-zinc-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2'
								>
									<span>GitHub 模板</span>
									<Icon
										src={ArrowUpRightIcon}
										className='size-3.5 shrink-0'
										aria-hidden
									/>
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
