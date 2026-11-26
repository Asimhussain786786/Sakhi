import * as THREE from 'three';

/**
 * Procedural 4-variant botanical petal atlas (2x2 quadrants on a 1024px canvas):
 * - RGB: luminous blush/pearl petal albedo with botanical vein highlight
 * - Alpha: smooth tapered cupped petal silhouette
 */
export function createPetalAtlasTexture(maxAnisotropy = 4): THREE.CanvasTexture {
  const size = 1024;
  const half = size / 2;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, size, size);

    const variants = [
      { cx: half * 0.5, cy: half * 0.5, width: 145, tipPinch: 0.22, notch: 0.04, veinGlow: '#ffe6f6' },
      { cx: half * 1.5, cy: half * 0.5, width: 165, tipPinch: 0.14, notch: 0.09, veinGlow: '#fff1fa' },
      { cx: half * 0.5, cy: half * 1.5, width: 130, tipPinch: 0.28, notch: 0.02, veinGlow: '#ffd4ec' },
      { cx: half * 1.5, cy: half * 1.5, width: 156, tipPinch: 0.18, notch: 0.07, veinGlow: '#f2ddff' },
    ];

    variants.forEach((v) => {
      ctx.save();
      ctx.translate(v.cx, v.cy);

      const h = half * 0.78;
      const w = v.width;

      // Soft tapered lotus/cherry petal path
      ctx.beginPath();
      ctx.moveTo(0, h * 0.52); // base stem tip
      ctx.bezierCurveTo(
        -w * 0.85,
        h * 0.28,
        -w * (1 - v.tipPinch),
        -h * 0.22,
        -w * 0.26,
        -h * 0.46,
      );
      ctx.quadraticCurveTo(0, -h * (0.52 - v.notch), w * 0.26, -h * 0.46);
      ctx.bezierCurveTo(
        w * (1 - v.tipPinch),
        -h * 0.22,
        w * 0.85,
        h * 0.28,
        0,
        h * 0.52,
      );
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.52);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
      grad.addColorStop(0.55, 'rgba(255, 232, 246, 0.94)');
      grad.addColorStop(1, 'rgba(255, 198, 228, 0.88)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Delicate luminous botanical veins
      ctx.clip();
      ctx.strokeStyle = v.veinGlow;
      ctx.lineWidth = 2.2;
      ctx.globalAlpha = 0.58;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);
        ctx.quadraticCurveTo(i * w * 0.16, 0, i * w * 0.24, -h * 0.45);
        ctx.stroke();
      }
      ctx.restore();
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, Math.max(1, maxAnisotropy));
  tex.needsUpdate = true;
  return tex;
}

/**
 * Procedural crisp 4-point star flare texture for sparkle glints & star sprites.
 */
export function createFourPointStarTexture(): THREE.CanvasTexture {
  const size = 256;
  const c = size / 2;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, size, size);

    // Soft outer halo
    const halo = ctx.createRadialGradient(c, c, 0, c, c, c);
    halo.addColorStop(0, 'rgba(255, 255, 255, 1)');
    halo.addColorStop(0.18, 'rgba(255, 225, 246, 0.82)');
    halo.addColorStop(0.45, 'rgba(185, 162, 255, 0.22)');
    halo.addColorStop(1, 'rgba(185, 162, 255, 0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, size, size);

    // Horizontal & vertical star spikes
    const drawSpike = (rx: number, ry: number) => {
      ctx.save();
      ctx.translate(c, c);
      ctx.scale(rx, ry);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.55, 'rgba(255,245,255,0.6)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawSpike(c * 0.92, 7);
    drawSpike(7, c * 0.92);
    drawSpike(c * 0.34, c * 0.34);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Soft circular radial bloom sprite for hero petals & firefly spores.
 */
export function createSoftGlowSpriteTexture(): THREE.CanvasTexture {
  const size = 128;
  const c = size / 2;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const grad = ctx.createRadialGradient(c, c, 0, c, c, c);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.24, 'rgba(255, 226, 246, 0.78)');
    grad.addColorStop(0.6, 'rgba(199, 125, 255, 0.22)');
    grad.addColorStop(1, 'rgba(139, 61, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}
