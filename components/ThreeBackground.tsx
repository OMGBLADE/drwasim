'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function getTheme() {
  if (typeof document !== 'undefined') {
    if (document.documentElement.classList.contains('theme-dark')) return 'dark'
    if (document.documentElement.classList.contains('theme-light')) return 'light'
  }
  return 'light'
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    let theme = getTheme()
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const geometry = new THREE.BufferGeometry()
    const particleCount = 1000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20
      if (theme === 'light') {
        // Blue color (rgb(33,150,243))
        colors[i] = 33 / 255
        colors[i + 1] = 150 / 255
        colors[i + 2] = 243 / 255
      } else {
        // Original color logic for dark theme
        colors[i] = 0.3 + Math.random() * 0.7
        colors[i + 1] = 0.8 + Math.random() * 0.2
        colors[i + 2] = 1.0
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    camera.position.z = 5
    function animate() {
      requestAnimationFrame(animate)
      particles.rotation.x += 0.001
      particles.rotation.y += 0.002
      renderer.render(scene, camera)
    }
    animate()
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    // Listen for theme changes
    const themeObserver = new MutationObserver(() => {
      const newTheme = getTheme()
      if (newTheme !== theme) {
        theme = newTheme
        // Update particle colors
        const colorAttr = geometry.getAttribute('color')
        for (let i = 0; i < particleCount * 3; i += 3) {
          if (theme === 'light') {
            colorAttr.setX(i / 3, 33 / 255)
            colorAttr.setY(i / 3, 150 / 255)
            colorAttr.setZ(i / 3, 243 / 255)
          } else {
            colorAttr.setX(i / 3, 0.3 + Math.random() * 0.7)
            colorAttr.setY(i / 3, 0.8 + Math.random() * 0.2)
            colorAttr.setZ(i / 3, 1.0)
          }
        }
        colorAttr.needsUpdate = true
      }
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      themeObserver.disconnect()
    }
  }, [])
  return <canvas ref={canvasRef} id="three-canvas" />
} 