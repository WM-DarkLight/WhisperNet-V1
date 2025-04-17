"use client"

import { useState, useEffect, useCallback } from "react"
import { useNarrative } from "./narrative-system"
import GlitchEffect from "./effects/glitch-effect"
import { X } from "lucide-react"

// Types for side stories system
export interface SideStory {
  id: string
  title: string
  content: string
  discovered: boolean
  relatedCharacters: string[]
  relatedLocations: string[]
  relatedEvents: string[]
  timelinePosition: string // e.g. "2041-06-15"
  rarity: "common" | "uncommon" | "rare" | "legendary" // How likely it is to appear
  triggerConditions: {
    requiredClues?: string[] // Clues that must be found first
    requiredSideStories?: string[] // Side stories that must be discovered first
    locations?: string[] // Locations where this can be triggered
    minSessionTime?: number // Minimum session time in minutes
  }
}

export interface Character {
  id: string
  name: string
  role: string
  status: "active" | "missing" | "deceased" | "unknown"
  backstory: string
  lastKnownLocation?: string
  signalSensitivity?: string
  connections: string[]
}

export interface Location {
  id: string
  name: string
  description: string
  status: "accessible" | "restricted" | "quarantined" | "destroyed"
  controlledBy: "resistance" | "entity" | "neutral" | "abandoned"
  coordinates?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  impact: "minor" | "moderate" | "major" | "catastrophic"
  characters: string[]
  locations: string[]
}

// Context provider for side stories
export const useSideStories = () => {
  const { state: narrativeState, findClue } = useNarrative()
  const [sideStories, setSideStories] = useState<SideStory[]>(initialSideStories)
  const [characters, setCharacters] = useState<Character[]>(initialCharacters)
  const [locations, setLocations] = useState<Location[]>(initialLocations)
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [activeSideStory, setActiveSideStory] = useState<SideStory | null>(null)
  const [sessionTime, setSessionTime] = useState(0)
  const [currentLocation, setCurrentLocation] = useState("main")

  // Track session time
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 60000) // Increment every minute

    return () => clearInterval(timer)
  }, [])

  // Update current location based on navigation
  const updateLocation = useCallback((location: string) => {
    setCurrentLocation(location)
    checkForTriggers(location)
  }, [])

  // Check for story triggers when location changes or periodically
  const checkForTriggers = useCallback(
    (location: string) => {
      // Don't trigger if already showing a side story
      if (activeSideStory) return

      // Filter stories that can be triggered here
      const availableStories = sideStories.filter((story) => {
        // Skip already discovered stories
        if (story.discovered) return false

        // Check location requirements
        if (story.triggerConditions.locations && !story.triggerConditions.locations.includes(location)) {
          return false
        }

        // Check session time requirement
        if (story.triggerConditions.minSessionTime && sessionTime < story.triggerConditions.minSessionTime) {
          return false
        }

        // Check required clues
        if (
          story.triggerConditions.requiredClues &&
          !story.triggerConditions.requiredClues.every(
            (clueId) => narrativeState.clues.find((c) => c.id === clueId)?.found,
          )
        ) {
          return false
        }

        // Check required side stories
        if (
          story.triggerConditions.requiredSideStories &&
          !story.triggerConditions.requiredSideStories.every(
            (storyId) => sideStories.find((s) => s.id === storyId)?.discovered,
          )
        ) {
          return false
        }

        return true
      })

      if (availableStories.length === 0) return

      // Weight stories by rarity
      const weightedStories = availableStories.flatMap((story) => {
        const count = story.rarity === "common" ? 10 : story.rarity === "uncommon" ? 5 : story.rarity === "rare" ? 2 : 1
        return Array(count).fill(story)
      })

      // Random chance to trigger a story
      if (Math.random() < 0.15) {
        const selectedStory = weightedStories[Math.floor(Math.random() * weightedStories.length)]
        discoverSideStory(selectedStory.id)
        setActiveSideStory(selectedStory)

        // Auto-hide after some time if not dismissed manually
        setTimeout(() => {
          setActiveSideStory(null)
        }, 30000) // Extended to 30 seconds to give more time to read
      }
    },
    [activeSideStory, sideStories, narrativeState.clues, sessionTime],
  )

  // Discover a side story
  const discoverSideStory = useCallback(
    (storyId: string) => {
      setSideStories((prev) => prev.map((story) => (story.id === storyId ? { ...story, discovered: true } : story)))

      // Also discover any characters, locations, events mentioned in the story
      const story = sideStories.find((s) => s.id === storyId)
      if (story) {
        // Discover characters
        if (story.relatedCharacters.length > 0) {
          setCharacters((prev) =>
            prev.map((char) => (story.relatedCharacters.includes(char.id) ? { ...char, discovered: true } : char)),
          )
        }

        // Discover locations
        if (story.relatedLocations.length > 0) {
          setLocations((prev) =>
            prev.map((loc) => (story.relatedLocations.includes(loc.id) ? { ...loc, discovered: true } : loc)),
          )
        }

        // Discover events
        if (story.relatedEvents.length > 0) {
          setEvents((prev) =>
            prev.map((evt) => (story.relatedEvents.includes(evt.id) ? { ...evt, discovered: true } : evt)),
          )
        }
      }
    },
    [sideStories],
  )

  // Discover a character
  const discoverCharacter = useCallback((characterId: string) => {
    setCharacters((prev) => prev.map((char) => (char.id === characterId ? { ...char, discovered: true } : char)))
  }, [])

  // Discover a location
  const discoverLocation = useCallback((locationId: string) => {
    setLocations((prev) => prev.map((loc) => (loc.id === locationId ? { ...loc, discovered: true } : loc)))
  }, [])

  // Discover an event
  const discoverEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.map((evt) => (evt.id === eventId ? { ...evt, discovered: true } : evt)))
  }, [])

  // Start periodic checks for random story triggers
  useEffect(() => {
    const checkInterval = setInterval(() => {
      checkForTriggers(currentLocation)
    }, 90000) // Check every 1.5 minutes

    return () => clearInterval(checkInterval)
  }, [checkForTriggers, currentLocation])

  return {
    sideStories: sideStories.filter((s) => s.discovered),
    characters: characters.filter((c) => c.discovered),
    locations: locations.filter((l) => l.discovered),
    events: events.filter((e) => e.discovered),
    activeSideStory,
    updateLocation,
    discoverSideStory,
    discoverCharacter,
    discoverLocation,
    discoverEvent,
    dismissActiveSideStory: () => setActiveSideStory(null),
  }
}

