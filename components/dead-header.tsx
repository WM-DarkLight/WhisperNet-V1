"use client"

import { useState, useEffect } from "react"
import GlitchEffect from "./effects/glitch-effect"

interface DeadHeaderProps {
  onNavigate: (section: string) => void
  activeSection: string
}

export default function DeadHeader({ onNavigate, activeSection }: DeadHeaderProps) {
  const [currentTime, setCurrentTime] = useState("")
  const [userCount, setUserCount] = useState("1")
  const [degradation, setDegradation] = useState(0)
  const [logoClicks, setLogoClicks] = useState(0)

  const handleLogoClick = () => {
    setLogoClicks((prev) => {
      const newCount = prev + 1

      // Easter egg: clicking the logo 5 times
      if (newCount === 5) {
        // Show a special message in the console
        console.log(
          "%c                                                          ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  WHISPERNET V0 - DEVELOPER CONSOLE ACTIVATED            ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c                                                          ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  This is a simulation. None of this is real.            ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  The Signal event never occurred.                       ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c                                                          ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  Try these commands in the terminal:                    ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  - resistance                                           ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  - thetruth                                             ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  - ascend                                               ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  - xyzzy                                                ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  - thesignal                                            ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c  - base64 [text]                                        ",
          "background: #000; color: #0f0; font-size: 16px;",
        )
        console.log(
          "%c                                                          ",
          "background: #000; color: #0f0; font-size: 16px;",
        )

        return 0
      }

      return newCount
    })
  }

  // Track session time for increasing degradation
  useEffect(() => {
    const degradationInterval = setInterval(() => {
      setDegradation((prev) => Math.min(prev + 0.05, 1))
    }, 60000) // Increase degradation every minute

    return () => clearInterval(degradationInterval)
  }, [])

  // Simulate a corrupted time in the future
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Corrupted date in 2084
      const corruptedYear = 2084
      const corruptedMonth = now.getMonth()
      const corruptedDay = now.getDate()
      const corruptedHour = now.getHours()
      const corruptedMinute = now.getMinutes()

      // Occasionally corrupt the time display - more likely with higher degradation
      const glitchTime = Math.random() > 0.8 - degradation * 0.5

      if (glitchTime) {
        setCurrentTime(
          `${corruptedYear}-${Math.floor(Math.random() * 99)}-${Math.floor(Math.random() * 99)} ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
        )
      } else {
        setCurrentTime(
          `${corruptedYear}-${String(corruptedMonth + 1).padStart(2, "0")}-${String(corruptedDay).padStart(2, "0")} ${String(corruptedHour).padStart(2, "0")}:${String(corruptedMinute).padStart(2, "0")}`,
        )
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    // Simulate user count changes - more erratic with higher degradation
    const userInterval = setInterval(() => {
      // Very rarely show another user, more likely with degradation
      if (Math.random() > 0.95 - degradation * 0.3) {
        const randomUsers = Math.floor(Math.random() * 3) + 2
        setUserCount(randomUsers.toString())
        setTimeout(() => {
          setUserCount("1")
        }, 5000)
      }

      // Occasionally show corrupted user count
      if (Math.random() > 0.9 - degradation * 0.4) {
        setUserCount("█")
        setTimeout(() => {
          setUserCount("1")
        }, 2000)
      }
    }, 30000)

    return () => {
      clearInterval(interval)
      clearInterval(userInterval)
    }
  }, [degradation])

  return (
    <header className="whispernet-header">
      <div className="header-content">
        <GlitchEffect intensity={degradation > 0.5 ? "high" : "medium"}>
          <h1 className="site-title" onClick={handleLogoClick} style={{ cursor: "default" }}>
            WhisperNet v0
          </h1>
        </GlitchEffect>
        <div className="system-info">
          <p className="timestamp">
            TIMESTAMP: <span className="blink-slow">{currentTime}</span>
          </p>
          <p className="connection-status">
            CONNECTION:{" "}
            <span className="corrupted" data-text="FRAGMENTED">
              FRAGMENTED
            </span>
          </p>
          <p className="user-count">
            ACTIVE USERS: <span className="blink-slow">{userCount}</span>
          </p>
          <p className="hidden-message">{/* SGlkZGVuIE1lc3NhZ2U6IFRoZSBzaWduYWwgaXMgc3RpbGwgb3V0IHRoZXJlLg== */}</p>
        </div>
      </div>
      <nav className="main-nav">
        <ul>
          <li>
            <a
              href="#"
              className={`nav-link glitch-hover ${activeSection === "main" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate("main")
              }}
            >
              HOME
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`nav-link glitch-hover corrupted ${activeSection === "archive" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate("archive")
              }}
            >
              A█CHIVE
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`nav-link glitch-hover ${activeSection === "terminal" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate("terminal")
              }}
            >
              TERMINAL
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`nav-link glitch-hover ${activeSection === "chat" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate("chat")
              }}
            >
              CHATROOM
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`nav-link glitch-hover ${activeSection === "search" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate("search")
              }}
            >
              SEARCH
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
