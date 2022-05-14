uniform vec2 uWave;
uniform float uTime;

varying vec2 vUv;
varying float vElavation;

void main () {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uWave.x + uTime) * 0.1;
  elevation += sin(modelPosition.y * uWave.y + uTime) * 0.1;

  modelPosition.z = elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;

  vUv = uv;
  vElavation = elevation;
}