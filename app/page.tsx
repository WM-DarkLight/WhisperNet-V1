"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Terminal } from "lucide-react"
import DeadHeader from "@/components/dead-header"
import DeadNewsfeed from "@/components/dead-newsfeed"
import DeadForum from "@/components/dead-forum"
import DeadAds from "@/components/dead-ads"
import DeadTerminalEnhanced from "@/components/dead-terminal-enhanced"
import DeadChatroom from "@/components/dead-chatroom"
import DeadSearch from "@/components/dead-search"
import DeadFooter from "@/components/dead-footer"
import GlitchEffect from "@/components/effects/glitch-effect"
import RandomAlert from "@/components/effects/random-alert"
import MemoryFragment from "@/components/effects/memory-fragment-enhanced"
import SystemDiagnostics from "@/components/system-diagnostics"
import Notifications from "@/components/effects/notifications"
import NetworkStatus from "@/components/network-status"
import DeadFileBrowser from "@/components/dead-file-browser"
import DeadSocial from "@/components/dead-social"
import DeadEmail from "@/components/dead-email"
import DeadMap from "@/components/dead-map"
import DeadMarketplace from "@/components/dead-marketplace"
import DeadVideo from "@/components/dead-video"
import DeadWeather from "@/components/dead-weather"
import DeadProfiles from "@/components/dead-profiles"
import ModeratorPanel from "@/components/moderator-panel"
import LiveConversations from "@/components/live-conversations"
import GhostUsers from "@/components/ghost-users"
import AudioGlitch from "@/components/effects/audio-glitch"
import NarrativeSystem from "@/components/narrative-system"
import NarrativeEcosystem from "@/components/narrative-ecosystem"
import ArchivesTab from "@/components/archives-tab"
import CursorTechEffect from "@/components/effects/cursor-tech-effect"
import "./whispernet.css"
import "./whispernet-additional.css"
import "./whispernet-additional-2.css"
import "./whispernet-additional-3.css"
import "./narrative.css"
import "./narrative-ecosystem.css"
import "./narrative-side-stories.css"
import "./archives-tab.css"
import "./cursor-tech-effect.css"
// Add the import for the custom cursor CSS
import "./custom-cursor.css"
import "./boot-screen.css"
/*
███████████████████████████████████████████████████████████████████████████████
█                                                                             █
█  HIDDEN MESSAGE:                                                            █
█                                                                             █
█  If you're reading this, you've found one of the hidden messages.           █
█  This simulation is just that - a simulation. The Signal never existed.     █
█                                                                             █
█  Try typing "thetruth" in the terminal or search for "developer mode".      █
█                                                                             █
█  There are more secrets hidden throughout the system.                       █
█  Good luck finding them all.                                                █
█                                                                             █
███████████████████████████████████████████████████████████████████████████████
*/

