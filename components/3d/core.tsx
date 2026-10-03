"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, RoundedBox } from "@react-three/drei";
import { Group, InstancedMesh, MathUtils, Object3D } from "three";
import { world } from "@/lib/world";
import { TechnicalSurface } from "./technical-surface";

export function Core({ compact = false, lowQuality = false }: { compact?: boolean; lowQuality?: boolean }) {
  const group = useRef<Group>(null);
  const time = useRef(0);
  useFrame((_, delta) => {
    if (world.paused) return;
    time.current += Math.min(delta, 0.05);
    if (group.current) {
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, -0.2 + world.pointer.x * 0.1 + Math.sin(time.current * 0.16) * 0.025, 2, delta);
      group.current.position.y = Math.sin(time.current * 0.5) * 0.06;
    }
  });
  return <group ref={group} rotation={[0, -0.2, 0]} scale={compact ? 0.88 : 1.08}>
    {[0, 1, 2, 3, 4].map((level) => <CoreLayer key={level} level={level} expanded={compact} lowQuality={lowQuality} />)}
    <RoundedBox args={[4.5, 0.22, 3.7]} radius={0.08} smoothness={3} position={[0, -2.15, 0]}>
      <meshStandardMaterial color="#6e7678" metalness={0.88} roughness={0.22} />
      <Edges color="#c2cfce" transparent opacity={0.28} />
    </RoundedBox>
    <TechnicalSurface size={[4.35, 3.5]} position={[0, -2.025, 0]} />
    {[-1, 1].flatMap((side) => [-1, 1].map((depth) => <group key={`${side}-${depth}`} position={[side * 2.08, 0, depth * 1.65]}>
      <mesh><boxGeometry args={[0.085, 4.65, 0.085]} /><meshStandardMaterial color="#a9b8b9" metalness={0.95} roughness={0.22} /></mesh>
      <mesh position={[0, -0.15, 0.052]}><boxGeometry args={[0.025, 3.8, 0.012]} /><meshBasicMaterial color={depth > 0 ? "#ffae87" : "#b9e1e3"} /></mesh>
      {[-2.1, 2.15].map((height) => <mesh key={height} position={[0, height, 0]}><boxGeometry args={[0.22, 0.13, 0.22]} /><meshStandardMaterial color="#b2bbbc" metalness={0.9} roughness={0.18} /></mesh>)}
    </group>))}
    {!lowQuality && <>
      <TechnicalSurface glass size={[4.1, 4.2]} position={[0, 0, -1.64]} rotation={[0, 0, 0]} />
      <TechnicalSurface glass size={[3.3, 4.2]} position={[2.07, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
    </>}
  </group>;
}

function CoreLayer({ level, expanded, lowQuality }: { level: number; expanded: boolean; lowQuality: boolean }) {
  const layer = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!layer.current) return;
    const opening = expanded ? 1 : MathUtils.smoothstep(world.progress, 0.05, 0.65);
    const height = (level - 2) * (0.72 + opening * 0.18);
    layer.current.position.y = world.paused ? height : MathUtils.damp(layer.current.position.y, height, 4, delta);
    layer.current.rotation.y = opening * (level - 2) * 0.025;
    layer.current.position.x = opening * (level % 2 ? 0.17 : -0.17);
  });
  return <group ref={layer} position={[0, (level - 2) * 0.72, 0]}>
    <RoundedBox args={[3.8, 0.15, 3]} radius={0.06} smoothness={3}>
      <meshStandardMaterial color={level === 4 ? "#b2b7b7" : "#727a7c"} metalness={0.93} roughness={0.24} />
      <Edges threshold={35} color="#d2dfdf" transparent opacity={0.2} />
    </RoundedBox>
    <mesh position={[0, -0.095, 0]}><boxGeometry args={[3.62, 0.018, 2.82]} /><meshBasicMaterial color={level === 2 ? "#ffb089" : "#abccc9"} /></mesh>
    <mesh position={[0, 0.11, 0]}><boxGeometry args={[3.32, 0.065, 2.55]} /><meshStandardMaterial color="#172425" metalness={0.68} roughness={0.35} /></mesh>
    <TechnicalSurface size={[3.25, 2.5]} position={[0, 0.15, 0]} opacity={1.8} />
    <RoundedBox args={[1.08, 0.16, 0.96]} radius={0.035} smoothness={2} position={[0, 0.23, 0]}><meshStandardMaterial color="#828e90" metalness={0.95} roughness={0.17} /></RoundedBox>
    <mesh position={[0, 0.32, 0]}><boxGeometry args={[0.73, 0.025, 0.6]} /><meshStandardMaterial color="#eab697" emissive="#e97546" emissiveIntensity={0.3} metalness={0.85} roughness={0.26} /></mesh>
    <Fins lowQuality={lowQuality} />
    <mesh position={[1.57, 0.12, 1.49]}><boxGeometry args={[0.16, 0.033, 0.02]} /><meshBasicMaterial color="#fff2cf" /></mesh>
  </group>;
}

function Fins({ lowQuality }: { lowQuality: boolean }) {
  const mesh = useRef<InstancedMesh>(null);
  const count = lowQuality ? 12 : 24;
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const dummy = new Object3D();
    for (let index = 0; index < count; index++) {
      dummy.position.set(index < count / 2 ? -1.25 : 1.25, 0.26, ((index % (count / 2)) / (count / 2 - 1) - 0.5) * 1.9);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);
  return <instancedMesh ref={mesh} args={[undefined, undefined, count]}><boxGeometry args={[0.47, 0.2, 0.038]} /><meshStandardMaterial color="#8d9b9d" metalness={0.93} roughness={0.2} /></instancedMesh>;
}