import { ChevronDownIcon } from '@/assets/icons';
import { LandingOutlineButton } from '@/libs/components/LandingOutlineButton';
import { Icon } from '@/libs/components/ui/icon';
import { USE_CASES_PATH } from '@/libs/seo/deepseek-harness';
import { cn } from '@/libs/utils/styling';
import { DEEPSEEK_HARNESS_FAQS, INDEPENDENT_DISCLAIMER } from '../utils/cluster.config';
import faqStyles from './FaqAccordion.module.css';

export function FaqAndCtaSection() {
	return (
		<>
			<section
				aria-labelledby='faq-heading'
				className='py-12'
			>
				<div className='container mx-auto px-6'>
					<h2
						id='faq-heading'
						className='text-foreground text-center text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl'
					>
						常见问题
					</h2>

					<div className='mt-7 w-full'>
						{DEEPSEEK_HARNESS_FAQS.map((faq, index) => (
							<details
								key={faq.question}
								open={index === 0}
								className={cn(
									faqStyles['item'],
									'group border-muted-foreground border-b-[0.5px] border-dashed last:border-b-0',
								)}
							>
								<summary className='focus-visible:outline-brand text-foreground flex cursor-pointer list-none items-center justify-between gap-6 px-0 py-3 text-base leading-snug font-medium transition-colors hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden'>
									<span className='text-pretty'>{faq.question}</span>
									<Icon
										src={ChevronDownIcon}
										className='text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-open:rotate-180'
										aria-hidden
									/>
								</summary>
								<p className='m-0 max-w-[620px] px-0 pt-1 pb-3.5 text-[15px] leading-[1.68] whitespace-pre-wrap text-pretty text-zinc-600'>
									{faq.answer}
								</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className='w-full bg-zinc-100 py-10'>
				<div className='container mx-auto px-6'>
					<div className='flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-center'>
						<div className='flex flex-col items-start gap-3'>
							<h2 className='text-foreground max-w-2xl text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl'>
								首登实名领 <span className='text-brand'>¥10 体验金</span>，给大肥鱼安个云端小窝
							</h2>
							<p className='text-sm text-zinc-600'>{INDEPENDENT_DISCLAIMER}</p>
						</div>

						<div className='flex w-full shrink-0 flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center'>
							<LandingOutlineButton
								href={USE_CASES_PATH}
								size='lg'
								borderStyle='dashed'
								showIcon={false}
								className='w-full text-base font-medium sm:w-auto'
							>
								更多场景
							</LandingOutlineButton>
							<LandingOutlineButton
								href='/downloads'
								size='lg'
								borderStyle='solid'
								className='w-full text-base font-medium sm:w-auto'
							>
								下载 Sealos Desktop
							</LandingOutlineButton>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
