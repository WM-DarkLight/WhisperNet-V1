"use client"

import { useState, useEffect } from "react"
import GlitchEffect from "./effects/glitch-effect"

interface ForumPost {
  id: number
  username: string
  timestamp: string
  content: string
  status: string
  corrupted?: boolean
  severe?: boolean
  blinking?: boolean
  deleted?: boolean
}

// Procedural forum post generator
const generateForumPost = (): ForumPost => {
  const usernames = [
    "SignalSeeker_42",
    "TruthHunter",
    "DigitalNomad",
    "ResistanceX",
    "NetworkGhost",
    "SignalJammer",
    "LastHuman",
    "MemoryKeeper",
    "AnalogDreamer",
    "SystemRefugee",
    "████████",
    "Signal_Sensitive",
    "Disconnected_01",
    "FreeThought",
    "OffGrid",
  ]

  const contents = [
    'Has anyone else noticed the increased frequency of network outages? My sector has been experiencing drops every few hours. Official explanation is "routine maintenance" but it\'s been going on for weeks now.',
    "It's not maintenance. I work for the Department of █████████ and we've been monitoring unusual signal patterns that seem to be ███████████████████████. They're telling us it's nothing to worry about, but I've seen the data. Something is coming.",
    "Can anyone confirm reports of people going missing after receiving the latest neural interface update? My neighbor went in for the procedure three days ago and hasn't returned.",
    "The Anti-Signal medication they're pushing doesn't block the Signal. It just makes you more susceptible to it. I stopped taking mine two weeks ago and I can see things clearly now.",
    "Has anyone tried the aluminum foil technique? I've lined my apartment walls and I think it's working. The voices are quieter now.",
    "They're not updating our neural interfaces. They're replacing them with something else. I found schematics that show the new chips contain ████████████████ that can ████████████████.",
    "I've been analyzing the Signal's frequency patterns. There's a hidden modulation that seems to be affecting brain wave patterns in the theta range. It's like it's trying to ████████████████.",
    "My child came back different after the mandatory school screening. Their eyes look the same but there's something wrong. They talk about the Signal as if it's a person.",
    "I've found a way to temporarily block the Signal using old analog radio equipment. If anyone wants details, meet me at the abandoned █████████ tomorrow at midnight.",
    "The Digital Ascension Program isn't saving our consciousness. I worked on the project. It's creating copies while the originals are ████████████████. Don't volunteer.",
    "Has anyone else noticed that the people who get 'treated' for Signal Sensitivity all have the same blank expression afterward? It's like they're not even there anymore.",
    "I've been tracking the construction of new Signal towers. They're not following the published grid pattern. They're forming some kind of geometric shape that resembles a █████████.",
    "The resistance is still out there. If you can read this, you're not alone. Use the old shortwave frequencies. Look for transmission pattern 7-3-9 at midnight.",
  ]

  const statuses = [
    "Archived",
    "Active",
    "Flagged",
    "Locked",
    "Deleted",
    "[REDACTED]",
    "[DELETED]",
    "SYSTEM",
    "ALERT",
    "UNKNOWN",
  ]

  const id = Date.now()
  const username = usernames[Math.floor(Math.random() * usernames.length)]
  const content = contents[Math.floor(Math.random() * contents.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  const corrupted = Math.random() > 0.6
  const severe = corrupted && Math.random() > 0.7
  const blinking = severe && Math.random() > 0.5

  // Generate timestamp
  const year = "2041"
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1
  const hour = Math.floor(Math.random() * 24)
  const minute = Math.floor(Math.random() * 60)

  let timestamp = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`

  // Corrupt the timestamp sometimes
  if (corrupted && Math.random() > 0.7) {
    const positions = [2, 5, 8, 11, 14]
    const position = positions[Math.floor(Math.random() * positions.length)]
    timestamp = timestamp.substring(0, position) + "█" + timestamp.substring(position + 1)
  }

  // Special case for "unknown" posts from the future
  if (username === "???" || status === "UNKNOWN") {
    timestamp = "2084-██-██ ██:██"
    return {
      id,
      username: "???",
      timestamp,
      content,
      status: "[IMPOSSIBLE TIMESTAMP ERROR]",
      corrupted: true,
      severe: true,
      blinking: true,
    }
  }

  return {
    id,
    username,
    timestamp,
    content,
    status,
    corrupted,
    severe,
    blinking,
  }
}

export default function DeadForum() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [replyText, setReplyText] = useState("")
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [replyError, setReplyError] = useState("")

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate initial forum posts
        const initialPosts: ForumPost[] = []
        for (let i = 0; i < 5; i++) {
          initialPosts.push(generateForumPost())
        }

        // Add a special "unknown" post
        initialPosts.push({
          id: Date.now() + 1000,
          username: "???",
          timestamp: "2084-██-██ ██:██",
          content:
            "If you're reading this, you're one of the few who can still access the old network. The Signal isn't what they told us. It's not protection. It's not salvation. It's [DATA CORRUPTED]\n\nFind us at the old broadcast tower. We're still fighting.",
          status: "[IMPOSSIBLE TIMESTAMP ERROR]",
          corrupted: true,
          severe: true,
          blinking: true,
        })

        // Add system admin post
        initialPosts.push({
          id: Date.now() + 1001,
          username: "SystemAdmin",
          timestamp: "2041-06-29 19:30",
          content:
            "THIS THREAD HAS BEEN FLAGGED FOR CONTENT VIOLATION. CONTINUING THIS DISCUSSION WILL RESULT IN AUTOMATIC REPORTING TO AUTHORITIES. REMEMBER: THE SIGNAL PROTECTS US ALL.",
          status: "LOCKED",
          corrupted: true,
          severe: true,
        })

        setPosts(initialPosts)
        setLoading(false)
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Occasionally add a new automated post
  useEffect(() => {
    if (posts.length === 0) return

    const automatedPostInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const automatedPosts = [
          {
            id: Date.now(),
            username: "SystemMaintenance",
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
            content:
              "AUTOMATED MESSAGE: This archive is scheduled for deletion in compliance with Signal Purity Act Section 7.3. All users are advised to cease access immediately.",
            status: "SYSTEM",
            corrupted: true,
            blinking: true,
          },
          {
            id: Date.now() + 1,
            username: "NetworkMonitor",
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
            content:
              "WARNING: Unauthorized access detected. User location has been logged. Authorities have been notified.",
            status: "ALERT",
            corrupted: true,
            severe: true,
          },
          {
            id: Date.now() + 2,
            username: "Echo_Protocol",
            timestamp: "2084-" + new Date().toISOString().substring(5, 16),
            content:
              "Is anyone still out there? This is an automated message from the resistance. If you can read this, you're not alone. The Signal can be broken. Find us at coordinates [REDACTED].",
            status: "UNKNOWN",
            corrupted: true,
          },
          {
            id: Date.now() + 3,
            username: "MemoryArchive",
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
            content:
              "AUTOMATED BACKUP: Human consciousness archive fragment recovered. Identity: UNKNOWN. Last memory timestamp: 2041-07-01. Memory content: [CORRUPTED]",
            status: "SYSTEM",
            corrupted: true,
          },
          {
            id: Date.now() + 4,
            username: "SecurityProtocol",
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
            content:
              "SECURITY ALERT: This thread contains references to anti-Signal activities. All participants have been flagged for re-education. Compliance is mandatory.",
            status: "ALERT",
            corrupted: true,
            severe: true,
          },
        ]

        const randomPost = automatedPosts[Math.floor(Math.random() * automatedPosts.length)]
        setPosts((prev) => [...prev, randomPost])

        // Remove the post after some time
        setTimeout(() => {
          setPosts((prev) => prev.filter((post) => post.id !== randomPost.id))
        }, 30000)
      }
    }, 60000)

    // Occasionally add a new user post
    const userPostInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newPost = generateForumPost()
        setPosts((prev) => [...prev, newPost])

        // Keep the post list manageable
        if (posts.length > 15) {
          setPosts((prev) => prev.slice(-15))
        }
      }
    }, 120000)

    return () => {
      clearInterval(automatedPostInterval)
      clearInterval(userPostInterval)
    }
  }, [posts])

  const handleReplyAttempt = () => {
    setShowReplyBox(true)
  }

  const handleSubmitReply = (e) => {
    e.preventDefault()
    setReplyError("")

    // Simulate typing delay
    setTimeout(() => {
      setReplyError("ERROR: Forum functionality disabled. Archive is read-only.")

      // Hide error after some time
      setTimeout(() => {
        setShowReplyBox(false)
        setReplyText("")
        setReplyError("")
      }, 3000)
    }, 1500)
  }

  if (loading) {
    return (
      <section className="forum-thread">
        <GlitchEffect>
          <h2 className="section-title">FRAGMENTED FORUM</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RECOVERING FORUM DATA...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="forum-thread">
      <GlitchEffect>
        <h2 className="section-title">FRAGMENTED FORUM</h2>
      </GlitchEffect>

      <div className="forum-posts">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`forum-post ${post.corrupted ? "corrupted" : ""} ${post.severe ? "corrupted-severe" : ""}`}
          >
            <div className="post-header">
              <span className="username">{post.username}</span>
              <span className={`post-timestamp ${post.corrupted ? "corrupted" : ""}`}>{post.timestamp}</span>
            </div>
            <div className="post-content">
              <p className={post.blinking ? "blink-slow" : ""}>{post.content}</p>
            </div>
            <div className="post-footer">
              <span className={`post-status ${post.corrupted ? "corrupted" : ""}`}>Status: {post.status}</span>
            </div>
          </div>
        ))}
      </div>

      {!showReplyBox ? (
        <button className="reply-button glitch-hover" onClick={handleReplyAttempt}>
          Reply to Thread
        </button>
      ) : (
        <form className="reply-form" onSubmit={handleSubmitReply}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Enter your reply..."
            className="reply-input"
          />
          {replyError && <p className="reply-error corrupted blink">{replyError}</p>}
          <button type="submit" className="submit-reply glitch-hover">
            Submit Reply
          </button>
        </form>
      )}

      <div className="forum-metadata">
        <p className="last-activity corrupted">Last activity: 15,341 days ago</p>
        <p className="user-count">Users online: 1</p>
      </div>
    </section>
  )
}
