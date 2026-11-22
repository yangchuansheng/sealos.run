'use client';

import React from 'react';
import { FlatArrowRightIcon, XIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { Link } from '@/libs/i18n/navigation';
import { HUB_PATH } from '@/libs/seo/deepseek-harness';

const DISMISSED_KEY = 'sealos-dafeiyu-campaign-banner-dismissed-v1';

export function DafeiyuCampaignBanner() {
	const enabled = process.env['NEXT_PUBLIC_DAFEIYU_CAMPAIGN_BANNER'] === 'true';
	const [dismissed, setDismissed] = React.useState(false);

	React.useEffect(() => {
		if (!enabled) return;
		try {
			if (localStorage.getItem(DISMISSED_KEY) === '1') {
				setDismissed(true);
			}
		} catch {
			// Ignore storage errors and keep banner dismissible for the session.
		}
	}, [enabled]);

	if (!enabled || dismissed) {
		return null;
	}

	const handleDismiss = () => {
		setDismissed(true);
		try {
			localStorage.setItem(DISMISSED_KEY, '1');
		} catch {
			// Ignore storage errors.
		}
	};

	return (
		<div
			data-dafeiyu-campaign-banner=''
			className='border-brand/40 bg-blue-50/70 border-b'
		>
			<div className='container mx-auto flex items-center justify-between gap-4 px-6 py-2.5 text-xs sm:text-sm'>
				<div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
					<span className='bg-brand size-1.5 shrink-0 rounded-full' />
					<span className='text-foreground font-medium'>
						DeepSeek 大肥鱼（AstrBot / MaiBot）24 小时云端部署专题上线 · 首登实名领 ¥10 体验金
					</span>
					<Link
						href={HUB_PATH}
						className='text-brand inline-flex items-center gap-1 font-medium hover:underline'
					>
						<span>查看部署方案</span>
						<Icon
							src={FlatArrowRightIcon}
							className='size-3.5'
							aria-hidden
						/>
					</Link>
				</div>
				<button
					type='button'
					onClick={handleDismiss}
					aria-label='关闭专题提示条'
					className='text-muted-foreground hover:text-foreground shrink-0 rounded-full p-1 transition-colors'
				>
					<Icon
						src={XIcon}
						className='size-4'
						aria-hidden
					/>
				</button>
			</div>
		</div>
	);
}
