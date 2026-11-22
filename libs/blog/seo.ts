import { ORGANIZATION_SAME_AS, SITE_NAME, SITE_URL } from '@/libs/seo/deepseek-harness';

export interface BlogFaqItem {
	question: string;
	answer: string;
}

export interface BlogPostSeoInput {
	title: string;
	description: string;
	url: string;
	date?: string;
	author?: string;
	tags?: string[];
	faqs?: BlogFaqItem[];
}

export function buildCanonicalBlogUrl(normalizedUrl: string): string {
	const cleanPath = normalizedUrl.startsWith('/') ? normalizedUrl : `/${normalizedUrl}`;
	return `${SITE_URL}${cleanPath}`;
}

export function buildBlogPostJsonLd(input: BlogPostSeoInput) {
	const canonicalUrl = buildCanonicalBlogUrl(input.url);
	const authorName = input.author?.trim() || 'Sealos 工程团队';

	const graph: Record<string, unknown>[] = [
		{
			'@type': 'Article',
			'@id': `${canonicalUrl}#article`,
			headline: input.title,
			description: input.description,
			url: canonicalUrl,
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': canonicalUrl,
			},
			inLanguage: 'zh-CN',
			...(input.date ? { datePublished: input.date, dateModified: input.date } : {}),
			...(input.tags && input.tags.length > 0 ? { keywords: input.tags.join(', ') } : {}),
			author: {
				'@type': 'Organization',
				name: authorName,
				url: SITE_URL,
			},
			publisher: {
				'@type': 'Organization',
				'@id': `${SITE_URL}/#organization`,
				name: SITE_NAME,
				url: SITE_URL,
				logo: {
					'@type': 'ImageObject',
					url: `${SITE_URL}/favicon/favicon-96x96.png`,
				},
				sameAs: [...ORGANIZATION_SAME_AS],
			},
		},
		{
			'@type': 'BreadcrumbList',
			'@id': `${canonicalUrl}#breadcrumb`,
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: '首页',
					item: SITE_URL,
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: '博客',
					item: `${SITE_URL}/blog`,
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: input.title,
					item: canonicalUrl,
				},
			],
		},
	];

	const validFaqs = (input.faqs ?? []).filter((item) => item.question.trim() && item.answer.trim());
	if (validFaqs.length > 0) {
		graph.push({
			'@type': 'FAQPage',
			'@id': `${canonicalUrl}#faq`,
			mainEntity: validFaqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer,
				},
			})),
		});
	}

	return {
		'@context': 'https://schema.org',
		'@graph': graph,
	};
}
