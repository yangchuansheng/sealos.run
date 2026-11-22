import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { registerHooks } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

registerHooks({
	resolve(specifier, context, nextResolve) {
		if (specifier.startsWith('@/')) {
			const basePath = path.join(repoRoot, specifier.slice(2));
			for (const candidate of [basePath, `${basePath}.ts`, `${basePath}.tsx`, path.join(basePath, 'index.ts')]) {
				if (existsSync(candidate)) {
					return nextResolve(pathToFileURL(candidate).href, context);
				}
			}
		}
		if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file://')) {
			const basePath = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier);
			for (const candidate of [basePath, `${basePath}.ts`, `${basePath}.tsx`, path.join(basePath, 'index.ts')]) {
				if (existsSync(candidate)) {
					return nextResolve(pathToFileURL(candidate).href, context);
				}
			}
		}
		return nextResolve(specifier, context);
	},
});

const { DAFEIYU_TEMPLATE_SLUGS, HUB_CANONICAL_URL, isDafeiyuTemplateSlug, SPOKE_ARTICLES } = await import(
	'../libs/seo/deepseek-harness.ts'
);
const { buildDeepseekHarnessJsonLd, DEEPSEEK_HARNESS_FAQS, DEEPSEEK_HARNESS_STEPS, DIARY_DEMO_CONFIG } = await import(
	'../app/[locale]/(landing)/use-cases/deepseek-harness/utils/cluster.config.ts'
);
const { buildInviteHandoffHref, buildShareCopyPayload, parseValidInviteCode } = await import(
	'../app/[locale]/(landing)/use-cases/deepseek-harness/utils/invite.ts'
);
const { calculateTierCost, DAFEIYU_CREDIT_CNY, DAFEIYU_TIERS, DOMESTIC_REGION_IDS } = await import(
	'../libs/pricing/deepseek-harness.ts'
);
const { buildUseCasesIndexJsonLd, USE_CASE_CARDS } = await import(
	'../app/[locale]/(landing)/use-cases/utils/use-cases.config.ts'
);
const { buildBlogPostJsonLd, buildCanonicalBlogUrl } = await import('../libs/blog/seo.ts');
const { buildLlmsTxt } = await import('../libs/seo/llms.ts');

test('calculates all 4 tiers across bja, gzg, and hzh matching payg.config unit prices for 720h', () => {
	assert.deepEqual(DOMESTIC_REGION_IDS, ['bja', 'gzg', 'hzh']);
	assert.equal(DAFEIYU_TIERS.length, 4);
	assert.equal(DAFEIYU_CREDIT_CNY, 10);

	// Independent worked expectations from payg.config.ts unitPricesByRegion * 720h (30 days)
	const expected = {
		bja: {
			'astrbot-basic': {
				computeAndStorageMonthly: 4.72,
				portMonthly: 5.04,
				monthlyTotal: 9.76,
				dailyAverage: 0.33,
				creditCoverageDays: 30,
			},
			'maibot-companion': {
				computeAndStorageMonthly: 5.1,
				portMonthly: 5.04,
				monthlyTotal: 10.14,
				dailyAverage: 0.34,
				creditCoverageDays: 29,
			},
			'astrbot-napcat': {
				computeAndStorageMonthly: 10.67,
				portMonthly: 5.04,
				monthlyTotal: 15.71,
				dailyAverage: 0.52,
				creditCoverageDays: 19,
			},
			'astrbot-napcat-pg': {
				computeAndStorageMonthly: 24.94,
				portMonthly: 5.04,
				monthlyTotal: 29.98,
				dailyAverage: 1.0,
				creditCoverageDays: 10,
			},
		},
		gzg: {
			'astrbot-basic': {
				computeAndStorageMonthly: 4.8,
				portMonthly: 5.04,
				monthlyTotal: 9.84,
				dailyAverage: 0.33,
				creditCoverageDays: 30,
			},
			'maibot-companion': {
				computeAndStorageMonthly: 5.18,
				portMonthly: 5.04,
				monthlyTotal: 10.22,
				dailyAverage: 0.34,
				creditCoverageDays: 29,
			},
			'astrbot-napcat': {
				computeAndStorageMonthly: 10.85,
				portMonthly: 5.04,
				monthlyTotal: 15.89,
				dailyAverage: 0.53,
				creditCoverageDays: 18,
			},
			'astrbot-napcat-pg': {
				computeAndStorageMonthly: 25.37,
				portMonthly: 5.04,
				monthlyTotal: 30.41,
				dailyAverage: 1.01,
				creditCoverageDays: 9,
			},
		},
		hzh: {
			'astrbot-basic': {
				computeAndStorageMonthly: 7.63,
				portMonthly: 10.01,
				monthlyTotal: 17.63,
				dailyAverage: 0.59,
				creditCoverageDays: 17,
			},
			'maibot-companion': {
				computeAndStorageMonthly: 8.23,
				portMonthly: 10.01,
				monthlyTotal: 18.24,
				dailyAverage: 0.61,
				creditCoverageDays: 16,
			},
			'astrbot-napcat': {
				computeAndStorageMonthly: 17.24,
				portMonthly: 10.01,
				monthlyTotal: 27.25,
				dailyAverage: 0.91,
				creditCoverageDays: 11,
			},
			'astrbot-napcat-pg': {
				computeAndStorageMonthly: 40.3,
				portMonthly: 10.01,
				monthlyTotal: 50.31,
				dailyAverage: 1.68,
				creditCoverageDays: 5,
			},
		},
	};

	for (const regionId of DOMESTIC_REGION_IDS) {
		for (const tier of DAFEIYU_TIERS) {
			const result = calculateTierCost(tier.id, regionId);
			const want = expected[regionId][tier.id];
			assert.equal(
				Number(result.computeAndStorageMonthly.toFixed(2)),
				want.computeAndStorageMonthly,
				`${regionId}/${tier.id} compute+storage`,
			);
			assert.equal(Number(result.portMonthly.toFixed(2)), want.portMonthly, `${regionId}/${tier.id} port`);
			assert.equal(Number(result.monthlyTotal.toFixed(2)), want.monthlyTotal, `${regionId}/${tier.id} monthly`);
			assert.equal(Number(result.dailyAverage.toFixed(2)), want.dailyAverage, `${regionId}/${tier.id} daily`);
			assert.equal(result.creditCoverageDays, want.creditCoverageDays, `${regionId}/${tier.id} credit days`);
		}
	}
});

