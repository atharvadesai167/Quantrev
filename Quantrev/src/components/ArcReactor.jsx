import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Sparkles,
  useGLTF,
} from "@react-three/drei";

function Reactor() {
  const reactorRef = useRef();

  const { scene } = useGLTF("/models/arc.glb");

  useFrame((state) => {
    if (reactorRef.current) {
      reactorRef.current.rotation.y += 0.02;
      reactorRef.current.rotation.x += 0.001;

      reactorRef.current.position.y =
        Math.sin(state.clock.elapsedTime) * 0.3;

      const pulse =
        (Math.sin(state.clock.elapsedTime * 2) + 1) / 2;

      reactorRef.current.scale.setScalar(
        3 + pulse * 0.08
      );
    }
  });

  return (
    <primitive
      ref={reactorRef}
      object={scene}
      position={[0, 0, 0]}
    />
  );
}

export default function ArcReactor() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 35,
      }}
    >
      {/* Cinematic Fog */}
      <fog attach="fog" args={["#000000", 5, 20]} />

      {/* Reflections */}
      <Environment preset="night" />

      {/* Global Light */}
      <ambientLight intensity={3} />

      {/* Main Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={10}
      />

      {/* Quantrev Core Light */}
      <pointLight
        position={[0, 0, 0]}
        color="#00ffff"
        intensity={80}
      />

      {/* Secondary Glow */}
      <pointLight
        position={[0, 2, 2]}
        color="#66e6ff"
        intensity={40}
      />

      {/* Energy Particles */}
      <Sparkles
        count={250}
        scale={12}
        size={4}
        speed={0.5}
      />

      <Reactor />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/arc.glb");