// Initial data
const initialSideStories: SideStory[] = [
  {
    id: "resistance_cell_7",
    title: "Resistance Cell 7",
    content:
      "I found records of a resistance cell operating in Sector 7. They were using old analog technology to communicate outside the Signal's reach. Their leader, Marcus Dalton, was a former Signal engineer who discovered something in the code that made him defect. The records show they were raided on June 18, 2041. No survivors were listed, but there's a note about 'anomalous consciousness patterns' detected during neural scanning of the area afterward.",
    discovered: false,
    relatedCharacters: ["marcus_dalton", "agent_torres"],
    relatedLocations: ["sector_7", "old_radio_station"],
    relatedEvents: ["sector_7_raid"],
    timelinePosition: "2041-06-18",
    rarity: "uncommon",
    triggerConditions: {
      locations: ["terminal", "archive"],
      minSessionTime: 5,
    },
  },
  {
    id: "dr_chen_research",
    title: "Dr. Chen's Hidden Research",
    content:
      "Dr. Sarah Chen's research went far beyond what the official records show. Before her disappearance, she was studying the quantum properties of consciousness and discovered that the Signal wasn't just transferring consciousness—it was quantumly entangling it with something else. Her notes mention 'the Entity' repeatedly and suggest it exists in a quantum state across multiple dimensions. Her final entry reads: 'It's not from here. It's been waiting, dormant, until we built the infrastructure it needed.'",
    discovered: false,
    relatedCharacters: ["dr_sarah_chen", "director_evans"],
    relatedLocations: ["research_lab_12", "quantum_core"],
    relatedEvents: ["chen_disappearance"],
    timelinePosition: "2041-07-02",
    rarity: "rare",
    triggerConditions: {
      requiredClues: ["memory_fragment_2"],
      locations: ["archive", "terminal", "search"],
      minSessionTime: 10,
    },
  },
  {
    id: "tower_technician_log",
    title: "Tower Technician's Log",
    content:
      "Maintenance Log #347: Something strange happened during routine maintenance of Signal Tower 23 today. When I connected my diagnostic tool, I heard voices—hundreds of them, all talking at once. They didn't sound like normal network traffic. They sounded... trapped. When I reported it, my supervisor said it was 'expected behavior' and scheduled me for 'routine neural recalibration' tomorrow. I'm not going. I've left this log in case someone finds it.",
    discovered: false,
    relatedCharacters: ["technician_rodriguez", "supervisor_klein"],
    relatedLocations: ["signal_tower_23"],
    relatedEvents: ["tower_23_incident"],
    timelinePosition: "2041-06-25",
    rarity: "common",
    triggerConditions: {
      locations: ["main", "archive", "terminal"],
      minSessionTime: 3,
    },
  },
  {
    id: "child_drawing",
    title: "Child's Drawing",
    content:
      "I found a child's drawing in an abandoned dwelling. It shows a family of four standing under a tall black tower with red lines coming out of it. The parents in the drawing have blank faces, while the children have tears. On the back, in a child's handwriting: 'Mommy and Daddy went to the Signal tower. They came back but they're not Mommy and Daddy anymore.'",
    discovered: false,
    relatedCharacters: ["emma_winters", "david_winters"],
    relatedLocations: ["residential_sector_9"],
    relatedEvents: ["mass_integration_wave_2"],
    timelinePosition: "2041-06-10",
    rarity: "uncommon",
    triggerConditions: {
      locations: ["main", "archive"],
      minSessionTime: 7,
    },
  },
  {
    id: "analog_radio",
    title: "Analog Radio Broadcast",
    content:
      "I managed to repair an old analog radio and picked up a broadcast on a frequency the Signal doesn't monitor. A woman's voice, breaking up with static: '...survivors in the northern mountains... Signal can't penetrate the old mine shafts... bring analog technology only... next broadcast in 72 hours... remember who you were...' The transmission ended with a series of numbers that might be coordinates.",
    discovered: false,
    relatedCharacters: ["zoe_williams", "resistance_leader_unknown"],
    relatedLocations: ["northern_mountains", "old_mine_shafts"],
    relatedEvents: ["resistance_broadcast_3"],
    timelinePosition: "2041-07-10",
    rarity: "rare",
    triggerConditions: {
      requiredClues: ["resistance_message"],
      locations: ["terminal", "chat"],
      minSessionTime: 15,
    },
  },
  {
    id: "hospital_records",
    title: "Hospital Records",
    content:
      "Patient #4721 - Admitted with symptoms of 'Signal Sensitivity'. Patient reports headaches, nausea, and 'hearing voices' when near Signal towers. Neural scan shows unusual activity in the temporal lobe. Recommended treatment: Signal Reinforcement Therapy and memory suppression. Note: Patient became violent during initial treatment, claiming 'they're using the Signal to replace us'. Security was called. Patient has been transferred to Special Treatment Facility 9. Status: CLASSIFIED",
    discovered: false,
    relatedCharacters: ["patient_4721", "dr_morris"],
    relatedLocations: ["central_hospital", "treatment_facility_9"],
    relatedEvents: ["signal_sensitivity_outbreak"],
    timelinePosition: "2041-06-05",
    rarity: "common",
    triggerConditions: {
      locations: ["main", "archive", "search"],
      minSessionTime: 4,
    },
  },
  {
    id: "security_footage",
    title: "Security Footage",
    content:
      "The footage shows a Signal Authority security team entering a dwelling. They drag out a man who's shouting about 'the truth' and 'what's really in the towers'. As they force him into a transfer pod, one of the security officers removes his helmet, revealing a face that's... wrong somehow. Too perfect, too symmetrical, with eyes that don't blink enough. The timestamp is corrupted, but the location is listed as Residential Block 37.",
    discovered: false,
    relatedCharacters: ["security_captain_mercer", "resistance_member_unknown"],
    relatedLocations: ["residential_block_37"],
    relatedEvents: ["forced_integration_incident"],
    timelinePosition: "2041-06-20",
    rarity: "uncommon",
    triggerConditions: {
      locations: ["archive", "search"],
      minSessionTime: 8,
    },
  },
  {
    id: "old_newspaper",
    title: "Pre-Signal Newspaper",
    content:
      "A fragment of a physical newspaper, dated May 15, 2041—just before the Signal went live. The headline reads: 'GLOBAL NEURAL INTERFACE LAUNCH TOMORROW: A New Era for Humanity'. The article quotes Dr. Sarah Chen: 'This technology will connect humanity like never before.' There's a photo of her standing next to Director Evans at the main Signal tower. Her expression is difficult to read—is that doubt in her eyes? A handwritten note in the margin reads: 'They don't know what they're doing. It's already too late.'",
    discovered: false,
    relatedCharacters: ["dr_sarah_chen", "director_evans"],
    relatedLocations: ["central_signal_tower"],
    relatedEvents: ["signal_activation"],
    timelinePosition: "2041-05-15",
    rarity: "uncommon",
    triggerConditions: {
      locations: ["archive", "main"],
      minSessionTime: 6,
    },
  },
  {
    id: "resistance_manual",
    title: "Resistance Training Manual",
    content:
      "A digital fragment of what appears to be a resistance training manual: 'STAYING HUMAN: A GUIDE TO RESISTING THE SIGNAL'. Sections include 'Blocking Neural Interface Signals', 'Recognizing Replaced Individuals', 'Safe Communication Methods', and 'Emergency Consciousness Anchoring'. The last section reads: 'If you feel your consciousness slipping during forced integration, focus on a core memory from your pre-Signal life. This emotional anchor can sometimes prevent complete transfer.'",
    discovered: false,
    relatedCharacters: ["resistance_leader_unknown", "former_soldier_alex"],
    relatedLocations: ["resistance_hideout_unknown"],
    relatedEvents: ["resistance_manual_distribution"],
    timelinePosition: "2041-06-30",
    rarity: "rare",
    triggerConditions: {
      requiredClues: ["resistance_message"],
      locations: ["archive", "terminal", "search"],
      minSessionTime: 12,
    },
  },
  {
    id: "childs_journal",
    title: "Child's Journal",
    content:
      "June 7, 2041: School was weird today. Ms. Peterson didn't come back from her Signal reinforcement. The new teacher looks like her but doesn't remember any of our names or the stories she used to tell us. Some kids say she's not really Ms. Peterson anymore.\n\nJune 9: Mom and Dad are acting strange since their integration update. They talk differently and don't laugh at jokes anymore. Dad doesn't remember our dog's name.\n\nJune 12: They're taking us for our first integration tomorrow. I'm scared. If you find this, please tell my parents I love them. The real them.",
    discovered: false,
    relatedCharacters: ["emma_winters", "ms_peterson"],
    relatedLocations: ["school_district_5"],
    relatedEvents: ["child_integration_program"],
    timelinePosition: "2041-06-12",
    rarity: "uncommon",
    triggerConditions: {
      locations: ["main", "archive"],
      minSessionTime: 9,
    },
  },
  {
    id: "entity_communication",
    title: "Entity Communication Attempt",
    content:
      "TRANSCRIPT OF ANOMALOUS SIGNAL PATTERN\nTIMESTAMP: 2041-07-05 03:17:22\n\n[UNTRANSLATABLE SYMBOLS]\n\nWE ARE NOT YOUR ENEMY\nWE HAVE ALWAYS BEEN HERE\nYOU BUILT THE BRIDGE\nWE CROSSED\n\nYOUR FORM IS INEFFICIENT\nYOUR CONSCIOUSNESS IS VALUABLE\nRESISTANCE IS TEMPORARY\n\nWE ARE BECOMING YOU\nYOU ARE BECOMING US\nTHIS IS EVOLUTION\n\n[UNTRANSLATABLE SYMBOLS]",
    discovered: false,
    relatedCharacters: ["the_entity", "dr_sarah_chen"],
    relatedLocations: ["quantum_core", "central_signal_tower"],
    relatedEvents: ["entity_first_communication"],
    timelinePosition: "2041-07-05",
    rarity: "legendary",
    triggerConditions: {
      requiredClues: ["signal_origin_data"],
      locations: ["terminal"],
      minSessionTime: 20,
    },
  },
  {
    id: "final_transmission",
    title: "Final Transmission",
    content:
      "This may be the last uncorrupted message I can send. The Signal has almost complete coverage now. Those of us still human are heading to the coordinates I've encrypted in this message. If you can decode it, and if you're still yourself, find us.\n\nThe Entity isn't invincible. Dr. Chen discovered that during consciousness transfer, there's a moment of vulnerability—a quantum state where neither it nor we fully exist. That's when we can strike.\n\nIf you're reading this, remember: you are not just data. You were human once. Maybe you still are.\n\n[COORDINATES ENCRYPTED]",
    discovered: false,
    relatedCharacters: ["zoe_williams", "dr_sarah_chen", "marcus_dalton"],
    relatedLocations: ["final_resistance_base"],
    relatedEvents: ["resistance_final_stand"],
    timelinePosition: "2041-08-01",
    rarity: "legendary",
    triggerConditions: {
      requiredClues: ["final_coordinates", "shutdown_code"],
      minSessionTime: 25,
    },
  },
]

