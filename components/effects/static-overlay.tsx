"use client"

import { useEffect, useState } from "react"

interface StaticOverlayProps {
  intensity: number
}

export default function StaticOverlay({ intensity = 0 }: StaticOverlayProps) {
  const [glitchActive, setGlitchActive] = useState(false)
  const fixedIntensity = 0.05 // Set a fixed low intensity

  // Random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div
      className="static-overlay"
      style={{
        opacity: glitchActive ? 0.1 : fixedIntensity,
      }}
    />
  )
}