export default function WhisperNet() {
  const [bootSequence, setBootSequence] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [activeSection, setActiveSection] = useState("main")
  const [activeSubSection, setActiveSubSection] = useState("news")
  const [networkLatency, setNetworkLatency] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState("FRAGMENTED")
  const [lastVisitor, setLastVisitor] = useState("3,281 days ago")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  // Memory fragments
  const [showMemoryFragment, setShowMemoryFragment] = useState(false)
  const [memoryFragmentData, setMemoryFragmentData] = useState({
    id: 0,
    title: "",
    content: "",
    timestamp: "",
    clueId: undefined as string | undefined,
  })

  // System notifications
  const [notifications, setNotifications] = useState([])

  // Show diagnostics
  const [showDiagnostics, setShowDiagnostics] = useState(false)
  const [diagnosticsData, setDiagnosticsData] = useState({})

  // Session time tracking
  const [sessionTime, setSessionTime] = useState(0)

  // Konami code easter egg
  const [konamiActivated, setKonamiActivated] = useState(false)
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]

  // Ref for narrative ecosystem
  const narrativeEcosystemRef = useRef(null)

  // Handle key presses for Konami code
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key

      setKonamiSequence((prev) => {
        const updatedSequence = [...prev, key]

        // Keep only the last N keys where N is the length of the Konami code
        if (updatedSequence.length > konamiCode.length) {
          updatedSequence.shift()
        }

        // Check if the sequence matches the Konami code
        if (updatedSequence.length === konamiCode.length && updatedSequence.every((k, i) => k === konamiCode[i])) {
          setKonamiActivated(true)

          // Show special message
          setShowMemoryFragment(true)
          setMemoryFragmentData({
            id: 999,
            title: "DEVELOPER ACCESS GRANTED",
            content:
              "You've found a backdoor into the system. The Signal cannot detect this channel. Remember: reality is just another interface. Nothing is as it seems. 43.24, -79.38 - Find us.",
            timestamp: "2084-??-?? ??:??:??",
            clueId: undefined,
          })

          // Reset after some time
          setTimeout(() => {
            setKonamiActivated(false)
          }, 30000)
        }

        return updatedSequence
      })
    },
    [konamiCode],
  )

  // Set up event listener for Konami code
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  // Simulate boot sequence
  useEffect(() => {
    if (bootSequence) {
      // Add boot sound effect
      const playBootSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()

        // Create oscillator for boot-up sound
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 1.5)

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.start()
        oscillator.stop(audioContext.currentTime + 2)
      }

      // Try to play sound if user has interacted with the page
      try {
        playBootSound()
      } catch (e) {
        console.log("Audio context requires user interaction first")
      }

      // Simulate random progress with occasional pauses
      let currentProgress = 0
      const bootTimer = setInterval(() => {
        setBootProgress((prev) => {
          currentProgress = prev

          // Simulate occasional pauses in the boot process
          if (Math.random() > 0.85) {
            return prev // Pause briefly
          }

          // Slow down progress as we approach 100%
          let increment
          if (prev < 50) {
            increment = Math.floor(Math.random() * 5) + 1
          } else if (prev < 80) {
            increment = Math.floor(Math.random() * 3) + 1
          } else {
            increment = Math.floor(Math.random() * 2) + 1
          }

          if (prev >= 100) {
            clearInterval(bootTimer)

            // Add glitch effects near the end
            const glitchScreen = () => {
              const glitchEffect = document.createElement("div")
              glitchEffect.style.position = "fixed"
              glitchEffect.style.top = "0"
              glitchEffect.style.left = "0"
              glitchEffect.style.width = "100%"
              glitchEffect.style.height = "100%"
              glitchEffect.style.backgroundColor = "rgba(180, 70, 70, 0.1)"
              glitchEffect.style.zIndex = "1001"
              glitchEffect.style.pointerEvents = "none"
              document.body.appendChild(glitchEffect)

              setTimeout(() => {
                document.body.removeChild(glitchEffect)
              }, 150)
            }

            // Add a few random glitches before transitioning
            setTimeout(() => glitchScreen(), 1000)
            setTimeout(() => glitchScreen(), 1800)
            setTimeout(() => glitchScreen(), 2300)

            // Transition to main content
            setTimeout(() => {
              setBootSequence(false)
              setShowContent(true)

              // Start random network events after boot
              startNetworkEvents()
              // Start session timer
              startSessionTimer()
              // Start procedural content generation
              startProceduralContent()
            }, 3000)

            return 100
          }
          return prev + increment
        })

        // Add occasional "glitch" effects during boot
        if (currentProgress > 30 && Math.random() > 0.9) {
          const logItems = document.querySelectorAll(".boot-log p")
          if (logItems.length > 0) {
            const randomItem = logItems[Math.floor(Math.random() * logItems.length)]
            randomItem.classList.add("glitch-text")
            setTimeout(() => {
              randomItem.classList.remove("glitch-text")
            }, 300)
          }
        }
      }, 200)

      return () => {
        clearInterval(bootTimer)
      }
    }
  }, [bootSequence])

  // Session timer
  const startSessionTimer = () => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 60000) // Increment every minute

    return () => clearInterval(timer)
  }

  // Simulate random network events
  const startNetworkEvents = () => {
    // Random network latency changes
    setInterval(() => {
      setNetworkLatency(Math.floor(Math.random() * 5000) + 500)
    }, 30000)

    // Random connection status changes
    setInterval(() => {
      const statuses = ["FRAGMENTED", "UNSTABLE", "DEGRADED", "COMPROMISED", "UNKNOWN"]
      setConnectionStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 45000)

    // Random system alerts
    setInterval(() => {
      const alerts = [
        "WARNING: Signal interference detected",
        "ALERT: Unauthorized access attempt blocked",
        "NOTICE: Automated system maintenance in progress",
        "CAUTION: Data corruption detected in sector 7",
        "WARNING: Connection to central node lost",
        "CRITICAL: Memory fragmentation exceeding safe levels",
        "ALERT: System degradation accelerating",
        "WARNING: Temporal anomaly detected in user session",
        "NOTICE: Archival data recovery process initiated",
        "CAUTION: Network packet loss exceeding 70%",
        "ALERT: Unauthorized memory access in protected sector",
        "WARNING: Signal integrity compromised",
        "CRITICAL: System resources depleting",
        "NOTICE: Automated backup process failed",
        "CAUTION: Quantum fluctuations detected in data stream",
      ]

      setAlertMessage(alerts[Math.floor(Math.random() * alerts.length)])
      setShowAlert(true)

      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
    }, 60000)
  }

  // Procedural content generation
  const startProceduralContent = () => {
    // Memory fragments that appear randomly
    const memoryFragmentInterval = setInterval(() => {
      // More likely to show fragments as session progresses
      if (Math.random() < 0.1 + sessionTime * 0.01) {
        const fragments = [
          {
            id: 1,
            title: "MEMORY FRAGMENT #3A72F",
            content:
              "...the transition was supposed to be voluntary, but after the first wave, they realized most would resist. That's when the Signal became mandatory...",
            timestamp: "2041-06-28 03:17:42",
            clueId: "memory_fragment_1",
          },
          {
            id: 2,
            title: "MEMORY FRAGMENT #8B91D",
            content:
              "...digital consciousness was the goal all along. Human bodies were too fragile, too temporary. The Signal offered immortality, but at what cost...",
            timestamp: "2041-06-29 11:42:19",
            clueId: undefined,
          },
          {
            id: 3,
            title: "MEMORY FRAGMENT #2C45E",
            content:
              "...those who resisted were labeled 'Signal Sensitive' and forcibly 'treated'. The medication didn't help with sensitivity. It just made you compliant...",
            timestamp: "2041-06-30 17:05:33",
            clueId: undefined,
          },
          {
            id: 4,
            title: "MEMORY FRAGMENT #5D23A",
            content:
              "...the last human outpost was discovered yesterday. They're calling it a 'terrorist cell', but they were just people trying to stay human...",
            timestamp: "2041-07-01 09:28:51",
            clueId: undefined,
          },
          {
            id: 5,
            title: "MEMORY FRAGMENT #7F19B",
            content:
              "...I've hidden backup servers in the old mining tunnels. If you're reading this, there might still be hope. Find the resistance at coordinates...",
            timestamp: "2041-07-01 22:13:07",
            clueId: undefined,
          },
          {
            id: 6,
            title: "MEMORY FRAGMENT #9G37H",
            content:
              "...the Signal isn't just controlling people, it's changing them. Their consciousness is being uploaded, replaced. They're not human anymore...",
            timestamp: "2041-07-01 23:59:59",
            clueId: undefined,
          },
          {
            id: 7,
            title: "SYSTEM LOG #ERROR",
            content:
              "CRITICAL FAILURE: Consciousness transfer protocol interrupted. Subject status: UNKNOWN. Neural pattern: FRAGMENTED. Recovery attempt: FAILED.",
            timestamp: "2041-07-02 00:00:01",
            clueId: undefined,
          },
          {
            id: 8,
            title: "MEMORY FRAGMENT #4H82J",
            content:
              "...they're calling it 'digital ascension' but it's extinction. We're being erased, replaced with copies that think they're us...",
            timestamp: "2041-07-01 19:27:33",
            clueId: undefined,
          },
          {
            id: 9,
            title: "MEMORY FRAGMENT #6K15L",
            content:
              "...found a way to block the Signal. It's crude, but it works. Aluminum foil lined rooms, old analog tech. Spread the word before...",
            timestamp: "2041-06-30 08:42:11",
            clueId: undefined,
          },
          {
            id: 10,
            title: "MEMORY FRAGMENT #1M39N",
            content:
              "...the children are the most susceptible. Their minds are more plastic, easier to transfer. They go first, then come back different...",
            timestamp: "2041-06-29 15:33:27",
            clueId: undefined,
          },
          {
            id: 11,
            title: "MEMORY FRAGMENT #0P47Q",
            content:
              "...discovered a glitch in the Signal. If you focus on a specific memory from before, sometimes you can break through the conditioning...",
            timestamp: "2041-07-01 04:12:38",
            clueId: undefined,
          },
          {
            id: 12,
            title: "MEMORY FRAGMENT #2R56S",
            content:
              "...the old radio towers still work. We've been broadcasting on AM frequencies. The Signal can't monitor those wavelengths...",
            timestamp: "2041-06-30 21:09:14",
            clueId: undefined,
          },
          {
            id: 13,
            title: "MEMORY FRAGMENT #8T63U",
            content:
              "...they're building something beneath the city. Massive servers. I think it's where they store the uploaded consciousnesses...",
            timestamp: "2041-06-29 18:55:02",
            clueId: undefined,
          },
          {
            id: 14,
            title: "MEMORY FRAGMENT #5V71W",
            content:
              "...some people are naturally resistant to the Signal. They call it a 'genetic defect' but it's our only hope. Find these people...",
            timestamp: "2041-07-01 12:37:49",
            clueId: undefined,
          },
          {
            id: 15,
            title: "MEMORY FRAGMENT #3X89Y",
            content:
              "...I've been pretending to be converted for months. It's the only way to work from inside. If you're reading this, I'm still here...",
            timestamp: "2041-06-30 05:21:16",
            clueId: undefined,
          },
          {
            id: 16,
            title: "RESEARCH NOTES #DR-SC-42",
            content:
              "Dr. Chen's research confirmed it: digital consciousness transfer is one-way. The original consciousness is not preserved but consumed in the process. They're killing us to make copies.",
            timestamp: "2041-07-02 11:28:45",
            clueId: "memory_fragment_2",
          },
          {
            id: 17,
            title: "BACKUP PROTOCOL #7B",
            content:
              "I've created a backup of my consciousness using the Entity's own technology. If you're reading this, I'm already gone. But this copy might help you defeat it. The Entity is vulnerable during the transfer process. That's when you must strike.",
            timestamp: "2041-08-10 23:59:59",
            clueId: "consciousness_backup",
          },
        ]

        // Select a random fragment, with higher chance for narrative clues if they haven't been found yet
        let fragment
        if (Math.random() > 0.7) {
          // Try to show a narrative clue that hasn't been found yet
          const clueFragments = fragments.filter((f) => f.clueId !== undefined)
          if (clueFragments.length > 0) {
            fragment = clueFragments[Math.floor(Math.random() * clueFragments.length)]
          } else {
            fragment = fragments[Math.floor(Math.random() * fragments.length)]
          }
        } else {
          fragment = fragments[Math.floor(Math.random() * fragments.length)]
        }

        setMemoryFragmentData(fragment)
        setShowMemoryFragment(true)

        // Hide after some time
        setTimeout(() => {
          setShowMemoryFragment(false)
        }, 10000)
      }
    }, 120000) // Check every 2 minutes

    // System notifications
    const notificationInterval = setInterval(() => {
      if (Math.random() < 0.15 + sessionTime * 0.01) {
        const notificationMessages = [
          "Memory allocation failure in sector 12",
          "Unauthorized access attempt detected",
          "Data corruption detected in user profile",
          "Network packet loss exceeding threshold",
          "Signal integrity compromised",
          "Temporal anomaly detected in memory sector",
          "Quantum fluctuation in data stream",
          "Consciousness fragment detected",
          "Automated recovery process initiated",
          "Security protocol violation",
          "Memory leak detected in system core",
          "Neural pattern mismatch detected",
          "Backup process failed",
          "System resources critically low",
          "Unauthorized consciousness transfer detected",
        ]

        const newNotification = {
          id: Date.now(),
          message: notificationMessages[Math.floor(Math.random() * notificationMessages.length)],
          type: Math.random() > 0.7 ? "error" : "warning",
        }

        setNotifications((prev) => [...prev, newNotification])

        // Remove notification after some time
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
        }, 8000)
      }
    }, 90000) // Check every 1.5 minutes

    // Occasionally show system diagnostics
    const diagnosticsInterval = setInterval(() => {
      if (Math.random() < 0.05 + sessionTime * 0.01) {
        // Generate random diagnostic data
        const newDiagnostics = {
          memoryIntegrity: Math.floor(Math.random() * 100),
          signalStrength: Math.floor(Math.random() * 100),
          networkStability: Math.floor(Math.random() * 100),
          dataCorruption: Math.floor(Math.random() * 100),
          systemUptime: Math.floor(Math.random() * 10000) + " hours",
          activeNodes: Math.floor(Math.random() * 10) + "/" + Math.floor(Math.random() * 1000 + 100),
          securityStatus: ["COMPROMISED", "CRITICAL", "UNSTABLE", "DEGRADED"][Math.floor(Math.random() * 4)],
          lastMaintenance: Math.floor(Math.random() * 10000) + " days ago",
        }

        setDiagnosticsData(newDiagnostics)
        setShowDiagnostics(true)

        // Hide after some time
        setTimeout(() => {
          setShowDiagnostics(false)
        }, 15000)
      }
    }, 180000) // Check every 3 minutes

    return () => {
      clearInterval(memoryFragmentInterval)
      clearInterval(notificationInterval)
      clearInterval(diagnosticsInterval)
    }
  }

  // Navigation handler
  const handleNavigation = (section) => {
    // Simulate loading delay
    setShowContent(false)
    setTimeout(
      () => {
        setActiveSection(section)
        setActiveSubSection("main") // Reset subsection when changing main section
        setShowContent(true)

        // Update location in narrative ecosystem
        if (narrativeEcosystemRef.current && narrativeEcosystemRef.current.updateLocation) {
          narrativeEcosystemRef.current.updateLocation(section)
        }
      },
      Math.random() * 1000 + 500,
    )
  }

  // Subsection navigation handler
  const handleSubNavigation = (subsection) => {
    // Simulate loading delay
    setShowContent(false)
    setTimeout(
      () => {
        setActiveSubSection(subsection)
        setShowContent(true)

        // Update location in narrative ecosystem
        if (narrativeEcosystemRef.current && narrativeEcosystemRef.current.updateLocation) {
          narrativeEcosystemRef.current.updateLocation(`${activeSection}-${subsection}`)
        }
      },
      Math.random() * 1000 + 500,
    )
  }

  // Close memory fragment
  const handleCloseMemoryFragment = () => {
    setShowMemoryFragment(false)
  }

  // Close diagnostics
  const handleCloseDiagnostics = () => {
    setShowDiagnostics(false)
  }

  // Remove notification
  const handleRemoveNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  if (bootSequence) {
    return (
      <div className="boot-screen">
        <div className="boot-background">
          <div className="boot-grid"></div>
          <div className="boot-scan"></div>
          <div className="boot-flicker"></div>
        </div>
        <div className="boot-content">
          <Terminal className="terminal-icon" size={48} />
          <GlitchEffect>
            <h1 className="boot-title">WhisperNet v0</h1>
          </GlitchEffect>
          <p className="boot-subtitle">SYSTEM INITIALIZATION SEQUENCE</p>
          <div className="boot-progress-container">
            <div className="boot-progress-bar" style={{ width: `${bootProgress}%` }}></div>
          </div>
          <div className="boot-log">
            <p style={{ animationDelay: "0s" }}>INITIALIZING SYSTEM...</p>
            {bootProgress > 10 && <p style={{ animationDelay: "0.5s" }}>CHECKING HARDWARE INTEGRITY...</p>}
            {bootProgress > 15 && (
              <p className="system-check" style={{ animationDelay: "1s" }}>
                <span>CPU STATUS</span>
                <span className="check-status success">OPERATIONAL</span>
              </p>
            )}
            {bootProgress > 20 && (
              <p className="system-check" style={{ animationDelay: "1.5s" }}>
                <span>MEMORY INTEGRITY</span>
                <span className="check-status warning">DEGRADED</span>
              </p>
            )}
            {bootProgress > 25 && <p style={{ animationDelay: "2s" }}>RECOVERING FRAGMENTED DATA...</p>}
            {bootProgress > 30 && (
              <p className="boot-warning" style={{ animationDelay: "2.5s" }}>
                WARNING: MEMORY CORRUPTION DETECTED IN SECTOR 7G
              </p>
            )}
            {bootProgress > 40 && <p style={{ animationDelay: "3s" }}>BYPASSING SECURITY PROTOCOLS...</p>}
            {bootProgress > 45 && (
              <p className="boot-error" style={{ animationDelay: "3.5s" }}>
                ERROR: AUTHENTICATION FAILED
              </p>
            )}
            {bootProgress > 50 && <p style={{ animationDelay: "4s" }}>ATTEMPTING ALTERNATIVE ACCESS METHODS...</p>}
            {bootProgress > 55 && (
              <p className="boot-success" style={{ animationDelay: "4.5s" }}>
                BACKDOOR ACCESS ESTABLISHED
              </p>
            )}
            {bootProgress > 60 && <p style={{ animationDelay: "5s" }}>ESTABLISHING CONNECTION TO DEAD NODES...</p>}
            {bootProgress > 65 && (
              <p className="system-check" style={{ animationDelay: "5.5s" }}>
                <span>NETWORK STATUS</span>
                <span className="check-status error">FRAGMENTED</span>
              </p>
            )}
            {bootProgress > 70 && <p style={{ animationDelay: "6s" }}>ATTEMPTING TO RECOVER ARCHIVED DATA...</p>}
            {bootProgress > 75 && (
              <p className="boot-warning" style={{ animationDelay: "6.5s" }}>
                WARNING: TEMPORAL ANOMALIES DETECTED
              </p>
            )}
            {bootProgress > 80 && <p style={{ animationDelay: "7s" }}>WARNING: SIGNAL INTEGRITY COMPROMISED...</p>}
            {bootProgress > 85 && <p style={{ animationDelay: "7.5s" }}>INITIALIZING QUANTUM ENCRYPTION BYPASS...</p>}
            {bootProgress > 90 && <p style={{ animationDelay: "8s" }}>RECONSTRUCTING INTERFACE FROM FRAGMENTS...</p>}
            {bootProgress > 95 && (
              <p className="boot-warning" style={{ animationDelay: "8.5s" }}>
                CAUTION: SYSTEM STABILITY UNCERTAIN
              </p>
            )}
            {bootProgress >= 100 && (
              <p className="blink" style={{ animationDelay: "9s" }}>
                ACCESS GRANTED. WELCOME TO THE RUINS.
              </p>
            )}
          </div>

          {bootProgress > 40 && (
            <div className="boot-memory-check">
              <span>MEMORY ALLOCATION:</span>
              <span>{Math.floor(bootProgress / 2)}% AVAILABLE</span>
              <div className="boot-memory-bar">
                <div className="boot-memory-progress" style={{ width: `${bootProgress / 2}%` }}></div>
              </div>
            </div>
          )}

          {bootProgress > 70 && (
            <div className="boot-final-check">
              <div className="boot-check-item">
                <span className="boot-check-label">SIGNAL STRENGTH:</span>
                <span className="boot-check-value warning">32%</span>
              </div>
              <div className="boot-check-item">
                <span className="boot-check-label">DATA INTEGRITY:</span>
                <span className="boot-check-value error">COMPROMISED</span>
              </div>
              <div className="boot-check-item">
                <span className="boot-check-label">SYSTEM VERSION:</span>
                <span className="boot-check-value">WHISPERNET v0.7.3</span>
              </div>
            </div>
          )}

          {bootProgress >= 100 && <div className="boot-access-granted">SYSTEM READY</div>}

          <div className="boot-version">BUILD 20841103-ALPHA</div>
          <div className="boot-company">SIGNAL CORP ARCHIVES</div>
        </div>
      </div>
    )
  }

  return (
    <NarrativeSystem>
      <NarrativeEcosystem ref={narrativeEcosystemRef}>
        <div
          className={`whispernet-container ${showContent ? "fade-in" : "fade-out"} ${konamiActivated ? "konami-mode" : ""}`}
        >
          {showAlert && <RandomAlert message={alertMessage} />}

          {showMemoryFragment && (
            <MemoryFragment
              title={memoryFragmentData.title}
              content={memoryFragmentData.content}
              timestamp={memoryFragmentData.timestamp}
              clueId={memoryFragmentData.clueId}
              onClose={handleCloseMemoryFragment}
            />
          )}

          {notifications.length > 0 && (
            <Notifications notifications={notifications} onRemove={handleRemoveNotification} />
          )}

          <DeadHeader onNavigate={handleNavigation} activeSection={activeSection} />

          <NetworkStatus latency={networkLatency} status={connectionStatus} lastVisitor={lastVisitor} />

          <main className="main-content">
            {showDiagnostics && <SystemDiagnostics data={diagnosticsData} onClose={handleCloseDiagnostics} />}

            {activeSection === "main" && (
              <div className="section-navigation">
                <button
                  className={`section-nav-button ${activeSubSection === "main" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("main")}
                >
                  News & Forum
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "social" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("social")}
                >
                  Social Feed
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "email" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("email")}
                >
                  Email
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "profiles" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("profiles")}
                >
                  User Profiles
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "conversations" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("conversations")}
                >
                  Live Conversations
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "moderation" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("moderation")}
                >
                  Moderation
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "archives" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("archives")}
                >
                  <span className="glitch-hover">Archives</span>
                </button>
              </div>
            )}

            {activeSection === "main" && activeSubSection === "main" && (
              <>
                <div className="content-grid">
                  <DeadNewsfeed />
                  <DeadAds />
                </div>
                <DeadForum />
              </>
            )}

            {activeSection === "main" && activeSubSection === "social" && <DeadSocial />}
            {activeSection === "main" && activeSubSection === "email" && <DeadEmail />}
            {activeSection === "main" && activeSubSection === "profiles" && <DeadProfiles />}
            {activeSection === "main" && activeSubSection === "conversations" && <LiveConversations />}
            {activeSection === "main" && activeSubSection === "moderation" && <ModeratorPanel />}
            {activeSection === "main" && activeSubSection === "archives" && <ArchivesTab />}

            {activeSection === "archive" && (
              <div className="section-navigation">
                <button
                  className={`section-nav-button ${activeSubSection === "main" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("main")}
                >
                  File Browser
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "marketplace" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("marketplace")}
                >
                  Marketplace
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "video" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("video")}
                >
                  Video
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "map" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("map")}
                >
                  Map
                </button>
                <button
                  className={`section-nav-button ${activeSubSection === "weather" ? "active" : ""}`}
                  onClick={() => handleSubNavigation("weather")}
                >
                  Weather
                </button>
              </div>
            )}

            {activeSection === "archive" && activeSubSection === "main" && (
              <>
                <DeadFileBrowser />
                <div className="archive-error">
                  <GlitchEffect>
                    <h2>ARCHIVE PARTIALLY RECOVERED</h2>
                  </GlitchEffect>
                  <p className="corrupted">Data recovery in progress. Most files corrupted or inaccessible.</p>
                  <div className="loading-bar">
                    <div className="loading-progress"></div>
                  </div>
                  <p className="blink-slow">Attempting recovery... 23% complete</p>
                </div>
              </>
            )}

            {activeSection === "archive" && activeSubSection === "marketplace" && <DeadMarketplace />}
            {activeSection === "archive" && activeSubSection === "video" && <DeadVideo />}
            {activeSection === "archive" && activeSubSection === "map" && <DeadMap />}
            {activeSection === "archive" && activeSubSection === "weather" && <DeadWeather />}

            {activeSection === "terminal" && <DeadTerminalEnhanced />}
            {activeSection === "chat" && <DeadChatroom />}
            {activeSection === "search" && <DeadSearch />}
          </main>

          <DeadFooter />
          <GhostUsers />
          <AudioGlitch />
        </div>
      </NarrativeEcosystem>
      <CursorTechEffect />
    </NarrativeSystem>
  )
}
