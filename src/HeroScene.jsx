import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NodeField() {
  const groupRef = useRef(null);
  const wireRef = useRef(null);
  const nodes = useMemo(() => {
    return Array.from({ length: 14 }, (_, index) => {
      const angle = (index / 14) * Math.PI * 2;
      const radius = 2 + (index % 3) * 0.55;
      const height = (index % 5) * 0.28 - 0.55;
      return {
        position: [Math.cos(angle) * radius, height, Math.sin(angle) * radius],
        scale: 0.08 + (index % 4) * 0.015,
      };
    });
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.z -= delta * 0.05;
      wireRef.current.rotation.x = Math.cos(elapsed * 0.22) * 0.16;
    }
  });

  return (
    <group>
      <mesh ref={wireRef} rotation={[0.7, 0.4, 0]}>
        <icosahedronGeometry args={[2.45, 1]} />
        <meshBasicMaterial color="#6f7d61" wireframe transparent opacity={0.18} />
      </mesh>

      <group ref={groupRef}>
        {nodes.map((node, index) => (
          <mesh key={index} position={node.position} scale={node.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#e8ede1" : "#7b8c69"}
              emissive={index % 2 === 0 ? "#394031" : "#516042"}
              emissiveIntensity={0.6}
              roughness={0.35}
              metalness={0.22}
            />
          </mesh>
        ))}
      </group>

      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.2, 48]} />
        <meshBasicMaterial color="#92a082" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-canvas-wrap">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 7], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#070908", 6, 12]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={1.4} color="#dce4d2" />
        <pointLight position={[-3, -2, 1]} intensity={1.2} color="#6f7d61" />
        <NodeField />
      </Canvas>
    </div>
  );
}
