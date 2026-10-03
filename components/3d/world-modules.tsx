"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, RoundedBox } from "@react-three/drei";
import { Group, MathUtils, Mesh, MeshStandardMaterial } from "three";
import { cloudServices, pipeline, projects, skills, skillConnections } from "@/lib/portfolio";
import { world } from "@/lib/world";
import { Connection } from "./connections";
import { SceneLabel } from "./scene-label";
import { TechnicalSurface } from "./technical-surface";

export function CloudArchitecture() {
  return <group rotation={[0.1, -0.15, 0]} scale={1.15}>
    {cloudServices.map((service, index) => <group key={service.name}>
      {index > 0 && <Connection from={[0, 0, 0]} to={service.position} offset={index * 0.16} revealAt={1.64 + index * 0.025} />}
      <TechnologyNode name={service.name} position={service.position} major={index === 0} index={index} cloud />
    </group>)}
  </group>;
}

function TechnologyNode({ name, position, major, index, cloud = false }: { name: string; position: readonly [number, number, number]; major: boolean; index: number; cloud?: boolean }) {
  const group = useRef<Group>(null);
  const material = useRef<MeshStandardMaterial>(null);
  const elapsed = useRef(index * 0.7);
  useFrame((_, delta) => {
    if (!world.paused) elapsed.current += delta;
    const selected = world.activeTechnology === name;
    if (material.current) material.current.emissiveIntensity = MathUtils.damp(material.current.emissiveIntensity, selected ? 0.6 : 0.04, 6, delta);
    if (group.current) {
      const reveal = cloud ? MathUtils.clamp((world.progress - 1.5) * 2 - index * 0.07, 0.01, 1) : 1;
      group.current.scale.setScalar(reveal * (selected ? 1.08 : 1));
      group.current.position.y = position[1] + (world.paused ? 0 : Math.sin(elapsed.current * 0.45) * 0.06);
    }
  });
  const size = major ? 1.1 : 0.7;
  return <group ref={group} position={[...position]} onPointerOver={(event) => { event.stopPropagation(); world.activeTechnology = name; }} onPointerOut={() => { world.activeTechnology = ""; }} onClick={(event) => { event.stopPropagation(); world.activeTechnology = name; }}>
    <RoundedBox args={[size * 1.4, size * 0.5, size]} radius={0.05} smoothness={2} castShadow>
      <meshStandardMaterial ref={material} color={major ? "#687273" : "#333d40"} metalness={0.8} roughness={0.25} emissive="#ff7750" emissiveIntensity={0.04} />
      <Edges color="#8c9898" transparent opacity={0.28} />
    </RoundedBox>
    <mesh position={[0, -size * 0.2, size * 0.51]}><boxGeometry args={[size * 1.08, 0.028, 0.025]} /><meshBasicMaterial color={major ? "#ff8b69" : "#9abbbb"} /></mesh>
    <TechnicalSurface size={[size * 1.32, size * 0.92]} position={[0, size * 0.26, 0]} opacity={1.7} />
    <mesh position={[0, -size * 0.31, 0]}><boxGeometry args={[size * 1.6, 0.035, size * 1.2]} /><meshStandardMaterial color="#738a8c" metalness={0.85} roughness={0.25} /></mesh>
    <SceneLabel text={name} position={[0, size * 0.5 + 0.22, 0]} major={major} />
  </group>;
}

const pipelinePositions: [number, number, number][] = pipeline.map((_, index) => [(index - 3) * 0.96, Math.sin(index * 0.65) * 0.7, (index % 2) * -0.5]);

export function DeliveryPipeline() {
  const packet = useRef<Mesh>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!world.paused) elapsed.current += delta;
    const progress = (elapsed.current % 10) / 10;
    const scaled = Math.min(progress / 0.85, 1) * 6;
    const index = Math.min(5, Math.floor(scaled));
    const fraction = scaled - index;
    const from = pipelinePositions[index];
    const to = pipelinePositions[index + 1];
    if (packet.current) packet.current.position.set(MathUtils.lerp(from[0], to[0], fraction), MathUtils.lerp(from[1], to[1], fraction) + 0.26, MathUtils.lerp(from[2], to[2], fraction));
    document.documentElement.style.setProperty("--delivery-alpha", progress > 0.85 ? "1" : "0");
  });
  return <group rotation={[0, -0.15, 0]}>
    {pipeline.map((step, index) => <group key={step} position={pipelinePositions[index]}>
      <RoundedBox args={[0.67, 0.3, 0.8]} radius={0.06} smoothness={2}><meshStandardMaterial color="#4b5758" metalness={0.9} roughness={0.26} /><Edges color="#9fa6a2" opacity={0.35} transparent /></RoundedBox>
      <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.4, 0.45]} /><meshStandardMaterial color="#161d20" metalness={0.5} roughness={0.25} /></mesh>
      <SceneLabel text={String(index + 1).padStart(2, "0")} position={[0, -0.45, 0]} />
    </group>)}
    {pipelinePositions.slice(1).map((position, index) => <Connection key={index} from={pipelinePositions[index]} to={position} pulse={false} />)}
    <mesh ref={packet}><octahedronGeometry args={[0.14]} /><meshBasicMaterial color="#ffb099" toneMapped={false} /></mesh>
  </group>;
}

