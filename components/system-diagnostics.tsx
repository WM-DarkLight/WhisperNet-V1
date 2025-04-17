"use client"

import { useState } from "react"
import { RefreshCw, X } from "lucide-react"

interface SystemDiagnosticsProps {
  data: {
    memoryIntegrity?: number
    signalStrength?: number
    networkStability?: number
    dataCorruption?: number
    systemUptime?: string
    activeNodes?: string
    securityStatus?: string
    lastMaintenance?: string
  }
  onClose: () => void
}

export default function SystemDiagnostics({ data, onClose }: SystemDiagnosticsProps) {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const getStatusClass = (value: number) => {
    if (value < 30) return "diagnostic-critical"
    if (value < 60) return "diagnostic-warning"
    return "diagnostic-ok"
  }

  const getInverseStatusClass = (value: number) => {
    if (value > 70) return "diagnostic-critical"
    if (value > 40) return "diagnostic-warning"
    return "diagnostic-ok"
  }

  return (
    <div className="system-diagnostics">
      <div className="diagnostics-header">
        <h3 className="diagnostics-title">SYSTEM DIAGNOSTICS</h3>
        <div>
          <button className="diagnostics-refresh" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={14} className={refreshing ? "blink" : ""} />
            {refreshing ? " REFRESHING..." : " REFRESH"}
          </button>
          <button className="diagnostics-refresh" onClick={onClose} style={{ marginLeft: "8px" }}>
            <X size={14} /> CLOSE
          </button>
        </div>
      </div>

      <div className="diagnostics-grid">
        {data.memoryIntegrity !== undefined && (
          <div className={`diagnostic-item ${getStatusClass(data.memoryIntegrity)}`}>
            <div className="diagnostic-label">MEMORY INTEGRITY</div>
            <div className="diagnostic-value">{data.memoryIntegrity}%</div>
          </div>
        )}

        {data.signalStrength !== undefined && (
          <div className={`diagnostic-item ${getStatusClass(data.signalStrength)}`}>
            <div className="diagnostic-label">SIGNAL STRENGTH</div>
            <div className="diagnostic-value">{data.signalStrength}%</div>
          </div>
        )}

        {data.networkStability !== undefined && (
          <div className={`diagnostic-item ${getStatusClass(data.networkStability)}`}>
            <div className="diagnostic-label">NETWORK STABILITY</div>
            <div className="diagnostic-value">{data.networkStability}%</div>
          </div>
        )}

        {data.dataCorruption !== undefined && (
          <div className={`diagnostic-item ${getInverseStatusClass(data.dataCorruption)}`}>
            <div className="diagnostic-label">DATA CORRUPTION</div>
            <div className="diagnostic-value">{data.dataCorruption}%</div>
          </div>
        )}

        {data.systemUptime !== undefined && (
          <div className="diagnostic-item">
            <div className="diagnostic-label">SYSTEM UPTIME</div>
            <div className="diagnostic-value">{data.systemUptime}</div>
          </div>
        )}

        {data.activeNodes !== undefined && (
          <div className="diagnostic-item">
            <div className="diagnostic-label">ACTIVE NODES</div>
            <div className="diagnostic-value">{data.activeNodes}</div>
          </div>
        )}

        {data.securityStatus !== undefined && (
          <div className="diagnostic-item diagnostic-critical">
            <div className="diagnostic-label">SECURITY STATUS</div>
            <div className="diagnostic-value">{data.securityStatus}</div>
          </div>
        )}

        {data.lastMaintenance !== undefined && (
          <div className="diagnostic-item">
            <div className="diagnostic-label">LAST MAINTENANCE</div>
            <div className="diagnostic-value">{data.lastMaintenance}</div>
          </div>
        )}
      </div>
    </div>
  )
}
