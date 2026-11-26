import * as THREE from 'three';

export function detectSoftwareGl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function createRadialGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.28, 'rgba(244, 218, 255, 0.82)');
    grad.addColorStop(0.62, 'rgba(205, 178, 255, 0.25)');
    grad.addColorStop(1, 'rgba(200, 182, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createGlassPanelTexture(
  title: string,
  subtitle: string,
  accentHex: string,
  maxAnisotropy: number,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Soft translucent pearl-lilac card background
    const grad = ctx.createLinearGradient(0, 0, 512, 340);
    grad.addColorStop(0, 'rgba(255, 252, 255, 0.92)');
    grad.addColorStop(0.55, 'rgba(248, 237, 252, 0.84)');
    grad.addColorStop(1, 'rgba(232, 220, 252, 0.88)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 340);

    // Subtle luminous corner accent wash
    const rad = ctx.createRadialGradient(420, 60, 10, 420, 60, 220);
    rad.addColorStop(0, accentHex);
    rad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, 512, 340);
    ctx.globalAlpha = 1;

    // Hairline inner frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, 488, 316);

    // Subtle editorial rule
    ctx.fillStyle = accentHex;
    ctx.fillRect(46, 86, 56, 3);

    // Title
    ctx.fillStyle = '#231430';
    ctx.font = '600 54px Georgia, serif';
    ctx.fillText(title, 44, 162);

    // Subtitle wrapped neatly
    ctx.fillStyle = '#5a466b';
    ctx.font = '400 22px system-ui, -apple-system, sans-serif';
    const words = subtitle.split(' ');
    let line = '';
    let y = 216;
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > 420) {
        ctx.fillText(line, 44, y);
        line = w;
        y += 32;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, 44, y);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, maxAnisotropy);
  return tex;
}

export interface SakhiMaterials {
  petalOuter: THREE.MeshPhysicalMaterial;
  petalInner: THREE.MeshPhysicalMaterial;
  pinkSphere: THREE.MeshPhysicalMaterial;
  prismCrystal: THREE.MeshPhysicalMaterial;
  silkRibbon: THREE.MeshPhysicalMaterial;
  champagneMetal: THREE.MeshPhysicalMaterial;
  energyCore: THREE.ShaderMaterial;
  energyAura: THREE.ShaderMaterial;
  stamenTip: THREE.MeshStandardMaterial;
  glowTex: THREE.CanvasTexture;
  dispose: () => void;
}