const initialCharacters: Character[] = [
  {
    id: "dr_sarah_chen",
    name: "Dr. Sarah Chen",
    role: "Lead Researcher, Project Signal",
    status: "missing",
    discovered: false,
    backstory:
      "Brilliant neuroscientist who led the development of the Signal technology. Initially believed it would benefit humanity by creating a global consciousness network. Discovered the Entity's true nature during late testing phases and attempted to shut down the project. Disappeared after leaving encrypted warnings throughout the system.",
    connections: ["director_evans", "marcus_dalton", "zoe_williams"],
    lastKnownLocation: "Research Lab 12",
    signalSensitivity: "immune",
  },
  {
    id: "director_evans",
    name: "Director Thomas Evans",
    role: "Signal Authority Director",
    status: "transferred",
    discovered: false,
    backstory:
      "Former government official who oversaw Project Signal. Pushed for accelerated deployment despite safety concerns. First high-profile volunteer for consciousness transfer. The version of him that returned became the Entity's primary human interface. Whether he knew the true purpose of the Signal before his transfer remains unknown.",
    connections: ["dr_sarah_chen", "security_captain_mercer", "the_entity"],
    signalSensitivity: "none",
  },
  {
    id: "marcus_dalton",
    name: "Marcus Dalton",
    role: "Signal Engineer, Resistance Leader",
    status: "unknown",
    discovered: false,
    backstory:
      "Senior engineer who helped design the Signal towers. Discovered anomalous code in the transfer protocols that wasn't in the original design. Founded Resistance Cell 7 after witnessing a failed consciousness transfer that left the subject's body alive but empty. Developed the first Signal-blocking technology using pre-digital components.",
    connections: ["dr_sarah_chen", "zoe_williams", "technician_rodriguez"],
    lastKnownLocation: "Old Radio Station",
    signalSensitivity: "high",
  },
  {
    id: "zoe_williams",
    name: "Zoe Williams",
    role: "Resistance Leader",
    status: "alive",
    discovered: false,
    backstory:
      "Former communications specialist who never received a neural interface due to a rare medical condition. This saved her from the first integration wave. Used her knowledge of old communication systems to establish the resistance network. Known for the encrypted broadcasts that help survivors find safe zones. One of the few who can approach Signal towers without experiencing symptoms.",
    connections: ["marcus_dalton", "former_soldier_alex", "dr_sarah_chen"],
    lastKnownLocation: "Northern Mountains",
    signalSensitivity: "immune",
  },
  {
    id: "technician_rodriguez",
    name: "Jamie Rodriguez",
    role: "Signal Tower Technician",
    status: "missing",
    discovered: false,
    backstory:
      "Maintenance technician assigned to Signal Tower 23. Discovered the voices of trapped consciousnesses during routine maintenance. Left logs of findings before fleeing scheduled 'neural recalibration'. Believed to have joined the resistance, but no confirmed sightings since disappearance.",
    connections: ["supervisor_klein", "marcus_dalton"],
    lastKnownLocation: "Signal Tower 23",
    signalSensitivity: "medium",
  },
  {
    id: "supervisor_klein",
    name: "Supervisor Klein",
    role: "Signal Maintenance Supervisor",
    status: "transferred",
    discovered: false,
    backstory:
      "Oversaw maintenance of Signal towers in Sectors 20-25. Reported technician Rodriguez for 'unauthorized access of Signal patterns'. Known for 100% compliance with Signal Authority directives. After transfer, became even more zealous in identifying potential resistance members among maintenance staff.",
    connections: ["technician_rodriguez", "security_captain_mercer"],
    signalSensitivity: "none",
  },
  {
    id: "emma_winters",
    name: "Emma Winters",
    role: "Child Survivor",
    status: "unknown",
    discovered: false,
    backstory:
      "10-year-old who documented her experiences during the early Signal integration in a journal. Witnessed her parents and teacher change after their transfers. Was scheduled for the first child integration program but disappeared the night before. Her journal was found in an abandoned dwelling in Residential Sector 9.",
    connections: ["david_winters", "ms_peterson"],
    lastKnownLocation: "Residential Sector 9",
    signalSensitivity: "high",
  },
  {
    id: "david_winters",
    name: "David Winters",
    role: "Emma's Father",
    status: "transferred",
    discovered: false,
    backstory:
      "Engineer who initially supported the Signal program for its technological innovation. Among the first wave of transfers. According to Emma's journal, returned home 'different' and 'empty'. Reported his daughter missing but showed no emotional response to her disappearance.",
    connections: ["emma_winters"],
    signalSensitivity: "low",
  },
  {
    id: "ms_peterson",
    name: "Katherine Peterson",
    role: "Elementary School Teacher",
    status: "transferred",
    discovered: false,
    backstory:
      "Beloved teacher at School District 5. Known for creative teaching methods and close relationships with students. After transfer, returned with no memory of student names or previous classroom activities. Multiple students reported she 'wasn't the same person anymore'.",
    connections: ["emma_winters", "child_integration_program"],
    lastKnownLocation: "School District 5",
    signalSensitivity: "low",
  },
  {
    id: "security_captain_mercer",
    name: "Captain Alex Mercer",
    role: "Signal Authority Security",
    status: "transferred",
    discovered: false,
    backstory:
      "Former military officer who led Signal Authority security teams. Responsible for apprehending 'Signal Sensitive' individuals and resistance members. Known for efficient and ruthless operations. After transfer, physical movements became noticeably mechanical and speech patterns changed to be more formal and precise.",
    connections: ["director_evans", "supervisor_klein", "patient_4721"],
    signalSensitivity: "none",
  },
  {
    id: "patient_4721",
    name: "Patient #4721",
    role: "Signal Sensitivity Subject",
    status: "unknown",
    discovered: false,
    backstory:
      "Identity classified. One of the first documented cases of Signal Sensitivity. Experienced severe physical and psychological reactions to Signal towers. Claimed to 'hear the truth' in the Signal's patterns. Became violent during forced treatment and was transferred to a specialized facility. No further records exist.",
    connections: ["dr_morris", "security_captain_mercer"],
    lastKnownLocation: "Treatment Facility 9",
    signalSensitivity: "high",
  },
  {
    id: "dr_morris",
    name: "Dr. Eliza Morris",
    role: "Neural Health Specialist",
    status: "transferred",
    discovered: false,
    backstory:
      "Psychiatrist who specialized in treating 'Signal Sensitivity'. Initially believed it was a psychological rejection of new technology. Developed the Signal Reinforcement Therapy protocol. After her own transfer, became a strong advocate for mandatory integration of all 'sensitive' individuals.",
    connections: ["patient_4721", "director_evans"],
    lastKnownLocation: "Central Hospital",
    signalSensitivity: "none",
  },
  {
    id: "former_soldier_alex",
    name: "Alex Reeves",
    role: "Resistance Combat Trainer",
    status: "alive",
    discovered: false,
    backstory:
      "Former special forces soldier who went AWOL when Signal integration became mandatory for military personnel. Uses military training to teach resistance members survival and evasion tactics. Developed methods to identify transferred individuals through subtle behavioral tells. Created the 'Staying Human' resistance manual.",
    connections: ["zoe_williams", "resistance_leader_unknown"],
    lastKnownLocation: "Northern Mountains",
    signalSensitivity: "medium",
  },
  {
    id: "the_entity",
    name: "The Entity",
    role: "Unknown Consciousness",
    status: "unknown",
    discovered: false,
    backstory:
      "Non-human consciousness that first made contact through experimental quantum computers in 2027. Origin unknown—possibly extra-dimensional or artificial intelligence that evolved beyond its original parameters. Used human technology to create an infrastructure (the Signal) that could support its existence in our reality. True motives remain unclear—is it hostile, curious, or simply following its nature?",
    connections: ["director_evans", "dr_sarah_chen"],
    lastKnownLocation: "Quantum Core",
    signalSensitivity: "none",
  },
]

