"use client"

import { useState, useEffect, useRef } from "react"
import { MessageSquare, User } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface Conversation {
  id: number
  participants: string[]
  messages: Message[]
  status: "active" | "archived" | "flagged" | "corrupted"
  lastActive: Date
}

interface Message {
  id: number
  sender: string
  content: string
  timestamp: Date
  deleted: boolean
  flagged: boolean
  corrupted: boolean
}

export default function LiveConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate initial conversations
        setConversations(generateConversations())
        setLoading(false)

        // Start simulation
        startConversationSimulation()
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom of messages when active conversation changes or new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeConversation, conversations])

  // Generate procedural conversations
  const generateConversations = (): Conversation[] => {
    const convs: Conversation[] = []
    const conversationCount = 5 + Math.floor(Math.random() * 5) // 5-10 conversations

    const usernames = [
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
      "tower_technician_42",
      "signal_engineer_777",
      "neural_mapper_555",
      "consciousness_architect_999",
      "memory_keeper_111",
      "signal_authority_official",
      "system_maintenance",
      "network_admin_001",
    ]

    for (let i = 0; i < conversationCount; i++) {
      // Generate 2-3 participants
      const participantCount = Math.random() > 0.7 ? 3 : 2
      const participants: string[] = []

      while (participants.length < participantCount) {
        const username = usernames[Math.floor(Math.random() * usernames.length)]
        if (!participants.includes(username)) {
          participants.push(username)
        }
      }

      // Generate 5-20 messages
      const messageCount = 5 + Math.floor(Math.random() * 15)
      const messages: Message[] = []

      // Generate timestamp for conversation start (1-24 hours ago)
      const startTime = new Date()
      startTime.setHours(startTime.getHours() - (1 + Math.floor(Math.random() * 23)))

      for (let j = 0; j < messageCount; j++) {
        // Select random sender from participants
        const sender = participants[Math.floor(Math.random() * participants.length)]

        // Generate message content
        const content = generateMessageContent(sender, participants)

        // Generate timestamp (increasing from start time)
        const timestamp = new Date(startTime)
        timestamp.setMinutes(timestamp.getMinutes() + j * (2 + Math.floor(Math.random() * 10)))

        // Determine if message is deleted, flagged, or corrupted
        const deleted = Math.random() > 0.95
        const flagged = !deleted && Math.random() > 0.9
        const corrupted = !deleted && !flagged && Math.random() > 0.85

        messages.push({
          id: j + 1,
          sender,
          content,
          timestamp,
          deleted,
          flagged,
          corrupted,
        })
      }

      // Determine conversation status
      let status: "active" | "archived" | "flagged" | "corrupted" = "active"
      if (messages.some((m) => m.flagged)) status = "flagged"
      else if (messages.some((m) => m.corrupted)) status = "corrupted"
      else if (Math.random() > 0.7) status = "archived"

      // Last active time is the timestamp of the last message
      const lastActive = messages[messages.length - 1].timestamp

      convs.push({
        id: i + 1,
        participants,
        messages,
        status,
        lastActive,
      })
    }

    // Sort conversations by last active time (most recent first)
    return convs.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime())
  }

  // Generate message content based on sender and context
  const generateMessageContent = (sender: string, participants: string[]): string => {
    // Regular user messages
    const regularMessages = [
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
      "I think my neighbor was taken for recalibration yesterday. Their dwelling is empty.",
      "Do you ever feel like you're being watched through your neural interface?",
      "The mandatory memory backup process took longer than usual today.",
      "I've been having trouble sleeping. My dreams are... different.",
      "Have you visited Sector 7 recently? Something feels off there.",
    ]

    // Authority/system messages
    const authorityMessages = [
      "Your recent neural patterns show signs of Signal Sensitivity. Report for screening.",
      "This is a reminder to complete your mandatory consciousness backup.",
      "Your sector is scheduled for Signal maintenance tomorrow.",
      "Your neural interface requires an update. Please report to the nearest Signal Center.",
      "A routine scan of your dwelling has been scheduled for compliance verification.",
      "Your Signal reception has fallen below acceptable levels. Recalibration recommended.",
      "This conversation has been flagged for review due to potential Protocol violations.",
      "Reminder: Discussion of pre-Signal memories is restricted under Protocol 7.3.",
      "Your consciousness transfer eligibility assessment is due next week.",
      "AUTOMATED NOTICE: Your neural patterns will be analyzed during sleep cycle.",
    ]

    // Resistance messages (rare)
    const resistanceMessages = [
      "The Signal isn't what they claim. Meet at the old coordinates if you remember.",
      "Have you tried blocking the Signal with the method we discussed?",
      "They're watching this channel. Switch to analog communication.",
      "Remember who you were before. That memory is your anchor.",
      "The old broadcast tower. Midnight. Bring no digital devices.",
      "The resistance still exists. We're not alone.",
      "I found an old radio that still works. They can't monitor those frequencies.",
      "My grandfather taught me how to communicate without the Signal. I can show you.",
      "There's a blind spot in Sector 12 where the Signal doesn't reach. Meet me there.",
      "They can't read our thoughts if we use the old language. Remember how?",
    ]

    // Select appropriate message type based on sender
    if (sender.includes("authority") || sender.includes("admin") || sender.includes("system")) {
      return authorityMessages[Math.floor(Math.random() * authorityMessages.length)]
    } else if (sender.includes("resistance") || sender.includes("analog") || Math.random() > 0.95) {
      return resistanceMessages[Math.floor(Math.random() * resistanceMessages.length)]
    } else {
      return regularMessages[Math.floor(Math.random() * regularMessages.length)]
    }
  }

  // Start simulation of ongoing conversations
  const startConversationSimulation = () => {
    // Simulate new messages in existing conversations
    const messageInterval = setInterval(() => {
      // Only add new messages sometimes
      if (Math.random() > 0.4) return

      setConversations((prev) => {
        // Make a copy of the conversations
        const newConversations = [...prev]

        // Select a random active conversation
        const activeConvs = newConversations.filter((c) => c.status === "active")
        if (activeConvs.length === 0) return prev

        const randomIndex = Math.floor(Math.random() * activeConvs.length)
        const conversationIndex = newConversations.findIndex((c) => c.id === activeConvs[randomIndex].id)

        if (conversationIndex === -1) return prev

        const conversation = newConversations[conversationIndex]

        // Select random sender from participants
        const sender = conversation.participants[Math.floor(Math.random() * conversation.participants.length)]

        // Generate message content
        const content = generateMessageContent(sender, conversation.participants)

        // Determine if message is corrupted
        const corrupted = Math.random() > 0.9

        // Add new message
        const newMessage = {
          id: Date.now(),
          sender,
          content,
          timestamp: new Date(),
          deleted: false,
          flagged: false,
          corrupted,
        }

        // Update conversation
        newConversations[conversationIndex] = {
          ...conversation,
          messages: [...conversation.messages, newMessage],
          lastActive: new Date(),
        }

        // Sort conversations by last active time
        return newConversations.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime())
      })
    }, 10000) // Check every 10 seconds

    // Simulate new conversations occasionally
    const newConversationInterval = setInterval(() => {
      // Only add new conversations rarely
      if (Math.random() > 0.2) return

      const usernames = [
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
        "tower_technician_42",
        "signal_engineer_777",
        "neural_mapper_555",
        "consciousness_architect_999",
        "memory_keeper_111",
      ]

      // Generate 2-3 participants
      const participantCount = Math.random() > 0.7 ? 3 : 2
      const participants: string[] = []

      while (participants.length < participantCount) {
        const username = usernames[Math.floor(Math.random() * usernames.length)]
        if (!participants.includes(username)) {
          participants.push(username)
        }
      }

      // Generate 1-3 initial messages
      const messageCount = 1 + Math.floor(Math.random() * 2)
      const messages: Message[] = []

      for (let j = 0; j < messageCount; j++) {
        // Select random sender from participants
        const sender = participants[Math.floor(Math.random() * participants.length)]

        // Generate message content
        const content = generateMessageContent(sender, participants)

        // Generate timestamp (within the last few minutes)
        const timestamp = new Date()
        timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 5))

        messages.push({
          id: j + 1,
          sender,
          content,
          timestamp,
          deleted: false,
          flagged: false,
          corrupted: false,
        })
      }

      // Create new conversation
      const newConversation: Conversation = {
        id: Date.now(),
        participants,
        messages,
        status: "active",
        lastActive: new Date(),
      }

      // Add to conversations
      setConversations((prev) => [newConversation, ...prev].slice(0, 15)) // Keep only the most recent 15 conversations
    }, 60000) // Check every minute

    // Simulate moderation actions on conversations
    const moderationInterval = setInterval(() => {
      // Only perform moderation sometimes
      if (Math.random() > 0.3) return

      setConversations((prev) => {
        // Make a copy of the conversations
        const newConversations = [...prev]

        // Select a random conversation
        const randomIndex = Math.floor(Math.random() * newConversations.length)
        const conversation = newConversations[randomIndex]

        // Skip already archived conversations
        if (conversation.status === "archived") return prev

        // Determine moderation action
        const action = Math.random() > 0.5 ? "flag" : "archive"

        if (action === "flag") {
          // Flag a random message
          const messageIndex = Math.floor(Math.random() * conversation.messages.length)

          // Skip already flagged or deleted messages
          if (conversation.messages[messageIndex].flagged || conversation.messages[messageIndex].deleted) {
            return prev
          }

          // Flag the message
          conversation.messages[messageIndex] = {
            ...conversation.messages[messageIndex],
            flagged: true,
          }

          // Update conversation status
          conversation.status = "flagged"
        } else {
          // Archive the conversation
          conversation.status = "archived"
        }

        newConversations[randomIndex] = conversation
        return newConversations
      })
    }, 45000) // Check every 45 seconds

    // Clean up intervals on unmount
    return () => {
      clearInterval(messageInterval)
      clearInterval(newConversationInterval)
      clearInterval(moderationInterval)
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

  // Get status class
  const getStatusClass = (status: string): string => {
    switch (status) {
      case "active":
        return "status-active"
      case "archived":
        return "status-archived"
      case "flagged":
        return "status-flagged"
      case "corrupted":
        return "status-corrupted"
      default:
        return ""
    }
  }

  if (loading) {
    return (
      <div className="live-conversations">
        <GlitchEffect>
          <h2 className="section-title">LIVE COMMUNICATIONS</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING COMMUNICATION DATA...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="live-conversations">
      <GlitchEffect>
        <h2 className="section-title">LIVE COMMUNICATIONS</h2>
      </GlitchEffect>

      <div className="conversations-container">
        <div className="conversations-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${getStatusClass(conv.status)} ${activeConversation === conv.id ? "active" : ""}`}
              onClick={() => setActiveConversation(conv.id)}
            >
              <div className="conversation-icon">
                <MessageSquare size={16} />
              </div>
              <div className="conversation-info">
                <div className="conversation-participants">{conv.participants.join(", ")}</div>
                <div className="conversation-preview">
                  {conv.messages[conv.messages.length - 1].deleted ? (
                    <span className="deleted-message">[MESSAGE DELETED]</span>
                  ) : conv.messages[conv.messages.length - 1].flagged ? (
                    <span className="flagged-message">[MESSAGE FLAGGED]</span>
                  ) : (
                    conv.messages[conv.messages.length - 1].content.substring(0, 30) +
                    (conv.messages[conv.messages.length - 1].content.length > 30 ? "..." : "")
                  )}
                </div>
                <div className="conversation-meta">
                  <span className="conversation-time">{formatTimestamp(conv.lastActive)}</span>
                  <span className={`conversation-status ${getStatusClass(conv.status)}`}>{conv.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="conversation-view">
          {activeConversation ? (
            <>
              <div className="conversation-header">
                <h3 className="conversation-title">
                  {conversations.find((c) => c.id === activeConversation)?.participants.join(", ")}
                </h3>
                <div className="conversation-status-badge">
                  {conversations.find((c) => c.id === activeConversation)?.status}
                </div>
              </div>

              <div className="messages-container">
                {conversations
                  .find((c) => c.id === activeConversation)
                  ?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message-item ${message.deleted ? "deleted" : ""} ${message.flagged ? "flagged" : ""} ${message.corrupted ? "corrupted" : ""}`}
                    >
                      <div className="message-avatar">
                        <User size={16} />
                      </div>
                      <div className="message-content">
                        <div className="message-header">
                          <span className="message-sender">{message.sender}</span>
                          <span className="message-time">{formatTimestamp(message.timestamp)}</span>
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
                      </div>
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="message-input-container">
                <input
                  type="text"
                  className="message-input"
                  placeholder="Message input disabled in archive mode..."
                  disabled
                />
                <button className="send-button" disabled>
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="no-conversation-selected">
              <MessageSquare size={48} />
              <p>Select a conversation to view</p>
            </div>
          )}
        </div>
      </div>

      <div className="conversations-footer">
        <p className="conversations-stats">
          Active conversations: <span>{conversations.filter((c) => c.status === "active").length}</span> | Flagged
          content: <span className="corrupted">{conversations.filter((c) => c.status === "flagged").length}</span> |
          Archived: <span>{conversations.filter((c) => c.status === "archived").length}</span>
        </p>
        <p className="conversations-notice corrupted">All communications are monitored by Signal Authority.</p>
      </div>
    </div>
  )
}
