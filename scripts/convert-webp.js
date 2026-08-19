import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('public');

// All image files to convert to WebP
const imageFiles = fs.readdirSync(PUBLIC_DIR).filter(f =>
  /\.(png|jpg|jpeg)$/i.test(f) && f !== 'og-image.jpg' // Keep og-image as jpg for social sharing compatibility
);

console.log(`\n🖼️  Converting ${imageFiles.length} images to WebP...\n`);

let totalOriginal = 0;
let totalWebP = 0;

for (const file of imageFiles) {
  const inputPath = path.join(PUBLIC_DIR, file);
  const baseName = path.basename(file, path.extname(file));
  const outputPath = path.join(PUBLIC_DIR, `${baseName}.webp`);

  const originalSize = fs.statSync(inputPath).size;
  totalOriginal += originalSize;

  await sharp(inputPath)
    .webp({ quality: 82, effort: 6 })
    .toFile(outputPath);

  const webpSize = fs.statSync(outputPath).size;
  totalWebP += webpSize;

  const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
  console.log(`  ✅ ${file} (${(originalSize / 1024).toFixed(0)} KB) → ${baseName}.webp (${(webpSize / 1024).toFixed(0)} KB) — ${savings}% smaller`);
}

console.log(`\n🎉 Total: ${(totalOriginal / 1024).toFixed(0)} KB → ${(totalWebP / 1024).toFixed(0)} KB (${((1 - totalWebP / totalOriginal) * 100).toFixed(1)}% reduction)\n`);
