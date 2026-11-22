import { WorkflowStepperClient } from '../components/CanvasPreviewCard';
import { AGENT_PROMPTS, DEEPSEEK_HARNESS_STEPS } from '../utils/cluster.config';

export function WorkflowSection() {
	return (
		<section className='py-12 lg:pb-16'>
			<div className='container mx-auto px-6'>
				<h2 className='text-foreground text-center text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl'>
					5 分钟完成云端上线
				</h2>

				<WorkflowStepperClient
					steps={DEEPSEEK_HARNESS_STEPS}
					prompts={AGENT_PROMPTS}
					promptHeading='复制给 Agent'
				/>
			</div>
		</section>
	);
}
