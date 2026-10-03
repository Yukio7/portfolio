"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Color, MathUtils, ShaderMaterial, Vector3 } from "three";
import { world } from "@/lib/world";
import { flowFragment, flowVertex } from "@/shaders/infrastructure";

type Position = readonly [number, number, number];

export function Connection({ from, to, offset = 0, color = "#e87050", pulse = true, revealAt, radius = 0.016 }: { from: Position; to: Position; offset?: number; color?: string; pulse?: boolean; revealAt?: number; radius?: number }) {
  const material = useRef<ShaderMaterial>(null);
  const [uniforms] = useState(() => ({ uTime: { value: 0 }, uOffset: { value: offset }, uReveal: { value: 1 }, uColor: { value: new Color(color) } }));
  const [curve] = useState(() => new CatmullRomCurve3([
    new Vector3(...from),
    new Vector3(from[0] + (to[0] - from[0]) * 0.35, from[1] + 0.18, from[2] + (to[2] - from[2]) * 0.35),
    new Vector3(to[0] - (to[0] - from[0]) * 0.25, to[1] + 0.18, to[2] - (to[2] - from[2]) * 0.25),
    new Vector3(...to),
  ]));
  useFrame((_, delta) => {
    if (!material.current) return;
    if (!world.paused && pulse) material.current.uniforms.uTime.value += Math.min(delta, 0.05);
    material.current.uniforms.uReveal.value = revealAt === undefined ? 1.03 : MathUtils.clamp((world.progress - revealAt) * 4, 0, 1.03);
  });
  return <group>
    <mesh><tubeGeometry args={[curve, 36, radius, 5, false]} /><shaderMaterial ref={material} uniforms={uniforms} vertexShader={flowVertex} fragmentShader={flowFragment} transparent depthWrite={false} toneMapped={false} /></mesh>
  </group>;
}