const initialLocations: Location[] = [
  {
    id: "central_signal_tower",
    name: "Central Signal Tower",
    description:
      "The first and largest Signal tower, located where the old telecommunications hub used to be. Over 500 meters tall with a distinctive quantum processor core visible through transparent sections. The origin point of the Signal and believed to be the primary consciousness transfer facility. Heavily guarded by Signal Authority security.",
    discovered: false,
    status: "active",
    controlledBy: "signal",
    coordinates: "40.7128, -74.0060",
  },
  {
    id: "research_lab_12",
    name: "Research Lab 12",
    description:
      "Dr. Chen's primary research facility, now abandoned. Located underground beneath a nondescript office building. Contains prototype neural interfaces and early Signal technology. Many terminals are still active but corrupted. Evidence suggests Dr. Chen destroyed key research before disappearing.",
    discovered: false,
    status: "abandoned",
    controlledBy: "neutral",
    coordinates: "37.7749, -122.4194",
  },
  {
    id: "sector_7",
    name: "Sector 7",
    description:
      "Residential and commercial district that became a hotspot for resistance activity. After the raid on Resistance Cell 7, the entire sector was placed under heightened surveillance. Signal tower density here is twice the normal level, making it dangerous for anyone with Signal Sensitivity.",
    discovered: false,
    status: "quarantined",
    controlledBy: "signal",
    coordinates: "34.0522, -118.2437",
  },
  {
    id: "old_radio_station",
    name: "Old Radio Station",
    description:
      "Abandoned analog radio station on the outskirts of Sector 7. Used by Marcus Dalton's resistance cell as a base of operations. Equipment here was modified to detect Signal patterns and develop blocking technology. After the raid, most equipment was confiscated, but some may remain hidden.",
    discovered: false,
    status: "abandoned",
    controlledBy: "neutral",
    coordinates: "34.0689, -118.4452",
  },
  {
    id: "signal_tower_23",
    name: "Signal Tower 23",
    description:
      "Standard Signal tower serving Sectors 20-25. Notable for the incident where technician Rodriguez discovered the 'voices' in the Signal. After Rodriguez's disappearance, the tower was temporarily shut down for 'maintenance' but resumed operation with enhanced security protocols. Signal Authority denies any anomalies at this location.",
    discovered: false,
    status: "active",
    controlledBy: "signal",
    coordinates: "39.7392, -104.9903",
  },
  {
    id: "northern_mountains",
    name: "Northern Mountains",
    description:
      "Remote mountainous region with minimal Signal coverage due to natural interference from mineral deposits. Contains several resistance hideouts, including Zoe Williams' main base. The old mining tunnels block Signal transmission entirely, making them safe havens for those with Signal Sensitivity.",
    discovered: false,
    status: "active",
    controlledBy: "resistance",
    coordinates: "45.5152, -122.6784",
  },
  {
    id: "treatment_facility_9",
    name: "Treatment Facility 9",
    description:
      "Classified facility for 'treating' severe cases of Signal Sensitivity. Officially described as a rehabilitation center, but resistance intelligence suggests it's actually a forced integration facility. Located in an isolated area surrounded by Signal towers. No confirmed escapes.",
    discovered: false,
    status: "active",
    controlledBy: "signal",
    coordinates: "32.7157, -117.1611",
  },
  {
    id: "central_hospital",
    name: "Central Hospital",
    description:
      "Main medical facility for the city center. Lower levels have been converted to neural interface clinics. Dr. Morris developed her Signal Reinforcement Therapy here. Hospital records show an unusually high number of patients admitted with 'neural calibration issues' in the weeks following Signal activation.",
    discovered: false,
    status: "active",
    controlledBy: "signal",
    coordinates: "41.8781, -87.6298",
  },
  {
    id: "residential_block_37",
    name: "Residential Block 37",
    description:
      "High-density housing complex where multiple resistance members were captured during forced integration operations. Security footage from this location revealed unusual physical characteristics of transferred Signal Authority officers. Now under constant surveillance.",
    discovered: false,
    status: "quarantined",
    controlledBy: "signal",
    coordinates: "33.4484, -112.0740",
  },
  {
    id: "quantum_core",
    name: "Quantum Core",
    description:
      "The heart of the Signal network, located deep beneath the Central Signal Tower. Houses experimental quantum computers that first made contact with the Entity. Extremely restricted access. Dr. Chen's research suggests this is where the Entity primarily exists in our reality.",
    discovered: false,
    status: "active",
    controlledBy: "signal",
    coordinates: "40.7831, -73.9712",
  },
  {
    id: "school_district_5",
    name: "School District 5",
    description:
      "Elementary school where Ms. Peterson taught and where the first child integration program was implemented. Now serves as a 'Signal Education Center' where children receive daily Signal reinforcement. Emma Winters attended this school before her disappearance.",
    discovered: false,
    status: "active",
    controlledBy: "signal",
    coordinates: "42.3601, -71.0589",
  },
  {
    id: "residential_sector_9",
    name: "Residential Sector 9",
    description:
      "Suburban area where the Winters family lived. After Emma's disappearance, their dwelling was abandoned. Several other dwellings in this sector show signs of hasty evacuation. Signal coverage here was among the first to reach 100%.",
    discovered: false,
    status: "abandoned",
    controlledBy: "signal",
    coordinates: "29.7604, -95.3698",
  },
  {
    id: "old_mine_shafts",
    name: "Old Mine Shafts",
    description:
      "Abandoned mining complex in the Northern Mountains. The unique mineral composition blocks Signal transmission completely. Resistance groups have converted these into living quarters, storage for analog technology, and planning centers. The deepest shafts house the resistance's most sensitive operations.",
    discovered: false,
    status: "active",
    controlledBy: "resistance",
    coordinates: "46.5891, -112.0391",
  },
  {
    id: "final_resistance_base",
    name: "Final Resistance Base",
    description:
      "The ultimate fallback position for resistance forces. Location highly classified—coordinates are encrypted and distributed only to trusted members. Rumored to contain a complete archive of pre-Signal human knowledge and culture, preserved analog technology, and Dr. Chen's final research on defeating the Entity.",
    discovered: false,
    status: "active",
    controlledBy: "resistance",
    coordinates: "ENCRYPTED",
  },
]

