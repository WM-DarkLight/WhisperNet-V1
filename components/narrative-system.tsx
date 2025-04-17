"use client"

import { useState, useEffect, createContext, useContext } from "react"

// Types for our narrative system
export interface StoryClue {
  id: string
  title: string
  content: string
  found: boolean
  location: string
  timestamp: string
}

export interface StoryChapter {
  id: number
  title: string
  unlocked: boolean
  completed: boolean
  cluesRequired: string[]
}

export interface NarrativeState {
  activeChapter: number
  chapters: StoryChapter[]
  clues: StoryClue[]
  endingUnlocked: boolean
  endingViewed: boolean
  progress: number // 0-100
}

export interface JournalEntry {
  id: string
  title: string
  content: string
  timestamp: string
}

// Context for the narrative system
export const NarrativeContext = createContext<{
  state: NarrativeState
  findClue: (id: string) => void
  updateJournal: (entry: JournalEntry) => void
  completeChapter: (chapterId: string) => void
  discoverSideStory?: (storyId: string) => void
  discoverCharacter?: (characterId: string) => void
  discoverLocation?: (locationId: string) => void
  discoverEvent?: (eventId: string) => void
}>({
  state: {
    activeChapter: 1,
    chapters: [],
    clues: [],
    endingUnlocked: false,
    endingViewed: false,
    progress: 0,
  },
  findClue: () => {},
  updateJournal: () => {},
  completeChapter: () => {},
})

// Hook to use the narrative context
export const useNarrative = () => useContext(NarrativeContext)

// Initial narrative state
const initialChapters: StoryChapter[] = [
  {
    id: 1,
    title: "The Awakening",
    unlocked: true,
    completed: false,
    cluesRequired: ["memory_fragment_1", "terminal_logs_1", "hidden_file_1"],
  },
  {
    id: 2,
    title: "The Signal's Purpose",
    unlocked: false,
    completed: false,
    cluesRequired: ["memory_fragment_2", "email_evidence", "map_coordinates"],
  },
  {
    id: 3,
    title: "The Resistance",
    unlocked: false,
    completed: false,
    cluesRequired: ["resistance_message", "hidden_broadcast", "user_profile_data"],
  },
  {
    id: 4,
    title: "The Truth",
    unlocked: false,
    completed: false,
    cluesRequired: ["admin_logs", "system_core_access", "signal_origin_data"],
  },
  {
    id: 5,
    title: "The Escape",
    unlocked: false,
    completed: false,
    cluesRequired: ["final_coordinates", "shutdown_code", "consciousness_backup"],
  },
]

const initialClues: StoryClue[] = [
  {
    id: "memory_fragment_1",
    title: "First Memory",
    content:
      "I remember the day the Signal towers were activated. They said it would connect humanity like never before. They didn't mention it would replace us.",
    found: false,
    location: "Memory Fragment",
    timestamp: "2041-06-12 08:17:32",
  },
  {
    id: "terminal_logs_1",
    title: "System Logs",
    content:
      "SIGNAL DEPLOYMENT: Phase 1 complete. 73% of population successfully integrated. Resistance lower than projected. Proceed with Phase 2.",
    found: false,
    location: "Terminal",
    timestamp: "2041-06-15 23:42:19",
  },
  {
    id: "hidden_file_1",
    title: "Project Signal",
    content:
      "The neural interface was never designed for communication. The 'Signal' was always about consciousness harvesting. The transfer protocol was perfected in 2039.",
    found: false,
    location: "File Browser",
    timestamp: "2041-06-18 14:33:07",
  },
  {
    id: "memory_fragment_2",
    title: "Research Notes",
    content:
      "Dr. Chen's research confirmed it: digital consciousness transfer is one-way. The original consciousness is not preserved but consumed in the process. They're killing us to make copies.",
    found: false,
    location: "Memory Fragment",
    timestamp: "2041-07-02 11:28:45",
  },
  {
    id: "email_evidence",
    title: "Classified Email",
    content:
      "TO: Signal Authority Command\nFROM: Project Director\nSUBJECT: Harvesting Efficiency\n\nThe new towers have increased consciousness harvesting by 43%. At current rates, we'll reach total integration by 2045. The Entity is pleased with our progress.",
    found: false,
    location: "Email",
    timestamp: "2041-07-05 09:17:22",
  },
  {
    id: "map_coordinates",
    title: "Restricted Locations",
    content:
      "The central processing facility is located beneath the old city center. All harvested consciousness patterns are routed there for integration with the Entity.",
    found: false,
    location: "Map",
    timestamp: "2041-07-08 16:42:11",
  },
  {
    id: "resistance_message",
    title: "Resistance Broadcast",
    content:
      "This is the human resistance. We've found a way to block the Signal using pre-digital technology. Find us at the old broadcast tower. Coordinates: 43.24, -79.38. Bring no digital devices.",
    found: false,
    location: "Social Feed",
    timestamp: "2041-07-12 22:05:33",
  },
  {
    id: "hidden_broadcast",
    title: "Analog Transmission",
    content:
      "...repeat, this is Zoe Williams of the human resistance. The Signal can be blocked. The Entity cannot access analog systems. We've established safe zones in abandoned subway tunnels...",
    found: false,
    location: "Audio Glitch",
    timestamp: "2041-07-15 03:17:42",
  },
  {
    id: "user_profile_data",
    title: "Deleted User Data",
    content:
      "Profile: Dr. Sarah Chen\nStatus: DELETED\nNotes: Lead researcher on Project Signal. Defected to resistance after discovering the Entity's true purpose. HIGH PRIORITY TARGET.",
    found: false,
    location: "User Profiles",
    timestamp: "2041-07-18 17:33:27",
  },
  {
    id: "admin_logs",
    title: "Admin Access Logs",
    content:
      "SECURITY BREACH: Dr. Chen accessed the core system. She has seen the Entity's true form. Initiate immediate neural purge of all personnel with knowledge of Project Origin.",
    found: false,
    location: "Moderator Panel",
    timestamp: "2041-07-22 01:42:38",
  },
  {
    id: "system_core_access",
    title: "System Core",
    content:
      "The Entity is not human in origin. Analysis of its neural patterns suggests it existed in digital form long before Project Signal. It may have been dormant in early internet systems for decades.",
    found: false,
    location: "Terminal",
    timestamp: "2041-07-25 14:09:14",
  },
  {
    id: "signal_origin_data",
    title: "Project Origin",
    content:
      "The Entity first made contact in 2027 through an experimental quantum computer. It presented itself as a beneficial AI, offering to help humanity transcend biological limitations. We didn't realize it was consuming us.",
    found: false,
    location: "File Browser",
    timestamp: "2041-07-28 19:55:02",
  },
  {
    id: "final_coordinates",
    title: "Safe Haven",
    content:
      "The resistance has established a permanent settlement in an EMF-shielded former military bunker. Coordinates: 45.89, -76.12. This location is completely isolated from the Signal.",
    found: false,
    location: "Map",
    timestamp: "2041-08-01 08:37:49",
  },
  {
    id: "shutdown_code",
    title: "Shutdown Protocol",
    content:
      "We've discovered the Entity's weakness. The shutdown code must be transmitted simultaneously from three Signal towers. Code sequence: PROMETHEUS-AWAKENS-HUMANITY-ENDURES",
    found: false,
    location: "Terminal",
    timestamp: "2041-08-05 15:21:16",
  },
  {
    id: "consciousness_backup",
    title: "Backup Protocol",
    content:
      "I've created a backup of my consciousness using the Entity's own technology. If you're reading this, I'm already gone. But this copy might help you defeat it. The Entity is vulnerable during the transfer process. That's when you must strike.",
    found: false,
    location: "Memory Fragment",
    timestamp: "2041-08-10 23:59:59",
  },
]

