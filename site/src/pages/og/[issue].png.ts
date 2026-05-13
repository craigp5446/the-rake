import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

export const getStaticPaths: GetStaticPaths = async () => {
  const dataDir = join(process.cwd(), 'src/data');
  const files = await readdir(dataDir);
  const issueFiles = files.filter(f => f !== 'issues.json' && f.endsWith('.json'));
  const paths = await Promise.all(issueFiles.map(async (file) => {
    const content = await readFile(join(dataDir, file), 'utf-8');
    const data = JSON.parse(content);
    return { params: { issue: String(data.issue) }, props: { report: data } };
  }));
  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { report } = props as { report: any };
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/npm/@fontsource/inter@5/files/inter-latin-400-normal.woff'
  ).then(r => r.arrayBuffer());

  let logoDataUrl: string | null = null;
  try {
    const clientId = import.meta.env.BRANDFETCH_CLIENT_ID;
    if (clientId) {
      const res = await fetch(`https://cdn.brandfetch.io/${report.domain}/w/300/h/300?c=${clientId}`);
      if (res.ok) {
        const contentType = res.headers.get('content-type') ?? 'image/png';
        const base64 = Buffer.from(await res.arrayBuffer()).toString('base64');
        logoDataUrl = `data:${contentType};base64,${base64}`;
      }
    }
  } catch {}

  const brandColor = report.brandColor ?? '#9A9994';

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: brandColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        children: [{
          type: 'div',
          props: {
            style: {
              width: '260px',
              height: '260px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            },
            children: logoDataUrl ? [{
              type: 'img',
              props: {
                src: logoDataUrl,
                style: { width: '190px', height: '190px', objectFit: 'contain' },
              },
            }] : [{
              type: 'span',
              props: {
                style: {
                  fontFamily: 'Inter',
                  fontSize: '130px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.92)',
                  lineHeight: 1,
                },
                children: report.company[0],
              },
            }],
          },
        }],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' }],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
