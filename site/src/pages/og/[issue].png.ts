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

  const W = 1200, H = 630, LOGO = 220;

  const bg = await sharp({
    create: { width: W, height: H, channels: 3, background: { r, g, b } },
  }).png().toBuffer();

  const svgData = await readFile(join(process.cwd(), 'public/therake.svg'));
  const logo = await sharp(svgData)
    .resize(LOGO, LOGO, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .negate({ alpha: false })
    .png()
    .toBuffer();

  const png = await sharp(bg)
    .composite([{ input: logo, left: Math.round((W - LOGO) / 2), top: Math.round((H - LOGO) / 2) }])
    .png()
    .toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
