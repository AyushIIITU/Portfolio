
import { Canvas } from '@react-three/fiber'
// import { BoxGeometry } from 'three'
// import './Roller.css'
import { OrbitControls } from '@react-three/drei'
// import { DoubleSide } from 'three'
import Scene from './Scene.jsx'

function Roller() {

  return (
    <>
     <Canvas>
      <OrbitControls/>
      <ambientLight/>
     <Scene/>
     </Canvas>
    </>
  )
}

export default Roller
