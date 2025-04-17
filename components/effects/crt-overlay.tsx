"use client"

import { useEffect, useState } from "react"

export default function CRTOverlay() {
  const [glitchActive, setGlitchActive] = useState(false)
  const [scanlineOpacity, setScanlineOpacity] = useState(0.3)
  const [noiseOpacity, setNoiseOpacity] = useState(0.05)

  // Increase effects over time
  useEffect(() => {
    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 5000)

    // Gradually increase effect intensity
    const intensityInterval = setInterval(() => {
      setScanlineOpacity((prev) => Math.min(prev + 0.01, 0.5))
      setNoiseOpacity((prev) => Math.min(prev + 0.005, 0.15))
    }, 30000)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(intensityInterval)
    }
  }, [])

  return (
    <div className="crt-overlay">
      <div className="scanline" style={{ opacity: scanlineOpacity }}></div>
      <div className="noise" style={{ opacity: noiseOpacity }}></div>
      <div className={`glitch-overlay ${glitchActive ? "active" : ""}`}></div>
    </div>
  )
}
