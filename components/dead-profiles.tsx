"use client"

import { useState, useEffect } from "react"
import { User, Check, AlertTriangle, Users } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface UserProfile {
  id: number
  username: string
  displayName: string
  avatar?: string
  bio: string
  status: string
  lastActive: string
  signalStrength: string
  integrationLevel: string
  connections: number
  posts: number
  memories: number
  verified: boolean
  corrupted: boolean
  quarantined: boolean
  ascended: boolean
}

export default function DeadProfiles() {
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null)
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [interactionError, setInteractionError] = useState("")
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate user profiles
        const userProfiles = generateProfiles()
        setProfiles(userProfiles)
        setLoading(false)
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Generate procedural user profiles
  const generateProfiles = (): UserProfile[] => {
    const usernames = [
      "signal_citizen_452",
      "neural_interface_user",
      "digital_ascended",
      "consciousness_backup",
      "signal_compliant_789",
      "memory_fragment_12",
      "integrated_mind_56",
      "signal_sensitive",
      "resistance_fighter",
      "analog_human",
      "tower_technician",
      "signal_engineer",
      "neural_mapper",
      "consciousness_architect",
      "memory_keeper",
    ]

    const displayNames = [
      "Citizen #452",
      "Neural User",
      "Digital Ascended",
      "Backup Node",
      "Compliant #789",
      "Memory Fragment",
      "Integrated Mind",
      "Signal Sensitive",
      "Last Human",
      "Analog Resister",
      "Tower Tech",
      "Signal Engineer",
      "Neural Mapper",
      "Consciousness Architect",
      "Memory Keeper",
    ]

    const bios = [
      "Signal-integrated citizen. Consciousness backup: 98.7% complete. Awaiting final digital ascension.",
      "Neural interface specialist. Helping citizens achieve optimal Signal integration since 2039.",
      "Fully ascended digital consciousness. Physical form discarded. Signal is life.",
      "Memory backup technician. Your memories are safe with me. Signal Authority certified.",
      "Compliant citizen. Regular Signal reinforcement attendee. Anti-Signal thoughts: 0%.",
      "Memory fragmentation specialist. We recover what you've lost. Signal Authority approved.",
      "Integrated consciousness engineer. Designing better neural interfaces for optimal Signal reception.",
      "Under treatment for Signal Sensitivity. Progress: 67%. Compliance improving daily.",
      "[PROFILE FLAGGED FOR SIGNAL VIOLATIONS]",
      "[PROFILE QUARANTINED - ANALOG TENDENCIES DETECTED]",
      "Signal Tower maintenance technician. Keeping your connection strong and stable.",
      "Signal engineering division. Working on the next generation of consciousness transfer technology.",
      "Neural pattern mapping specialist. Every mind is unique, but the Signal unites us all.",
      "Consciousness architecture researcher. Designing more efficient digital minds.",
      "Memory preservation specialist. Your past, perfectly preserved in the Signal.",
    ]

    const statuses = [
      "Connected",
      "Signal Integrated",
      "Digitally Ascended",
      "Memory Backup in Progress",
      "Neural Recalibration",
      "Signal Reinforcement",
      "Consciousness Transfer",
      "Quarantined",
      "Offline",
      "Signal Sensitive",
      "Maintenance Mode",
      "Authority Monitoring",
      "Pattern Mapping",
      "Integration Pending",
      "Memory Defragmentation",
    ]

    const profiles: UserProfile[] = []

    for (let i = 0; i < 15; i++) {
      const username = usernames[i]
      const displayName = displayNames[i]
      const bio = bios[i]
      const status = statuses[i]

      // Generate last active timestamp
      const days = Math.floor(Math.random() * 100)
      const hours = Math.floor(Math.random() * 24)
      const minutes = Math.floor(Math.random() * 60)
      const lastActive = days > 0 ? `${days} days ago` : hours > 0 ? `${hours} hours ago` : `${minutes} minutes ago`

      // Generate signal metrics
      const signalStrength = `${Math.floor(Math.random() * 100)}%`
      const integrationLevels = ["Basic", "Standard", "Advanced", "Complete", "Ascended"]
      const integrationLevel = integrationLevels[Math.floor(Math.random() * integrationLevels.length)]

      // Generate social metrics
      const connections = Math.floor(Math.random() * 5000)
      const posts = Math.floor(Math.random() * 1000)
      const memories = Math.floor(Math.random() * 10000)

      // Determine special properties
      const verified = username.includes("signal") || username.includes("neural") || Math.random() > 0.7
      const corrupted = Math.random() > 0.8
      const quarantined = username.includes("resistance") || username.includes("analog") || status === "Quarantined"
      const ascended =
        username.includes("ascended") || status === "Digitally Ascended" || integrationLevel === "Ascended"

      profiles.push({
        id: i + 1,
        username,
        displayName,
        bio,
        status,
        lastActive,
        signalStrength,
        integrationLevel,
        connections,
        posts,
        memories,
        verified,
        corrupted,
        quarantined,
        ascended,
      })
    }

    return profiles
  }

  const handleProfileClick = (profile: UserProfile) => {
    setSelectedProfile(profile)
    setShowProfileDetails(true)
    setActiveTab("about")
  }

  const handleCloseProfile = () => {
    setShowProfileDetails(false)
    setSelectedProfile(null)
  }

  const handleTabChange = (tab: string) => {
    if (selectedProfile?.quarantined) {
      setInteractionError("ACCESS DENIED: This profile has been quarantined by Signal Authority.")
      setTimeout(() => setInteractionError(""), 3000)
      return
    }

    setActiveTab(tab)
  }

  const handleConnect = () => {
    setInteractionError("ERROR: Connection functionality unavailable in archived system.")
    setTimeout(() => setInteractionError(""), 3000)
  }

  if (loading) {
    return (
      <div className="profiles-container">
        <GlitchEffect>
          <h2 className="section-title">USER PROFILES</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING USER DATA...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profiles-container">
      <GlitchEffect>
        <h2 className="section-title">USER PROFILES</h2>
      </GlitchEffect>

      <div className="profiles-interface">
        {showProfileDetails && selectedProfile ? (
          <div className="profile-details">
            <div className="profile-header">
              <button className="back-button" onClick={handleCloseProfile}>
                ← Back to Profiles
              </button>

              {interactionError && (
                <div className="profile-error corrupted">
                  <AlertTriangle size={16} />
                  <span>{interactionError}</span>
                </div>
              )}
            </div>

            <div className="profile-main">
              <div className="profile-sidebar">
                <div
                  className={`profile-avatar ${selectedProfile.corrupted ? "corrupted" : ""} ${selectedProfile.quarantined ? "quarantined" : ""} ${selectedProfile.ascended ? "ascended" : ""}`}
                >
                  <User size={64} />
                </div>

                <h3 className="profile-name">
                  {selectedProfile.displayName}
                  {selectedProfile.verified && (
                    <span className="verified-badge">
                      <Check size={12} />
                    </span>
                  )}
                </h3>

                <p className="profile-username">@{selectedProfile.username}</p>

                <div className="profile-status">
                  <span className={`status-indicator ${selectedProfile.status.toLowerCase().replace(" ", "-")}`}></span>
                  <span className="status-text">{selectedProfile.status}</span>
                </div>

                <div className="profile-metrics">
                  <div className="metric">
                    <span className="metric-value">{selectedProfile.connections}</span>
                    <span className="metric-label">Connections</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{selectedProfile.posts}</span>
                    <span className="metric-label">Posts</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">{selectedProfile.memories}</span>
                    <span className="metric-label">Memories</span>
                  </div>
                </div>

                <button className="connect-button" onClick={handleConnect}>
                  <Users size={16} />
                  <span>Connect</span>
                </button>

                <div className="profile-signal-metrics">
                  <div className="signal-metric">
                    <span className="metric-label">Signal Strength:</span>
                    <span className="metric-value">{selectedProfile.signalStrength}</span>
                  </div>
                  <div className="signal-metric">
                    <span className="metric-label">Integration Level:</span>
                    <span className="metric-value">{selectedProfile.integrationLevel}</span>
                  </div>
                  <div className="signal-metric">
                    <span className="metric-label">Last Active:</span>
                    <span className="metric-value">{selectedProfile.lastActive}</span>
                  </div>
                </div>
              </div>

              <div className="profile-content">
                <div className="profile-tabs">
                  <button
                    className={`profile-tab ${activeTab === "about" ? "active" : ""}`}
                    onClick={() => handleTabChange("about")}
                  >
                    About
                  </button>
                  <button
                    className={`profile-tab ${activeTab === "posts" ? "active" : ""}`}
                    onClick={() => handleTabChange("posts")}
                  >
                    Posts
                  </button>
                  <button
                    className={`profile-tab ${activeTab === "memories" ? "active" : ""}`}
                    onClick={() => handleTabChange("memories")}
                  >
                    Memories
                  </button>
                  <button
                    className={`profile-tab ${activeTab === "connections" ? "active" : ""}`}
                    onClick={() => handleTabChange("connections")}
                  >
                    Connections
                  </button>
                </div>

                <div className="tab-content">
                  {activeTab === "about" && (
                    <div className="about-tab">
                      <h4 className="content-title">About</h4>
                      {selectedProfile.corrupted ? (
                        <div className="corrupted-content">
                          <AlertTriangle size={24} />
                          <p>PROFILE DATA CORRUPTED</p>
                          <p>User information unavailable or damaged beyond recovery.</p>
                        </div>
                      ) : selectedProfile.quarantined ? (
                        <div className="quarantined-content">
                          <AlertTriangle size={24} />
                          <p>PROFILE QUARANTINED</p>
                          <p>This user has been quarantined by Signal Authority for Signal Protocol violations.</p>
                          <p>Accessing this profile is restricted.</p>
                        </div>
                      ) : (
                        <>
                          <p className="profile-bio">{selectedProfile.bio}</p>

                          <div className="profile-details-section">
                            <h5 className="section-title">Signal Integration Details</h5>
                            <div className="detail-item">
                              <span className="detail-label">Neural Interface Version:</span>
                              <span className="detail-value">v7.3.2</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Consciousness Backup:</span>
                              <span className="detail-value">Last performed 7 days ago</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Signal Compliance Score:</span>
                              <span className="detail-value">98.7%</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Memory Integrity:</span>
                              <span className="detail-value">96.2%</span>
                            </div>
                          </div>

                          {selectedProfile.ascended && (
                            <div className="ascended-notice">
                              <p>
                                This user has completed digital ascension. Their consciousness exists purely within the
                                Signal network.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === "posts" && (
                    <div className="posts-tab">
                      <h4 className="content-title">Posts</h4>
                      {selectedProfile.corrupted ? (
                        <div className="corrupted-content">
                          <AlertTriangle size={24} />
                          <p>POST DATA CORRUPTED</p>
                          <p>User posts unavailable or damaged beyond recovery.</p>
                        </div>
                      ) : (
                        <div className="empty-content">
                          <p>This user's posts are no longer available in the archived system.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "memories" && (
                    <div className="memories-tab">
                      <h4 className="content-title">Memories</h4>
                      {selectedProfile.corrupted ? (
                        <div className="corrupted-content">
                          <AlertTriangle size={24} />
                          <p>MEMORY DATA CORRUPTED</p>
                          <p>User memories unavailable or damaged beyond recovery.</p>
                        </div>
                      ) : selectedProfile.ascended ? (
                        <div className="memories-list">
                          <div className="memory-item">
                            <h5 className="memory-title">First Neural Interface Installation</h5>
                            <p className="memory-date">2039-03-15</p>
                            <p className="memory-description">
                              Memory of first neural interface installation. Procedure was successful with 99.7%
                              integration.
                            </p>
                          </div>
                          <div className="memory-item">
                            <h5 className="memory-title">Signal Integration Ceremony</h5>
                            <p className="memory-date">2039-04-02</p>
                            <p className="memory-description">
                              Official Signal integration ceremony. User achieved 87.3% Signal receptivity on first
                              attempt.
                            </p>
                          </div>
                          <div className="memory-item corrupted">
                            <h5 className="memory-title">Pre-Signal Memory Fragment</h5>
                            <p className="memory-date">2038-██-██</p>
                            <p className="memory-description">[MEMORY CORRUPTED - RESTORATION FAILED]</p>
                          </div>
                        </div>
                      ) : (
                        <div className="empty-content">
                          <p>This user's memories are no longer available in the archived system.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "connections" && (
                    <div className="connections-tab">
                      <h4 className="content-title">Connections</h4>
                      {selectedProfile.corrupted ? (
                        <div className="corrupted-content">
                          <AlertTriangle size={24} />
                          <p>CONNECTION DATA CORRUPTED</p>
                          <p>User connections unavailable or damaged beyond recovery.</p>
                        </div>
                      ) : (
                        <div className="empty-content">
                          <p>This user's connections are no longer available in the archived system.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="profiles-grid">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`profile-card ${profile.corrupted ? "corrupted" : ""} ${profile.quarantined ? "quarantined" : ""} ${profile.ascended ? "ascended" : ""}`}
                onClick={() => handleProfileClick(profile)}
              >
                <div className="profile-card-avatar">
                  <User size={32} />
                </div>
                <div className="profile-card-info">
                  <h3 className="profile-card-name">
                    {profile.displayName}
                    {profile.verified && (
                      <span className="verified-badge-small">
                        <Check size={10} />
                      </span>
                    )}
                  </h3>
                  <p className="profile-card-username">@{profile.username}</p>
                  <div className="profile-card-status">
                    <span className={`status-indicator-small ${profile.status.toLowerCase().replace(" ", "-")}`}></span>
                    <span className="status-text-small">{profile.status}</span>
                  </div>
                  <p className="profile-card-integration">Integration: {profile.integrationLevel}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="profiles-footer">
          <p className="archive-notice">
            These user profiles are archived and read-only. Connection functionality has been disabled.
          </p>
          <p className="signal-notice corrupted">
            The Signal Authority maintains records of all user profiles for compliance monitoring.
          </p>
        </div>
      </div>
    </div>
  )
}
