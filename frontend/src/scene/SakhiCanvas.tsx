import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { getGPUTier } from 'detect-gpu';
import { detectSoftwareGl } from './materials';
import { sampleShowcaseCamera } from '../utils/showcaseChoreography';
import { SAKHI_BACKDROP_URL } from '../utils/backdropMath';
import { useShowcaseStore } from '../store/useShowcaseStore';
import { Plate } from './Plate';
import { Lotus } from './Lotus';
import { Ribbons } from './Ribbons';
import { PostFX } from './PostFX';

const _camGoal = new THREE.Vector3();
const _targetGoal = new THREE.Vector3();
const _targetSmooth = new THREE.Vector3(0, 0.55, 0);

function CameraRig() {
  const { camera, invalidate } = useThree();
  const isSoftwareGl = useShowcaseStore((s) => s.isSoftwareGl);
  const tabVisible = useShowcaseStore((s) => s.tabVisible);

  useEffect(() => {
    if (!isSoftwareGl || !tabVisible) return;
    let id = 0;
    const step = () => {
      invalidate();
      id = window.setTimeout(step, 95);
    };
    step();
    return () => window.clearTimeout(id);
  }, [invalidate, isSoftwareGl, tabVisible]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.08);
    const store = useShowcaseStore.getState();
    const t = store.reducedMotion ? 0 : state.clock.elapsedTime;
    const sample = sampleShowcaseCamera(store.scrollProgress);

    const pushOffset = store.isReady ? 0 : 1.1;

    _camGoal.set(
      sample.position[0] + store.cursorNdc[0] * 0.38 + Math.sin(t * 0.22) * 0.12,
      sample.position[1] + store.cursorNdc[1] * 0.22 + Math.cos(t * 0.18) * 0.08,
      sample.position[2] + pushOffset,
    );
    _targetGoal.set(
      sample.target[0] + store.cursorNdc[0] * 0.12,
      sample.target[1] + store.cursorNdc[1] * 0.08,
      sample.target[2],
    );

    const damp = store.reducedMotion ? 16 : 4.8;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, _camGoal.x, damp, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, _camGoal.y, damp, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, _camGoal.z, damp, dt);

    _targetSmooth.x = THREE.MathUtils.damp(_targetSmooth.x, _targetGoal.x, damp, dt);
    _targetSmooth.y = THREE.MathUtils.damp(_targetSmooth.y, _targetGoal.y, damp, dt);
    _targetSmooth.z = THREE.MathUtils.damp(_targetSmooth.z, _targetGoal.z, damp, dt);
    camera.lookAt(_targetSmooth);

    if (camera instanceof THREE.PerspectiveCamera) {
      const nextFov = THREE.MathUtils.damp(camera.fov, sample.fov, damp, dt);
      if (Math.abs(camera.fov - nextFov) > 0.01) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}

export function SakhiCanvas() {
  const setQualityInfo = useShowcaseStore((s) => s.setQualityInfo);
  const setDpr = useShowcaseStore((s) => s.setDpr);
  const setWebglFailed = useShowcaseStore((s) => s.setWebglFailed);
  const setTabVisible = useShowcaseStore((s) => s.setTabVisible);
  const markReady = useShowcaseStore((s) => s.markReady);

  const isSoftwareGl = useShowcaseStore((s) => s.isSoftwareGl);
  const dpr = useShowcaseStore((s) => s.dpr);
  const webglFailed = useShowcaseStore((s) => s.webglFailed);
  const tabVisible = useShowcaseStore((s) => s.tabVisible);
  const activeChapter = useShowcaseStore((s) => s.activeChapter);
  const scrollProgress = useShowcaseStore((s) => s.scrollProgress);
  const isReady = useShowcaseStore((s) => s.isReady);

  const initDoneRef = useRef(false);

  useEffect(() => {
    if (initDoneRef.current) return;
    initDoneRef.current = true;

    const soft = detectSoftwareGl();
    if (!soft) {
      document.documentElement.classList.add('gpu-glass');
    } else {
      document.documentElement.classList.remove('gpu-glass');
      setDpr(1);
    }

    getGPUTier()
      .then((res) => {
        const tier = res.tier >= 3 ? 'high' : res.tier === 2 ? 'mid' : 'low';
        setQualityInfo(soft ? 'mid' : tier, soft);
        if (!soft) {
          setDpr(tier === 'high' ? Math.min(window.devicePixelRatio || 1, 2) : 1.25);
        }
      })
      .catch(() => {
        setQualityInfo(soft ? 'mid' : 'high', soft);
      });

    const onVisibility = () => {
      setTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [setDpr, setQualityInfo, setTabVisible]);

  if (webglFailed) {
    return (
      <div
        data-testid="sakhi-webgl-fallback"
        className="fixed inset-0 z-0 overflow-hidden bg-[#120A24]"
      >
        <img
          src={SAKHI_BACKDROP_URL}
          alt="Sakhi twilight sanctuary backdrop"
          className="w-full h-full object-cover brightness-[0.68] saturate-[1.18] contrast-[1.12]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#120A24]/90 via-[#1B0F33]/35 to-[#120A24]/55"
        />
      </div>
    );
  }

  return (
    <div
      data-testid="sakhi-3d-canvas"
      data-chapter={activeChapter}
      data-progress={scrollProgress.toFixed(3)}
      data-ready={String(isReady)}
      className="fixed inset-0 z-0 bg-[#120A24]"
    >
      <Canvas
        dpr={isSoftwareGl ? 1 : dpr}
        frameloop={!tabVisible ? 'demand' : isSoftwareGl ? 'demand' : 'always'}
        camera={{ position: [0, 0.9, 10.6], fov: 42, near: 0.1, far: 90 }}
        gl={{
          antialias: !isSoftwareGl,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setWebglFailed(true);
            markReady();
          });
        }}
      >
        <color attach="background" args={['#120A24']} />
        <fogExp2 attach="fog" args={['#2A1650', 0.035]} />

        <PerformanceMonitor
          onDecline={() => {
            if (!isSoftwareGl) setDpr(1);
          }}
          onIncline={() => {
            if (!isSoftwareGl) setDpr(Math.min(window.devicePixelRatio || 1.5, 2));
          }}
        />

        {/* Ambient lighting & reflections */}
        <Environment resolution={128} frames={1}>
          <Lightformer
            form="ring"
            intensity={2.4}
            color="#ff9fc9"
            scale={[10, 10, 1]}
            position={[0, 5, -4]}
          />
          <Lightformer
            form="rect"
            intensity={1.8}
            color="#7df9ff"
            scale={[8, 4, 1]}
            position={[-6, 2, 3]}
          />
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#ffb48a"
            scale={[8, 4, 1]}
            position={[6, 3, -2]}
          />
        </Environment>

        {/* 3-Point Twilight & Botanical Lighting Rig */}
        <hemisphereLight args={['#b9a2ff', '#1b0f33', 0.85]} />
        <directionalLight position={[5.5, 6.5, 4.5]} intensity={2.0} color="#ffd8c8" />
        <pointLight position={[-4.5, 2.5, -2.5]} intensity={3.0} distance={18} color="#8b3dff" />
        <pointLight position={[3.8, -0.8, 3.2]} intensity={2.6} distance={16} color="#ff5ca8" />
        <pointLight position={[0, -2.1, 2.5]} intensity={2.2} distance={12} color="#35f2d0" />

        {/* Camera Rig & Clean Atmospheric Scene: Only Background, Lotus, and Rings */}
        <CameraRig />
        <Plate />
        <Lotus />
        <Ribbons />
        <PostFX />
      </Canvas>
    </div>
  );
}
