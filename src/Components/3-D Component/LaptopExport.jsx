import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Laptop from "./Laptop";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

export default function LaptopExport() {
  return (
    <Canvas camera={{ position: [0, -14, 0], fov: 90 }}>
      <pointLight position={[0, 10, 0]} intensity={1.5} />
      <Suspense fallback={<Loader />}>
        <group rotation={[-Math.PI*1.5,0, 0]} position={[0, -0.623806684730079, 0]}>
          <Laptop />
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      {/* <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} /> */}
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