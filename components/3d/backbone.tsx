"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { Group } from "three";
import { STAGE_DISTANCE, world } from "@/lib/world";
import { Connection } from "./connections";
import { TechnicalSurface } from "./technical-surface";

export function Backbone() {
  const group = useRef<Group>(null);
  useFrame(() => { if (group.current) group.current.visible = world.cameraProgress < 6.8; });
  return <group ref={group}>
    {Array.from({ length: 7 }, (_, stage) => <group key={stage} position={[0, -stage * STAGE_DISTANCE, 0]}>
      {[-1, 1].map((side) => <group key={side}>
        <mesh position={[side * 4.7, -7.5, -3.6]}><boxGeometry args={[0.12, STAGE_DISTANCE, 0.16]} /><meshStandardMaterial color="#46595c" metalness={0.8} roughness={0.35} /></mesh>
        <Connection from={[side * 4.6, 0, -3.5]} to={[side * 4.6, -STAGE_DISTANCE, -3.5]} color={side === 1 ? "#cd8462" : "#86bcc4"} offset={stage * 0.13} radius={0.018} />
        <Connection from={[side * 4.6, -2.5, -3.5]} to={[side * 1.8, -2.5, 0]} color="#6a9197" offset={stage * 0.2} />
      </group>)}
      <mesh position={[0, -2.72, -0.7]}><boxGeometry args={[10.2, 0.09, 6.4]} /><meshStandardMaterial color="#131c1e" metalness={0.6} roughness={0.5} /><Edges color="#78969a" transparent opacity={0.22} /></mesh>
      <TechnicalSurface size={[10, 6.2]} position={[0, -2.66, -0.7]} opacity={0.55} />
    </group>)}
  </group>;
}