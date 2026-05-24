import fs from 'fs/promises';
import path from 'path';

const manifestPath = path.resolve('public/bci-assets/sources/assets_manifest.json');
const outDir = path.resolve('public/bci-assets/sources');

async function main() {
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  await fs.mkdir(outDir, { recursive: true });

  for (const asset of manifest.assets) {
    const target = path.join(outDir, asset.fileName);
    try {
      console.log(`Downloading ${asset.id} -> ${target}`);
      const res = await fetch(asset.sourceUrl);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const arrayBuffer = await res.arrayBuffer();
      await fs.writeFile(target, Buffer.from(arrayBuffer));
    } catch (err) {
      console.error(`Failed to download ${asset.id}:`, err.message);
      console.error(`Manual URL: ${asset.sourceUrl}`);
    }
  }

  console.log('Done. Check public/bci-assets/sources/.');
}

main();
