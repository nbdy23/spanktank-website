import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Particle field component
function ParticleField({ count = 5000 }) {
  const ref = useRef()
  
  // Generate random positions
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return positions
  }, [count])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02
      ref.current.rotation.y -= delta * 0.03
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#435240"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// Floating geometric shape
function FloatingShape({ position = [0, 0, 0], color = '#435240' }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

// Main Three.js background component
function ThreeBackground({ variant = 'particles', interactive = false }) {
  return (
    <div className={`three-canvas ${interactive ? 'interactive' : ''}`}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {variant === 'particles' && <ParticleField count={3000} />}
        
        {variant === 'geometric' && (
          <>
            <FloatingShape position={[-4, 2, 0]} color="#435240" />
            <FloatingShape position={[4, -2, -2]} color="#5a6b56" />
            <FloatingShape position={[0, 0, -5]} color="#6b7d66" />
          </>
        )}
        
        {variant === 'combined' && (
          <>
            <ParticleField count={2000} />
            <FloatingShape position={[0, 0, 0]} color="#435240" />
          </>
        )}
      </Canvas>
    </div>
  )
}

export default ThreeBackground