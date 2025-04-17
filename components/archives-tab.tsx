"use client"

import { useState } from "react"
import { Book, Archive, FileText } from "lucide-react"
import NarrativeJournal from "./narrative-journal"
import NarrativeEncyclopedia from "./narrative-encyclopedia"
import { characters, locations, events } from "@/data/encyclopedia-data"
import GlitchEffect from "./effects/glitch-effect"

export default function ArchivesTab() {
  const [activeArchive, setActiveArchive] = useState<"none" | "journal" | "encyclopedia">("none")
  const [discovered, setDiscovered] = useState({
    journal: false,
    encyclopedia: false,
  })

  const handleDiscoverJournal = () => {
    setDiscovered((prev) => ({ ...prev, journal: true }))
    setActiveArchive("journal")
  }

  const handleDiscoverEncyclopedia = () => {
    setDiscovered((prev) => ({ ...prev, encyclopedia: true }))
    setActiveArchive("encyclopedia")
  }

  const handleClose = () => {
    setActiveArchive("none")
  }

  return (
    <div className="archives-tab">
      <div className="archives-header">
        <GlitchEffect>
          <h2>FRAGMENTED ARCHIVES</h2>
        </GlitchEffect>
        <p className="archives-description">Accessing corrupted data storage. Some files may be recoverable.</p>
      </div>

      {activeArchive === "none" && (
        <div className="archives-grid">
          <div className={`archive-item ${discovered.journal ? "discovered" : ""}`} onClick={handleDiscoverJournal}>
            <div className="archive-icon">
              <Book size={32} />
            </div>
            <div className="archive-info">
              <h3>Personal Journal</h3>
              <p>Investigation notes and evidence collected about the Signal phenomenon</p>
              {discovered.journal ? (
                <span className="archive-status">ACCESSED</span>
              ) : (
                <span className="archive-status blink-slow">RECOVERABLE</span>
              )}
            </div>
          </div>

          <div
            className={`archive-item ${discovered.encyclopedia ? "discovered" : ""}`}
            onClick={handleDiscoverEncyclopedia}
          >
            <div className="archive-icon">
              <Archive size={32} />
            </div>
            <div className="archive-info">
              <h3>Signal Archives</h3>
              <p>Recovered database of people, locations, and events related to the Signal</p>
              {discovered.encyclopedia ? (
                <span className="archive-status">ACCESSED</span>
              ) : (
                <span className="archive-status blink-slow">RECOVERABLE</span>
              )}
            </div>
          </div>

          <div className="archive-item locked">
            <div className="archive-icon">
              <FileText size={32} />
            </div>
            <div className="archive-info">
              <h3>███████ ████</h3>
              <p>██████ ████████ ███████████ ████ ███ ██████</p>
              <span className="archive-status">CORRUPTED</span>
            </div>
          </div>

          <div className="archive-item locked">
            <div className="archive-icon">
              <FileText size={32} />
            </div>
            <div className="archive-info">
              <h3>████ ███████</h3>
              <p>███████ ████ ████████ ███ ████████ ███████</p>
              <span className="archive-status">CORRUPTED</span>
            </div>
          </div>
        </div>
      )}

      {activeArchive === "journal" && (
        <div className="active-archive">
          <button className="archive-back-button" onClick={handleClose}>
            ← Back to Archives
          </button>
          <NarrativeJournal forceOpen={true} />
        </div>
      )}

      {activeArchive === "encyclopedia" && (
        <div className="active-archive">
          <button className="archive-back-button" onClick={handleClose}>
            ← Back to Archives
          </button>
          <NarrativeEncyclopedia characters={characters} locations={locations} events={events} forceOpen={true} />
        </div>
      )}
    </div>
  )
}