export function createSakhiMaterials(
  renderer: THREE.WebGLRenderer,
  isSoftwareGl: boolean,
): SakhiMaterials {
  const glowTex = createRadialGlowTexture();

  const petalOuter = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#f7b5d4'),
    roughness: 0.08,
    metalness: 0.04,
    ior: 1.54,
    thickness: 0.95,
    attenuationColor: new THREE.Color('#d2a4ff'),
    attenuationDistance: 1.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    iridescence: 1.0,
    iridescenceIOR: 1.38,
    envMapIntensity: 1.55,
    side: THREE.DoubleSide,
    transmission: isSoftwareGl ? 0 : 0.78,
    transparent: true,
    opacity: isSoftwareGl ? 0.72 : 1.0,
    depthWrite: !isSoftwareGl,
  });

  const petalInner = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ccb3ff'),
    roughness: 0.09,
    metalness: 0.06,
    ior: 1.58,
    thickness: 0.7,
    attenuationColor: new THREE.Color('#f49cc8'),
    attenuationDistance: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    iridescence: 1.0,
    iridescenceIOR: 1.42,
    envMapIntensity: 1.6,
    side: THREE.DoubleSide,
    transmission: isSoftwareGl ? 0 : 0.72,
    transparent: true,
    opacity: isSoftwareGl ? 0.78 : 1.0,
    depthWrite: !isSoftwareGl,
  });

  const pinkSphere = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#f59cc6'),
    roughness: 0.06,
    metalness: 0.06,
    ior: 1.5,
    thickness: 1.1,
    attenuationColor: new THREE.Color('#e385b8'),
    attenuationDistance: 1.7,
    clearcoat: 1.0,
    iridescence: 0.85,
    envMapIntensity: 1.6,
    transmission: isSoftwareGl ? 0 : 0.82,
    transparent: true,
    opacity: isSoftwareGl ? 0.82 : 1.0,
  });

  const prismCrystal = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#bba3ff'),
    roughness: 0.1,
    metalness: 0.1,
    ior: 1.65,
    thickness: 0.9,
    clearcoat: 1.0,
    iridescence: 1.0,
    envMapIntensity: 1.5,
    transmission: isSoftwareGl ? 0 : 0.7,
    transparent: true,
    opacity: isSoftwareGl ? 0.68 : 1.0,
  });

  const silkRibbon = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#e7b6dc'),
    roughness: 0.28,
    metalness: 0.08,
    sheen: 1.0,
    sheenRoughness: 0.24,
    sheenColor: new THREE.Color('#cbb2ff'),
    iridescence: 0.75,
    clearcoat: 0.35,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9,
  });

  // Subtle flowing silk wave motion in vertex shader
  silkRibbon.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    silkRibbon.userData.shader = shader;
    shader.vertexShader = 'uniform float uTime;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      float silkWave = sin(position.x * 1.4 + uTime * 1.15) * 0.14
                     + cos(position.y * 1.8 - uTime * 0.9) * 0.09;
      transformed.z += silkWave;
      transformed.y += sin(position.x * 0.9 + uTime * 0.8) * 0.08;
      `,
    );
  };

  const champagneMetal = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#e9cbe0'),
    roughness: 0.16,
    metalness: 0.92,
    anisotropy: 0.75,
    clearcoat: 0.65,
    envMapIntensity: 1.5,
  });

  const stamenTip = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#fff5fb'),
    emissive: new THREE.Color('#b684ff'),
    emissiveIntensity: 1.15,
    roughness: 0.2,
    metalness: 0.25,
  });

  const energyCore = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uBloom: { value: 0.28 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPos;
      varying vec3 vLocalPos;
      uniform float uTime;
      uniform vec2 uPointer;

      void main() {
        vLocalPos = position;
        vec3 pos = position;
        float ripple = sin(pos.x * 4.5 + uTime * 1.8) * cos(pos.y * 4.5 - uTime * 1.4) * 0.032;
        pos += normal * (ripple + (uPointer.x * pos.x + uPointer.y * pos.y) * 0.03);
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewPos = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewPos;
      varying vec3 vLocalPos;
      uniform float uTime;
      uniform float uBloom;

      void main() {
        vec3 viewDir = normalize(vViewPos);
        float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.0);
        float pulse = 0.5 + 0.5 * sin(uTime * 1.6 + vLocalPos.y * 3.0);

        vec3 pearl = vec3(1.0, 0.94, 0.98);
        vec3 rose = vec3(0.95, 0.56, 0.79);
        vec3 lavender = vec3(0.62, 0.48, 0.98);

        vec3 coreMix = mix(pearl, rose, 0.42 + 0.28 * pulse);
        vec3 finalCol = mix(coreMix, lavender, fresnel * (0.82 + 0.18 * uBloom));
        finalCol += vec3(1.0, 0.88, 0.98) * fresnel * 0.4;

        gl_FragColor = vec4(finalCol, 0.98);
      }
    `,
    transparent: true,
  });

  const energyAura = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPos = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vViewPos;
      uniform float uTime;
      void main() {
        vec3 viewDir = normalize(vViewPos);
        float rim = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
        float shimmer = 0.85 + 0.15 * sin(uTime * 2.0);
        vec3 col = mix(vec3(0.98, 0.78, 0.9), vec3(0.78, 0.68, 1.0), rim);
        gl_FragColor = vec4(col, rim * 0.55 * shimmer);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  });

  const dispose = () => {
    glowTex.dispose();
    petalOuter.dispose();
    petalInner.dispose();
    pinkSphere.dispose();
    prismCrystal.dispose();
    silkRibbon.dispose();
    champagneMetal.dispose();
    stamenTip.dispose();
    energyCore.dispose();
    energyAura.dispose();
  };

  return {
    petalOuter,
    petalInner,
    pinkSphere,
    prismCrystal,
    silkRibbon,
    champagneMetal,
    energyCore,
    energyAura,
    stamenTip,
    glowTex,
    dispose,
  };
}
