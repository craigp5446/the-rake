import type { APIRoute, GetStaticPaths } from 'astro';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

type Finding = { id: string; type: string; title: string; text: string; source: string; sourceUrl: string; sourceDate: string };
type Dimension = { id: string; name: string; score: number; scoreLabel: string; rationale: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const dataDir = join(process.cwd(), 'src/data');
  const files = await readdir(dataDir);
  const issueFiles = files.filter(f => f !== 'issues.json' && f.endsWith('.json'));

  return Promise.all(
    issueFiles.map(async (file) => {
      const content = await readFile(join(dataDir, file), 'utf-8');
      const data = JSON.parse(content);
      return { params: { issue: String(data.issue) }, props: { report: data } };
    }),
  );
};

export const GET: APIRoute = ({ props }) => {
  const r = props.report;

  const dimensionLines = (r.dimensions as Dimension[])
    .map(d => `### ${d.name} — ${d.scoreLabel} (${d.score}/3)\n\n${d.rationale}`)
    .join('\n\n');

  const findingLines = (r.findings as Finding[])
    .map(f => `#### ${f.title} [${f.type}]\n\n${f.text}\n\nSource: [${f.source}](${f.sourceUrl}) — ${f.sourceDate}`)
    .join('\n\n');

  const body = `# ${r.company} — The Rake Issue ${r.issue}

**Score:** ${r.score}/100 — ${r.label}
**Published:** ${r.published}
**Methodology:** v${r.methodologyVersion}
**Confidence:** ${r.confidence}
**Sources:** ${r.sourceCount} (${r.assessedPct}% assessed)

## Summary

${r.summary}

## Scorecard

${dimensionLines}

## Flags

${findingLines}

---

[Full report](https://therake.co/issues/${r.issue}/) | [Methodology](https://therake.co/methodology/) | [All reports](https://therake.co/)
`.trim();

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
