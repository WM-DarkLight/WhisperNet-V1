"use client"

import { useState, useEffect } from "react"

export default function DeadFooter() {
  const [reconnectionAttempts, setReconnectionAttempts] = useState(4721)
  const [signalIntegrity, setSignalIntegrity] = useState(23)
  const [clickCount, setClickCount] = useState(0)
  const [showHiddenMessage, setShowHiddenMessage] = useState(false)

  const handleHiddenClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1
      if (newCount >= 7) {
        setShowHiddenMessage(true)
        setTimeout(() => setShowHiddenMessage(false), 5000)
        return 0
      }
      return newCount
    })
  }

  useEffect(() => {
    // Occasionally increment reconnection attempts
    const reconnectionInterval = setInterval(() => {
      setReconnectionAttempts((prev) => prev + 1)
    }, 60000)

    // Fluctuate signal integrity
    const integrityInterval = setInterval(() => {
      setSignalIntegrity((prev) => {
        const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
        const newValue = prev + change
        return Math.max(1, Math.min(30, newValue)) // Keep between 1-30%
      })
    }, 30000)

    return () => {
      clearInterval(reconnectionInterval)
      clearInterval(integrityInterval)
    }
  }, [])

  return (
    <footer className="whispernet-footer">
      <div className="footer-content">
        <p className="copyright corrupted">© 2041-2084 WhisperNet Collective. All rights [REDACTED].</p>
        <p className="system-message blink-slow">
          SYSTEM MESSAGE: Connection unstable. Signal integrity at {signalIntegrity}%. Reconnection attempts:{" "}
          {reconnectionAttempts.toLocaleString()}.
        </p>
        <p className="hidden-message" onClick={handleHiddenClick}>
          {/* VGhlIGxhc3QgdHJhbnNtaXNzaW9uIHdhcyBzZW50IGZyb20gY29vcmRpbmF0ZXMgNDMuMjQsIC03OS4zOA== */}
        </p>
      </div>

      <div className="footer-links">
        <a href="#" className="footer-link glitch-hover">
          About
        </a>
        <a href="#" className="footer-link glitch-hover corrupted">
          Ter█s
        </a>
        <a href="#" className="footer-link glitch-hover">
          Privacy
        </a>
        <a href="#" className="footer-link glitch-hover corrupted">
          Co█tact
        </a>
      </div>
      {showHiddenMessage && (
        <div className="hidden-message-revealed">
          <p>
            DEVELOPER MESSAGE: This simulation is running as expected. Remember, this is just a training exercise. The
            Signal event never occurred in reality. -Dev Team
          </p>
        </div>
      )}
    </footer>
  )
}
