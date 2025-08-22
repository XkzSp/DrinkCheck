import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    cap: THREE.Group;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
  }>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Add point lights for more dramatic lighting
    const pointLight1 = new THREE.PointLight(0x2563eb, 0.8, 20);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7c3aed, 0.6, 15);
    pointLight2.position.set(5, -3, 3);
    scene.add(pointLight2);

    // Create cap geometry
    const capGroup = new THREE.Group();

    // Internal system components (Arduino, sensors, etc.)
    const internalGroup = new THREE.Group();
    
    // Arduino board (small green rectangle)
    const arduinoGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.6);
    const arduinoMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00aa00,
      metalness: 0.3,
      roughness: 0.7,
    });
    const arduinoMesh = new THREE.Mesh(arduinoGeometry, arduinoMaterial);
    arduinoMesh.position.y = -0.1;
    internalGroup.add(arduinoMesh);
    
    // Wires/connections (small cylinders)
    for (let i = 0; i < 4; i++) {
      const wireGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
      const wireMaterial = new THREE.MeshPhysicalMaterial({
        color: i % 2 === 0 ? 0xff0000 : 0x000000,
        metalness: 0.8,
        roughness: 0.2,
      });
      const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
      wireMesh.position.set(
        (i - 1.5) * 0.3,
        0.05,
        0
      );
      wireMesh.rotation.z = Math.PI / 2;
      internalGroup.add(wireMesh);
    }
    
    // Battery (small black box)
    const batteryGeometry = new THREE.BoxGeometry(0.4, 0.08, 0.2);
    const batteryMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x333333,
      metalness: 0.1,
      roughness: 0.8,
    });
    const batteryMesh = new THREE.Mesh(batteryGeometry, batteryMaterial);
    batteryMesh.position.set(0.6, -0.08, 0.3);
    internalGroup.add(batteryMesh);
    
    internalGroup.position.y = 0.1;
    internalGroup.visible = false; // Initially hidden
    capGroup.add(internalGroup);

    // Main cap body (cylinder)
    const capGeometry = new THREE.CylinderGeometry(1.5, 1.6, 0.4, 32);
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      metalness: 0.7,
      roughness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.castShadow = true;
    capMesh.receiveShadow = true;
    capGroup.add(capMesh);

    // Cap top
    const topGeometry = new THREE.CylinderGeometry(1.4, 1.4, 0.08, 32);
    const topMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
    });
    const topMesh = new THREE.Mesh(topGeometry, topMaterial);
    topMesh.position.y = 0.24;
    topMesh.castShadow = true;
    capGroup.add(topMesh);

    // LED ring
    const ledGeometry = new THREE.TorusGeometry(1.2, 0.08, 8, 16);
    const ledMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0x00ff00,
      emissive: 0x004400,
      metalness: 0.1,
      roughness: 0.3,
    });
    const ledRing = new THREE.Mesh(ledGeometry, ledMaterial);
    ledRing.position.y = 0.15;
    capGroup.add(ledRing);

    // Sensor dot
    const sensorGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const sensorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      emissive: 0x440000,
      metalness: 0.2,
      roughness: 0.4,
    });
    const sensorMesh = new THREE.Mesh(sensorGeometry, sensorMaterial);
    sensorMesh.position.y = 0.28;
    capGroup.add(sensorMesh);

    scene.add(capGroup);
    camera.position.set(3, 2, 6);
    camera.lookAt(0, 0, 0);

    sceneRef.current = { cap: capGroup, camera, renderer, internalSystem: internalGroup };

    // Local animation ID for this specific useEffect run
    let animationId: number;
    
    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Constant smooth rotation on all axes
      capGroup.rotation.y += 0.012;
      capGroup.rotation.x += 0.008;
      capGroup.rotation.z += 0.005;
      
      // LED pulsing effect
      const pulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;
      ledMaterial.emissive.setRGB(0, pulse * 0.3, 0);
      
      // Sensor blinking
      const blink = Math.sin(Date.now() * 0.01) > 0.8 ? 1 : 0;
      sensorMaterial.emissive.setRGB(blink * 0.5, 0, 0);

      // Floating animation
      capGroup.position.y = Math.sin(Date.now() * 0.002) * 0.3;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP ScrollTrigger animations for the 3D cap
  useEffect(() => {
    if (!sceneRef.current) return;

    const { cap, camera, internalSystem } = sceneRef.current;
    
    // Hero section - cap starts far and comes closer
    gsap.set(cap.position, { x: 0, y: 0, z: -5 });
    gsap.set(cap.scale, { x: 0.5, y: 0.5, z: 0.5 });
    gsap.set(camera.position, { x: 3, y: 2, z: 8 });

    // Timeline for scroll-based animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Move cap across the screen as user scrolls
          cap.position.x = Math.sin(progress * Math.PI * 2) * 2;
          cap.position.z = -5 + progress * 8; // Comes closer as you scroll
          
          // Scale animation
          const scale = 0.5 + progress * 1.5;
          cap.scale.set(scale, scale, scale);
          
          // Camera movement for cinematic effect
          camera.position.x = 3 + Math.sin(progress * Math.PI) * 2;
          camera.position.y = 2 + Math.cos(progress * Math.PI) * 1;
          camera.position.z = 8 - progress * 3;
          camera.lookAt(cap.position);
        }
      }
    });

    // Individual section animations
    gsap.to(cap.rotation, {
      z: Math.PI * 2,
      duration: 2,
      repeat: -1,
      ease: "none",
      scrollTrigger: {
        trigger: "#demo",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      }
    });

    gsap.to(cap.position, {
      x: -3,
      duration: 1,
      scrollTrigger: {
        trigger: "#caracteristicas",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      }
    });

    gsap.to(cap.position, {
      x: 3,
      duration: 1,
      scrollTrigger: {
        trigger: "#como-funciona",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      }
    });

    // Show internal system after features section
    gsap.to(internalSystem, {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: "#como-funciona",
        start: "top 60%",
        end: "top 40%",
        onEnter: () => {
          internalSystem.visible = true;
        },
        onLeave: () => {
          internalSystem.visible = false;
        },
        onEnterBack: () => {
          internalSystem.visible = true;
        },
        onLeaveBack: () => {
          internalSystem.visible = false;
        }
      }
    });

    // Special rotation animation for internal system showcase
    gsap.to(cap.rotation, {
      x: Math.PI * 0.3,
      y: Math.PI * 4,
      z: Math.PI * 0.2,
      duration: 3,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#como-funciona",
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1
      }
    });
    gsap.to(cap.scale, {
      x: 2.5,
      y: 2.5,
      z: 2.5,
      duration: 1,
      scrollTrigger: {
        trigger: "#planes",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ThreeScene;