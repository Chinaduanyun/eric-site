<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';

const container = ref(null);

let scene;
let camera;
let renderer;
let particles;
let geometry;
let material;
let animationFrameId;
let resizeObserver;
const particleImageSrc = `${import.meta.env.BASE_URL}backgrounds/mountains.webp`;

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };

let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

let visibleWidth = 0;
let visibleHeight = 0;

let containerWidth = 0;
let containerHeight = 0;

const updateVisibleDimensions = () => {
  if (!camera) return;
  const fovRad = camera.fov * Math.PI / 180;
  visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
  visibleWidth = visibleHeight * camera.aspect;
};

const init = () => {
  if (!container.value) return;

  const rect = container.value.getBoundingClientRect();
  containerWidth = rect.width;
  containerHeight = rect.height;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
  camera.position.z = 300;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(containerWidth, containerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.value.appendChild(renderer.domElement);

  updateVisibleDimensions();
  loadImageAndCreateParticles();

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) continue;
      containerWidth = width;
      containerHeight = height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateVisibleDimensions();
    }
  });
  resizeObserver.observe(container.value);

  const dom = renderer.domElement;
  dom.addEventListener('mousedown', onMouseDown);
  dom.addEventListener('mousemove', onMouseMove);
  dom.addEventListener('mouseup', onMouseUp);
  dom.addEventListener('mouseleave', onMouseUp);

  animate();
};

const loadImageAndCreateParticles = () => {
  const img = new Image();
  img.src = particleImageSrc;

  img.onerror = () => {
    console.error(`Failed to load particle image: ${particleImageSrc}`);
  };

  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgWidth = 800;
    const imgHeight = Math.floor((img.height / img.width) * imgWidth);

    canvas.width = imgWidth;
    canvas.height = imgHeight;
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

    const imgData = ctx.getImageData(0, 0, imgWidth, imgHeight).data;

    const scale = Math.max(visibleWidth / imgWidth, visibleHeight / imgHeight);

    geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    const alphas = [];
    const originalPositions = [];

    for (let y = 0; y < imgHeight; y++) {
      for (let x = 0; x < imgWidth; x++) {
        const index = (y * imgWidth + x) * 4;
        const r = imgData[index] / 255;
        const g = imgData[index + 1] / 255;
        const b = imgData[index + 2] / 255;
        const a = imgData[index + 3] / 255;

        if (a > 0.1) {
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

          const dx = x - imgWidth / 2;
          const dy = y - imgHeight / 2;
          let posX = dx * scale;
          let posY = -dy * scale;

          let posZ = (luminance - 0.5) * visibleWidth * 0.08;

          const normalizedX = Math.abs(dx) / (imgWidth / 2);
          const normalizedY = Math.abs(dy) / (imgHeight / 2);

          const noise = (Math.sin(x * 0.05) * Math.cos(y * 0.05) + Math.sin((x + y) * 0.02)) * 0.08;
          const edgeFactor = Math.max(normalizedX, normalizedY) + noise;

          let alpha = 1.0;
          let size = scale * 1.8;

          const solidZone = 0.65;
          const edgeZone = 0.90;

          if (edgeFactor > solidZone) {
            const scatterFactor = (edgeFactor - solidZone) / (1.0 - solidZone);
            const smoothScatter = Math.pow(scatterFactor, 2.0);

            const maxZScatter = visibleWidth * 0.2;
            posZ += (Math.random() - 0.5) * maxZScatter * smoothScatter;

            const maxXYScatter = scale * 40.0;
            posX += (Math.random() - 0.5) * maxXYScatter * smoothScatter;
            posY += (Math.random() - 0.5) * maxXYScatter * smoothScatter;

            size = (scale * 1.8) - (scale * 1.2 * smoothScatter);

            if (edgeFactor > edgeZone) {
              alpha = 1.0 - (edgeFactor - edgeZone) / (1.0 - edgeZone);
              alpha = Math.max(0, alpha);
            }
          }

          if (alpha > 0.05) {
            positions.push(posX, posY, posZ);
            originalPositions.push(posX, posY, posZ);
            colors.push(r, g, b);
            sizes.push(size);
            alphas.push(alpha);
          }
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1));
    geometry.setAttribute('originalPosition', new THREE.Float32BufferAttribute(originalPositions, 3));

    material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute vec3 color;
        attribute float size;
        attribute float alpha;
        attribute vec3 originalPosition;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vAlpha = alpha;
          vec3 pos = position;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;

          float particleAlpha = smoothstep(0.5, 0.4, dist) * vAlpha;

          gl_FragColor = vec4(vColor, particleAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  };
};

const onMouseDown = (e) => {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
};

const onMouseMove = (e) => {
  const rect = renderer.domElement.getBoundingClientRect();
  targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  targetMouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  targetMouseX *= visibleWidth / 2;
  targetMouseY *= visibleHeight / 2;

  if (isDragging) {
    const deltaMove = {
      x: e.clientX - previousMousePosition.x,
      y: e.clientY - previousMousePosition.y
    };

    targetRotation.x += deltaMove.y * 0.005;
    targetRotation.y += deltaMove.x * 0.005;

    const maxPitch = 85 * (Math.PI / 180);
    targetRotation.x = Math.max(-maxPitch, Math.min(maxPitch, targetRotation.x));

    previousMousePosition = { x: e.clientX, y: e.clientY };
  }
};

const onMouseUp = () => {
  isDragging = false;
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);

  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

  if (particles) {
    particles.rotation.x = currentRotation.x;
    particles.rotation.y = currentRotation.y;

    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;

    const positions = geometry.attributes.position.array;
    const originalPositions = geometry.attributes.originalPosition.array;
    const maxDist = visibleWidth * 0.06;
    const maxDistSq = maxDist * maxDist;
    const pushStrength = visibleWidth * 0.04;

    for (let i = 0; i < positions.length; i += 3) {
      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];
      const oz = originalPositions[i + 2];

      const px = positions[i];
      const py = positions[i + 1];
      const pz = positions[i + 2];

      const dx = ox - mouseX;
      const dy = oy - mouseY;
      const distSq = dx * dx + dy * dy;

      let targetX = ox;
      let targetY = oy;
      let targetZ = oz;

      if (distSq < maxDistSq) {
        const dist = Math.sqrt(distSq);
        const safeDist = dist || 1;
        const force = Math.pow((maxDist - dist) / maxDist, 1.2);
        const normalizedDx = dx / safeDist;
        const normalizedDy = dy / safeDist;

        targetX = ox + normalizedDx * force * pushStrength;
        targetY = oy + normalizedDy * force * pushStrength;
        targetZ = oz + force * pushStrength * 0.5;
      }

      positions[i] += (targetX - px) * 0.1;
      positions[i + 1] += (targetY - py) * 0.1;
      positions[i + 2] += (targetZ - pz) * 0.1;
    }
    geometry.attributes.position.needsUpdate = true;

    const material = particles.material;
    material.uniforms.uMouse.value.set(mouseX, mouseY);
    material.uniforms.uTime.value += 0.05;
  }

  renderer.render(scene, camera);
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  if (renderer) {
    const dom = renderer.domElement;
    dom.removeEventListener('mousedown', onMouseDown);
    dom.removeEventListener('mousemove', onMouseMove);
    dom.removeEventListener('mouseup', onMouseUp);
    dom.removeEventListener('mouseleave', onMouseUp);
    renderer.dispose();
  }
  if (geometry) {
    geometry.dispose();
  }
  if (material) {
    material.dispose();
  }
});
</script>

<template>
  <div ref="container" class="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"></div>
</template>
