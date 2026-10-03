"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, SpriteMaterial, SRGBColorSpace } from "three";
import { world } from "@/lib/world";

export function SceneLabel({ text, position, major = false }: { text: string; position: [number, number, number]; major?: boolean }) {
  const material = useRef<SpriteMaterial>(null);
  const [texture] = useState(() => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(256, text.length * 28 + 60);
    canvas.height = 100;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "rgba(16, 21, 21, 0.92)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = major ? "#927665" : "#51615b";
    context.lineWidth = 2;
    context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    context.fillStyle = major ? "#f4ded0" : "#d0dcd5";
    context.font = `${major ? 500 : 400} 35px ${getComputedStyle(document.body).fontFamily}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, 50);
    const result = new CanvasTexture(canvas);
    result.colorSpace = SRGBColorSpace;
    return result;
  });
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame(() => { if (material.current) material.current.color.set(world.activeTechnology === text ? "#ffab89" : "#ffffff"); });
  const height = major ? 0.32 : 0.26;
  return <sprite position={position} scale={[texture.image.width / texture.image.height * height, height, 1]}><spriteMaterial ref={material} map={texture} transparent depthWrite={false} toneMapped={false} /></sprite>;
}