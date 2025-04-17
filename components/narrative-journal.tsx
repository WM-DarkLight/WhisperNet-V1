"use client"

import { useState } from "react"
import { Book, X, Lock, Unlock, FileText } from "lucide-react"
import { useNarrative, type StoryClue } from "./narrative-system"
import GlitchEffect from "./effects/glitch-effect"

interface NarrativeJournalProps {
  forceOpen?: boolean
}

export default function NarrativeJournal({ forceOpen = false }: NarrativeJournalProps) {
  const { state } = useNarrative()
  const [isOpen, setIsOpen] = useState(forceOpen)
  const [activeTab, setActiveTab] = useState<"chapters" | "clues">("chapters")

  const toggleJournal = () => {
    setIsOpen(!isOpen)
  }

  if (!isOpen) {
    return (
      <button className="narrative-journal-button" onClick={toggleJournal}>
        <Book size={20} />
        <span>Journal</span>
        {state.progress > 0 && <span className="journal-progress">{state.progress}%</span>}
      </button>
    )
  }

  return (
    <div className="narrative-journal">
      <div className="journal-header">
        <GlitchEffect>
          <h2>SIGNAL INVESTIGATION</h2>
        </GlitchEffect>
        {!forceOpen && (
          <button className="journal-close" onClick={toggleJournal}>
            <X size={16} />
          </button>
        )}
      </div>

      <div className="journal-tabs">
        <button
          className={`journal-tab ${activeTab === "chapters" ? "active" : ""}`}
          onClick={() => setActiveTab("chapters")}
        >
          Chapters
        </button>
        <button
          className={`journal-tab ${activeTab === "clues" ? "active" : ""}`}
          onClick={() => setActiveTab("clues")}
        >
          Evidence ({state.clues.filter((c) => c.found).length}/{state.clues.length})
        </button>
      </div>

      {activeTab === "chapters" && (
        <div className="journal-chapters">
          {state.chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`journal-chapter ${chapter.unlocked ? "unlocked" : "locked"} ${chapter.completed ? "completed" : ""}`}
            >
              <div className="chapter-header">
                <span className="chapter-number">Chapter {chapter.id}</span>
                {chapter.unlocked ? <Unlock size={16} /> : <Lock size={16} />}
              </div>
              <h3 className="chapter-title">{chapter.unlocked ? chapter.title : "???"}</h3>
              {chapter.unlocked && (
                <div className="chapter-progress">
                  <div className="chapter-clues">
                    {chapter.cluesRequired.map((clueId) => {
                      const clue = state.clues.find((c) => c.id === clueId)
                      return (
                        <div key={clueId} className={`chapter-clue ${clue?.found ? "found" : "missing"}`}>
                          <FileText size={14} />
                          <span>{clue?.found ? clue.title : "???"}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="chapter-status">
                    {chapter.completed
                      ? "Completed"
                      : `${chapter.cluesRequired.filter((clueId) => state.clues.find((c) => c.id === clueId)?.found).length}/${chapter.cluesRequired.length} Evidence Found`}
                  </div>
                </div>
              )}
            </div>
          ))}

          {state.endingUnlocked && (
            <div className="journal-ending">
              <GlitchEffect>
                <h3>FINAL CHAPTER UNLOCKED</h3>
              </GlitchEffect>
              <p>All evidence collected. The truth can now be revealed.</p>
              <p className="ending-instruction">
                Enter <span className="command">thetruth</span> in the terminal to access the final sequence.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "clues" && (
        <div className="journal-clues">
          {state.clues
            .filter((clue) => clue.found)
            .map((clue) => (
              <ClueItem key={clue.id} clue={clue} />
            ))}

          {state.clues.filter((clue) => clue.found).length === 0 && (
            <div className="no-clues">
              <p>No evidence found yet.</p>
              <p>Explore WhisperNet to uncover the truth about the Signal.</p>
            </div>
          )}
        </div>
      )}

      <div className="journal-footer">
        <div className="journal-progress-bar">
          <div className="progress-fill" style={{ width: `${state.progress}%` }}></div>
        </div>
        <div className="journal-progress-text">Investigation Progress: {state.progress}%</div>
      </div>
    </div>
  )
}

function ClueItem({ clue }: { clue: StoryClue }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`clue-item ${expanded ? "expanded" : ""}`} onClick={() => setExpanded(!expanded)}>
      <div className="clue-header">
        <h4 className="clue-title">{clue.title}</h4>
        <div className="clue-meta">
          <span className="clue-location">{clue.location}</span>
          <span className="clue-timestamp">{clue.timestamp}</span>
        </div>
      </div>
      {expanded && <div className="clue-content">{clue.content}</div>}
    </div>
  )
}
