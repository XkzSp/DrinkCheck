import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    cap: THREE.Group;
  }>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Create cap geometry
    const capGroup = new THREE.Group();

    // Main cap body (cylinder)
    const capGeometry = new THREE.CylinderGeometry(1.2, 1.3, 0.3, 32);
    const capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb,
      metalness: 0.7,
      roughness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capGroup.add(capMesh);

    // Cap top
    const topGeometry = new THREE.CylinderGeometry(1.1, 1.1, 0.05, 32);
    const topMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
    });
    const topMesh = new THREE.Mesh(topGeometry, topMaterial);
    topMesh.position.y = 0.175;
    capGroup.add(topMesh);

    // LED ring
    const ledGeometry = new THREE.TorusGeometry(0.9, 0.05, 8, 16);
    const ledMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0x00ff00,
      emissive: 0x004400,
      metalness: 0.1,
      roughness: 0.3,
    });
    const ledRing = new THREE.Mesh(ledGeometry, ledMaterial);
    ledRing.position.y = 0.1;
    capGroup.add(ledRing);

    // Sensor dot
    const sensorGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const sensorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff0000,
      emissive: 0x440000,
      metalness: 0.2,
      roughness: 0.4,
    });
    const sensorMesh = new THREE.Mesh(sensorGeometry, sensorMaterial);
    sensorMesh.position.y = 0.2;
    capGroup.add(sensorMesh);

    scene.add(capGroup);
    camera.position.z = 5;
    camera.position.y = 1;
    camera.lookAt(0, 0, 0);

    sceneRef.current = { cap: capGroup };

    // Local animation ID for this specific useEffect run
    let animationId: number;
    
    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Smooth rotation
      capGroup.rotation.y += 0.005;
      capGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      
      // LED pulsing effect
      const pulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;
      ledMaterial.emissive.setRGB(0, pulse * 0.3, 0);
      
      // Sensor blinking
      const blink = Math.sin(Date.now() * 0.01) > 0.8 ? 1 : 0;
      sensorMaterial.emissive.setRGB(blink * 0.5, 0, 0);
      
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

  // Update cap position based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sceneRef.current) return;
      
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
      
      // Move and rotate cap based on scroll
      sceneRef.current.cap.position.y = scrollProgress * 2;
      sceneRef.current.cap.rotation.z = scrollProgress * Math.PI * 2;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ zIndex: -1 }}
    />
  );
};

export default ThreeScene;