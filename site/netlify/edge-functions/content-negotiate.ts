import type { Config, Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  const accept = request.headers.get('Accept') ?? '';
  if (!accept.includes('text/markdown')) {
    return context.next();
  }

  const url = new URL(request.url);

  // Map HTML page paths to their pre-built .md counterparts
  let mdPath = url.pathname;
  if (mdPath === '/' || mdPath === '') {
    mdPath = '/index.md';
  } else {
    // Remove trailing slash, append .md
    mdPath = mdPath.replace(/\/$/, '') + '.md';
  }

  const mdUrl = new URL(mdPath, url.origin);

  let mdResponse: Response;
  try {
    mdResponse = await fetch(mdUrl.toString());
  } catch {
    return context.next();
  }

  if (!mdResponse.ok) {
    return context.next();
  }

  const text = await mdResponse.text();

  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept, Accept-Encoding',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

export const config: Config = {
  path: ['/', '/about', '/about/', '/methodology', '/methodology/', '/issues/*'],
};
