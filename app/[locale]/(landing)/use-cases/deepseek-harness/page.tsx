import type { Metadata } from 'next';
import { getPrimaryLocale } from '@/libs/i18n/routing';
import { HUB_CANONICAL_URL, HUB_PATH, SITE_NAME, SITE_URL } from '@/libs/seo/deepseek-harness';
import { getDesktopDownloads } from '@/libs/utils/desktop-downloads';
import { CostAndComparisonSection } from './sections/CostAndComparisonSection';
import { DiaryDemoSection } from './sections/DiaryDemoSection';
import { FaqAndCtaSection } from './sections/FaqAndCtaSection';
import { HeroSection } from './sections/HeroSection';
import { PainPointsSection } from './sections/PainPointsSection';
import { SpokeArticlesSection } from './sections/SpokeArticlesSection';
import { WorkflowSection } from './sections/WorkflowSection';
import { buildDeepseekHarnessJsonLd, HUB_META } from './utils/cluster.config';
import { buildInviteHandoffHref, buildShareCopyPayload, parseValidInviteCode } from './utils/invite';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const isIndexableLocale = getPrimaryLocale(locale) === 'zh';

	return {
		metadataBase: new URL(SITE_URL),
		title: HUB_META.title,
		description: HUB_META.description,
		alternates: {
			canonical: HUB_PATH,
			languages: {
				zh: HUB_PATH,
			},
		},
		openGraph: {
			type: 'website',
			siteName: SITE_NAME,
			url: HUB_CANONICAL_URL,
			title: HUB_META.title,
			description: HUB_META.description,
			locale: 'zh_CN',
		},
		twitter: {
			card: 'summary_large_image',
			site: '@Sealos_io',
			title: HUB_META.title,
			description: HUB_META.description,
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

export default async function DeepseekHarnessPage({
	params,
	searchParams,
}: {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ invite?: string | string[] }>;
}) {
	const [{ locale }, resolvedSearchParams, downloads] = await Promise.all([
		params,
		searchParams,
		getDesktopDownloads(),
	]);
	const isZh = getPrimaryLocale(locale) === 'zh';
	const validInviteCode = parseValidInviteCode(resolvedSearchParams.invite);
	const inviteHandoffHref = buildInviteHandoffHref(validInviteCode ?? undefined);
	const shareCopyPayload = buildShareCopyPayload(validInviteCode ?? undefined);
	const jsonLd = buildDeepseekHarnessJsonLd();

	return (
		<div className='bg-background flex w-full flex-col'>
			{isZh && (
				<script
					type='application/ld+json'
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires raw HTML injection
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}

			<HeroSection
				downloads={downloads}
				inviteHandoffHref={inviteHandoffHref}
				shareCopyPayload={shareCopyPayload}
			/>

			<PainPointsSection />

			<WorkflowSection />

			<CostAndComparisonSection />

			<DiaryDemoSection />

			<section className='py-12'>
				<div className='container mx-auto px-6'>
					<SpokeArticlesSection />
				</div>
			</section>

			<FaqAndCtaSection />
		</div>
	);
}
