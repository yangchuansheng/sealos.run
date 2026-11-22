'use client';

import React from 'react';
import { CheckIcon } from '@/assets/icons';
import { Icon } from '@/libs/components/ui/icon';
import { cn } from '@/libs/utils/styling';
import { copyToClipboard } from '../utils/clipboard';
import type { AgentPromptCard } from '../utils/cluster.config';
import { CopyIcon } from './CopyIcon';

export function PromptCopyCards({
	prompts,
	heading,
}: {
	prompts: readonly AgentPromptCard[];
	heading?: string;
	activeIndex?: number;
}) {
	const [copiedId, setCopiedId] = React.useState<string | null>(null);
	const resetTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	React.useEffect(() => () => clearTimeout(resetTimer.current), []);

	const handleCopy = async (card: AgentPromptCard) => {
		const ok = await copyToClipboard(card.prompt);
		if (!ok) return;
		setCopiedId(card.id);
		clearTimeout(resetTimer.current);
		resetTimer.current = setTimeout(() => setCopiedId(null), 2200);
	};

	return (
		<div className='mt-6 w-full'>
			{heading && <h2 className='mb-2.5 text-left text-xs font-medium tracking-wide text-zinc-600'>{heading}</h2>}
			<ul className='grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-8'>
				{prompts.map((item) => {
					const isCopied = copiedId === item.id;
					return (
						<li
							key={item.id}
							data-prompt-card={item.id}
							className='group flex flex-col border-t border-zinc-200 pt-3.5'
						>
							<button
								type='button'
								data-prompt-copy-btn={item.id}
								onClick={() => handleCopy(item)}
								aria-label={isCopied ? `已复制：${item.title}` : `复制指令：${item.title}`}
								title={isCopied ? '已复制' : '点击复制指令'}
								className='focus-visible:outline-brand group/btn flex h-full w-full cursor-pointer flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-4'
							>
								<span className='flex w-full items-center justify-between gap-3'>
									<h3
										className={cn(
											'text-foreground group-hover/btn:text-brand text-[15px] leading-snug font-semibold transition-colors',
											isCopied && 'text-brand',
										)}
									>
										{item.title}
									</h3>
									<span
										className={cn(
											'inline-flex size-6 shrink-0 items-center justify-center text-zinc-400 opacity-0 transition-all group-hover/btn:text-brand group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100',
											isCopied && 'text-brand opacity-100',
										)}
									>
										{isCopied ? (
											<Icon
												src={CheckIcon}
												strokeWidth={1.75}
												className='size-4'
												aria-hidden
											/>
										) : (
											<CopyIcon className='size-3.5' />
										)}
									</span>
								</span>
								<p className='mt-1.5 text-[13.5px] leading-[1.65] text-pretty text-zinc-600'>
									{item.prompt}
								</p>
							</button>
							<span
								className='sr-only'
								aria-live='polite'
							>
								{isCopied ? '已复制' : ''}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
