
import { Canvas } from '@react-three/fiber'
// import { BoxGeometry } from 'three'
// import './Roller.css'
import { OrbitControls } from '@react-three/drei'
// import { DoubleSide } from 'three'
import Scene from './Scene.jsx'

function Roller({Src}) {

  return (
    <>
     <Canvas>
      <OrbitControls/>
      <ambientLight/>
     <Scene Src={Src}/>
     </Canvas>
    </>
  )
}

export default Roller
