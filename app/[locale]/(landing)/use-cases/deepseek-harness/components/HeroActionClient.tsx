'use client';

import React from 'react';
import { CheckIcon, FlatArrowRightIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';
import type { DesktopDownloads } from '@/libs/utils/desktop-downloads';
import { cn } from '@/libs/utils/styling';
import { copyToClipboard } from '../utils/clipboard';

function PlatformMark({ platform, className }: { platform: 'mac' | 'windows'; className?: string }) {
	return platform === 'mac' ? (
		<svg
			aria-hidden='true'
			viewBox='0 0 18 20'
			width='16'
			height='18'
			fill='currentColor'
			className={cn('shrink-0', className)}
		>
			<path d='M13.2 3.2C14 2.3 14.3 1.2 14.2 0c-1.1.1-2.3.8-3 1.6-.7.8-1.2 1.9-1.1 3 1.2.1 2.3-.5 3.1-1.4ZM16.7 14.6c-.4 1-1 2-1.7 3-1 1.3-1.9 2.4-3.2 2.4-1.2 0-1.6-.8-3.1-.8s-2 .8-3.2.8C4.2 20 3.3 18.9 2.4 17.6.2 14.5-.7 8.8 1.6 6.3c1-1.1 2.3-1.7 3.7-1.7 1.2 0 2.3.8 3.1.8s2.2-1 3.7-.8c1.3 0 2.7.7 3.5 1.8-3.1 1.9-2.6 6.2 1.1 8.2Z' />
		</svg>
	) : (
		<svg
			aria-hidden='true'
			viewBox='0 0 18 18'
			width='16'
			height='16'
			fill='currentColor'
			className={cn('shrink-0', className)}
		>
			<path d='M0 2.5 7.5 1.4v7H0Zm8.5-1.2L18 0v8.4H8.5ZM0 9.5h7.5v7.1L0 15.5Zm8.5 0H18V18l-9.5-1.3Z' />
		</svg>
	);
}

export interface HeroActionClientProps {
	downloads: DesktopDownloads;
	inviteHandoffHref: string | null;
	shareCopyPayload: string;
	rewardLine: string;
	rewardHighlight?: boolean;
}

export function HeroActionClient({
	downloads,
	inviteHandoffHref,
	shareCopyPayload,
	rewardLine,
	rewardHighlight = false,
}: HeroActionClientProps) {
	const [copied, setCopied] = React.useState(false);
	const resetTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	React.useEffect(() => () => clearTimeout(resetTimer.current), []);

	const installerItems = [
		{
			key: 'macArm64',
			label: 'macOS',
			secondaryLabel: 'Apple 芯片',
			url: downloads.macArm64,
			platform: 'mac' as const,
			primary: true,
		},
		{
			key: 'macX64',
			label: 'macOS',
			secondaryLabel: 'Intel 芯片',
			url: downloads.macX64,
			platform: 'mac' as const,
			primary: false,
		},
		{
			key: 'windows',
			label: 'Windows',
			secondaryLabel: 'Windows',
			url: downloads.windows,
			platform: 'windows' as const,
			primary: false,
		},
	].filter((item): item is typeof item & { url: string } => Boolean(item.url));

	const handleCopy = async () => {
		const ok = await copyToClipboard(shareCopyPayload);
		if (!ok) return;
		setCopied(true);
		clearTimeout(resetTimer.current);
		resetTimer.current = setTimeout(() => setCopied(false), 2600);
	};

	const primaryInstaller = !inviteHandoffHref
		? (installerItems.find((item) => item.primary) ?? installerItems[0] ?? null)
		: null;
	const secondaryInstallers = primaryInstaller
		? installerItems.filter((item) => item.key !== primaryInstaller.key)
		: installerItems;

	const primaryCapsuleClass =
		'group border-foreground text-foreground hover:border-brand hover:text-brand focus-visible:outline-brand inline-flex h-14 items-center gap-4 rounded-full border bg-white py-2 pr-2 pl-6 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2';
	const primaryArrow = (
		<span className='bg-foreground text-background group-hover:bg-brand flex size-10 shrink-0 items-center justify-center rounded-full transition-colors'>
			<Icon
				src={FlatArrowRightIcon}
				className='size-5'
				aria-hidden
			/>
		</span>
	);
	const secondaryLinkClass =
		'hover:text-foreground focus-visible:outline-brand inline-flex min-h-7 items-center gap-1.5 rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2';

	return (
		<div className='mt-8 flex flex-col items-center lg:mt-9'>
			<div className='flex flex-wrap items-center justify-center gap-4'>
				{inviteHandoffHref ? (
					<Link
						href={inviteHandoffHref}
						className={primaryCapsuleClass}
					>
						<span>领取邀请礼并下载</span>
						{primaryArrow}
					</Link>
				) : primaryInstaller ? (
					<a
						href={primaryInstaller.url}
						download
						data-desktop-download=''
						className={primaryCapsuleClass}
					>
						<span>下载 {primaryInstaller.label} 版</span>
						{primaryArrow}
					</a>
				) : (
					<Link
						href='/downloads'
						className={primaryCapsuleClass}
					>
						<span>下载 Sealos Desktop</span>
						{primaryArrow}
					</Link>
				)}

				<button
					type='button'
					onClick={handleCopy}
					aria-label={copied ? '已复制到剪贴板' : '复制链接，到电脑上打开'}
					className={cn(
						'border-foreground text-foreground hover:border-brand hover:text-brand focus-visible:outline-brand inline-flex h-14 cursor-pointer items-center gap-2 rounded-full border border-dashed bg-transparent px-6 py-2 text-base font-medium backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
						copied && 'border-brand text-brand border-solid',
					)}
				>
					{copied && (
						<Icon
							src={CheckIcon}
							strokeWidth={1.5}
							className='size-4 shrink-0'
							aria-hidden
						/>
					)}
					<span aria-live='polite'>{copied ? '已复制' : '复制链接'}</span>
				</button>
			</div>

			<div className='mt-3.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] text-zinc-600'>
				<span className={cn(rewardHighlight && 'text-brand font-medium')}>{rewardLine}</span>
				{(secondaryInstallers.length > 0 || inviteHandoffHref) && (
					<>
						<span
							aria-hidden='true'
							className='hidden h-3 w-px bg-zinc-300 sm:inline-block'
						/>
						{secondaryInstallers.map((item) => (
							<a
								key={item.key}
								href={item.url}
								download
								data-desktop-download=''
								className={secondaryLinkClass}
							>
								<PlatformMark
									platform={item.platform}
									className='size-3.5 text-zinc-600'
								/>
								<span>{item.secondaryLabel}</span>
							</a>
						))}
						{inviteHandoffHref && installerItems.length === 0 && (
							<Link
								href='/downloads'
								className={secondaryLinkClass}
							>
								<span>下载页</span>
							</Link>
						)}
					</>
				)}
			</div>
		</div>
	);
}
