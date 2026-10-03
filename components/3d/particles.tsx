"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, Points, ShaderMaterial } from "three";
import { seededRandom, world } from "@/lib/world";
import { particleFragment, particleVertex } from "@/shaders/particles";

export function Particles({ lowQuality }: { lowQuality: boolean }) {
  const points = useRef<Points>(null);
  const material = useRef<ShaderMaterial>(null);
  const renderer = useThree((state) => state.gl);
  const [data] = useState(() => {
    const count = lowQuality ? 100 : 360;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let index = 0; index < count; index++) {
      positions[index * 3] = (seededRandom(index + 1) - 0.5) * 28;
      positions[index * 3 + 1] = (seededRandom(index + 421) - 0.5) * 20;
      positions[index * 3 + 2] = (seededRandom(index + 851) - 0.5) * 18;
      sizes[index] = 1 + seededRandom(index + 41) * 2;
    }
    return { positions, sizes, uniforms: { uTime: { value: 0 }, uPixelRatio: { value: renderer.getPixelRatio() } } };
  });
  useFrame((state, delta) => {
    if (material.current && !world.paused) material.current.uniforms.uTime.value += delta;
    if (points.current) points.current.position.y = state.camera.position.y - 6;
  });
  return <points ref={points} frustumCulled={false}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[data.positions, 3]} /><bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} /></bufferGeometry>
    <shaderMaterial ref={material} uniforms={data.uniforms} vertexShader={particleVertex} fragmentShader={particleFragment} transparent depthWrite={false} blending={AdditiveBlending} />
  </points>;
}