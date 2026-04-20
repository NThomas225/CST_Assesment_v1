import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const tunnelVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const tunnelFragmentShader = `
uniform float time;
uniform float progress;
uniform vec3 color;
uniform vec3 lightColor;
uniform float linesCount;
uniform float linesSpeed;
varying vec2 vUv;
varying vec3 vNormal;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  float center = distance(vUv, vec2(0.5));
  float mask = smoothstep(0.5, 0.4999, abs(vUv.x - 0.5));
  float flow = map(mod(vUv.x * linesCount + progress * linesSpeed, 1.0), 0.0, 1.0, -1.0, 1.0) * mask;
  float light = 0.09 * max(0.0, vNormal.x) + center * 0.1;
  float pulse = 0.5 + 0.5 * sin(time * 2.0 + vUv.y * 10.0);
  light += pulse * 0.03;
  vec3 baseColor = vec3(0.02, 0.03, 0.04);
  vec3 finalColor = mix(baseColor, lightColor, light) + flow * color;
  float fogMix = smoothstep(200.0, 0.0, gl_FragCoord.z / gl_FragCoord.w);
  finalColor = mix(vec3(0.02, 0.02, 0.02), finalColor, fogMix);
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function TunnelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.0025);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(0, 0, 250);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Tunnel path - hexagonal cross-section
    const tunnelPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(30, 20, -200),
      new THREE.Vector3(-20, -10, -400),
      new THREE.Vector3(40, 30, -600),
      new THREE.Vector3(-30, -20, -800),
      new THREE.Vector3(20, 10, -1000),
      new THREE.Vector3(0, 0, -1200),
    ]);

    const tunnelGeometry = new THREE.TubeGeometry(tunnelPath, 300, 12, 6, false);

    // Shader material
    const tunnelMaterial = new THREE.ShaderMaterial({
      vertexShader: tunnelVertexShader,
      fragmentShader: tunnelFragmentShader,
      uniforms: {
        time: { value: 0.0 },
        progress: { value: 0.0 },
        color: { value: new THREE.Color('#D4943A') },
        lightColor: { value: new THREE.Color('#1A3A5C') },
        linesCount: { value: 8.0 },
        linesSpeed: { value: 0.5 },
      },
      side: THREE.BackSide,
    });

    const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
    scene.add(tunnel);

    // Wireframe overlay
    const wireframeGeometry = new THREE.WireframeGeometry(tunnelGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xD4943A, transparent: true, opacity: 0.08 });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    wireframe.scale.set(1.01, 1.01, 1.01);
    scene.add(wireframe);

    // Point lights
    const lightsGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const light = new THREE.PointLight(
        i % 2 === 0 ? 0xD4943A : 0x1A3A5C,
        0.4 + i * 0.1,
        400
      );
      lightsGroup.add(light);
    }
    scene.add(lightsGroup);

    // Camera group for mouse parallax
    const cameraGroup = new THREE.Group();
    cameraGroup.add(camera);
    scene.add(cameraGroup);

    // Animation state
    const percentage = { value: 0 };
    const target = { value: 0.96 };
    const speed = 0.08;
    const clock = new THREE.Clock();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Update shader uniforms
      tunnelMaterial.uniforms.time.value = time;
      tunnelMaterial.uniforms.progress.value += 0.001 * delta * speed;

      // Advance camera along path
      percentage.value += (target.value - percentage.value) * speed * delta;
      const clampedPct = Math.min(percentage.value, 0.99);

      const p1 = tunnelPath.getPointAt(clampedPct);
      cameraGroup.position.copy(p1);

      const lookAtTarget = tunnelPath.getPointAt(Math.min(clampedPct + 0.03, 0.99));
      camera.lookAt(lookAtTarget);

      // Mouse parallax
      cameraGroup.position.x += (mouseRef.current.x * 8 - cameraGroup.position.x + p1.x) * 0.05 - p1.x * 0.05;
      cameraGroup.position.y += (mouseRef.current.y * 5 - cameraGroup.position.y + p1.y) * 0.05 - p1.y * 0.05;

      // Update lights along path ahead of camera
      for (let i = 0; i < 4; i++) {
        const t = Math.min(clampedPct + 0.02 + i * 0.03, 0.99);
        lightsGroup.children[i].position.copy(tunnelPath.getPointAt(t));
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      tunnelGeometry.dispose();
      tunnelMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
