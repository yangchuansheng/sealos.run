import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import test, { after, before } from 'node:test';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function findStandaloneServer(rootDir) {
	const standaloneRoot = path.join(rootDir, '.next', 'standalone');
	if (!fs.existsSync(standaloneRoot)) {
		return null;
	}
	const directServer = path.join(standaloneRoot, 'server.js');
	if (fs.existsSync(directServer)) {
		return directServer;
	}
	const queue = [standaloneRoot];
	while (queue.length > 0) {
		const current = queue.shift();
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			if (entry.name === 'node_modules' || entry.name === '.next') {
				continue;
			}
			const fullPath = path.join(current, entry.name);
			if (entry.isFile() && entry.name === 'server.js') {
				return fullPath;
			}
			if (entry.isDirectory()) {
				queue.push(fullPath);
			}
		}
	}
	return null;
}

const SPOKE_SLUGS = [
	'deepseek-harness-blue-whale-guide',
	'deploy-deepseek-qq-bot-astrbot-napcat',
	'deepseek-bot-memory-database-rate-limit',
	'deepseek-bot-hosting-cost-comparison',
	'deepseek-whale-persona-diary-template',
];

function getFreePort() {
	return new Promise((resolve, reject) => {
		const server = net.createServer();
		server.unref();
		server.on('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			if (!address || typeof address === 'string') {
				server.close();
				reject(new Error('failed to acquire ephemeral port'));
				return;
			}
			const { port } = address;
			server.close(() => resolve(port));
		});
	});
}

async function waitForServer(baseUrl, timeoutMs = 20000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const response = await fetch(`${baseUrl}/llms.txt`);
			if (response.status === 200 || response.status === 404) {
				return;
			}
		} catch {
			// Server still starting.
		}
		await new Promise((resolve) => setTimeout(resolve, 250));
	}
	throw new Error(`server did not become ready at ${baseUrl} within ${timeoutMs}ms`);
}

function extractCanonical(html) {
	const match =
		html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) ??
		html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
	return match?.[1] ?? null;
}

function extractJsonLdScripts(html) {
	const matches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
	return matches.map((match) => JSON.parse(match[1]));
}

function stripAnchorHrefs(html) {
	return html.replace(/href=["'][^"']*["']/gi, 'href=""');
}

