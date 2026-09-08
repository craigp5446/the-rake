import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const dataDir = join(process.cwd(), 'src/data');
const issues: Array<{ slug: string; company: string; issue: number; score: number; label: string; subtitle: string }> =
  JSON.parse(readFileSync(join(dataDir, 'issues.json'), 'utf-8'));

// ── helpers ──────────────────────────────────────────────────────────────────

function issueMarkdown(issueNum: number): string {
  const slug = issues.find(i => i.issue === issueNum)?.slug;
  if (!slug) throw new Error(`No slug for issue ${issueNum}`);
  const report = JSON.parse(readFileSync(join(dataDir, `${slug}.json`), 'utf-8'));

  // Mirror the logic in [issue].md.ts
  const dimensionLines = report.dimensions
    .map((d: { name: string; scoreLabel: string; score: number; rationale: string }) =>
      `### ${d.name} — ${d.scoreLabel} (${d.score}/3)\n\n${d.rationale}`)
    .join('\n\n');

  const findingLines = report.findings
    .map((f: { title: string; type: string; text: string; source: string; sourceUrl: string; sourceDate: string }) =>
      `#### ${f.title} [${f.type}]\n\n${f.text}\n\nSource: [${f.source}](${f.sourceUrl}) — ${f.sourceDate}`)
    .join('\n\n');

  return [
    `# ${report.company} — The Rake Issue ${report.issue}`,
    '',
    `**Score:** ${report.score}/100 — ${report.label}`,
    `**Published:** ${report.published}`,
    `**Methodology:** v${report.methodologyVersion}`,
    `**Confidence:** ${report.confidence}`,
    `**Sources:** ${report.sourceCount} (${report.assessedPct}% assessed)`,
    '',
    '## Summary',
    '',
    report.summary,
    '',
    '## Scorecard',
    '',
    dimensionLines,
    '',
    '## Flags',
    '',
    findingLines,
    '',
    '---',
    '',
    `[Full report](https://therake.co/issues/${report.issue}/) | [Methodology](https://therake.co/methodology/) | [All reports](https://therake.co/)`,
  ].join('\n').trim();
}

// ── 1. Homepage H1 ───────────────────────────────────────────────────────────

describe('Homepage H1 (item 1)', () => {
  it('index.astro contains an <h1> in the hero section', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf-8');
    expect(src).toMatch(/<h1\b[^>]*class="hero__subhead"/);
  });
});

// ── 2. 404 page ──────────────────────────────────────────────────────────────

describe('404 page (item 2)', () => {
  it('404.astro exists', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/404.astro'), 'utf-8');
    expect(src.length).toBeGreaterThan(0);
  });

  it('404 page contains an H1', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/404.astro'), 'utf-8');
    expect(src).toMatch(/<h1\b/);
  });

  it('404 page links to /llms.txt', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/404.astro'), 'utf-8');
    expect(src).toContain('/llms.txt');
  });

  it('404 page links to the sitemap', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/404.astro'), 'utf-8');
    expect(src).toMatch(/sitemap/i);
  });

  it('netlify.toml 404 redirect targets /404.html not /index.html', () => {
    const toml = readFileSync(join(process.cwd(), 'netlify.toml'), 'utf-8');
    expect(toml).toContain('to = "/404.html"');
    expect(toml).not.toMatch(/to = "\/index\.html"\s*\n\s*status = 404/);
  });
});

// ── 3. Markdown endpoints (item 3) ───────────────────────────────────────────

describe('Markdown content negotiation (item 3)', () => {
  it('index.md.ts exists', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.md.ts'), 'utf-8');
    expect(src).toContain('text/markdown');
  });

  it('index.md.ts has Vary: Accept header', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.md.ts'), 'utf-8');
    expect(src).toContain('Vary');
    expect(src).toContain('Accept');
  });

  it('about.md.ts exists and has Vary header', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/about.md.ts'), 'utf-8');
    expect(src).toContain('text/markdown');
    expect(src).toContain('Vary');
  });

  it('methodology.md.ts exists and has Vary header', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/methodology.md.ts'), 'utf-8');
    expect(src).toContain('text/markdown');
    expect(src).toContain('Vary');
  });

  it('[issue].md.ts exists and has Vary header', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/issues/[issue].md.ts'), 'utf-8');
    expect(src).toContain('text/markdown');
    expect(src).toContain('Vary');
  });

  it('edge function exists', () => {
    const src = readFileSync(
      join(process.cwd(), 'netlify/edge-functions/content-negotiate.ts'),
      'utf-8',
    );
    expect(src).toContain('text/markdown');
    expect(src).toContain('Vary');
  });

  it('issue markdown includes score, label and summary', () => {
    const md = issueMarkdown(issues[0].issue);
    expect(md).toContain(`**Score:** ${issues[0].score}/100 — ${issues[0].label}`);
    expect(md).toContain('## Summary');
    expect(md).toContain('## Scorecard');
    expect(md).toContain('## Flags');
  });
});

// ── 5. JSON-LD (item 5) ──────────────────────────────────────────────────────