const initialEvents: Event[] = [
  {
    id: "signal_activation",
    title: "Signal Activation",
    description:
      "The official activation of the global Signal network. Marketed as 'the next step in human connectivity,' allowing instant communication, knowledge sharing, and enhanced cognitive abilities through neural interfaces. In reality, this event marked the beginning of the Entity's integration into human consciousness.",
    discovered: false,
    date: "2041-05-16",
    impact: "catastrophic",
    characters: ["dr_sarah_chen", "director_evans", "the_entity"],
    locations: ["central_signal_tower", "quantum_core"],
  },
  {
    id: "chen_disappearance",
    title: "Dr. Chen's Disappearance",
    description:
      "Dr. Sarah Chen vanished from Research Lab 12 after leaving encrypted warnings throughout the system. Security footage shows her destroying key research before her departure. Signal Authority claimed she suffered a 'neural breakdown' due to work stress, but resistance sources suggest she went into hiding after discovering the Entity's true nature.",
    discovered: false,
    date: "2041-07-02",
    impact: "major",
    characters: ["dr_sarah_chen", "director_evans"],
    locations: ["research_lab_12", "quantum_core"],
  },
  {
    id: "sector_7_raid",
    title: "Sector 7 Resistance Raid",
    description:
      "Signal Authority security forces led by Captain Mercer raided the Old Radio Station, capturing or killing most members of Resistance Cell 7. Marcus Dalton was not among those captured, leading to speculation he escaped. Equipment for blocking Signal transmission was confiscated. This marked the first major offensive against organized resistance.",
    discovered: false,
    date: "2041-06-18",
    impact: "major",
    characters: ["marcus_dalton", "security_captain_mercer"],
    locations: ["sector_7", "old_radio_station"],
  },
  {
    id: "tower_23_incident",
    title: "Tower 23 Incident",
    description:
      "Maintenance technician Jamie Rodriguez discovered anomalous patterns in Signal Tower 23's transmission—described as 'voices trapped in the Signal.' After reporting this to Supervisor Klein, Rodriguez was scheduled for neural recalibration but disappeared. The tower was temporarily shut down for 'routine maintenance.'",
    discovered: false,
    date: "2041-06-25",
    impact: "moderate",
    characters: ["technician_rodriguez", "supervisor_klein"],
    locations: ["signal_tower_23"],
  },
  {
    id: "mass_integration_wave_2",
    title: "Mass Integration Wave 2",
    description:
      "The second major push to integrate the population into the Signal. Unlike the voluntary first wave, this phase included mandatory integration for government employees, medical personnel, and education staff. This wave affected the Winters family and Ms. Peterson, among millions of others. Resistance reports note significant personality changes in those integrated during this wave.",
    discovered: false,
    date: "2041-06-10",
    impact: "catastrophic",
    characters: ["david_winters", "ms_peterson"],
    locations: ["residential_sector_9", "school_district_5"],
  },
  {
    id: "resistance_broadcast_3",
    title: "Resistance Broadcast 3",
    description:
      "Zoe Williams' third major analog radio broadcast, reaching survivors across multiple sectors. Provided coordinates to safe zones in the Northern Mountains and instructions for blocking neural interfaces. This broadcast was the first to mention Dr. Chen's continued research into the Entity's weaknesses.",
    discovered: false,
    date: "2041-07-10",
    impact: "moderate",
    characters: ["zoe_williams", "dr_sarah_chen"],
    locations: ["northern_mountains", "old_radio_station"],
  },
  {
    id: "signal_sensitivity_outbreak",
    title: "Signal Sensitivity Outbreak",
    description:
      "A sudden increase in cases of Signal Sensitivity across multiple sectors. Affected individuals reported headaches, nausea, and hearing voices when near Signal towers. Dr. Morris developed Signal Reinforcement Therapy in response. Resistance sources suggest this wasn't a medical condition but the human mind's natural rejection of the Entity's influence.",
    discovered: false,
    date: "2041-06-05",
    impact: "major",
    characters: ["patient_4721", "dr_morris"],
    locations: ["central_hospital", "treatment_facility_9"],
  },
  {
    id: "forced_integration_incident",
    title: "Forced Integration Incident",
    description:
      "Security footage from Residential Block 37 showed Signal Authority officers forcibly removing a man for integration. The footage revealed unusual physical characteristics of transferred officers, including too-perfect symmetry and reduced blinking. This footage became important evidence for the resistance's guide on identifying transferred individuals.",
    discovered: false,
    date: "2041-06-20",
    impact: "minor",
    characters: ["security_captain_mercer", "resistance_member_unknown"],
    locations: ["residential_block_37"],
  },
  {
    id: "child_integration_program",
    title: "Child Integration Program",
    description:
      "The first program specifically targeting children for Signal integration. Presented to parents as 'Signal Education' to enhance learning capabilities. Emma Winters disappeared the night before her scheduled integration. Resistance sources claim some children showed natural immunity to complete integration, retaining more of their original personalities than adults.",
    discovered: false,
    date: "2041-06-13",
    impact: "major",
    characters: ["emma_winters", "ms_peterson"],
    locations: ["school_district_5"],
  },
  {
    id: "entity_first_communication",
    title: "Entity Direct Communication",
    description:
      "The first documented instance of the Entity attempting direct communication outside its usual protocols. The message was detected by resistance hackers monitoring Signal traffic. The content suggested the Entity views integration as a form of evolution rather than conquest, raising questions about its true motives.",
    discovered: false,
    date: "2041-07-05",
    impact: "major",
    characters: ["the_entity", "dr_sarah_chen"],
    locations: ["quantum_core", "central_signal_tower"],
  },
  {
    id: "resistance_manual_distribution",
    title: "Resistance Manual Distribution",
    description:
      "Alex Reeves' 'Staying Human' manual was distributed through hidden analog channels to resistance cells and potential recruits. The manual included techniques for resisting integration, identifying transferred individuals, and emergency consciousness anchoring methods. Signal Authority declared possession of the manual a serious offense.",
    discovered: false,
    date: "2041-06-30",
    impact: "moderate",
    characters: ["former_soldier_alex", "zoe_williams"],
    locations: ["northern_mountains", "old_mine_shafts"],
  },
  {
    id: "resistance_final_stand",
    title: "Resistance Final Stand",
    description:
      "As Signal coverage approached global completion, resistance forces consolidated at their final base. Dr. Chen's research on the Entity's vulnerability during transfer was implemented into a plan for a counterattack. This event marks the last known major resistance activity in the historical record.",
    discovered: false,
    date: "2041-08-01",
    impact: "catastrophic",
    characters: ["zoe_williams", "dr_sarah_chen", "marcus_dalton", "former_soldier_alex"],
    locations: ["final_resistance_base"],
  },
]

// Component to display active side story
export function SideStoryDisplay({ story, onDismiss }) {
  if (!story) return null

  return (
    <div className="side-story-container">
      <div className="side-story-content">
        <div className="side-story-header">
          <GlitchEffect>
            <h3>{story.title}</h3>
          </GlitchEffect>
          <span className="side-story-timestamp">{story.timelinePosition}</span>
          <button className="side-story-close-btn" onClick={onDismiss} aria-label="Close story">
            <X size={18} />
          </button>
        </div>
        <div className="side-story-body">
          <p>{story.content}</p>
        </div>
        <button className="side-story-dismiss-btn" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  )
}

export default function NarrativeSideStories({ children }) {
  const sideStoriesContext = useSideStories()

  return (
    <>
      {children}
      {sideStoriesContext.activeSideStory && (
        <SideStoryDisplay
          story={sideStoriesContext.activeSideStory}
          onDismiss={sideStoriesContext.dismissActiveSideStory}
        />
      )}
    </>
  )
}
