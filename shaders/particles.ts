export const particleVertex = `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSize;
  varying float vOpacity;
  void main() {
    vec3 transformed = position;
    transformed.x += sin(uTime * 0.12 + position.y) * 0.16;
    transformed.y += cos(uTime * 0.1 + position.x) * 0.18;
    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(aSize * uPixelRatio * (12.0 / -viewPosition.z), 1.0, 4.0);
    vOpacity = 0.24 + 0.2 * sin(position.x + uTime * 0.3);
  }
`;

export const particleFragment = `
  varying float vOpacity;
  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.12, distanceToCenter) * vOpacity;
    gl_FragColor = vec4(0.71, 0.78, 0.8, alpha);
  }
`;