import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = `# About The Rake

A human-centred analysis of tech products.

## What it is

The Rake scores tech companies on how well their business model aligns with user interests. Each report covers one company in depth, collecting public sources, applying a consistent scoring methodology, and writing an analysis that makes sense of the tensions at play.

## Who makes it

Craig Phillips, product designer. The research and scoring is assisted by AI agents, but the system has been built and rebuilt by Craig. The judgment and writing are his.

## Principles

- All analysis is based on public sources only.
- Public sources are imperfect; confidence levels and gaps are stated in every report.
- No affiliation with any company, investor, or advocacy group.
- Every report states the methodology version it was scored against.

## Links

- [Homepage](https://therake.co/)
- [Methodology](https://therake.co/methodology/)
- [All reports](https://therake.co/)
`.trim();

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
