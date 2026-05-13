import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
    : { r: 154, g: 153, b: 148 };
}

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
  const { r, g, b } = hexToRgb(report.brandColor ?? '#9A9994');

  const W = 1200, H = 630;
  const BOX = 260, LOGO = 190;
  const boxLeft = Math.round((W - BOX) / 2);
  const boxTop  = Math.round((H - BOX) / 2);
  const logoLeft = Math.round((W - LOGO) / 2);
  const logoTop  = Math.round((H - LOGO) / 2);

  // Solid colour background
  const bg = await sharp({ create: { width: W, height: H, channels: 3, background: { r, g, b } } })
    .png().toBuffer();

  // Rounded box via SVG (Sharp's prebuilt libvips includes librsvg)
  const boxSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${BOX}" height="${BOX}">` +
    `<rect width="${BOX}" height="${BOX}" rx="48" ry="48" fill="rgba(255,255,255,0.18)"/>` +
    `</svg>`
  );
  const boxImg = await sharp(boxSvg).png().toBuffer();

  // Fetch logo; fall back to initial letter SVG
  let inner: Buffer;
  try {
    const clientId = import.meta.env.BRANDFETCH_CLIENT_ID;
    if (!clientId) throw new Error('no client id');
    const res = await fetch(`https://cdn.brandfetch.io/${report.domain}/w/${LOGO}/h/${LOGO}?c=${clientId}`);
    if (!res.ok) throw new Error('fetch failed');
    const ct = res.headers.get('content-type') ?? '';
    if (ct.includes('svg')) throw new Error('svg not supported in img');
    inner = await sharp(Buffer.from(await res.arrayBuffer()))
      .resize(LOGO, LOGO, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png().toBuffer();
  } catch {
    const letter = (report.company as string)[0];
    const svg = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${LOGO}" height="${LOGO}">` +
      `<text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" ` +
      `font-family="sans-serif" font-size="118" fill="rgba(255,255,255,0.92)">${letter}</text>` +
      `</svg>`
    );
    inner = await sharp(svg).png().toBuffer();
  }

  const png = await sharp(bg)
    .composite([
      { input: boxImg,  left: boxLeft,  top: boxTop  },
      { input: inner,   left: logoLeft, top: logoTop  },
    ])
    .png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
