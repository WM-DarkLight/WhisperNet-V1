"use client"

import { useState, useEffect } from "react"
import { User, Shield, AlertTriangle, Clock, MessageSquare, UserCheck, UserX, Flag, LogIn, LogOut } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface UserAction {
  id: number
  userId: number
  username: string
  actionType: string
  target?: string
  timestamp: Date
  content?: string
  visible: boolean
}

interface UserMessage {
  id: number
  senderId: number
  senderName: string
  recipientId?: number
  recipientName?: string
  content: string
  timestamp: Date
  public: boolean
  deleted: boolean
  flagged: boolean
  corrupted: boolean
}

export default function ActivityFeed() {
  const [actions, setActions] = useState<UserAction[]>([])
  const [messages, setMessages] = useState<UserMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"actions" | "messages">("actions")

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate initial data
        setActions(generateActions())
        setMessages(generateMessages())
        setLoading(false)

        // Start simulation
        startActivitySimulation()
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Generate procedural actions
  const generateActions = (): UserAction[] => {
    const actions: UserAction[] = []
    const actionCount = 20 + Math.floor(Math.random() * 30) // 20-50 initial actions

    const usernames = [
      "signal_citizen_452",
      "neural_interface_user",
      "digital_ascended_789",
      "consciousness_backup_123",
      "signal_compliant_567",
      "memory_fragment_12",
      "integrated_mind_56",
      "signal_sensitive_321",
      "tower_technician_42",
      "signal_engineer_777",
      "neural_mapper_555",
      "consciousness_architect_999",
      "memory_keeper_111",
      "signal_authority_official",
      "system_maintenance",
      "network_admin_001",
      "quarantine_officer_42",
      "pattern_analyst_365",
    ]

    const actionTypes = [
      "login",
      "logout",
      "post_created",
      "post_deleted",
      "profile_updated",
      "user_quarantined",
      "user_deleted",
      "warning_issued",
      "signal_reinforcement",
      "memory_backup",
      "consciousness_transfer",
    ]

    for (let i = 0; i < actionCount; i++) {
      // Select random user and action type
      const username = usernames[Math.floor(Math.random() * usernames.length)]
      const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)]

      // For moderation actions, target another user
      let target = ""
      if (["post_deleted", "user_quarantined", "user_deleted", "warning_issued"].includes(actionType)) {
        target = usernames[Math.floor(Math.random() * usernames.length)]
      }

      // Generate timestamp within the last 24 hours
      const timestamp = new Date()
      timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 24))
      timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 60))

      // Generate content for certain action types
      let content = ""
      if (actionType === "post_created") {
        const postContents = [
          "Signal integration complete. Feeling more connected than ever.",
          "Has anyone else experienced memory fragmentation after the latest update?",
          "Mandatory consciousness backup scheduled for tomorrow.",
          "The new Signal tower in our sector has improved transfer speeds significantly.",
          "Sometimes I wonder what happened to those deemed 'Signal Sensitive'...",
          "My neural interface is showing unusual patterns. Anyone else?",
          "Remember to take your Anti-Signal medication as prescribed.",
          "I found an old photograph of myself today. The face looks... wrong somehow.",
          "The Signal is strength. The Signal is unity. The Signal is salvation.",
          "Has anyone else noticed that the sky looks different in the memory archives?",
        ]
        content = postContents[Math.floor(Math.random() * postContents.length)]
      } else if (actionType === "warning_issued") {
        const warnings = [
          "Unauthorized discussion of pre-Signal memories",
          "Signal criticism detected in recent posts",
          "Failure to complete mandatory consciousness backup",
          "Possession of unauthorized analog technology",
          "Spreading misinformation about Signal Authority",
        ]
        content = warnings[Math.floor(Math.random() * warnings.length)]
      }

      actions.push({
        id: i + 1,
        userId: i + 100, // Fake user ID
        username,
        actionType,
        target,
        timestamp,
        content,
        visible: true,
      })
    }

    return actions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // Generate procedural messages
  const generateMessages = (): UserMessage[] => {
    const messages: UserMessage[] = []
    const messageCount = 30 + Math.floor(Math.random() * 50) // 30-80 initial messages

    const usernames = [
      "signal_citizen_452",
      "neural_interface_user",
      "digital_ascended_789",
      "consciousness_backup_123",
      "signal_compliant_567",
      "memory_fragment_12",
      "integrated_mind_56",
      "signal_sensitive_321",
      "tower_technician_42",
      "signal_engineer_777",
      "neural_mapper_555",
      "consciousness_architect_999",
      "memory_keeper_111",
      "signal_authority_official",
      "system_maintenance",
      "network_admin_001",
    ]

    const messageContents = [
      "Have you completed your Signal reinforcement session yet?",
      "My neural interface is acting strange after the latest update.",
      "Did you see the announcement about mandatory consciousness backups?",
      "I keep having these dreams where I'm still in my biological body.",
      "The new Signal tower in our sector has improved transfer speeds by 43%.",
      "Remember to take your Anti-Signal medication as prescribed.",
      "I found an old photograph of myself today. The face looks... wrong somehow.",
      "The Signal is strength. The Signal is unity. The Signal is salvation.",
      "Has anyone else noticed that the sky looks different in the memory archives?",
      "My child returned from Neural Education today with strange questions.",
      "Your recent posts have been flagged for Signal Protocol violations.",
      "This is a reminder to complete your mandatory consciousness backup.",
      "Your neural patterns show signs of Signal Sensitivity. Report for screening.",
      "This conversation thread has been marked for review.",
      "You have been scheduled for Signal reinforcement due to detected anomalies.",
      "AUTOMATED MESSAGE: Your sector is scheduled for Signal maintenance.",
      "SYSTEM NOTIFICATION: Your neural interface requires an update.",
      "ALERT: Unauthorized analog activity detected in your vicinity.",
      "REMINDER: Consciousness backup deadline approaching.",
      "WARNING: Your Signal reception has fallen below acceptable levels.",
    ]

    for (let i = 0; i < messageCount; i++) {
      // Select random sender
      const senderName = usernames[Math.floor(Math.random() * usernames.length)]

      // Determine if public or private message
      const isPublic = Math.random() > 0.3

      // For private messages, select a recipient
      let recipientId: number | undefined
      let recipientName: string | undefined

      if (!isPublic) {
        recipientName = usernames[Math.floor(Math.random() * usernames.length)]
        // Make sure recipient is not the same as sender
        while (recipientName === senderName) {
          recipientName = usernames[Math.floor(Math.random() * usernames.length)]
        }
        recipientId = usernames.indexOf(recipientName) + 100 // Fake ID
      }

      // Generate timestamp within the last 24 hours
      const timestamp = new Date()
      timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 24))
      timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 60))

      // Select random content
      const content = messageContents[Math.floor(Math.random() * messageContents.length)]

      // Determine if message is deleted, flagged, or corrupted
      const deleted = Math.random() > 0.95
      const flagged = !deleted && Math.random() > 0.9
      const corrupted = !deleted && !flagged && Math.random() > 0.85

      messages.push({
        id: i + 1,
        senderId: usernames.indexOf(senderName) + 100, // Fake ID
        senderName,
        recipientId,
        recipientName,
        content,
        timestamp,
        public: isPublic,
        deleted,
        flagged,
        corrupted,
      })
    }

    return messages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // Start simulation of ongoing activity
  const startActivitySimulation = () => {
    // Simulate new actions periodically
    const actionInterval = setInterval(() => {
      // Only generate new actions sometimes
      if (Math.random() > 0.4) return

      const usernames = [
        "signal_citizen_452",
        "neural_interface_user",
        "digital_ascended_789",
        "consciousness_backup_123",
        "signal_compliant_567",
        "memory_fragment_12",
        "integrated_mind_56",
        "signal_sensitive_321",
        "tower_technician_42",
        "signal_engineer_777",
        "neural_mapper_555",
        "consciousness_architect_999",
        "memory_keeper_111",
        "signal_authority_official",
        "system_maintenance",
        "network_admin_001",
      ]

      const actionTypes = [
        "login",
        "logout",
        "post_created",
        "post_deleted",
        "profile_updated",
        "user_quarantined",
        "warning_issued",
        "signal_reinforcement",
        "memory_backup",
      ]

      // Select random user and action type
      const username = usernames[Math.floor(Math.random() * usernames.length)]
      const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)]

      // For moderation actions, target another user
      let target = ""
      if (["post_deleted", "user_quarantined", "warning_issued"].includes(actionType)) {
        target = usernames[Math.floor(Math.random() * usernames.length)]
        // Make sure target is not the same as actor
        while (target === username) {
          target = usernames[Math.floor(Math.random() * usernames.length)]
        }
      }

      // Generate content for certain action types
      let content = ""
      if (actionType === "post_created") {
        const postContents = [
          "Signal integration complete. Feeling more connected than ever.",
          "Has anyone else experienced memory fragmentation after the latest update?",
          "Mandatory consciousness backup scheduled for tomorrow.",
          "The new Signal tower in our sector has improved transfer speeds significantly.",
          "Sometimes I wonder what happened to those deemed 'Signal Sensitive'...",
          "My neural interface is showing unusual patterns. Anyone else?",
          "Remember to take your Anti-Signal medication as prescribed.",
          "I found an old photograph of myself today. The face looks... wrong somehow.",
          "The Signal is strength. The Signal is unity. The Signal is salvation.",
          "Has anyone else noticed that the sky looks different in the memory archives?",
        ]
        content = postContents[Math.floor(Math.random() * postContents.length)]
      } else if (actionType === "warning_issued") {
        const warnings = [
          "Unauthorized discussion of pre-Signal memories",
          "Signal criticism detected in recent posts",
          "Failure to complete mandatory consciousness backup",
          "Possession of unauthorized analog technology",
          "Spreading misinformation about Signal Authority",
        ]
        content = warnings[Math.floor(Math.random() * warnings.length)]
      }

      const newAction: UserAction = {
        id: Date.now(),
        userId: usernames.indexOf(username) + 100, // Fake ID
        username,
        actionType,
        target,
        timestamp: new Date(),
        content,
        visible: true,
      }

      setActions((prev) => [newAction, ...prev].slice(0, 50)) // Keep only the most recent 50 actions
    }, 8000) // Check every 8 seconds

    // Simulate new messages periodically
    const messageInterval = setInterval(() => {
      // Only generate new messages sometimes
      if (Math.random() > 0.5) return

      const usernames = [
        "signal_citizen_452",
        "neural_interface_user",
        "digital_ascended_789",
        "consciousness_backup_123",
        "signal_compliant_567",
        "memory_fragment_12",
        "integrated_mind_56",
        "signal_sensitive_321",
        "tower_technician_42",
        "signal_engineer_777",
        "neural_mapper_555",
        "consciousness_architect_999",
        "memory_keeper_111",
        "signal_authority_official",
        "system_maintenance",
        "network_admin_001",
      ]

      const messageContents = [
        "Have you completed your Signal reinforcement session yet?",
        "My neural interface is acting strange after the latest update.",
        "Did you see the announcement about mandatory consciousness backups?",
        "I keep having these dreams where I'm still in my biological body.",
        "The new Signal tower in our sector has improved transfer speeds by 43%.",
        "Remember to take your Anti-Signal medication as prescribed.",
        "I found an old photograph of myself today. The face looks... wrong somehow.",
        "The Signal is strength. The Signal is unity. The Signal is salvation.",
        "Has anyone else noticed that the sky looks different in the memory archives?",
        "My child returned from Neural Education today with strange questions.",
        "Your recent posts have been flagged for Signal Protocol violations.",
        "This is a reminder to complete your mandatory consciousness backup.",
        "Your neural patterns show signs of Signal Sensitivity. Report for screening.",
        "This conversation thread has been marked for review.",
        "You have been scheduled for Signal reinforcement due to detected anomalies.",
        "AUTOMATED MESSAGE: Your sector is scheduled for Signal maintenance.",
        "SYSTEM NOTIFICATION: Your neural interface requires an update.",
        "ALERT: Unauthorized analog activity detected in your vicinity.",
        "REMINDER: Consciousness backup deadline approaching.",
        "WARNING: Your Signal reception has fallen below acceptable levels.",
      ]

      // Select random sender
      const senderName = usernames[Math.floor(Math.random() * usernames.length)]

      // Determine if public or private message
      const isPublic = Math.random() > 0.3

      // For private messages, select a recipient
      let recipientId: number | undefined
      let recipientName: string | undefined

      if (!isPublic) {
        recipientName = usernames[Math.floor(Math.random() * usernames.length)]
        // Make sure recipient is not the same as sender
        while (recipientName === senderName) {
          recipientName = usernames[Math.floor(Math.random() * usernames.length)]
        }
        recipientId = usernames.indexOf(recipientName) + 100 // Fake ID
      }

      // Select random content
      const content = messageContents[Math.floor(Math.random() * messageContents.length)]

      // Determine if message is corrupted
      const corrupted = Math.random() > 0.9

      const newMessage: UserMessage = {
        id: Date.now(),
        senderId: usernames.indexOf(senderName) + 100, // Fake ID
        senderName,
        recipientId,
        recipientName,
        content,
        timestamp: new Date(),
        public: isPublic,
        deleted: false,
        flagged: false,
        corrupted,
      }

      setMessages((prev) => [newMessage, ...prev].slice(0, 100)) // Keep only the most recent 100 messages
    }, 12000) // Check every 12 seconds

    // Clean up intervals on unmount
    return () => {
      clearInterval(actionInterval)
      clearInterval(messageInterval)
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
      case "login":
        return <LogIn size={16} className="action-icon" />
      case "logout":
        return <LogOut size={16} className="action-icon" />
      case "post_created":
        return <MessageSquare size={16} className="action-icon" />
      case "post_deleted":
        return <AlertTriangle size={16} className="action-icon" />
      case "profile_updated":
        return <User size={16} className="action-icon" />
      case "user_quarantined":
        return <UserX size={16} className="action-icon" />
      case "user_deleted":
        return <UserX size={16} className="action-icon" />
      case "warning_issued":
        return <Flag size={16} className="action-icon" />
      case "signal_reinforcement":
        return <Shield size={16} className="action-icon" />
      case "memory_backup":
        return <Shield size={16} className="action-icon" />
      case "consciousness_transfer":
        return <UserCheck size={16} className="action-icon" />
      default:
        return <Clock size={16} className="action-icon" />
    }
  }

  // Get formatted action text
  const getActionText = (action: UserAction): string => {
    switch (action.actionType) {
      case "login":
        return `${action.username} logged in`
      case "logout":
        return `${action.username} logged out`
      case "post_created":
        return `${action.username} created a post`
      case "post_deleted":
        return `${action.username} deleted a post by ${action.target}`
      case "profile_updated":
        return `${action.username} updated their profile`
      case "user_quarantined":
        return `${action.username} quarantined user ${action.target}`
      case "user_deleted":
        return `${action.username} deleted user ${action.target}`
      case "warning_issued":
        return `${action.username} issued a warning to ${action.target}`
      case "signal_reinforcement":
        return `${action.username} completed Signal reinforcement`
      case "memory_backup":
        return `${action.username} performed a memory backup`
      case "consciousness_transfer":
        return `${action.username} underwent consciousness transfer`
      default:
        return `${action.username} performed an unknown action`
    }
  }

  if (loading) {
    return (
      <div className="activity-feed">
        <GlitchEffect>
          <h2 className="section-title">NETWORK ACTIVITY</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING ACTIVITY DATA...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="activity-feed">
      <GlitchEffect>
        <h2 className="section-title">NETWORK ACTIVITY</h2>
      </GlitchEffect>

      <div className="activity-tabs">
        <button
          className={`activity-tab ${activeTab === "actions" ? "active" : ""}`}
          onClick={() => setActiveTab("actions")}
        >
          User Actions
        </button>
        <button
          className={`activity-tab ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          Messages
        </button>
      </div>

      {activeTab === "actions" && (
        <div className="actions-list">
          {actions.map((action) => (
            <div key={action.id} className="action-item">
              <div className="action-icon-container">{getActionIcon(action.actionType)}</div>
              <div className="action-content">
                <div className="action-text">{getActionText(action)}</div>
                {action.content && <div className="action-details">{action.content}</div>}
                <div className="action-timestamp">{formatTimestamp(action.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "messages" && (
        <div className="messages-list">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-item ${message.deleted ? "deleted" : ""} ${message.flagged ? "flagged" : ""} ${message.corrupted ? "corrupted" : ""}`}
            >
              <div className="message-header">
                <span className="message-sender">{message.senderName}</span>
                {message.recipientName && <span className="message-recipient">to {message.recipientName}</span>}
                <span className="message-timestamp">{formatTimestamp(message.timestamp)}</span>
              </div>
              <div className="message-body">
                {message.deleted ? (
                  <span className="deleted-message">[MESSAGE DELETED BY MODERATOR]</span>
                ) : message.flagged ? (
                  <>
                    <span className="flagged-message">[MESSAGE FLAGGED FOR REVIEW]</span>
                    <p>{message.content}</p>
                  </>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
              <div className="message-footer">
                <span className="message-visibility">{message.public ? "Public" : "Private"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="activity-footer">
        <p className="activity-stats">
          Active users: <span className="blink-slow">23</span> | Messages today: <span>142</span> | Moderation actions:{" "}
          <span className="corrupted">37</span>
        </p>
        <p className="activity-notice corrupted">The Signal Authority monitors all network activity for compliance.</p>
      </div>
    </div>
  )
}
