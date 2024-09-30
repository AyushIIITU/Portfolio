import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Laptop from "./Laptop";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

export default function LaptopExport() {
  return (
    <Canvas camera={{ position: [-5, 0, 5], fov: 55 }}>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={<Loader />}>
        <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
          <Laptop />
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
    </Canvas>
  );
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}
