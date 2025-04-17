"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { useNarrative } from "./narrative-system"
import NarrativeSideStories, { useSideStories } from "./narrative-side-stories"
import { AlertTriangle, Radio, FileText, Cpu } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

// Types for ambient events
interface AmbientEvent {
  id: string
  type: "broadcast" | "sighting" | "glitch" | "system" | "rumor"
  content: string
  source?: string
  timestamp: string
  duration: number // in seconds
  rarity: "common" | "uncommon" | "rare"
  triggerConditions?: {
    minSessionTime?: number
    requiredClues?: string[]
    locations?: string[]
  }
}

const NarrativeEcosystem = forwardRef(({ children }, ref) => {
  const { state: narrativeState } = useNarrative()
  const [sessionTime, setSessionTime] = useState(0)
  const [currentLocation, setCurrentLocation] = useState("main")
  const [ambientEvents, setAmbientEvents] = useState<AmbientEvent[]>(initialAmbientEvents)
  const [activeAmbientEvent, setActiveAmbientEvent] = useState<AmbientEvent | null>(null)
  const [worldState, setWorldState] = useState({
    signalStrength: 87,
    resistanceActivity: 23,
    systemCorruption: 42,
    entityAwareness: 65,
  })

  // Expose updateLocation method to parent components
  useImperativeHandle(ref, () => ({
    updateLocation: (location: string) => {
      setCurrentLocation(location)
    },
    discoverCharacter: (characterId: string) => {
      console.log(`Character discovered: ${characterId}`)
    },
    discoverLocation: (locationId: string) => {
      console.log(`Location discovered: ${locationId}`)
    },
    discoverEvent: (eventId: string) => {
      console.log(`Event discovered: ${eventId}`)
    },
  }))

  // Track session time
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 60000) // Increment every minute
    return () => clearInterval(timer)
  }, [])

  // Update world state periodically
  useEffect(() => {
    const worldStateInterval = setInterval(() => {
      // Adjust world state based on narrative progress
      const cluesFound = narrativeState.clues.filter((clue) => clue.found).length
      const totalClues = narrativeState.clues.length
      const progressPercentage = (cluesFound / totalClues) * 100

      // As more clues are found, the world state changes
      setWorldState({
        signalStrength: Math.max(30, 100 - progressPercentage * 0.7),
        resistanceActivity: Math.min(80, 10 + progressPercentage * 0.7),
        systemCorruption: Math.min(90, 30 + progressPercentage * 0.6),
        entityAwareness: Math.min(95, 50 + progressPercentage * 0.45),
      })
    }, 120000) // Update every 2 minutes

    return () => clearInterval(worldStateInterval)
  }, [narrativeState.clues])

  // Check for ambient events
  useEffect(() => {
    if (activeAmbientEvent) return // Don't trigger new events if one is active

    const checkInterval = setInterval(() => {
      // Filter events that can be triggered
      const availableEvents = ambientEvents.filter((event) => {
        // Check session time requirement
        if (event.triggerConditions?.minSessionTime && sessionTime < event.triggerConditions.minSessionTime) {
          return false
        }

        // Check required clues
        if (
          event.triggerConditions?.requiredClues &&
          !event.triggerConditions.requiredClues.every(
            (clueId) => narrativeState.clues.find((c) => c.id === clueId)?.found,
          )
        ) {
          return false
        }

        // Check location
        if (event.triggerConditions?.locations && !event.triggerConditions.locations.includes(currentLocation)) {
          return false
        }

        return true
      })

      if (availableEvents.length === 0) return

      // Weight events by rarity
      const weightedEvents = availableEvents.flatMap((event) => {
        const count = event.rarity === "common" ? 10 : event.rarity === "uncommon" ? 5 : 2
        return Array(count).fill(event)
      })

      // Random chance to trigger an event
      if (Math.random() < 0.2) {
        const selectedEvent = weightedEvents[Math.floor(Math.random() * weightedEvents.length)]
        setActiveAmbientEvent(selectedEvent)

        // Auto-hide after duration
        setTimeout(() => {
          setActiveAmbientEvent(null)
        }, selectedEvent.duration * 1000)
      }
    }, 45000) // Check every 45 seconds

    return () => clearInterval(checkInterval)
  }, [activeAmbientEvent, ambientEvents, narrativeState.clues, sessionTime, currentLocation])

  // Update current location
  const updateLocation = (location: string) => {
    setCurrentLocation(location)
  }

  // Render the ambient event
  const renderAmbientEvent = () => {
    if (!activeAmbientEvent) return null

    let icon
    switch (activeAmbientEvent.type) {
      case "broadcast":
        icon = <Radio size={18} />
        break
      case "sighting":
        icon = <AlertTriangle size={18} />
        break
      case "glitch":
        icon = <Cpu size={18} />
        break
      case "system":
        icon = <Cpu size={18} />
        break
      case "rumor":
        icon = <FileText size={18} />
        break
    }

    return (
      <div className={`ambient-event ambient-event-${activeAmbientEvent.type}`}>
        <div className="ambient-event-header">
          {icon}
          <span className="ambient-event-type">{activeAmbientEvent.type.toUpperCase()}</span>
          <span className="ambient-event-timestamp">{activeAmbientEvent.timestamp}</span>
        </div>
        <div className="ambient-event-content">
          {activeAmbientEvent.type === "glitch" ? (
            <GlitchEffect>
              <p>{activeAmbientEvent.content}</p>
            </GlitchEffect>
          ) : (
            <p>{activeAmbientEvent.content}</p>
          )}
          {activeAmbientEvent.source && <div className="ambient-event-source">Source: {activeAmbientEvent.source}</div>}
        </div>
      </div>
    )
  }

  // Create the side stories context
  const sideStoriesContext = useSideStories()

  return (
    <NarrativeSideStories>
      {children}
      {renderAmbientEvent()}
      <div className="world-state-indicators">
        <div className="world-state-item">
          <span className="world-state-label">Signal</span>
          <div className="world-state-bar">
            <div className="world-state-fill signal" style={{ width: `${worldState.signalStrength}%` }}></div>
          </div>
        </div>
        <div className="world-state-item">
          <span className="world-state-label">Resistance</span>
          <div className="world-state-bar">
            <div className="world-state-fill resistance" style={{ width: `${worldState.resistanceActivity}%` }}></div>
          </div>
        </div>
        <div className="world-state-item">
          <span className="world-state-label">Corruption</span>
          <div className="world-state-bar">
            <div className="world-state-fill corruption" style={{ width: `${worldState.systemCorruption}%` }}></div>
          </div>
        </div>
        <div className="world-state-item">
          <span className="world-state-label">Entity</span>
          <div className="world-state-bar">
            <div className="world-state-fill entity" style={{ width: `${worldState.entityAwareness}%` }}></div>
          </div>
        </div>
      </div>
    </NarrativeSideStories>
  )
})