function stripScripts(html) {
	return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

let serverProcess = null;
let baseUrl = process.env['TEST_BASE_URL'] ?? '';
let serverLogs = '';

before(async () => {
	if (baseUrl) {
		return;
	}
	const port = await getFreePort();
	baseUrl = `http://localhost:${port}`;
	const standaloneServer = findStandaloneServer(repoRoot);
	serverProcess = standaloneServer
		? spawn(process.execPath, [standaloneServer], {
				cwd: path.dirname(standaloneServer),
				env: { ...process.env, NODE_ENV: 'production', HOSTNAME: 'localhost', PORT: String(port) },
				stdio: ['ignore', 'pipe', 'pipe'],
			})
		: spawn('pnpm', ['exec', 'next', 'start', '-H', 'localhost', '-p', String(port)], {
				cwd: repoRoot,
				env: { ...process.env, NODE_ENV: 'production' },
				stdio: ['ignore', 'pipe', 'pipe'],
			});
	serverProcess.stdout?.on('data', (chunk) => {
		serverLogs += chunk.toString();
	});
	serverProcess.stderr?.on('data', (chunk) => {
		serverLogs += chunk.toString();
	});
	try {
		await waitForServer(baseUrl);
	} catch (error) {
		throw new Error(`${error instanceof Error ? error.message : String(error)}\n${serverLogs}`);
	}
});

after(() => {
	if (serverProcess && !serverProcess.killed) {
		serverProcess.kill('SIGTERM');
	}
});

test('GET /use-cases returns HTTP 200 with 4 use-case cards, canonical, and CollectionPage JSON-LD', async () => {
	const response = await fetch(`${baseUrl}/use-cases`);
	assert.equal(response.status, 200);
	const html = await response.text();

	assert.match(html, /<title>Sealos 热门使用场景/);
	assert.match(html, /<h1[^>]*>/);
	assert.equal(extractCanonical(html), 'https://sealos.run/use-cases');

	for (const href of [
		'/use-cases/deepseek-harness',
		'/products/appstore',
		'/use-cases/deepseek-harness#maibot',
		'/downloads',
	]) {
		assert.ok(html.includes(href), `missing use-case card link ${href}`);
	}

	const jsonLdList = extractJsonLdScripts(html);
	assert.ok(jsonLdList.length >= 1, 'expected JSON-LD on /use-cases');
	const graph = jsonLdList[0]['@graph'];
	assert.deepEqual(
		graph.map((node) => node['@type']),
		['CollectionPage', 'BreadcrumbList'],
	);
	assert.equal(/Sealox/.test(html), false);
	assert.equal(/sealox/i.test(stripAnchorHrefs(html)), false);
});

test('GET /use-cases/deepseek-harness satisfies full Hub SEO, GEO, CTA, FAQ, and Schema contract', async () => {
	const response = await fetch(`${baseUrl}/use-cases/deepseek-harness`);
	assert.equal(response.status, 200);
	const html = await response.text();

	assert.match(html, /<title>DeepSeek 大肥鱼 &amp; DeepSeek Harness 云端部署指南/);
	assert.ok(html.includes('给你的大肥鱼一个'));
	assert.ok(html.includes('24 小时'));
	assert.ok(html.includes('在线的云端小窝'));
	assert.ok(html.includes('电脑关机也在线，重启不失忆'));
	assert.ok(html.includes('独立于 DeepSeek 官方'));
	assert.ok(html.includes('dafeiyu-diary.sealosbja.site'));
	assert.ok(html.includes('data-desktop-download'), 'missing data-desktop-download on installer links');
	assert.equal(extractCanonical(html), 'https://sealos.run/use-cases/deepseek-harness');

	for (const slug of SPOKE_SLUGS) {
		assert.ok(html.includes(`/blog/${slug}`), `missing Spoke link /blog/${slug}`);
	}

	assert.match(html, /<table[\s\S]*Sealos[\s\S]*本地电脑[\s\S]*闲置手机[\s\S]*云服务器包月/);

	const jsonLdList = extractJsonLdScripts(html);
	assert.ok(jsonLdList.length >= 1, 'expected JSON-LD on Hub');
	const graph = jsonLdList[0]['@graph'];
	assert.deepEqual(
		graph.map((node) => node['@type']),
		['Organization', 'WebPage', 'BreadcrumbList', 'SoftwareApplication', 'HowTo', 'FAQPage'],
	);

	const faqNode = graph.find((node) => node['@type'] === 'FAQPage');
	assert.equal(faqNode.mainEntity.length, 8);
	for (const entry of faqNode.mainEntity) {
		assert.ok(html.includes(entry.name), `FAQ question from JSON-LD missing in visible HTML: ${entry.name}`);
		assert.ok(
			html.includes(entry.acceptedAnswer.text),
			`FAQ answer from JSON-LD missing in visible SSR HTML: ${entry.name}`,
		);
	}

	assert.equal(
		/<a[^>]*href="\/downloads"[^>]*data-desktop-download/i.test(html),
		false,
		'fallback /downloads link must not carry data-desktop-download',
	);

	assert.equal(/Sealox/.test(html), false);
	assert.equal(/sealox/i.test(JSON.stringify(graph)), false);
});

test('Hub ?invite=<code> preserves canonical without query params and strictly validates invite code', async () => {
	const validResponse = await fetch(
		`${baseUrl}/use-cases/deepseek-harness?invite=ABCD2345&utm_source=bilibili&utm_campaign=dafeiyu`,
	);
	assert.equal(validResponse.status, 200);
	const validHtml = await validResponse.text();
	assert.equal(extractCanonical(validHtml), 'https://sealos.run/use-cases/deepseek-harness');
	assert.ok(validHtml.includes('/invite/ABCD2345'), 'valid invite code should generate /invite/ABCD2345 link');
	assert.ok(validHtml.includes('领取邀请礼并下载'), 'valid invite code should switch primary CTA to invite handoff');
	assert.equal(
		/<a[^>]*href="\/invite\/ABCD2345"[^>]*data-desktop-download/i.test(validHtml),
		false,
		'invite handoff link must not carry data-desktop-download',
	);
	const validGraph = extractJsonLdScripts(validHtml)[0]['@graph'];
	assert.equal(
		validGraph.find((node) => node['@type'] === 'WebPage').url,
		'https://sealos.run/use-cases/deepseek-harness',
	);

	const invalidResponse = await fetch(`${baseUrl}/use-cases/deepseek-harness?invite=INVALID999`);
	assert.equal(invalidResponse.status, 200);
	const invalidHtml = await invalidResponse.text();
	assert.equal(extractCanonical(invalidHtml), 'https://sealos.run/use-cases/deepseek-harness');
	assert.equal(
		invalidHtml.includes('/invite/INVALID999'),
		false,
		'invalid invite code must not produce /invite/ link',
	);
	assert.equal(
		stripScripts(invalidHtml).includes('INVALID999'),
		false,
		'invalid invite code must not be reflected in visible DOM or head metadata',
	);
});

test('All 5 Spoke blog routes return HTTP 200 with canonical, Article+BreadcrumbList+FAQPage JSON-LD, and Hub links', async () => {
	for (const slug of SPOKE_SLUGS) {
		const response = await fetch(`${baseUrl}/blog/${slug}`);
		assert.equal(response.status, 200, `/blog/${slug} status`);
		const html = await response.text();
		assert.equal(extractCanonical(html), `https://sealos.run/blog/${slug}`);
		assert.ok(html.includes('/use-cases/deepseek-harness'), `/blog/${slug} missing Hub link`);
		for (const siblingSlug of SPOKE_SLUGS) {
			if (siblingSlug === slug) continue;
			const matches = html.match(new RegExp(`/blog/${siblingSlug}`, 'g')) ?? [];
			assert.ok(
				matches.length >= 2,
				`/blog/${slug} should link sibling /blog/${siblingSlug} in both top and bottom cluster banners`,
			);
		}

		const jsonLdList = extractJsonLdScripts(html);
		assert.ok(jsonLdList.length >= 1, `/blog/${slug} missing JSON-LD`);
		const types = jsonLdList[0]['@graph'].map((node) => node['@type']);
		assert.deepEqual(types, ['Article', 'BreadcrumbList', 'FAQPage'], `/blog/${slug} JSON-LD graph types`);
		assert.equal(/Sealox/.test(html), false, `/blog/${slug} contains Sealox`);
	}
});

test('GET /llms.txt and GET /sitemap.xml expose /use-cases, Hub, and all 5 Spoke URLs', async () => {
	const llmsResponse = await fetch(`${baseUrl}/llms.txt`);
	assert.equal(llmsResponse.status, 200);
	const llmsText = await llmsResponse.text();
	assert.ok(llmsText.includes('https://sealos.run/use-cases'));
	assert.ok(llmsText.includes('https://sealos.run/use-cases/deepseek-harness'));
	for (const slug of SPOKE_SLUGS) {
		assert.ok(llmsText.includes(`https://sealos.run/blog/${slug}`), `llms.txt missing ${slug}`);
	}
	assert.equal(/sealox/i.test(llmsText), false);

	const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
	assert.equal(sitemapResponse.status, 200);
	const sitemapXml = await sitemapResponse.text();
	assert.ok(sitemapXml.includes('<loc>https://sealos.run/use-cases</loc>'));
	assert.ok(sitemapXml.includes('<loc>https://sealos.run/use-cases/deepseek-harness</loc>'));
	for (const slug of SPOKE_SLUGS) {
		assert.ok(sitemapXml.includes(`<loc>https://sealos.run/blog/${slug}</loc>`), `sitemap.xml missing ${slug}`);
	}
});

test('Internal link topology connects /, /downloads, /products/appstore, and /blog to the cluster', async () => {
	const homeHtml = await (await fetch(`${baseUrl}/`)).text();
	assert.ok(homeHtml.includes('/use-cases'), 'footer missing /use-cases link on /');
	assert.ok(homeHtml.includes('/use-cases/deepseek-harness'), 'footer missing Hub link on /');
	assert.equal(homeHtml.includes('data-dafeiyu-campaign-banner'), false, 'campaign banner must default to off');

	const downloadsHtml = await (await fetch(`${baseUrl}/downloads`)).text();
	assert.ok(downloadsHtml.includes('/use-cases/deepseek-harness'), '/downloads missing Hub scenario entry');

	const appstoreHtml = await (await fetch(`${baseUrl}/products/appstore`)).text();
	assert.ok(appstoreHtml.includes('/use-cases/deepseek-harness'), '/products/appstore missing Hub link');
	assert.ok(
		appstoreHtml.includes('查看大肥鱼 24 小时云端部署方案'),
		'/products/appstore missing AstrBot/MaiBot CTA text',
	);
	assert.equal(
		appstoreHtml.includes('部署 AstrBot / MaiBot 养 DeepSeek 大肥鱼？'),
		false,
		'/products/appstore should not render an unrequested global top banner',
	);

	const blogHtml = await (await fetch(`${baseUrl}/blog`)).text();
	assert.ok(blogHtml.includes('/use-cases/deepseek-harness'), '/blog missing topic spotlight link');
});
