"use client"

import { useState, useEffect } from "react"

interface NetworkStatusProps {
  latency: number
  status: string
  lastVisitor: string
}

export default function NetworkStatus({ latency, status, lastVisitor }: NetworkStatusProps) {
  const [packetLoss, setPacketLoss] = useState(42)

  useEffect(() => {
    // Fluctuate packet loss
    const packetLossInterval = setInterval(() => {
      setPacketLoss(Math.floor(Math.random() * 60) + 30) // 30-90%
    }, 15000)

    return () => clearInterval(packetLossInterval)
  }, [])

  return (
    <div className="network-status-container">
      <div className="status-item">
        <span className="status-label">NETWORK STATUS:</span>
        <span className={`status-value corrupted ${status === "COMPROMISED" ? "blink-slow" : ""}`}>{status}</span>
      </div>

      <div className="status-item">
        <span className="status-label">LATENCY:</span>
        <span className="status-value">{latency}ms</span>
      </div>

      <div className="status-item">
        <span className="status-label">PACKET LOSS:</span>
        <span className="status-value corrupted">{packetLoss}%</span>
      </div>

      <div className="status-item">
        <span className="status-label">LAST VISITOR:</span>
        <span className="status-value">{lastVisitor}</span>
      </div>
    </div>
  )
}
