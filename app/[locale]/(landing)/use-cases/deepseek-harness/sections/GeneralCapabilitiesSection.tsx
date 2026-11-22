import { Link } from '@/libs/i18n/navigation';
import { GENERAL_CAPABILITIES, TRUST_ENDORSEMENTS } from '../utils/cluster.config';

export function GeneralCapabilitiesSection() {
	return (
		<div className='mt-9 border-y border-zinc-200 py-5'>
			<h2 className='mb-4 text-center text-xs font-medium text-zinc-600'>从个人 AI 伴侣到生产级云交付</h2>

			<ul className='grid grid-cols-2 gap-y-4 lg:grid-cols-4 lg:divide-x lg:divide-zinc-200'>
				{TRUST_ENDORSEMENTS.map((value, index) => {
					const capability = GENERAL_CAPABILITIES[index];
					return (
						<li
							key={value}
							className='flex flex-col items-center justify-center px-4 text-center'
						>
							<span className='text-foreground text-2xl leading-none font-medium tracking-tight tabular-nums lg:text-[28px]'>
								{value}
							</span>
							{capability && (
								<Link
									href={capability.href}
									className='focus-visible:outline-brand hover:text-brand mt-2 text-xs leading-none font-normal text-zinc-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm'
								>
									<h3>{capability.title}</h3>
								</Link>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
