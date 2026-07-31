'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 120;
const CONNECT_DISTANCE = 2.2;

function Particles() {
  const meshRef  = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse    = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Generate initial positions
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3]     = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = 0;
    }
    return [pos, vel];
  }, []);

  // Mouse tracking
  useMemo(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame(() => {
    const pts = meshRef.current;
    if (!pts) return;
    const pos = pts.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3, iy = ix + 1;
      // Drift
      pos[ix]     += velocities[ix];
      pos[iy]     += velocities[iy];
      // Boundary wrap
      if (Math.abs(pos[ix]) > 7)  velocities[ix]     *= -1;
      if (Math.abs(pos[iy]) > 4.5) velocities[iy] *= -1;
      // Mouse repulsion
      const mx = mouse.current.x * viewport.width  / 2;
      const my = mouse.current.y * viewport.height / 2;
      const dx = pos[ix] - mx;
      const dy = pos[iy] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        const force = (2 - dist) / 2 * 0.008;
        pos[ix] += dx * force;
        pos[iy] += dy * force;
      }
    }
    pts.geometry.attributes.position.needsUpdate = true;

    // Update connection lines
    const lines = linesRef.current;
    if (!lines) return;
    const linePos: number[] = [];
    const lineCol: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx   = pos[i*3]   - pos[j*3];
        const dy   = pos[i*3+1] - pos[j*3+1];
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < CONNECT_DISTANCE) {
          const alpha = 1 - dist / CONNECT_DISTANCE;
          linePos.push(pos[i*3], pos[i*3+1], pos[i*3+2]);
          linePos.push(pos[j*3], pos[j*3+1], pos[j*3+2]);
          // Violet to cyan gradient based on position
          lineCol.push(0.49, 0.23, 0.93, alpha);
          lineCol.push(0.02, 0.71, 0.80, alpha);
        }
      }
    }

    lines.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePos, 3)
    );
    lines.geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(lineCol, 4)
    );
    lines.geometry.attributes.position.needsUpdate = true;
    lines.geometry.attributes.color.needsUpdate    = true;
  });

  return (
    <>
      {/* Particles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#7C3AED"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial vertexColors transparent opacity={0.5} />
      </lineSegments>
    </>
  );
}

export function NeuralParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
