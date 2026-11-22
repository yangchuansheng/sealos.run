import { PainPointIsometricArt } from '../components/PainPointIsometricArt';
import { PAIN_POINTS } from '../utils/cluster.config';

export function PainPointsSection() {
	return (
		<section className='py-12'>
			<div className='container mx-auto px-6'>
				<h2 className='text-foreground text-center text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl'>
					本地养鱼的四个难题，云端一次解决
				</h2>

				<ul className='mt-9 grid grid-cols-1 items-end gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					{PAIN_POINTS.map((item) => (
						<li
							key={item.id}
							className='relative flex flex-col pb-44'
						>
							<div className='relative z-20 -mb-44 flex flex-col'>
								<div className='flex h-56 shrink-0 items-center justify-center px-5 pt-2 pb-1'>
									<PainPointIsometricArt
										id={item.id}
										className='h-52 w-full'
									/>
								</div>
								<div className='flex flex-col gap-2.5 px-6 pt-4 pb-8 text-left'>
									<h3 className='text-foreground text-xl leading-snug font-medium tracking-tight'>
										{item.metric}
									</h3>
									<p className='text-sm leading-relaxed text-zinc-600'>{item.painTitle}</p>
								</div>
							</div>
							<div
								aria-hidden='true'
								className='z-10 -mb-44 h-44 w-full shrink-0 border border-zinc-100 bg-zinc-100'
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
