import type { ReactNode } from "react"

interface GlitchEffectProps {
  children: ReactNode
  intensity?: "low" | "medium" | "high"
  className?: string
}

export default function GlitchEffect({ children, intensity = "medium", className = "" }: GlitchEffectProps) {
  // Determine the glitch class based on intensity
  let glitchClass = ""
  switch (intensity) {
    case "low":
      glitchClass = "glitch-effect-low"
      break
    case "high":
      glitchClass = "glitch-effect-high"
      break
    default:
      glitchClass = "glitch-effect-medium"
  }

  return (
    <div
      className={`glitch-container ${glitchClass} ${className}`}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      <div
        className="glitch-copy"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        {children}
      </div>
      <div
        className="glitch-copy"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