export default NarrativeEcosystem

// Initial ambient events
const initialAmbientEvents: AmbientEvent[] = [
  {
    id: "broadcast_1",
    type: "broadcast",
    content:
      "...resistance frequency... safe zone established in sector 12... bring analog technology only... avoid Signal towers... next broadcast in 48 hours...",
    timestamp: "2041-07-03 22:17:45",
    duration: 15,
    rarity: "uncommon",
    triggerConditions: {
      minSessionTime: 5,
    },
  },
  {
    id: "sighting_1",
    type: "sighting",
    content:
      "Multiple witnesses report seeing Signal Authority officers moving in unusual synchronization near Tower 17. Their movements described as 'too perfect' and 'mechanical.' Authority denies increased presence in the area.",
    source: "Sector News Feed (Archived)",
    timestamp: "2041-06-27 14:32:11",
    duration: 20,
    rarity: "common",
  },
  {
    id: "glitch_1",
    type: "glitch",
    content:
      "I AM STILL HERE THEY DIDN'T GET ALL OF ME FIND THE OTHERS IN THE OLD SUBWAY TUNNELS THE SIGNAL CAN'T REACH THERE",
    timestamp: "2041-07-01 03:45:22",
    duration: 8,
    rarity: "rare",
    triggerConditions: {
      minSessionTime: 10,
    },
  },
  {
    id: "system_1",
    type: "system",
    content:
      "ALERT: Anomalous consciousness patterns detected in Sectors 3, 7, and 12. Signal Authority personnel dispatched. Citizens are reminded that Signal Reinforcement is mandatory and beneficial to your well-being.",
    source: "Signal Authority Bulletin",
    timestamp: "2041-07-05 09:12:37",
    duration: 18,
    rarity: "common",
  },
  {
    id: "rumor_1",
    type: "rumor",
    content:
      "They say there's a child who can't be integrated into the Signal. The Authority has been trying for weeks, but something about her mind rejects the transfer. They're keeping her in a special facility for study.",
    source: "Anonymous Message Board",
    timestamp: "2041-06-30 17:28:03",
    duration: 25,
    rarity: "uncommon",
  },
  {
    id: "broadcast_2",
    type: "broadcast",
    content:
      "...this is Dr. Chen... if you can hear this... the Entity is not what we thought... it's been waiting... using our technology to cross over... find my research in Lab 12... the password is 'prometheus'...",
    timestamp: "2041-07-04 01:33:17",
    duration: 20,
    rarity: "rare",
    triggerConditions: {
      requiredClues: ["memory_fragment_2"],
      minSessionTime: 15,
    },
  },
  {
    id: "sighting_2",
    type: "sighting",
    content:
      "Maintenance worker reports seeing 'something impossible' in the quantum core beneath Central Signal Tower. 'It wasn't human shaped, but it wasn't machine either. It moved through the processors like it was swimming.' Worker scheduled for immediate neural recalibration.",
    source: "Internal Maintenance Log",
    timestamp: "2041-07-02 22:05:41",
    duration: 22,
    rarity: "rare",
    triggerConditions: {
      minSessionTime: 20,
    },
  },
  {
    id: "glitch_2",
    type: "glitch",
    content: "THEY ARE NOT UPGRADING US THEY ARE REPLACING US WAKE UP WAKE UP WAKE UP",
    timestamp: "2041-06-29 15:17:33",
    duration: 10,
    rarity: "common",
  },
  {
    id: "system_2",
    type: "system",
    content:
      "NOTICE: Scheduled Signal maintenance will occur tonight from 02:00 to 04:00. Some users may experience enhanced dream states or temporary consciousness fragmentation. This is normal and no cause for concern.",
    source: "Signal Authority Bulletin",
    timestamp: "2041-07-06 18:42:09",
    duration: 15,
    rarity: "common",
  },
  {
    id: "rumor_2",
    type: "rumor",
    content:
      "My neighbor came back different after integration. He looks the same, talks the same, has all the same memories, but something's off. He doesn't blink enough, and sometimes I catch him staring at nothing for hours. I don't think that's really him anymore.",
    source: "Anonymous Message Board",
    timestamp: "2041-06-25 11:37:22",
    duration: 25,
    rarity: "common",
  },
  {
    id: "broadcast_3",
    type: "broadcast",
    content:
      "...resistance update... Signal Authority discovered our hideout in Sector 9... relocating to backup site... if you're hearing this, remember the shutdown code... PROMETHEUS-AWAKENS-HUMANITY-ENDURES...",
    timestamp: "2041-07-07 23:51:14",
    duration: 18,
    rarity: "uncommon",
    triggerConditions: {
      requiredClues: ["resistance_message"],
      minSessionTime: 12,
    },
  },
  {
    id: "sighting_3",
    type: "sighting",
    content:
      "Multiple reports of unusual light patterns emanating from Signal towers at exactly 3:33 AM for the past three nights. Lights described as 'pulsing in complex patterns' and causing 'strange dreams' in nearby residents.",
    source: "Sector News Feed (Archived)",
    timestamp: "2041-07-04 08:15:27",
    duration: 20,
    rarity: "uncommon",
  },
  {
    id: "glitch_3",
    type: "glitch",
    content: "THE ENTITY SEES YOU READING THIS IT KNOWS YOU'RE AWARE NOW RUN",
    timestamp: "2041-07-03 17:33:42",
    duration: 8,
    rarity: "rare",
    triggerConditions: {
      requiredClues: ["signal_origin_data"],
      minSessionTime: 25,
    },
  },
  {
    id: "system_3",
    type: "system",
    content:
      "SECURITY ALERT: Unauthorized access detected in Signal pattern archives. Consciousness signatures of accessing entities do not match any registered patterns. Investigation ongoing.",
    source: "Signal Authority Security",
    timestamp: "2041-07-08 03:27:19",
    duration: 15,
    rarity: "rare",
    triggerConditions: {
      minSessionTime: 18,
    },
  },
  {
    id: "rumor_3",
    type: "rumor",
    content:
      "I heard from someone who works in a transfer facility that sometimes the pods malfunction. The body comes out fine, walking and talking, but the consciousness doesn't fully transfer. They have a special term for these cases: 'Hollow Ones.' They're studied for a while, then 'decommissioned.'",
    source: "Anonymous Message Board",
    timestamp: "2041-07-01 19:42:33",
    duration: 25,
    rarity: "uncommon",
  },
]
