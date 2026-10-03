"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Group, PointLight } from "three";
import { STAGE_DISTANCE, world } from "@/lib/world";
import { CameraRig } from "./camera-rig";
import { Core } from "./core";
import { Connection } from "./connections";
import { Particles } from "./particles";
import { RenderLoop } from "./render-loop";
import { Backbone } from "./backbone";
import { CloudArchitecture, DeliveryPipeline, ExperienceTrajectory, ProjectModules, SkillNetwork } from "./world-modules";

function Stage({ index, children }: { index: number; children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame(() => { if (group.current) group.current.visible = Math.abs(world.cameraProgress - index) < 1.15; });
  return <group ref={group} position={[0, -index * STAGE_DISTANCE, 0]}>{children}</group>;
}

function Lighting() {
  const lights = useRef<Group>(null);
  const accent = useRef<PointLight>(null);
  useFrame(() => {
    if (lights.current) lights.current.position.y = -world.cameraProgress * STAGE_DISTANCE;
    if (accent.current) accent.current.position.x = -3 + (world.paused ? 0 : world.pointer.x);
  });
  return <group ref={lights}>
    <ambientLight intensity={0.3} />
    <directionalLight position={[-2, 8, 5]} intensity={4.2} color="#edf5f5" />
    <pointLight ref={accent} position={[-3, 1, 3]} intensity={20} color="#ff9368" distance={12} decay={2} />
    <pointLight position={[4, 5, -4]} intensity={42} color="#9acbd6" distance={17} decay={2} />
  </group>;
}

function Ready({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  useFrame(() => { if (++frames.current === 3) { world.ready = true; onReady(); } });
  return null;
}

function Scene({ lowQuality, active, onReady, onProject }: { lowQuality: boolean; active: number; onReady: () => void; onProject: (index: number) => void }) {
  return <>
    <color attach="background" args={["#101213"]} />
    <fog attach="fog" args={["#101213", 20, 40]} />
    <CameraRig /><Lighting />
    <Environment resolution={lowQuality ? 64 : 128} frames={1}>
      <Lightformer form="rect" intensity={5} color="#f5f1e9" position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 4, 1]} />
      <Lightformer form="rect" intensity={2.5} color="#aec8cc" position={[4, 2, -3]} rotation={[0, -Math.PI / 2, 0]} scale={[5, 7, 1]} />
      <Lightformer form="rect" intensity={2} color="#ff8865" position={[-5, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[2, 5, 1]} />
    </Environment>
    <Backbone />
    {active < 2 && <Stage index={0}><Core lowQuality={lowQuality} /><Connection from={[-4.6, -2.5, -3.5]} to={[-2, -1.7, 1]} /><Connection from={[2, 1.6, -1]} to={[4.6, -2.5, -3.5]} offset={0.4} color="#92bdc4" /></Stage>}
    {Math.abs(active - 1) <= 1 && <Stage index={1}><Core compact lowQuality={lowQuality} /></Stage>}
    {Math.abs(active - 2) <= 1 && <Stage index={2}><CloudArchitecture /></Stage>}
    {Math.abs(active - 3) <= 1 && <Stage index={3}><DeliveryPipeline /></Stage>}
    {Math.abs(active - 4) <= 1 && <Stage index={4}><ProjectModules onSelect={onProject} /><gridHelper args={[20, 24, "#293335", "#1c2425"]} position={[0, -1.45, 0]} /></Stage>}
    {Math.abs(active - 5) <= 1 && <Stage index={5}><ExperienceTrajectory /></Stage>}
    {Math.abs(active - 6) <= 1 && <Stage index={6}><SkillNetwork /></Stage>}
    <Particles lowQuality={lowQuality} /><Ready onReady={onReady} />
  </>;
}

export default function WorldScene({ active, paused, onReady, onError, onProject }: { active: number; paused: boolean; onReady: () => void; onError: () => void; onProject: (index: number) => void }) {
  const [visible, setVisible] = useState(() => !document.hidden);
  const [lowQuality] = useState(() => window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4);
  useEffect(() => {
    const change = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);
  return <Canvas
    dpr={lowQuality ? 1 : [1, 1.6]}
    camera={{ position: [8.2, 6.7, 12.8], fov: 37, near: 0.1, far: 65 }}
    gl={{ antialias: !lowQuality, alpha: false, powerPreference: "high-performance" }}
    frameloop={visible ? "demand" : "never"}
    onCreated={({ gl }) => { gl.domElement.addEventListener("webglcontextlost", onError, { once: true }); }}
    fallback={<div className="canvas-fallback" />}
    aria-label="Infrastructure Cloud interactive en trois dimensions"
    style={{ touchAction: "pan-y" }}
  ><RenderLoop paused={paused} visible={visible} lowQuality={lowQuality} /><Suspense fallback={null}><Scene lowQuality={lowQuality || paused} active={active} onReady={onReady} onProject={onProject} /></Suspense></Canvas>;
}