test('validates invite codes strictly against the 8-char backend alphabet and ignores invalid input', () => {
	assert.equal(parseValidInviteCode('ABCD2345'), 'ABCD2345');
	assert.equal(parseValidInviteCode('  WXYZ6789  '), 'WXYZ6789');
	assert.equal(parseValidInviteCode(['EFGH2345', 'IGNORED1']), 'EFGH2345');

	for (const invalid of [
		undefined,
		'',
		'   ',
		'abcd2345',
		'ABCD234',
		'ABCD23456',
		'ABCD0123',
		'ABCDO234',
		'ABCDI234',
		'ABCDL234',
		'ABCD1234',
		'../admin',
		'<script>',
		'ABCD2345&next=https://evil.test',
	]) {
		assert.equal(parseValidInviteCode(invalid), null, `expected invalid for ${String(invalid)}`);
	}

	assert.equal(buildInviteHandoffHref('ABCD2345'), '/invite/ABCD2345');
	assert.equal(buildInviteHandoffHref('bad'), null);

	const payloadWithInvite = buildShareCopyPayload('ABCD2345');
	assert.match(payloadWithInvite, /https:\/\/sealos\.run\/use-cases\/deepseek-harness\?invite=ABCD2345/);

	const payloadWithoutInvite = buildShareCopyPayload('bad<script>');
	assert.match(payloadWithoutInvite, /https:\/\/sealos\.run\/use-cases\/deepseek-harness(?!\?invite=)/);
	assert.equal(payloadWithoutInvite.includes('bad<script>'), false);
});