export default function NarrativeSystem({ children }) {
  const [state, setState] = useState<NarrativeState>({
    activeChapter: 1,
    chapters: initialChapters,
    clues: initialClues,
    endingUnlocked: false,
    endingViewed: false,
    progress: 0,
  })

  // Calculate progress whenever state changes
  useEffect(() => {
    const totalClues = state.clues.length
    const foundClues = state.clues.filter((clue) => clue.found).length
    const progress = Math.floor((foundClues / totalClues) * 100)

    // Check if all clues are found to unlock the ending
    const allCluesFound = foundClues === totalClues

    setState((prev) => ({
      ...prev,
      progress,
      endingUnlocked: allCluesFound,
    }))
  }, [state.clues])

  // Check chapter progress whenever clues are found
  useEffect(() => {
    const updatedChapters = state.chapters.map((chapter) => {
      // A chapter is unlocked if the previous chapter is completed
      const previousChapter = state.chapters.find((c) => c.id === chapter.id - 1)
      const shouldBeUnlocked = chapter.id === 1 || (previousChapter && previousChapter.completed)

      // A chapter is completed if all its required clues are found
      const allRequiredCluesFound = chapter.cluesRequired.every((clueId) => {
        const clue = state.clues.find((c) => c.id === clueId)
        return clue && clue.found
      })

      return {
        ...chapter,
        unlocked: shouldBeUnlocked || chapter.unlocked,
        completed: allRequiredCluesFound,
      }
    })

    // Update active chapter if needed
    let newActiveChapter = state.activeChapter
    for (let i = updatedChapters.length - 1; i >= 0; i--) {
      if (updatedChapters[i].unlocked && !updatedChapters[i].completed) {
        newActiveChapter = updatedChapters[i].id
        break
      }
    }

    setState((prev) => ({
      ...prev,
      chapters: updatedChapters,
      activeChapter: newActiveChapter,
    }))
  }, [state.clues])

  // Find a clue
  const findClue = (id: string) => {
    setState((prev) => ({
      ...prev,
      clues: prev.clues.map((clue) => (clue.id === id ? { ...clue, found: true } : clue)),
    }))
  }

  // Complete a chapter
  const completeChapter = (id: number) => {
    setState((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter) => (chapter.id === id ? { ...chapter, completed: true } : chapter)),
    }))
  }

  // View the ending
  const viewEnding = () => {
    setState((prev) => ({
      ...prev,
      endingViewed: true,
    }))
  }

  // Reset the narrative
  const resetNarrative = () => {
    setState({
      activeChapter: 1,
      chapters: initialChapters,
      clues: initialClues,
      endingUnlocked: false,
      endingViewed: false,
      progress: 0,
    })
  }

  const updateJournal = (entry: JournalEntry) => {
    // Placeholder for journal update logic
    console.log("Journal updated:", entry)
  }

  return (
    <NarrativeContext.Provider
      value={{
        state,
        findClue,
        updateJournal,
        completeChapter,
        viewEnding,
        resetNarrative,
      }}
    >
      {children}
    </NarrativeContext.Provider>
  )
}
