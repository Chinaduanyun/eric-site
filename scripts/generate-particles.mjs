/**
 * Pre-generate particle data for ParticleImage.vue
 * Run: node scripts/generate-particles.mjs
 *
 * Output: public/particles.bin
 *
 * Binary format:
 *   Header (12 bytes):
 *     - particleCount: uint32 (LE)
 *     - refVisibleWidth: float32 (LE)
 *     - refVisibleHeight: float32 (LE)
 *   Data:
 *     - positions: Float32Array[N*3]  (x, y, z per particle)
 *     - colors: Float32Array[N*3]     (r, g, b per particle, 0–1)
 *     - sizes: Float32Array[N]
 *     - alphas: Float32Array[N]
 */
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const IMG_WIDTH = 400; // half of original 800 for performance
const REF_ASPECT = 16 / 9;
const FOV = 75;
const CAMERA_Z = 300;

const fovRad = FOV * Math.PI / 180;
const refVisibleHeight = 2 * Math.tan(fovRad / 2) * CAMERA_Z;
const refVisibleWidth = refVisibleHeight * REF_ASPECT;

async function generate() {
    const imgPath = resolve(__dirname, '../public/backgrounds/mountains.jpg');
    const img = sharp(imgPath);
    const metadata = await img.metadata();

    const imgHeight = Math.floor((metadata.height / metadata.width) * IMG_WIDTH);

    const { data, info } = await img
        .resize(IMG_WIDTH, imgHeight)
        .raw()
        .toBuffer({ resolveWithObject: true });

    const channels = info.channels;
    const scale = Math.max(refVisibleWidth / IMG_WIDTH, refVisibleHeight / imgHeight);

    const positions = [];
    const colors = [];
    const sizes = [];
    const alphas = [];

    for (let y = 0; y < imgHeight; y++) {
        for (let x = 0; x < IMG_WIDTH; x++) {
            const index = (y * IMG_WIDTH + x) * channels;
            const r = data[index] / 255;
            const g = data[index + 1] / 255;
            const b = data[index + 2] / 255;

            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            const dx = x - IMG_WIDTH / 2;
            const dy = y - imgHeight / 2;
            let posX = dx * scale;
            let posY = -dy * scale;
            let posZ = (luminance - 0.5) * refVisibleWidth * 0.08;

            const normalizedX = Math.abs(dx) / (IMG_WIDTH / 2);
            const normalizedY = Math.abs(dy) / (imgHeight / 2);
            const noise = (Math.sin(x * 0.05) * Math.cos(y * 0.05) + Math.sin((x + y) * 0.02)) * 0.08;
            const edgeFactor = Math.max(normalizedX, normalizedY) + noise;

            let alpha = 1.0;
            let size = scale * 1.8;
            const solidZone = 0.65;
            const edgeZone = 0.90;

            if (edgeFactor > solidZone) {
                const scatterFactor = (edgeFactor - solidZone) / (1.0 - solidZone);
                const smoothScatter = Math.pow(scatterFactor, 2.0);

                const maxZScatter = refVisibleWidth * 0.2;
                posZ += (Math.random() - 0.5) * maxZScatter * smoothScatter;

                const maxXYScatter = scale * 40.0;
                posX += (Math.random() - 0.5) * maxXYScatter * smoothScatter;
                posY += (Math.random() - 0.5) * maxXYScatter * smoothScatter;

                size = (scale * 1.8) - (scale * 1.2 * smoothScatter);

                if (edgeFactor > edgeZone) {
                    alpha = 1.0 - (edgeFactor - edgeZone) / (1.0 - edgeZone);
                    alpha = Math.max(0, alpha);
                }
            }

            if (alpha > 0.05) {
                positions.push(posX, posY, posZ);
                colors.push(r, g, b);
                sizes.push(size);
                alphas.push(alpha);
            }
        }
    }

    const N = alphas.length;
    console.log(`Image: ${IMG_WIDTH}x${imgHeight}, particles: ${N}`);

    // Header: 12 bytes
    // positions: N*3*4, colors: N*3*4, sizes: N*4, alphas: N*4
    const headerSize = 12;
    const dataSize = N * (3 + 3 + 1 + 1) * 4;
    const totalSize = headerSize + dataSize;
    const buffer = new ArrayBuffer(totalSize);
    const view = new DataView(buffer);
    let offset = 0;

    view.setUint32(offset, N, true); offset += 4;
    view.setFloat32(offset, refVisibleWidth, true); offset += 4;
    view.setFloat32(offset, refVisibleHeight, true); offset += 4;

    for (let i = 0; i < positions.length; i++) {
        view.setFloat32(offset, positions[i], true); offset += 4;
    }
    for (let i = 0; i < colors.length; i++) {
        view.setFloat32(offset, colors[i], true); offset += 4;
    }
    for (let i = 0; i < sizes.length; i++) {
        view.setFloat32(offset, sizes[i], true); offset += 4;
    }
    for (let i = 0; i < alphas.length; i++) {
        view.setFloat32(offset, alphas[i], true); offset += 4;
    }

    const outPath = resolve(__dirname, '../public/particles.bin');
    writeFileSync(outPath, Buffer.from(buffer));
    console.log(`Written: ${outPath} (${(totalSize / 1024).toFixed(1)} KB)`);
}

generate().catch(console.error);
