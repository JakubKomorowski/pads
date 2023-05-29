import React, { useState, useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const FrontPad = () => {
  const [model, setModel] = useState()
  useEffect(() => {
    new GLTFLoader().load('/assets/hinge-pads.gltf', setModel)
  }, [])

  return (
    <mesh rotation={[0, -0.0, 0]} position={[0.015, -0.1, 0.0]} receiveShadow>
      {model ? <primitive object={model.scene} /> : null}
    </mesh>
  )
}

export default FrontPad
