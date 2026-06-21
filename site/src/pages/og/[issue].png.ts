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

function isDark({ r, g, b }: { r: number; g: number; b: number }) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dataDir = join(process.cwd(), 'src/data');
  const files = await readdir(dataDir);
  const issueFiles = files.filter(f => f !== 'issues.json' && f.endsWith('.json'));
  const paths = await Promise.all(issueFiles.map(async (file) => {
    const content = await readFile(join(dataDir, file), 'utf-8');
    const data = JSON.parse(content);
    return { params: { issue: String(data.issue) }, props: { slug: data.slug, brandColor: data.brandColor } };
  }));
  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { slug, brandColor } = props as { slug: string; brandColor: string };
  const brandRgb = hexToRgb(brandColor ?? '#9A9994');
  const { r, g, b } = brandRgb;
  const dark = isDark(brandRgb);

  const W = 1200, H = 630, LOGO = 160, GAP = 48, X_W = 40;

  const bg = await sharp({
    create: { width: W, height: H, channels: 3, background: { r, g, b } },
  }).png().toBuffer();

  // Rake logo — negated so it's always visible on the brand colour
  const svgData = await readFile(join(process.cwd(), 'public/therake.svg'));
  const rakeLogo = await sharp(svgData)
    .resize(LOGO, LOGO, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .negate({ alpha: false })
    .png()
    .toBuffer();

  // Company logo — convention: public/logos/{slug}.svg, negated to match Rake logo treatment
  let companyLogo: Buffer | null = null;
  try {
    const INNER = Math.round(LOGO * 0.6);
    const PAD = Math.round((LOGO - INNER) / 2);
    const RADIUS = Math.round(LOGO * 0.18);
    const bgSvg = Buffer.from(
      `<svg width="${LOGO}" height="${LOGO}" xmlns="http://www.w3.org/2000/svg">` +
      `<rect width="${LOGO}" height="${LOGO}" rx="${RADIUS}" ry="${RADIUS}" fill="white"/></svg>`
    );
    const whiteTile = await sharp(bgSvg).png().toBuffer();
    const file = await readFile(join(process.cwd(), `public/logos/${slug}.svg`));
    const icon = await sharp(file)
      .resize(INNER, INNER, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    companyLogo = await sharp(whiteTile)
      .composite([{ input: icon, left: PAD, top: PAD }])
      .png()
      .toBuffer();
  } catch {}

  // × separator
  const xColor = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.3)';
  const xSvg = Buffer.from(
    `<svg width="${X_W}" height="${LOGO}" xmlns="http://www.w3.org/2000/svg">` +
    `<text x="${X_W / 2}" y="${Math.round(LOGO / 2 + 14)}" text-anchor="middle" ` +
    `font-family="Georgia, serif" font-size="36" fill="${xColor}">×</text></svg>`
  );
  const xImg = await sharp(xSvg).png().toBuffer();

  // Composite
  const topY = Math.round((H - LOGO) / 2);
  const composites: sharp.OverlayOptions[] = [];

  if (companyLogo) {
    const totalW = LOGO + GAP + X_W + GAP + LOGO;
    const startX = Math.round((W - totalW) / 2);
    composites.push({ input: rakeLogo, left: startX, top: topY });
    composites.push({ input: xImg, left: startX + LOGO + GAP, top: topY });
    composites.push({ input: companyLogo, left: startX + LOGO + GAP + X_W + GAP, top: topY });
  } else {
    composites.push({ input: rakeLogo, left: Math.round((W - LOGO) / 2), top: topY });
  }

  const png = await sharp(bg).composite(composites).png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
