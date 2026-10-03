"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, DoubleSide, ShaderMaterial } from "three";
import { circuitFragment, glassFragment, surfaceVertex } from "@/shaders/infrastructure";
import { world } from "@/lib/world";

export function TechnicalSurface({ size = [4, 3], position = [0, 0, 0], rotation = [-Math.PI / 2, 0, 0], glass = false, opacity = 1 }: {
  size?: [number, number]; position?: [number, number, number]; rotation?: [number, number, number]; glass?: boolean; opacity?: number;
}) {
  const material = useRef<ShaderMaterial>(null);
  const [uniforms] = useState(() => ({ uTime: { value: 0 }, uColor: { value: new Color("#ff8e63") }, uOpacity: { value: opacity } }));
  useFrame((_, delta) => {
    if (material.current && !world.paused) material.current.uniforms.uTime.value += Math.min(delta, 0.05);
  });
  return <mesh position={position} rotation={rotation}>
    <planeGeometry args={size} />
    <shaderMaterial ref={material} uniforms={uniforms} vertexShader={surfaceVertex} fragmentShader={glass ? glassFragment : circuitFragment} side={DoubleSide} transparent depthWrite={false} toneMapped={false} />
  </mesh>;
}