import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 36;
const RADIUS = 16;

const resized = await sharp('public/screenshots/overview.png')
  .resize(WIDTH - PADDING * 2, HEIGHT - PADDING * 2, {
    fit: 'inside',
    withoutEnlargement: true,
  })
  .png()
  .toBuffer();

const meta = await sharp(resized).metadata();
const shotWidth = meta.width ?? 0;
const shotHeight = meta.height ?? 0;
const mask = Buffer.from(
  `<svg width="${shotWidth}" height="${shotHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="${shotWidth}" height="${shotHeight}" rx="${RADIUS}" ry="${RADIUS}" fill="#fff"/></svg>`,
);

const rounded = await sharp(resized)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: '#054552',
  },
})
  .composite([
    {
      input: rounded,
      left: Math.round((WIDTH - shotWidth) / 2),
      top: Math.round((HEIGHT - shotHeight) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/og.png');

const out = await sharp('public/og.png').metadata();
if (out.width !== WIDTH || out.height !== HEIGHT) {
  throw new Error(`expected ${WIDTH}x${HEIGHT}, got ${out.width}x${out.height}`);
}
console.log(`Wrote public/og.png (${out.width}x${out.height}).`);
