"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import GlitchEffect from "./effects/glitch-effect"

interface ChatMessage {
  id: number
  username: string
  timestamp: string
  content: string
  system?: boolean
  corrupted?: boolean
  automated?: boolean
}

export default function DeadChatroom() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [userCount, setUserCount] = useState(1)
  const [roomName, setRoomName] = useState("General Discussion")
  const [lastActive, setLastActive] = useState("Unknown")
  const [showError, setShowError] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with system messages
    setMessages([
      {
        id: 1,
        username: "SYSTEM",
        timestamp: formatTimestamp(new Date()),
        content: "Welcome to the WhisperNet chat archive.",
        system: true,
      },
      {
        id: 2,
        username: "SYSTEM",
        timestamp: formatTimestamp(new Date()),
        content: "This chatroom has been inactive for 3,281 days.",
        system: true,
      },
      {
        id: 3,
        username: "User_7392",
        timestamp: "2041-06-29 17:22:14",
        content: "Has anyone else noticed the increased network latency today?",
      },
      {
        id: 4,
        username: "NetworkAdmin",
        timestamp: "2041-06-29 17:23:45",
        content: "Yes, we're experiencing some issues with the main node. The Signal strength has been fluctuating.",
      },
      {
        id: 5,
        username: "User_8841",
        timestamp: "2041-06-29 17:25:03",
        content: "My home terminal is showing strange patterns in the background. Almost like shadows moving.",
        corrupted: true,
      },
      {
        id: 6,
        username: "NetworkAdmin",
        timestamp: "2041-06-29 17:26:30",
        content: "That's just routine maintenance. Nothing to worry about. The Signal protects us all.",
      },
      {
        id: 7,
        username: "User_7392",
        timestamp: "2041-06-29 17:28:17",
        content: "But I'm seeing them too. And I'm hearing whispers when no one is talking.",
        corrupted: true,
      },
      {
        id: 8,
        username: "SYSTEM",
        timestamp: "2041-06-29 17:30:00",
        content: "User_7392 has been disconnected for mandatory system update.",
        system: true,
      },
      {
        id: 9,
        username: "SYSTEM",
        timestamp: "2041-06-29 17:30:05",
        content: "User_8841 has been disconnected for mandatory system update.",
        system: true,
      },
      {
        id: 10,
        username: "NetworkAdmin",
        timestamp: "2041-06-29 17:31:22",
        content:
          "Everything is fine. The Signal is strong today. Remember to take your Anti-Signal medication as prescribed.",
      },
      {
        id: 11,
        username: "SYSTEM",
        timestamp: "2041-06-29 17:35:00",
        content: "This chat has been archived due to content violations.",
        system: true,
      },
    ])

    // Calculate last active date
    const lastDate = new Date("2041-06-29T17:35:00")
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - lastDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setLastActive(`${diffDays} days ago`)

    // Simulate occasional automated messages
    const automatedInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const automatedMessages = [
          {
            username: "MaintenanceBot",
            content:
              "AUTOMATED MESSAGE: This archive is scheduled for deletion in compliance with Signal Purity Act Section 7.3.",
            automated: true,
          },
          {
            username: "SYSTEM",
            content: "WARNING: Unauthorized access detected. User location has been logged.",
            system: true,
          },
          {
            username: "Echo_Protocol",
            content:
              "Is anyone still out there? This is an automated message from the resistance. If you can read this, you're not alone.",
            automated: true,
            corrupted: true,
          },
        ]

        const randomMessage = automatedMessages[Math.floor(Math.random() * automatedMessages.length)]

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            username: randomMessage.username,
            timestamp: formatTimestamp(new Date()),
            content: randomMessage.content,
            system: randomMessage.system,
            automated: randomMessage.automated,
            corrupted: randomMessage.corrupted,
          },
        ])
      }
    }, 45000)

    // Simulate user count fluctuations
    const userCountInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setUserCount((prev) => {
          const newCount = prev + (Math.random() > 0.5 ? 1 : -1)
          return Math.max(1, newCount)
        })

        // Reset back to 1 after some time
        setTimeout(() => {
          setUserCount(1)
        }, 10000)
      }
    }, 30000)

    return () => {
      clearInterval(automatedInterval)
      clearInterval(userCountInterval)
    }
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const formatTimestamp = (date: Date) => {
    return date.toISOString().replace("T", " ").substring(0, 19)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Show error message
    setShowError(true)

    // Hide error after some time
    setTimeout(() => {
      setShowError(false)
      setInput("")
    }, 3000)
  }

  return (
    <div className="chatroom-container">
      <GlitchEffect>
        <h2 className="section-title">ARCHIVED CHATROOM</h2>
      </GlitchEffect>

      <div className="chatroom-info">
        <div className="room-details">
          <h3 className="room-name">{roomName}</h3>
          <p className="room-status">
            Status: <span className="corrupted">ARCHIVED</span>
          </p>
        </div>
        <div className="user-details">
          <p className="user-count">
            Users online: <span className="blink-slow">{userCount}</span>
          </p>
          <p className="last-active">Last activity: {lastActive}</p>
        </div>
      </div>

      <div className="chat-window" ref={chatRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.system ? "system-message" : ""} ${message.corrupted ? "corrupted" : ""} ${message.automated ? "automated" : ""}`}
          >
            <div className="message-header">
              <span className="message-username">{message.username}</span>
              <span className="message-timestamp">{message.timestamp}</span>
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
          disabled={showError}
        />
        {showError && <div className="chat-error corrupted blink">ERROR: This chatroom is archived and read-only.</div>}
        <button type="submit" className="chat-send glitch-hover">
          Send
        </button>
      </form>
    </div>
  )
}
