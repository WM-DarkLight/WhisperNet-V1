"use client"

import { useEffect, useState } from "react"
import GlitchEffect from "./glitch-effect"

interface RandomAlertProps {
  message: string
}

export default function RandomAlert({ message }: RandomAlertProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Auto-hide after some time
    const timeout = setTimeout(() => {
      setVisible(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [message])

  if (!visible) return null

  return (
    <div className="random-alert">
      <GlitchEffect intensity="high" frequency="frequent">
        <div className="alert-content corrupted-severe">
          <h3 className="alert-title">SYSTEM ALERT</h3>
          <p className="alert-message">{message}</p>
        </div>
      </GlitchEffect>
    </div>
  )
}
