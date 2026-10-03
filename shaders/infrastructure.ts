export const surfaceVertex = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vUv = uv;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const circuitFragment = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    vec2 coordinates = vUv * vec2(18.0, 14.0);
    vec2 grid = abs(fract(coordinates - 0.5) - 0.5) / fwidth(coordinates);
    float trace = 1.0 - min(min(grid.x, grid.y), 1.0);
    float selection = step(0.58, fract(sin(floor(coordinates.y) * 31.71) * 43758.54));
    float route = (1.0 - min(grid.y, 1.0)) * selection;
    float signal = pow(max(0.0, 1.0 - abs(fract(vUv.x - uTime * 0.075 + floor(coordinates.y) * 0.17) - 0.5) * 12.0), 3.0);
    float edge = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.85, 1.0, vUv.x))
      * smoothstep(0.0, 0.12, vUv.y) * (1.0 - smoothstep(0.85, 1.0, vUv.y));
    float alpha = (trace * 0.1 + route * signal * 0.85) * edge * uOpacity;
    gl_FragColor = vec4(mix(vec3(0.42, 0.58, 0.6), uColor, signal), alpha);
  }
`;

export const glassFragment = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.5);
    float edge = 1.0 - smoothstep(0.0, 0.014, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
    float scan = pow(max(0.0, 1.0 - abs(fract(vUv.y - uTime * 0.035) - 0.5) * 20.0), 3.0);
    float alpha = (fresnel * 0.09 + edge * 0.25 + scan * 0.035) * uOpacity;
    gl_FragColor = vec4(mix(vec3(0.56, 0.78, 0.83), vec3(1.0, 0.64, 0.43), scan * 0.7), alpha);
  }
`;

export const flowVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const flowFragment = `
  uniform float uTime;
  uniform float uOffset;
  uniform float uReveal;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float head = fract(uTime * 0.18 + uOffset);
    float distanceToHead = fract(head - vUv.x);
    float pulse = exp(-distanceToHead * 32.0);
    float reveal = 1.0 - smoothstep(uReveal - 0.025, uReveal, vUv.x);
    gl_FragColor = vec4(uColor * (0.45 + pulse * 1.8), (0.3 + pulse * 0.7) * reveal);
  }
`;