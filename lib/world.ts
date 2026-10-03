export const world = {
  progress: 0,
  cameraProgress: 0,
  pointer: { x: 0, y: 0 },
  activeProject: -1,
  activeTechnology: "",
  paused: false,
  mobile: false,
  ready: false,
};

export const STAGE_DISTANCE = 15;

export function seededRandom(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}