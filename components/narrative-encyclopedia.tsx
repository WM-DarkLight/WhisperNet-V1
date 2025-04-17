"use client"

import type React from "react"

import { useState } from "react"
import { Book, X, Search, User, MapPin, Calendar, ArrowLeft } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"
import type { Character, Location, Event } from "./narrative-side-stories"

interface EncyclopediaProps {
  characters: Character[]
  locations: Location[]
  events: Event[]
  forceOpen?: boolean
}

export default function NarrativeEncyclopedia({ characters, locations, events, forceOpen = false }: EncyclopediaProps) {
  const [isOpen, setIsOpen] = useState(forceOpen)
  const [activeTab, setActiveTab] = useState<"characters" | "locations" | "events" | "timeline">("characters")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<Character | Location | Event | null>(null)

  const toggleEncyclopedia = () => {
    setIsOpen(!isOpen)
    setSelectedItem(null)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  const filteredCharacters = characters.filter(
    (char) =>
      char.name.toLowerCase().includes(searchQuery) ||
      char.role.toLowerCase().includes(searchQuery) ||
      char.backstory.toLowerCase().includes(searchQuery),
  )

  const filteredLocations = locations.filter(
    (loc) => loc.name.toLowerCase().includes(searchQuery) || loc.description.toLowerCase().includes(searchQuery),
  )

  const filteredEvents = events.filter(
    (evt) => evt.title.toLowerCase().includes(searchQuery) || evt.description.toLowerCase().includes(searchQuery),
  )

  // Sort events chronologically for timeline
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (!isOpen) {
    return (
      <button className="narrative-encyclopedia-button" onClick={toggleEncyclopedia}>
        <Book size={20} />
        <span>Encyclopedia</span>
        <span className="encyclopedia-count">{characters.length + locations.length + events.length}</span>
      </button>
    )
  }

  return (
    <div className="narrative-encyclopedia">
      <div className="encyclopedia-header">
        <GlitchEffect>
          <h2>SIGNAL ARCHIVES</h2>
        </GlitchEffect>
        {!forceOpen && (
          <button className="encyclopedia-close" onClick={toggleEncyclopedia}>
            <X size={16} />
          </button>
        )}
      </div>

      <div className="encyclopedia-search">
        <Search size={16} />
        <input type="text" placeholder="Search archives..." value={searchQuery} onChange={handleSearch} />
      </div>

      <div className="encyclopedia-tabs">
        <button
          className={`encyclopedia-tab ${activeTab === "characters" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("characters")
            setSelectedItem(null)
          }}
        >
          <User size={16} />
          <span>People</span>
        </button>
        <button
          className={`encyclopedia-tab ${activeTab === "locations" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("locations")
            setSelectedItem(null)
          }}
        >
          <MapPin size={16} />
          <span>Locations</span>
        </button>
        <button
          className={`encyclopedia-tab ${activeTab === "events" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("events")
            setSelectedItem(null)
          }}
        >
          <Calendar size={16} />
          <span>Events</span>
        </button>
        <button
          className={`encyclopedia-tab ${activeTab === "timeline" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("timeline")
            setSelectedItem(null)
          }}
        >
          <Calendar size={16} />
          <span>Timeline</span>
        </button>
      </div>

      <div className="encyclopedia-content">
        {selectedItem ? (
          <div className="encyclopedia-detail">
            <button className="back-button" onClick={() => setSelectedItem(null)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            {/* Character Detail */}
            {"name" in selectedItem && "role" in selectedItem && (
              <>
                <div className="character-header">
                  <h3>{selectedItem.name}</h3>
                  <span className={`character-status status-${selectedItem.status}`}>
                    {selectedItem.status.toUpperCase()}
                  </span>
                </div>
                <div className="character-role">{selectedItem.role}</div>
                {selectedItem.lastKnownLocation && (
                  <div className="character-location">
                    <strong>Last Known Location:</strong> {selectedItem.lastKnownLocation}
                  </div>
                )}
                {selectedItem.signalSensitivity && (
                  <div className="character-sensitivity">
                    <strong>Signal Sensitivity:</strong> {selectedItem.signalSensitivity}
                  </div>
                )}
                <div className="character-backstory">
                  <p>{selectedItem.backstory}</p>
                </div>
                {selectedItem.connections.length > 0 && (
                  <div className="character-connections">
                    <h4>Connections</h4>
                    <ul>
                      {selectedItem.connections.map((connectionId) => {
                        const connection = characters.find((c) => c.id === connectionId)
                        return connection ? (
                          <li key={connectionId} onClick={() => setSelectedItem(connection)}>
                            {connection.name} - {connection.role}
                          </li>
                        ) : null
                      })}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* Location Detail */}
            {"name" in selectedItem && "description" in selectedItem && "controlledBy" in selectedItem && (
              <>
                <div className="location-header">
                  <h3>{selectedItem.name}</h3>
                  <span className={`location-status status-${selectedItem.status}`}>
                    {selectedItem.status.toUpperCase()}
                  </span>
                </div>
                <div className="location-control">
                  Controlled by:{" "}
                  <span className={`control-${selectedItem.controlledBy}`}>
                    {selectedItem.controlledBy.toUpperCase()}
                  </span>
                </div>
                {selectedItem.coordinates && (
                  <div className="location-coordinates">
                    <strong>Coordinates:</strong> {selectedItem.coordinates}
                  </div>
                )}
                <div className="location-description">
                  <p>{selectedItem.description}</p>
                </div>

                {/* Related events at this location */}
                {events.filter((e) => e.locations.includes(selectedItem.id)).length > 0 && (
                  <div className="location-events">
                    <h4>Events at this Location</h4>
                    <ul>
                      {events
                        .filter((e) => e.locations.includes(selectedItem.id))
                        .map((event) => (
                          <li key={event.id} onClick={() => setSelectedItem(event)}>
                            {event.date}: {event.title}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* Event Detail */}
            {"title" in selectedItem && "description" in selectedItem && "date" in selectedItem && (
              <>
                <div className="event-header">
                  <h3>{selectedItem.title}</h3>
                  <span className="event-date">{selectedItem.date}</span>
                </div>
                <div className="event-impact">
                  Impact: <span className={`impact-${selectedItem.impact}`}>{selectedItem.impact.toUpperCase()}</span>
                </div>
                <div className="event-description">
                  <p>{selectedItem.description}</p>
                </div>

                {/* People involved */}
                {selectedItem.characters.length > 0 && (
                  <div className="event-characters">
                    <h4>People Involved</h4>
                    <ul>
                      {selectedItem.characters.map((charId) => {
                        const character = characters.find((c) => c.id === charId)
                        return character ? (
                          <li key={charId} onClick={() => setSelectedItem(character)}>
                            {character.name} - {character.role}
                          </li>
                        ) : null
                      })}
                    </ul>
                  </div>
                )}

                {/* Locations involved */}
                {selectedItem.locations.length > 0 && (
                  <div className="event-locations">
                    <h4>Locations</h4>
                    <ul>
                      {selectedItem.locations.map((locId) => {
                        const location = locations.find((l) => l.id === locId)
                        return location ? (
                          <li key={locId} onClick={() => setSelectedItem(location)}>
                            {location.name}
                          </li>
                        ) : null
                      })}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <>
            {/* Characters List */}
            {activeTab === "characters" && (
              <div className="encyclopedia-list">
                {filteredCharacters.length === 0 ? (
                  <div className="no-results">No people found matching your search.</div>
                ) : (
                  filteredCharacters.map((character) => (
                    <div
                      key={character.id}
                      className="encyclopedia-item character-item"
                      onClick={() => setSelectedItem(character)}
                    >
                      <div className="item-icon">
                        <User size={16} />
                      </div>
                      <div className="item-content">
                        <div className="item-title">{character.name}</div>
                        <div className="item-subtitle">{character.role}</div>
                        <div className="item-status">
                          Status: <span className={`status-${character.status}`}>{character.status}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Locations List */}
            {activeTab === "locations" && (
              <div className="encyclopedia-list">
                {filteredLocations.length === 0 ? (
                  <div className="no-results">No locations found matching your search.</div>
                ) : (
                  filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className="encyclopedia-item location-item"
                      onClick={() => setSelectedItem(location)}
                    >
                      <div className="item-icon">
                        <MapPin size={16} />
                      </div>
                      <div className="item-content">
                        <div className="item-title">{location.name}</div>
                        <div className="item-status">
                          Status: <span className={`status-${location.status}`}>{location.status}</span>
                        </div>
                        <div className="item-control">
                          Control: <span className={`control-${location.controlledBy}`}>{location.controlledBy}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Events List */}
            {activeTab === "events" && (
              <div className="encyclopedia-list">
                {filteredEvents.length === 0 ? (
                  <div className="no-results">No events found matching your search.</div>
                ) : (
                  filteredEvents.map((event) => (
                    <div key={event.id} className="encyclopedia-item event-item" onClick={() => setSelectedItem(event)}>
                      <div className="item-icon">
                        <Calendar size={16} />
                      </div>
                      <div className="item-content">
                        <div className="item-title">{event.title}</div>
                        <div className="item-date">{event.date}</div>
                        <div className="item-impact">
                          Impact: <span className={`impact-${event.impact}`}>{event.impact}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Timeline View */}
            {activeTab === "timeline" && (
              <div className="timeline-container">
                {sortedEvents.length === 0 ? (
                  <div className="no-results">No events discovered yet.</div>
                ) : (
                  <div className="timeline">
                    {sortedEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                        onClick={() => setSelectedItem(event)}
                      >
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <div className="timeline-date">{event.date}</div>
                          <div className="timeline-title">{event.title}</div>
                          <div className="timeline-impact">
                            <span className={`impact-${event.impact}`}>{event.impact}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="timeline-line"></div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