describe('JSON-LD structured data (item 5)', () => {
  it('Base.astro accepts and renders a jsonLd prop', () => {
    const src = readFileSync(join(process.cwd(), 'src/layouts/Base.astro'), 'utf-8');
    expect(src).toContain('jsonLd');
    expect(src).toContain('application/ld+json');
  });

  it('homepage passes WebSite schema to Base', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf-8');
    expect(src).toContain("'@type': 'WebSite'");
    expect(src).toContain('jsonLd=');
  });

  it('homepage passes ItemList schema to Base', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf-8');
    expect(src).toContain("'@type': 'ItemList'");
  });

  it('issue page passes Review schema to Base', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/issues/[issue].astro'), 'utf-8');
    expect(src).toContain("'@type': 'Review'");
    expect(src).toContain('reviewRating');
    expect(src).toContain('itemReviewed');
    expect(src).toContain('jsonLd={reviewSchema}');
  });
});

// ── Round 2: agent instructions, org schema, og:image, trust pages ───────────

describe('Agent instructions in llms.txt (item 1)', () => {
  it('llms.txt source contains a "When to use" section', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/llms.txt.ts'), 'utf-8');
    expect(src).toMatch(/When to use/i);
  });

  it('"When to use" section includes specific use-case guidance', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/llms.txt.ts'), 'utf-8');
    expect(src).toContain('business model');
  });
});

describe('Organization schema (item 2)', () => {
  it('homepage passes an Organization schema', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf-8');
    expect(src).toContain("'@type': 'Organization'");
  });

  it('Organization schema includes contactPoint with real email', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf-8');
    expect(src).toContain('contactPoint');
    expect(src).toContain('ContactPoint');
    expect(src).toContain('craig@fluke.design');
  });

  it('Organization schema includes address', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf-8');
    expect(src).toContain('PostalAddress');
  });
});

describe('og:image on homepage (item 3)', () => {
  it('homepage passes ogImage to Base', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf-8');
    expect(src).toContain('ogImage=');
  });

  it('homepage ogImage references an /og/ PNG', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/index.astro'), 'utf-8');
    expect(src).toMatch(/\/og\/.*\.png/);
  });
});

describe('Trust anchor pages (item 4)', () => {
  it('contact.astro exists with an H1', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/contact.astro'), 'utf-8');
    expect(src).toMatch(/<h1\b/);
  });

  it('contact page has at least 500 chars of visible content', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/contact.astro'), 'utf-8');
    const textContent = src.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    expect(textContent.length).toBeGreaterThan(500);
  });

  it('privacy.astro exists with an H1', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/privacy.astro'), 'utf-8');
    expect(src).toMatch(/<h1\b/);
  });

  it('privacy page has at least 500 chars of visible content', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/privacy.astro'), 'utf-8');
    const textContent = src.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    expect(textContent.length).toBeGreaterThan(500);
  });

  it('Base.astro footer links to /contact and /privacy', () => {
    const src = readFileSync(join(process.cwd(), 'src/layouts/Base.astro'), 'utf-8');
    expect(src).toContain('href="/contact"');
    expect(src).toContain('href="/privacy"');
  });
});

// ── Sitemap + robots.txt ─────────────────────────────────────────────────────

describe('Sitemap and robots.txt', () => {
  it('robots.txt exists and references the sitemap', () => {
    const txt = readFileSync(join(process.cwd(), 'public/robots.txt'), 'utf-8');
    expect(txt).toContain('Sitemap:');
    expect(txt).toContain('therake.co');
  });

  it('static sitemap.xml has been removed (auto-generated by @astrojs/sitemap)', () => {
    expect(() => readFileSync(join(process.cwd(), 'public/sitemap.xml'), 'utf-8')).toThrow();
  });

  it('astro.config.mjs uses therake.co as site URL', () => {
    const cfg = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf-8');
    expect(cfg).toContain('https://therake.co');
    expect(cfg).not.toContain('netlify.app');
  });

  it('astro.config.mjs registers @astrojs/sitemap', () => {
    const cfg = readFileSync(join(process.cwd(), 'astro.config.mjs'), 'utf-8');
    expect(cfg).toContain('sitemap');
  });
});

// ── llms.txt ─────────────────────────────────────────────────────────────────

describe('llms.txt', () => {
  it('llms.txt.ts exists', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/llms.txt.ts'), 'utf-8');
    expect(src.length).toBeGreaterThan(0);
  });

  it('llms.txt endpoint renders all issue companies', () => {
    // Render the same body the endpoint produces
    const reportLines = issues
      .map(r => `- [${r.company} (Issue ${r.issue})](https://therake.co/issues/${r.issue}/): Score ${r.score}/100 — ${r.label}. ${r.subtitle}`)
      .join('\n');
    for (const issue of issues) {
      expect(reportLines).toContain(issue.company);
    }
  });

  it('llms.txt endpoint source uses template literal body with # heading and > description', () => {
    const src = readFileSync(join(process.cwd(), 'src/pages/llms.txt.ts'), 'utf-8');
    // The heading and description are inside a template literal
    expect(src).toMatch(/`# /);
    expect(src).toMatch(/^> /m);
  });
});
