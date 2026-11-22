import { ChevronRightIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';
import { USE_CASES_PATH } from '@/libs/seo/deepseek-harness';
import type { DesktopDownloads } from '@/libs/utils/desktop-downloads';
import { HeroActionClient } from '../components/HeroActionClient';
import { HeroStageClient } from '../components/HeroStageClient';
import { HERO_LEAD, HUB_META, INVITE_ACTIVE_TEXT, REWARD_BADGE_TEXT } from '../utils/cluster.config';

const H1_BREAK_BEFORE = '24 小时';

export interface HeroSectionProps {
	downloads: DesktopDownloads;
	inviteHandoffHref: string | null;
	shareCopyPayload: string;
}

export function HeroSection({ downloads, inviteHandoffHref, shareCopyPayload }: HeroSectionProps) {
	const [h1Lead, h1Tail] = HUB_META.h1.split(H1_BREAK_BEFORE);

	return (
		<HeroStageClient>
			<nav
				aria-label='面包屑'
				className='flex flex-wrap items-center justify-start gap-1.5 text-xs text-zinc-500'
			>
				<Link
					href='/'
					className='hover:text-foreground transition-colors'
				>
					首页
				</Link>
				<Icon
					src={ChevronRightIcon}
					className='size-3 shrink-0 text-zinc-400'
					aria-hidden
				/>
				<Link
					href={USE_CASES_PATH}
					className='hover:text-foreground transition-colors'
				>
					使用场景
				</Link>
				<Icon
					src={ChevronRightIcon}
					className='size-3 shrink-0 text-zinc-400'
					aria-hidden
				/>
				<span
					aria-current='page'
					className='font-normal text-zinc-700'
				>
					DeepSeek Harness
				</span>
			</nav>

			<h1 className='text-foreground mx-auto mt-7 max-w-4xl text-center text-[30px] leading-[1.16] font-semibold tracking-tight sm:text-5xl lg:mt-8'>
				<span className='sm:block'>{h1Lead}</span>
				<span className='sm:block'>
					<span className='text-brand whitespace-nowrap'>{H1_BREAK_BEFORE}</span>
					{h1Tail}
				</span>
			</h1>

			<p className='mx-auto mt-3.5 max-w-3xl text-center text-base leading-relaxed text-pretty text-zinc-600 sm:text-lg'>
				{HERO_LEAD}
			</p>

			<HeroActionClient
				downloads={downloads}
				inviteHandoffHref={inviteHandoffHref}
				shareCopyPayload={shareCopyPayload}
				rewardLine={inviteHandoffHref ? INVITE_ACTIVE_TEXT : REWARD_BADGE_TEXT}
				rewardHighlight={Boolean(inviteHandoffHref)}
			/>
		</HeroStageClient>
	);
}
