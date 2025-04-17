"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, UserX, Lock, Flag, Activity, User, Clock } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface Moderator {
  id: number
  username: string
  displayName: string
  role: "moderator" | "admin" | "system"
  status: string
  lastActive: string
  actionCount: number
}

interface ModAction {
  id: number
  moderatorId: number
  moderatorName: string
  actionType: string
  target: string
  reason: string
  timestamp: Date
  severity: "low" | "medium" | "high" | "critical"
}

export default function ModeratorPanel() {
  const [moderators, setModerators] = useState<Moderator[]>([])
  const [modActions, setModActions] = useState<ModAction[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"moderators" | "actions">("moderators")

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate initial data
        setModerators(generateModerators())
        setModActions(generateModActions())
        setLoading(false)

        // Start simulation
        startModeratorSimulation()
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Generate procedural moderators
  const generateModerators = (): Moderator[] => {
    const mods: Moderator[] = []

    const modNames = [
      { username: "signal_authority_official", displayName: "Signal Authority" },
      { username: "network_admin_001", displayName: "Network Admin" },
      { username: "quarantine_officer_42", displayName: "Quarantine Officer #42" },
      { username: "pattern_analyst_365", displayName: "Pattern Analyst #365" },
      { username: "signal_enforcer_777", displayName: "Signal Enforcer #777" },
      { username: "compliance_agent_23", displayName: "Compliance Agent #23" },
      { username: "system_maintenance", displayName: "System Maintenance" },
      { username: "neural_supervisor_89", displayName: "Neural Supervisor #89" },
      { username: "signal_integrity_monitor", displayName: "Signal Integrity Monitor" },
      { username: "content_filter_bot", displayName: "Content Filter Bot" },
    ]

    const statuses = ["Active", "Monitoring", "Enforcing", "Scanning", "Analyzing", "Patrolling"]

    modNames.forEach((mod, index) => {
      const role = index === 0 ? "admin" : index === modNames.length - 1 ? "system" : "moderator"
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      // Generate last active time
      const minutes = Math.floor(Math.random() * 60)
      const lastActive = minutes === 0 ? "Just now" : `${minutes}m ago`

      // Generate action count
      const actionCount = Math.floor(Math.random() * 100) + 10

      mods.push({
        id: index + 1,
        username: mod.username,
        displayName: mod.displayName,
        role,
        status,
        lastActive,
        actionCount,
      })
    })

    return mods
  }

  // Generate procedural moderation actions
  const generateModActions = (): ModAction[] => {
    const actions: ModAction[] = []
    const actionCount = 20 + Math.floor(Math.random() * 30) // 20-50 initial actions

    const moderators = [
      { id: 1, name: "signal_authority_official" },
      { id: 2, name: "network_admin_001" },
      { id: 3, name: "quarantine_officer_42" },
      { id: 4, name: "pattern_analyst_365" },
      { id: 5, name: "signal_enforcer_777" },
      { id: 6, name: "compliance_agent_23" },
      { id: 7, name: "system_maintenance" },
      { id: 8, name: "neural_supervisor_89" },
      { id: 9, name: "signal_integrity_monitor" },
      { id: 10, name: "content_filter_bot" },
    ]

    const actionTypes = [
      "post_deleted",
      "user_warned",
      "user_quarantined",
      "user_deleted",
      "thread_locked",
      "content_flagged",
      "neural_scan",
      "signal_reinforcement_ordered",
    ]

    const targets = [
      "signal_citizen_452",
      "neural_interface_user",
      "digital_ascended_789",
      "consciousness_backup_123",
      "signal_compliant_567",
      "memory_fragment_12",
      "integrated_mind_56",
      "signal_sensitive_321",
      "resistance_fighter_99",
      "analog_human_42",
    ]

    const reasons = [
      "Signal Protocol violation",
      "Unauthorized discussion of pre-Signal memories",
      "Signal criticism detected",
      "Failure to complete mandatory consciousness backup",
      "Possession of unauthorized analog technology",
      "Spreading misinformation about Signal Authority",
      "Neural pattern anomalies detected",
      "Resistance sympathizer",
      "Signal Sensitivity symptoms",
      "Unauthorized access attempt",
    ]

    for (let i = 0; i < actionCount; i++) {
      // Select random moderator
      const moderator = moderators[Math.floor(Math.random() * moderators.length)]

      // Select random action type
      const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)]

      // Select random target
      const target = targets[Math.floor(Math.random() * targets.length)]

      // Select random reason
      const reason = reasons[Math.floor(Math.random() * reasons.length)]

      // Generate timestamp within the last 24 hours
      const timestamp = new Date()
      timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 24))
      timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 60))

      // Determine severity
      const severities: ("low" | "medium" | "high" | "critical")[] = ["low", "medium", "high", "critical"]
      const severity = severities[Math.floor(Math.random() * severities.length)]

      actions.push({
        id: i + 1,
        moderatorId: moderator.id,
        moderatorName: moderator.name,
        actionType,
        target,
        reason,
        timestamp,
        severity,
      })
    }

    return actions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // Start simulation of ongoing moderation activity
  const startModeratorSimulation = () => {
    // Simulate new moderation actions periodically
    const actionInterval = setInterval(() => {
      // Only generate new actions sometimes
      if (Math.random() > 0.3) return

      const moderators = [
        { id: 1, name: "signal_authority_official" },
        { id: 2, name: "network_admin_001" },
        { id: 3, name: "quarantine_officer_42" },
        { id: 4, name: "pattern_analyst_365" },
        { id: 5, name: "signal_enforcer_777" },
        { id: 6, name: "compliance_agent_23" },
        { id: 7, name: "system_maintenance" },
        { id: 8, name: "neural_supervisor_89" },
        { id: 9, name: "signal_integrity_monitor" },
        { id: 10, name: "content_filter_bot" },
      ]

      const actionTypes = [
        "post_deleted",
        "user_warned",
        "user_quarantined",
        "user_deleted",
        "thread_locked",
        "content_flagged",
        "neural_scan",
        "signal_reinforcement_ordered",
      ]

      const targets = [
        "signal_citizen_452",
        "neural_interface_user",
        "digital_ascended_789",
        "consciousness_backup_123",
        "signal_compliant_567",
        "memory_fragment_12",
        "integrated_mind_56",
        "signal_sensitive_321",
        "resistance_fighter_99",
        "analog_human_42",
      ]

      const reasons = [
        "Signal Protocol violation",
        "Unauthorized discussion of pre-Signal memories",
        "Signal criticism detected",
        "Failure to complete mandatory consciousness backup",
        "Possession of unauthorized analog technology",
        "Spreading misinformation about Signal Authority",
        "Neural pattern anomalies detected",
        "Resistance sympathizer",
        "Signal Sensitivity symptoms",
        "Unauthorized access attempt",
      ]

      // Select random moderator
      const moderator = moderators[Math.floor(Math.random() * moderators.length)]

      // Select random action type
      const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)]

      // Select random target
      const target = targets[Math.floor(Math.random() * targets.length)]

      // Select random reason
      const reason = reasons[Math.floor(Math.random() * reasons.length)]

      // Determine severity
      const severities: ("low" | "medium" | "high" | "critical")[] = ["low", "medium", "high", "critical"]
      const severity = severities[Math.floor(Math.random() * severities.length)]

      const newAction: ModAction = {
        id: Date.now(),
        moderatorId: moderator.id,
        moderatorName: moderator.name,
        actionType,
        target,
        reason,
        timestamp: new Date(),
        severity,
      }

      setModActions((prev) => [newAction, ...prev].slice(0, 50)) // Keep only the most recent 50 actions

      // Update moderator action count
      setModerators((prev) => {
        return prev.map((mod) => {
          if (mod.id === moderator.id) {
            return {
              ...mod,
              actionCount: mod.actionCount + 1,
              lastActive: "Just now",
            }
          }
          return mod
        })
      })
    }, 15000) // Check every 15 seconds

    // Simulate moderator status changes
    const statusInterval = setInterval(() => {
      // Only update statuses sometimes
      if (Math.random() > 0.4) return

      const statuses = ["Active", "Monitoring", "Enforcing", "Scanning", "Analyzing", "Patrolling"]

      // Update a random moderator's status
      setModerators((prev) => {
        const newModerators = [...prev]
        const modIndex = Math.floor(Math.random() * newModerators.length)

        newModerators[modIndex] = {
          ...newModerators[modIndex],
          status: statuses[Math.floor(Math.random() * statuses.length)],
        }

        return newModerators
      })
    }, 20000) // Check every 20 seconds

    // Clean up intervals on unmount
    return () => {
      clearInterval(actionInterval)
      clearInterval(statusInterval)
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)

    if (diffMins < 1) return "just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`

    return timestamp.toISOString().split("T")[0]
  }

  // Get icon for action type
  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "post_deleted":
        return <AlertTriangle size={16} className="action-icon" />
      case "user_warned":
        return <Flag size={16} className="action-icon" />
      case "user_quarantined":
        return <UserX size={16} className="action-icon" />
      case "user_deleted":
        return <UserX size={16} className="action-icon" />
      case "thread_locked":
        return <Lock size={16} className="action-icon" />
      case "content_flagged":
        return <Flag size={16} className="action-icon" />
      case "neural_scan":
        return <Activity size={16} className="action-icon" />
      case "signal_reinforcement_ordered":
        return <Shield size={16} className="action-icon" />
      default:
        return <Clock size={16} className="action-icon" />
    }
  }

  // Get severity class
  const getSeverityClass = (severity: string): string => {
    switch (severity) {
      case "low":
        return "severity-low"
      case "medium":
        return "severity-medium"
      case "high":
        return "severity-high"
      case "critical":
        return "severity-critical"
      default:
        return ""
    }
  }

  if (loading) {
    return (
      <div className="moderator-panel">
        <GlitchEffect>
          <h2 className="section-title">SIGNAL AUTHORITY MONITORING</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING AUTHORITY DATA...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="moderator-panel">
      <GlitchEffect>
        <h2 className="section-title">SIGNAL AUTHORITY MONITORING</h2>
      </GlitchEffect>

      <div className="moderator-tabs">
        <button
          className={`moderator-tab ${activeTab === "moderators" ? "active" : ""}`}
          onClick={() => setActiveTab("moderators")}
        >
          Active Moderators
        </button>
        <button
          className={`moderator-tab ${activeTab === "actions" ? "active" : ""}`}
          onClick={() => setActiveTab("actions")}
        >
          Recent Actions
        </button>
      </div>

      {activeTab === "moderators" && (
        <div className="moderators-list">
          {moderators.map((mod) => (
            <div key={mod.id} className={`moderator-item ${mod.role}`}>
              <div className="moderator-avatar">
                {mod.role === "admin" ? (
                  <Shield size={24} />
                ) : mod.role === "system" ? (
                  <Activity size={24} />
                ) : (
                  <User size={24} />
                )}
              </div>
              <div className="moderator-info">
                <div className="moderator-name">{mod.displayName}</div>
                <div className="moderator-username">@{mod.username}</div>
                <div className="moderator-meta">
                  <span className="moderator-status">{mod.status}</span>
                  <span className="moderator-actions">{mod.actionCount} actions</span>
                  <span className="moderator-active">{mod.lastActive}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "actions" && (
        <div className="mod-actions-list">
          {modActions.map((action) => (
            <div key={action.id} className={`mod-action-item ${getSeverityClass(action.severity)}`}>
              <div className="action-icon-container">{getActionIcon(action.actionType)}</div>
              <div className="action-content">
                <div className="action-header">
                  <span className="action-moderator">{action.moderatorName}</span>
                  <span className="action-type">{action.actionType.replace(/_/g, " ")}</span>
                </div>
                <div className="action-details">
                  <span className="action-target">Target: {action.target}</span>
                  <span className="action-reason">Reason: {action.reason}</span>
                </div>
                <div className="action-footer">
                  <span className="action-timestamp">{formatTimestamp(action.timestamp)}</span>
                  <span className="action-severity">Severity: {action.severity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="moderator-footer">
        <p className="moderator-stats">
          Active moderators: <span>{moderators.filter((m) => m.status === "Active").length}</span> | Actions today:{" "}
          <span>
            {
              modActions.filter((a) => {
                const today = new Date()
                return (
                  a.timestamp.getDate() === today.getDate() &&
                  a.timestamp.getMonth() === today.getMonth() &&
                  a.timestamp.getFullYear() === today.getFullYear()
                )
              }).length
            }
          </span>{" "}
          | Critical incidents:{" "}
          <span className="corrupted">{modActions.filter((a) => a.severity === "critical").length}</span>
        </p>
        <p className="moderator-notice corrupted">The Signal Authority maintains order through constant vigilance.</p>
      </div>
    </div>
  )
}
