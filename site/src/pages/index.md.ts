import type { APIRoute } from 'astro';
import issues from '../data/issues.json';

export const GET: APIRoute = () => {
  const reportLines = issues
    .map(r => `- [${r.company}](https://therake.co/issues/${r.issue}/) — Score ${r.score}/100 (${r.label}): ${r.subtitle}`)
    .join('\n');

  const body = `# The Rake

A transparency project scoring tech companies on how well their business model aligns with user interests.

## Reports

${reportLines}

## Navigation

- [About](https://therake.co/about/)
- [Methodology](https://therake.co/methodology/)
- [Subscribe](https://buttondown.com/the-rake)
- [llms.txt](https://therake.co/llms.txt)
`.trim();

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