test('builds Hub 6-node JSON-LD @graph synchronized with visible steps and FAQs and stripped of query params', () => {
	const graph = buildDeepseekHarnessJsonLd()['@graph'];
	const types = graph.map((node) => node['@type']);
	assert.deepEqual(types, ['Organization', 'WebPage', 'BreadcrumbList', 'SoftwareApplication', 'HowTo', 'FAQPage']);

	const org = graph.find((node) => node['@type'] === 'Organization');
	assert.equal(org['@id'], 'https://sealos.run/#organization');
	assert.equal(org.name, 'Sealos');
	assert.ok(org.sameAs.some((url) => url.includes('github.com/labring/sealos')));
	assert.ok(org.sameAs.some((url) => url.includes('bilibili.com')));
	assert.ok(org.sameAs.some((url) => url.includes('mp.weixin.qq.com')));

	const webPage = graph.find((node) => node['@type'] === 'WebPage');
	assert.equal(webPage.url, 'https://sealos.run/use-cases/deepseek-harness');
	assert.equal(webPage.inLanguage, 'zh-CN');

	const howTo = graph.find((node) => node['@type'] === 'HowTo');
	assert.equal(howTo.totalTime, 'PT5M');
	assert.equal(howTo.step.length, 3);
	assert.equal(howTo.step.length, DEEPSEEK_HARNESS_STEPS.length);

	const faqPage = graph.find((node) => node['@type'] === 'FAQPage');
	assert.equal(faqPage.mainEntity.length, 8);
	assert.equal(faqPage.mainEntity.length, DEEPSEEK_HARNESS_FAQS.length);
	assert.equal(HUB_CANONICAL_URL, 'https://sealos.run/use-cases/deepseek-harness');
	assert.deepEqual(DAFEIYU_TEMPLATE_SLUGS, ['astrbot', 'maibot']);
	assert.equal(isDafeiyuTemplateSlug('AstrBot'), true);
	assert.equal(isDafeiyuTemplateSlug('maibot'), true);
	assert.equal(isDafeiyuTemplateSlug('dify'), false);
	assert.equal(SPOKE_ARTICLES.length, 5);
	for (const article of SPOKE_ARTICLES) {
		assert.ok(article.shortLabel.length > 0);
	}
	assert.equal(DIARY_DEMO_CONFIG.isLiveDemo, false);
	assert.equal(DIARY_DEMO_CONFIG.publicHost, 'dafeiyu-diary.sealosbja.site');

	const serialized = JSON.stringify(graph);
	assert.equal(/sealox/i.test(serialized), false);
});

test('builds /use-cases index CollectionPage + BreadcrumbList JSON-LD with 4 real cards', () => {
	assert.equal(USE_CASE_CARDS.length, 4);
	assert.equal(USE_CASE_CARDS[1].href, '/products/appstore?q=openclaw#templates');
	assert.equal(USE_CASE_CARDS[2].href, '/use-cases/deepseek-harness#maibot');
	assert.equal(USE_CASE_CARDS[2].secondaryLink?.href, '/products/appstore?q=maibot#templates');
	assert.equal(USE_CASE_CARDS[3].href, '/downloads#download');
	const graph = buildUseCasesIndexJsonLd()['@graph'];
	assert.deepEqual(
		graph.map((node) => node['@type']),
		['CollectionPage', 'BreadcrumbList'],
	);
	assert.equal(graph[0].url, 'https://sealos.run/use-cases');
});

test('builds Blog detail canonical URL and Article + BreadcrumbList + optional FAQPage JSON-LD', () => {
	assert.equal(
		buildCanonicalBlogUrl('/blog/deepseek-harness-blue-whale-guide'),
		'https://sealos.run/blog/deepseek-harness-blue-whale-guide',
	);

	const withoutFaq = buildBlogPostJsonLd({
		title: 'Kubernetes 指南',
		description: '实战指南',
		url: '/blog/k8s-guide',
		date: '2026-11-19',
		author: 'Sealos 工程团队',
	});
	assert.deepEqual(
		withoutFaq['@graph'].map((node) => node['@type']),
		['Article', 'BreadcrumbList'],
	);

	const withFaq = buildBlogPostJsonLd({
		title: '大肥鱼是什么？',
		description: '实体百科',
		url: '/blog/deepseek-harness-blue-whale-guide',
		date: '2026-11-19',
		author: 'Sealos 工程团队',
		faqs: [{ question: '什么是蓝色大肥鱼？', answer: 'DeepSeek 社区对桌面与聊天伴侣的昵称。' }],
	});
	assert.deepEqual(
		withFaq['@graph'].map((node) => node['@type']),
		['Article', 'BreadcrumbList', 'FAQPage'],
	);
	assert.equal(withFaq['@graph'][2].mainEntity.length, 1);
});

test('builds /llms.txt containing core routes, Hub, all 5 Spoke URLs, and zero Sealox mentions', () => {
	const content = buildLlmsTxt();
	for (const requiredUrl of [
		'https://sealos.run/downloads',
		'https://sealos.run/pricing/payg',
		'https://sealos.run/use-cases',
		'https://sealos.run/use-cases/deepseek-harness',
		'https://sealos.run/blog/deepseek-harness-blue-whale-guide',
		'https://sealos.run/blog/deploy-deepseek-qq-bot-astrbot-napcat',
		'https://sealos.run/blog/deepseek-bot-memory-database-rate-limit',
		'https://sealos.run/blog/deepseek-bot-hosting-cost-comparison',
		'https://sealos.run/blog/deepseek-whale-persona-diary-template',
	]) {
		assert.ok(content.includes(requiredUrl), `missing ${requiredUrl} in llms.txt`);
	}
	assert.equal(/sealox/i.test(content), false);
});
