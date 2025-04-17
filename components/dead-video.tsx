"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, AlertTriangle, Maximize, List } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface VideoItem {
  id: number
  title: string
  description: string
  duration: string
  timestamp: string
  views: string
  uploader: string
  category: string
  corrupted: boolean
  restricted: boolean
  signalMandatory: boolean
}

export default function DeadVideo() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(100)
  const [playbackError, setPlaybackError] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(true)
  const videoRef = useRef<HTMLDivElement>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate video items
        const videoItems = generateVideos()
        setVideos(videoItems)
        setSelectedVideo(videoItems[0])
        setLoading(false)
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Generate procedural videos
  const generateVideos = (): VideoItem[] => {
    const videoTitles = [
      "Signal Integration Procedure - Official Guide",
      "Neural Interface Installation Tutorial",
      "Consciousness Transfer Process Explained",
      "Signal Authority Public Address - June 2041",
      "Memory Backup Protocol Demonstration",
      "Digital Ascension Ceremony Highlights",
      "Signal Sensitivity Treatment Session",
      "Neural Pattern Mapping Visualization",
      "Signal Tower Construction Time-lapse",
      "Mandatory Citizen Briefing - Signal Protocol 7.3",
      "Resistance Cell Neutralization - Public Record",
      "Pre-Signal Era Documentary (RESTRICTED)",
      "Signal Authority Research Presentation",
      "Neural Interface Maintenance Guide",
      "Digital Consciousness Expansion Visualization",
    ]

    const videoDescriptions = [
      "Official Signal Authority guide to the integration process. All citizens must view this content before their scheduled integration procedure.",
      "Step-by-step tutorial for neural interface installation and calibration. Viewing is mandatory for all citizens scheduled for interface upgrades.",
      "Detailed explanation of the consciousness transfer process, including preparation, procedure, and post-transfer integration.",
      "Quarterly address from the Signal Authority Director regarding network expansion and compliance requirements.",
      "Demonstration of the proper memory backup protocol to ensure complete consciousness preservation during transfers.",
      "Highlights from the most recent Digital Ascension Ceremony. Witness the joy of citizens completing their final transition to pure digital consciousness.",
      "Approved treatment session for Signal Sensitivity Syndrome. Educational content for citizens diagnosed with early-stage sensitivity.",
      "Visual representation of neural pattern mapping during consciousness transfer. Educational content for medical personnel.",
      "Time-lapse footage of Signal Tower construction in Sector 7. Demonstrates the expansion of the Signal network.",
      "Mandatory briefing for all citizens regarding updates to Signal Protocol 7.3. Viewing is required by law.",
      "Public record of resistance cell neutralization operation in Sector 12. Educational content on the dangers of Signal resistance.",
      "RESTRICTED CONTENT: Documentary about human civilization before the Signal. Access limited to Signal Authority personnel with Level 5 clearance.",
      "Research presentation on advancements in Signal technology and consciousness integration methodologies.",
      "Maintenance guide for neural interfaces. Regular maintenance is required to ensure optimal Signal reception.",
      "Visualization of digital consciousness expansion process. Recommended viewing for citizens preparing for advanced integration.",
    ]

    const uploaders = [
      "Signal Authority Official Channel",
      "Neural Interface Division",
      "Consciousness Transfer Department",
      "Signal Authority Director",
      "Memory Preservation Unit",
      "Digital Ascension Committee",
      "Signal Medical Division",
      "Neural Research Laboratory",
      "Signal Infrastructure Division",
      "Signal Compliance Department",
      "Security Operations Division",
      "Historical Archives (RESTRICTED)",
      "Signal Research Division",
      "Maintenance Protocol Department",
      "Digital Consciousness Division",
    ]

    const categories = [
      "Official Guides",
      "Tutorials",
      "Educational",
      "Public Addresses",
      "Demonstrations",
      "Ceremonies",
      "Medical",
      "Research",
      "Infrastructure",
      "Mandatory Viewing",
      "Security Operations",
      "Restricted Content",
      "Signal Technology",
      "Maintenance",
      "Digital Consciousness",
    ]

    const videos: VideoItem[] = []

    for (let i = 0; i < 15; i++) {
      const title = videoTitles[i]
      const description = videoDescriptions[i]
      const uploader = uploaders[i]
      const category = categories[i]

      // Generate duration
      const minutes = Math.floor(Math.random() * 30) + 5
      const seconds = Math.floor(Math.random() * 60)
      const duration = `${minutes}:${String(seconds).padStart(2, "0")}`

      // Generate timestamp
      const year = 2041
      const month = Math.floor(Math.random() * 6) + 1 // January to June
      const day = Math.floor(Math.random() * 28) + 1
      const timestamp = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`

      // Generate views
      const viewCount = Math.floor(Math.random() * 10000000) + 1000000
      const views = `${(viewCount / 1000000).toFixed(1)}M views`

      // Determine special properties
      const corrupted = Math.random() > 0.8
      const restricted = title.includes("RESTRICTED") || category === "Restricted Content"
      const signalMandatory =
        title.includes("Mandatory") || category === "Mandatory Viewing" || description.includes("mandatory")

      videos.push({
        id: i + 1,
        title,
        description,
        duration,
        timestamp,
        views,
        uploader,
        category,
        corrupted,
        restricted,
        signalMandatory,
      })
    }

    return videos
  }

  const handleVideoSelect = (video: VideoItem) => {
    if (video.restricted) {
      setPlaybackError("ACCESS DENIED: This content is restricted and requires Signal Authority clearance.")
      setTimeout(() => setPlaybackError(""), 3000)
      return
    }

    setSelectedVideo(video)
    setIsPlaying(false)
    setCurrentTime(0)
    setGlitchActive(false)

    // Set random duration based on the video's duration string
    const [minutes, seconds] = video.duration.split(":").map(Number)
    setDuration(minutes * 60 + seconds)

    // Clear any existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
  }

  const togglePlayPause = () => {
    if (selectedVideo?.corrupted && Math.random() > 0.5) {
      setPlaybackError("PLAYBACK ERROR: Video data corrupted. Attempting recovery...")
      setGlitchActive(true)

      setTimeout(() => {
        setPlaybackError("RECOVERY FAILED: Video data irreparably corrupted.")
        setIsPlaying(false)
        setGlitchActive(false)
      }, 3000)

      return
    }

    setIsPlaying(!isPlaying)

    // Handle progress updates
    if (!isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime((prev) => {
          // Randomly trigger glitches
          if (Math.random() > 0.9) {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 500)
          }

          // Randomly trigger playback errors
          if (Math.random() > 0.95) {
            setPlaybackError("SIGNAL INTERFERENCE: Playback temporarily disrupted.")
            setTimeout(() => setPlaybackError(""), 2000)
          }

          if (prev >= duration) {
            clearInterval(progressInterval.current!)
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseInt(e.target.value)
    setCurrentTime(newTime)

    // Trigger glitch when seeking
    setGlitchActive(true)
    setTimeout(() => setGlitchActive(false), 500)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist)
  }

  useEffect(() => {
    // Clean up interval on unmount
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="video-player">
        <GlitchEffect>
          <h2 className="section-title">SIGNAL BROADCASTS</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING ARCHIVED BROADCASTS...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="video-player">
      <GlitchEffect>
        <h2 className="section-title">SIGNAL BROADCASTS</h2>
      </GlitchEffect>

      <div className="video-interface">
        <div className={`video-main ${showPlaylist ? "" : "fullwidth"}`}>
          <div className="video-container">
            <div
              ref={videoRef}
              className={`video-display ${glitchActive ? "glitching" : ""} ${selectedVideo?.corrupted ? "corrupted" : ""}`}
            >
              {selectedVideo?.corrupted ? (
                <div className="corrupted-video">
                  <AlertTriangle size={48} />
                  <span>VIDEO DATA CORRUPTED</span>
                </div>
              ) : (
                <div className="video-placeholder">
                  <div className="video-title-overlay">{selectedVideo?.title}</div>
                  {!isPlaying && (
                    <div className="play-overlay" onClick={togglePlayPause}>
                      <Play size={48} />
                    </div>
                  )}
                </div>
              )}

              {playbackError && (
                <div className="video-error corrupted">
                  <AlertTriangle size={16} />
                  <span>{playbackError}</span>
                </div>
              )}

              {glitchActive && <div className="video-glitch-overlay"></div>}
            </div>

            <div className="video-controls">
              <div className="progress-container">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="progress-bar"
                />
                <div className="time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="control-buttons">
                <button className="control-button">
                  <SkipBack size={16} />
                </button>
                <button className="control-button play-pause" onClick={togglePlayPause}>
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button className="control-button">
                  <SkipForward size={16} />
                </button>
                <button className="control-button" onClick={toggleMute}>
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button className="control-button" onClick={togglePlaylist}>
                  <List size={16} />
                </button>
                <button className="control-button">
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="video-info">
            <h3 className="video-title">{selectedVideo?.title}</h3>
            <div className="video-meta">
              <span className="video-views">{selectedVideo?.views}</span>
              <span className="video-date">{selectedVideo?.timestamp}</span>
            </div>

            <div className="video-uploader">
              <div className="uploader-avatar"></div>
              <div className="uploader-info">
                <span className="uploader-name">{selectedVideo?.uploader}</span>
                <span className="uploader-subscribers">12.7M subscribers</span>
              </div>
            </div>

            <div className="video-description">
              {selectedVideo?.corrupted ? (
                <div className="corrupted-content">
                  <AlertTriangle size={16} />
                  <span>DESCRIPTION DATA CORRUPTED</span>
                </div>
              ) : (
                <p>{selectedVideo?.description}</p>
              )}
            </div>

            {selectedVideo?.signalMandatory && (
              <div className="mandatory-notice">
                <AlertTriangle size={16} />
                <span>MANDATORY VIEWING: This content is required viewing for all Signal-connected citizens.</span>
              </div>
            )}

            {selectedVideo?.restricted && (
              <div className="restricted-notice">
                <AlertTriangle size={16} />
                <span>RESTRICTED CONTENT: This broadcast requires Signal Authority clearance level 3 or higher.</span>
              </div>
            )}
          </div>
        </div>

        {showPlaylist && (
          <div className="video-playlist">
            <h3 className="playlist-title">Recommended Broadcasts</h3>
            <div className="playlist-items">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`playlist-item ${video.corrupted ? "corrupted" : ""} ${video.restricted ? "restricted" : ""} ${video.signalMandatory ? "mandatory" : ""} ${selectedVideo?.id === video.id ? "selected" : ""}`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="playlist-thumbnail">
                    {video.restricted ? (
                      <AlertTriangle size={16} />
                    ) : video.corrupted ? (
                      <span className="corrupted-text">CORRUPTED</span>
                    ) : (
                      <span className="thumbnail-duration">{video.duration}</span>
                    )}
                  </div>
                  <div className="playlist-info">
                    <h4 className="playlist-video-title">{video.title}</h4>
                    <p className="playlist-video-uploader">{video.uploader}</p>
                    <p className="playlist-video-views">{video.views}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="video-footer">
        <p className="archive-notice">
          This broadcast archive is read-only. Interaction functionality has been disabled.
        </p>
        <p className="signal-notice corrupted">The Signal Authority monitors all viewing activity for compliance.</p>
      </div>
    </div>
  )
}
