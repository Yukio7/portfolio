"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CubicBezierCurve3, MathUtils, PerspectiveCamera, Vector3 } from "three";
import { STAGE_DISTANCE, world } from "@/lib/world";

const cameraStops = [
  { position: [7.8, 5.8, 12], target: [-2.7, 0.65, 0], fov: 35 },
  { position: [5.2, 3.7, 11.5], target: [-3, 0.1, 0], fov: 36 },
  { position: [4.6, 5.3, 13.5], target: [-2.8, 0, 0], fov: 38 },
  { position: [4, 4.8, 14], target: [-2.6, 0, 0], fov: 36 },
  { position: [6.8, 3.8, 13.3], target: [-2.3, 0.1, 0], fov: 37 },
  { position: [4.4, 3.6, 13.2], target: [-2.8, 0, 0], fov: 37 },
  { position: [3.5, 3.8, 14.3], target: [-2.7, 0, 0], fov: 38 },
  { position: [1.5, 5, 22], target: [0, 0, 0], fov: 40 },
];

const routes = cameraStops.slice(0, -1).map((stop, index) => {
  const next = cameraStops[index + 1];
  const origin = new Vector3(stop.position[0], stop.position[1] - index * STAGE_DISTANCE, stop.position[2]);
  const destination = new Vector3(next.position[0], next.position[1] - (index + 1) * STAGE_DISTANCE, next.position[2]);
  return new CubicBezierCurve3(origin, origin.clone().add(new Vector3(1.5, -6, -3.5)), destination.clone().add(new Vector3(-1.2, 5, -2.8)), destination);
});

export function CameraRig() {
  const target = useRef(new Vector3());
  const position = useRef(new Vector3());
  const currentLook = useRef(new Vector3(-2.3, 0.3, 0));
  const initialized = useRef(false);
  const entrance = useRef(0);
  useFrame(({ camera }, delta) => {
    const progress = MathUtils.clamp(world.progress, 0, 7);
    const index = Math.min(6, Math.floor(progress));
    const fraction = world.paused ? (progress - index > 0.82 ? 1 : 0) : MathUtils.smootherstep(progress - index, 0.48, 1);
    world.cameraProgress = index + fraction;
    const from = cameraStops[index];
    const to = cameraStops[index + 1];
    const vertical = MathUtils.lerp(index, index + 1, fraction) * STAGE_DISTANCE;
    const mobile = world.mobile;
    const pointerX = world.paused ? 0 : world.pointer.x;
    const pointerY = world.paused ? 0 : world.pointer.y;
    entrance.current = world.paused ? 3 : Math.min(3, entrance.current + Math.min(delta, 0.05));
    const approach = (1 - MathUtils.smootherstep(entrance.current, 0, 2.6)) * (1 - MathUtils.smoothstep(progress, 0, 0.25));
    routes[index].getPoint(fraction, position.current);
    position.current.x += pointerX * 0.2 + approach * 1.5;
    position.current.y += pointerY * 0.12 + approach * 1.2;
    position.current.z += (mobile ? 3.7 : 0) + approach * 3;
    target.current.set(mobile ? -0.25 : MathUtils.lerp(from.target[0], to.target[0], fraction), (mobile ? 0.7 : MathUtils.lerp(from.target[1], to.target[1], fraction)) - vertical, 0);
    if (index === 4 && world.activeProject >= 0 && !world.paused) {
      target.current.x += (world.activeProject - 1) * 0.12;
      position.current.z -= 0.3;
    }
    const damping = initialized.current && !world.paused ? 1 - Math.exp(-delta * 7) : 1;
    camera.position.lerp(position.current, damping);
    currentLook.current.lerp(target.current, damping);
    camera.lookAt(currentLook.current);
    if (!world.paused && !mobile) camera.rotateZ(Math.sin(fraction * Math.PI) * 0.025);
    if (camera instanceof PerspectiveCamera) {
      const nextFov = mobile ? 44 : MathUtils.lerp(from.fov, to.fov, fraction);
      if (camera.fov !== nextFov) { camera.fov = nextFov; camera.updateProjectionMatrix(); }
    }
    initialized.current = true;
  });
  return null;
}