export function ProjectModules({ onSelect }: { onSelect: (index: number) => void }) {
  const count = Math.max(3, projects.length);
  return <group rotation={[0, -0.2, 0]}>
    {Array.from({ length: count }, (_, index) => <ServerRack key={index} index={index} count={count} onSelect={onSelect} />)}
  </group>;
}

function ServerRack({ index, count, onSelect }: { index: number; count: number; onSelect: (index: number) => void }) {
  const group = useRef<Group>(null);
  const material = useRef<MeshStandardMaterial>(null);
  useFrame((_, delta) => {
    const active = world.activeProject === index;
    if (group.current) group.current.position.y = MathUtils.damp(group.current.position.y, active ? 0.2 : 0, 5, delta);
    if (material.current) material.current.emissiveIntensity = MathUtils.damp(material.current.emissiveIntensity, active ? 0.22 : 0, 5, delta);
  });
  return <group ref={group} position={[(index - (count - 1) / 2) * 1.8, 0, 0]} onPointerOver={() => { world.activeProject = index; }} onPointerOut={() => { world.activeProject = -1; }} onClick={() => { if (projects[index]) onSelect(index); }}>
    <RoundedBox args={[1.32, 2.75, 1.15]} radius={0.07} smoothness={2} castShadow><meshStandardMaterial ref={material} color="#2d3437" metalness={0.85} roughness={0.27} emissive="#ff694b" /><Edges color="#697877" transparent opacity={0.25} /></RoundedBox>
    {[0, 1, 2, 3, 4, 5].map((slot) => <group key={slot} position={[0, slot * 0.37 - 0.94, 0.59]}><mesh><boxGeometry args={[1.1, 0.27, 0.035]} /><meshStandardMaterial color="#111719" metalness={0.65} roughness={0.28} /></mesh><mesh position={[-0.41, 0, 0.025]}><boxGeometry args={[0.035, 0.09, 0.01]} /><meshBasicMaterial color={slot % 3 ? "#b5c7c0" : "#f77d5a"} /></mesh><mesh position={[0.08, 0, 0.025]}><boxGeometry args={[0.58, 0.025, 0.01]} /><meshBasicMaterial color="#526261" /></mesh></group>)}
    <SceneLabel text={["01 / AUTOMATISER", "02 / LIVRER", "03 / COORDONNER"][index] ?? `RÉALISATION / ${index + 1}`} position={[0, 1.7 + (index % 2) * 0.35, 0]} />
  </group>;
}

export function ExperienceTrajectory() {
  const positions: [number, number, number][] = [[-2, -1.8, 1], [-0.7, -0.5, 0.2], [0.5, 1.1, -0.8], [1.9, 2.5, -1.5]];
  const labels = ["2020 / BTS SIO", "2022 / ODIGO", "2024 / ENEDIS", "2026 / RNCP 7"];
  return <group>
    {positions.slice(1).map((position, index) => <Connection key={index} from={positions[index]} to={position} offset={index * 0.22} />)}
    {positions.map((position, index) => <group key={index} position={position}><RoundedBox args={[0.75, 0.18, 0.7]} radius={0.04} smoothness={2}><meshStandardMaterial color={index === 2 ? "#d59e80" : "#83999a"} metalness={0.9} roughness={0.22} /><Edges color="#c3d3d0" transparent opacity={0.5} /></RoundedBox><TechnicalSurface size={[0.72, 0.65]} position={[0, 0.1, 0]} /><SceneLabel text={labels[index]} position={[0, 0.5, 0]} major={index === 2} /></group>)}
  </group>;
}

export function SkillNetwork() {
  return <group rotation={[0.06, -0.05, 0]}>{skillConnections.map(([from, to], index) => <Connection key={index} from={skills[from].position} to={skills[to].position} offset={index * 0.11} color="#7ca5a2" pulse={index % 2 === 0} />)}{skills.map((skill, index) => <TechnologyNode key={skill.name} {...skill} index={index} />)}</group>;
}