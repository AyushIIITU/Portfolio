import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react'
import { DoubleSide } from 'three';

function Scene() {
    let tex=useTexture('/project-1.jpg');
    tex.needsUpdate=true;
    let cyl=useRef(null);
    useFrame((state,delta)=>{
        if(cyl.current){
            cyl.current.rotation.y+=delta;
        }
    })
  return (
    <>
    <group rotation={[0,1.4,0.5]}>
     <mesh  ref={cyl}>
        <cylinderGeometry args={[1,1,1,30,30,true]}/>
        <meshBasicMaterial map={tex} transparent side={DoubleSide}/>

      </mesh>
      </group>
    </>
  )
}

export default Scene