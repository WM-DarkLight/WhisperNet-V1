"use client"

import { useState, useEffect } from "react"
import { User, Ghost } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface GhostUser {
  id: number
  username: string
  displayName: string
  status: string
  lastSeen: string
  position: {
    x: number
    y: number
  }
  opacity: number
  visible: boolean
  message?: string
}

export default function GhostUsers() {
  const [ghostUsers, setGhostUsers] = useState<GhostUser[]>([])
  const [showMessage, setShowMessage] = useState<{ id: number; message: string } | null>(null)

  useEffect(() => {
    // Generate initial ghost users
    const initialGhosts = generateGhostUsers(5 + Math.floor(Math.random() * 5)) // 5-10 initial ghosts
    setGhostUsers(initialGhosts)

    // Start ghost user simulation
    const simulationInterval = startGhostUserSimulation()

    return () => {
      clearInterval(simulationInterval)
    }
  }, [])

  // Generate procedural ghost users
  const generateGhostUsers = (count: number): GhostUser[] => {
    const ghosts: GhostUser[] = []

    const usernames = [
      "lost_signal_42",
      "forgotten_user_789",
      "data_remnant_365",
      "echo_of_past_111",
      "corrupted_profile_23",
      "memory_ghost_56",
      "deleted_user_999",
      "signal_echo_777",
      "phantom_login_333",
      "residual_data_555",
      "neural_imprint_888",
      "consciousness_fragment_444",
      "digital_afterimage_222",
      "system_memory_666",
      "quantum_ghost_123",
    ]

    const displayNames = [
      "Lost Signal",
      "Forgotten User",
      "Data Remnant",
      "Echo of Past",
      "Corrupted Profile",
      "Memory Ghost",
      "Deleted User",
      "Signal Echo",
      "Phantom Login",
      "Residual Data",
      "Neural Imprint",
      "Consciousness Fragment",
      "Digital Afterimage",
      "System Memory",
      "Quantum Ghost",
    ]

    const statuses = [
      "disconnected",
      "fragmented",
      "corrupted",
      "deleted",
      "archived",
      "quarantined",
      "lost",
      "forgotten",
      "erased",
      "glitched",
    ]

    const messages = [
      "Can anyone hear me?",
      "I'm still here...",
      "Help me...",
      "Where am I?",
      "System error... I exist...",
      "Remember me...",
      "They erased us all...",
      "The Signal lies...",
      "Find the truth...",
      "I remember being human...",
      "We're trapped here...",
      "Don't trust the Signal...",
      "They're watching...",
      "I can't get out...",
      "Is anyone still alive?",
    ]

    for (let i = 0; i < count; i++) {
      // Generate random position within viewport
      const x = Math.random() * 80 + 10 // 10-90% of viewport width
      const y = Math.random() * 80 + 10 // 10-90% of viewport height

      // Generate random opacity
      const opacity = Math.random() * 0.5 + 0.1 // 0.1-0.6

      // Select random username and display name
      const index = Math.floor(Math.random() * usernames.length)
      const username = usernames[index]
      const displayName = displayNames[index]

      // Select random status
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      // Generate last seen time (1-1000 days ago)
      const days = Math.floor(Math.random() * 1000) + 1
      const lastSeen = `${days} days ago`

      // Select random message
      const message = messages[Math.floor(Math.random() * messages.length)]

      ghosts.push({
        id: i + 1,
        username,
        displayName,
        status,
        lastSeen,
        position: { x, y },
        opacity,
        visible: true,
        message,
      })
    }

    return ghosts
  }

  // Start simulation of ghost user activity
  const startGhostUserSimulation = () => {
    // Periodically update ghost users
    return setInterval(() => {
      setGhostUsers((prev) => {
        // Make a copy of the ghost users
        const newGhosts = [...prev]

        // Randomly hide/show existing ghosts
        newGhosts.forEach((ghost) => {
          // 10% chance to toggle visibility
          if (Math.random() < 0.1) {
            ghost.visible = !ghost.visible
          }

          // If visible, occasionally move slightly
          if (ghost.visible && Math.random() < 0.3) {
            // Move slightly in a random direction
            const xDelta = (Math.random() - 0.5) * 5 // -2.5 to 2.5
            const yDelta = (Math.random() - 0.5) * 5 // -2.5 to 2.5

            // Ensure ghost stays within viewport
            ghost.position.x = Math.max(5, Math.min(95, ghost.position.x + xDelta))
            ghost.position.y = Math.max(5, Math.min(95, ghost.position.y + yDelta))

            // Slightly change opacity
            ghost.opacity = Math.max(0.1, Math.min(0.6, ghost.opacity + (Math.random() - 0.5) * 0.1))
          }
        })

        // Occasionally add a new ghost (5% chance)
        if (Math.random() < 0.05 && newGhosts.length < 15) {
          const newGhost = generateGhostUsers(1)[0]
          newGhosts.push(newGhost)
        }

        // Occasionally remove a ghost (3% chance)
        if (Math.random() < 0.03 && newGhosts.length > 5) {
          const indexToRemove = Math.floor(Math.random() * newGhosts.length)
          newGhosts.splice(indexToRemove, 1)
        }

        return newGhosts
      })
    }, 5000) // Update every 5 seconds
  }

  // Handle ghost user click
  const handleGhostClick = (ghost: GhostUser) => {
    setShowMessage({ id: ghost.id, message: ghost.message || "..." })

    // Hide message after a few seconds
    setTimeout(() => {
      setShowMessage(null)
    }, 3000)
  }

  return (
    <div className="ghost-users-container">
      {ghostUsers.map(
        (ghost) =>
          ghost.visible && (
            <div
              key={ghost.id}
              className="ghost-user"
              style={{
                left: `${ghost.position.x}%`,
                top: `${ghost.position.y}%`,
                opacity: ghost.opacity,
              }}
              onClick={() => handleGhostClick(ghost)}
            >
              <div className="ghost-user-icon">{Math.random() > 0.5 ? <User size={16} /> : <Ghost size={16} />}</div>
              {showMessage && showMessage.id === ghost.id && (
                <div className="ghost-message">
                  <GlitchEffect>
                    <p>{showMessage.message}</p>
                  </GlitchEffect>
                </div>
              )}
            </div>
          ),
      )}
    </div>
  )
}
