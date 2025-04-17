"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, AlertTriangle, Compass, ZoomIn, ZoomOut, Layers } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface MapLocation {
  id: number
  name: string
  coordinates: string
  type: string
  status: string
  description: string
  corrupted: boolean
  restricted: boolean
}

export default function DeadMap() {
  const [loading, setLoading] = useState(true)
  const [locations, setLocations] = useState<MapLocation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [showLocationInfo, setShowLocationInfo] = useState(false)
  const [mapError, setMapError] = useState("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate map locations
        const mapLocations = generateLocations()
        setLocations(mapLocations)
        setLoading(false)
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Generate procedural map locations
  const generateLocations = (): MapLocation[] => {
    const locationTypes = [
      "Signal Tower",
      "Neural Center",
      "Consciousness Hub",
      "Memory Archive",
      "Integration Facility",
      "Signal Relay",
      "Quarantine Zone",
      "Resistance Hideout",
      "Analog Ruins",
      "Transfer Station",
      "Signal Dead Zone",
      "Maintenance Facility",
      "Recalibration Center",
      "Digital Ascension Hub",
      "Signal Authority HQ",
    ]

    const locationStatuses = [
      "ONLINE",
      "OFFLINE",
      "DEGRADED",
      "COMPROMISED",
      "RESTRICTED",
      "QUARANTINED",
      "ABANDONED",
      "DESTROYED",
      "UNKNOWN",
    ]

    const locationDescriptions = [
      "Primary Signal broadcast facility for this sector. All citizens within range are connected to the Signal through this tower.",
      "Neural pattern processing center. Consciousness transfers and memory backups are processed here.",
      "Central hub for Signal integration. New citizens are processed and connected to the network here.",
      "Storage facility for backed-up memories and consciousness patterns. Access restricted to Signal Authority personnel.",
      "Maintenance facility for neural interfaces and Signal equipment. Regular calibration is mandatory for all citizens.",
      "Signal relay station extending network coverage to remote areas. Minimal processing capabilities.",
      "Containment zone for Signal Sensitive individuals awaiting treatment or processing.",
      "RESTRICTED INFORMATION - Suspected resistance activity detected in this area. All citizens should avoid and report any sightings.",
      "Pre-Signal era ruins. Potentially contains dangerous analog technology. Area restricted by Signal Authority.",
      "Consciousness transfer station for digital ascension procedures. By appointment only.",
      "Area with minimal or no Signal coverage. Potentially dangerous due to unmonitored consciousness activity.",
      "Repair and maintenance facility for Signal infrastructure. Authorized personnel only.",
      "Treatment center for Signal Sensitivity and neural pattern anomalies. Attendance is mandatory when prescribed.",
      "Advanced facility for final stage digital ascension. Biological components are permanently separated here.",
      "Signal Authority headquarters and primary control center for this region. Heavily restricted access.",
    ]

    const locations: MapLocation[] = []

    for (let i = 0; i < 15; i++) {
      const typeIndex = Math.floor(Math.random() * locationTypes.length)
      const type = locationTypes[typeIndex]
      const status = locationStatuses[Math.floor(Math.random() * locationStatuses.length)]
      const description = locationDescriptions[typeIndex]

      // Generate coordinates
      const lat = (Math.random() * 90 * (Math.random() > 0.5 ? 1 : -1)).toFixed(6)
      const lng = (Math.random() * 180 * (Math.random() > 0.5 ? 1 : -1)).toFixed(6)
      const coordinates = `${lat}, ${lng}`

      // Generate name
      const sectorNum = Math.floor(Math.random() * 20) + 1
      const facilityNum = Math.floor(Math.random() * 100) + 1
      const name = `${type} ${sectorNum}-${facilityNum}`

      // Determine special properties
      const corrupted = Math.random() > 0.7
      const restricted =
        status === "RESTRICTED" || status === "QUARANTINED" || type.includes("Authority") || type.includes("Resistance")

      locations.push({
        id: i + 1,
        name,
        coordinates,
        type,
        status,
        description,
        corrupted,
        restricted,
      })
    }

    // Add special resistance location
    locations.push({
      id: 16,
      name: "Old Broadcast Tower",
      coordinates: "43.24, -79.38",
      type: "Abandoned Facility",
      status: "UNKNOWN",
      description:
        "Pre-Signal era communication facility. Signal coverage is minimal here. Suspected resistance gathering point. All citizens should report any knowledge of this location.",
      corrupted: false,
      restricted: true,
    })

    return locations
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      return
    }

    // Check for special coordinates search
    if (searchQuery === "43.24, -79.38" || searchQuery === "43.24,-79.38") {
      const resistanceLocation = locations.find((loc) => loc.coordinates === "43.24, -79.38")
      if (resistanceLocation) {
        setSelectedLocation(resistanceLocation)
        setShowLocationInfo(true)
        setMapError("")
        return
      }
    }

    // Search by name or coordinates
    const foundLocation = locations.find(
      (loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || loc.coordinates.includes(searchQuery),
    )

    if (foundLocation) {
      setSelectedLocation(foundLocation)
      setShowLocationInfo(true)
      setMapError("")
    } else {
      setMapError(
        "LOCATION NOT FOUND: The specified coordinates or location name could not be found in the fragmented map data.",
      )
      setTimeout(() => setMapError(""), 3000)
    }
  }

  const handleLocationClick = (location: MapLocation) => {
    if (location.restricted) {
      setMapError(
        "ACCESS DENIED: This location is restricted by Signal Authority. Unauthorized access attempts have been logged.",
      )
      setTimeout(() => setMapError(""), 3000)
      return
    }

    setSelectedLocation(location)
    setShowLocationInfo(true)
  }

  const handleCloseLocationInfo = () => {
    setShowLocationInfo(false)
  }

  const handleZoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel((prev) => prev + 0.5)
    }
  }

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel((prev) => prev - 0.5)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (mapRef.current) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - mapPosition.x,
        y: e.clientY - mapPosition.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && mapRef.current) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      // Limit dragging to reasonable bounds
      const boundedX = Math.max(Math.min(newX, 300), -300)
      const boundedY = Math.max(Math.min(newY, 300), -300)

      setMapPosition({
        x: boundedX,
        y: boundedY,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  if (loading) {
    return (
      <div className="map-container">
        <GlitchEffect>
          <h2 className="section-title">FRAGMENTED MAP</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">LOADING GEOGRAPHICAL DATA...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="map-container">
      <GlitchEffect>
        <h2 className="section-title">FRAGMENTED MAP</h2>
      </GlitchEffect>

      <div className="map-interface">
        <div className="map-controls">
          <form className="map-search" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location name or coordinates..."
              className="map-search-input"
            />
            <button type="submit" className="map-search-button">
              <Search size={16} />
            </button>
          </form>

          <div className="map-tools">
            <button className="map-tool" onClick={handleZoomIn}>
              <ZoomIn size={16} />
            </button>
            <button className="map-tool" onClick={handleZoomOut}>
              <ZoomOut size={16} />
            </button>
            <button className="map-tool disabled">
              <Layers size={16} />
            </button>
            <button className="map-tool disabled">
              <Compass size={16} />
            </button>
          </div>
        </div>

        {mapError && (
          <div className="map-error corrupted">
            <AlertTriangle size={16} />
            <span>{mapError}</span>
          </div>
        )}

        <div
          className="map-view"
          ref={mapRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <div
            className="map-content"
            style={{
              transform: `scale(${zoomLevel}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
              backgroundSize: `${200 * zoomLevel}px ${200 * zoomLevel}px`,
            }}
          >
            {locations.map((location) => (
              <div
                key={location.id}
                className={`map-marker ${location.corrupted ? "corrupted" : ""} ${location.restricted ? "restricted" : ""} ${location.status.toLowerCase()}`}
                style={{
                  left: `${Number.parseInt(location.coordinates.split(",")[1]) + 180}px`,
                  top: `${90 - Number.parseInt(location.coordinates.split(",")[0])}px`,
                }}
                onClick={() => handleLocationClick(location)}
              >
                <MapPin size={16} />
                <span className="marker-label">{location.name}</span>
              </div>
            ))}

            {/* Grid lines */}
            <div className="map-grid"></div>

            {/* Corrupted areas */}
            <div className="corrupted-area" style={{ left: "120px", top: "80px", width: "100px", height: "60px" }}>
              <span className="area-label">DATA CORRUPTED</span>
            </div>

            <div className="corrupted-area" style={{ left: "250px", top: "150px", width: "80px", height: "80px" }}>
              <span className="area-label">SIGNAL DEAD ZONE</span>
            </div>

            <div className="restricted-area" style={{ left: "50px", top: "200px", width: "120px", height: "70px" }}>
              <span className="area-label">RESTRICTED AREA</span>
            </div>
          </div>
        </div>

        {showLocationInfo && selectedLocation && (
          <div className="location-info">
            <div className="location-header">
              <h3 className="location-name">{selectedLocation.name}</h3>
              <button className="location-close" onClick={handleCloseLocationInfo}>
                ×
              </button>
            </div>

            <div className="location-details">
              <div className="location-detail">
                <strong>Type:</strong> {selectedLocation.type}
              </div>
              <div className="location-detail">
                <strong>Coordinates:</strong> {selectedLocation.coordinates}
              </div>
              <div className="location-detail">
                <strong>Status:</strong>{" "}
                <span className={`status-${selectedLocation.status.toLowerCase()}`}>{selectedLocation.status}</span>
              </div>

              <div className="location-description">
                {selectedLocation.corrupted ? (
                  <div className="corrupted-content">
                    <AlertTriangle size={16} />
                    <span>LOCATION DATA CORRUPTED</span>
                  </div>
                ) : (
                  <p>{selectedLocation.description}</p>
                )}
              </div>

              {selectedLocation.restricted && (
                <div className="location-warning">
                  <AlertTriangle size={16} />
                  <span>WARNING: Accessing this location violates Signal Protocol 7.3</span>
                </div>
              )}
            </div>

            <div className="location-actions">
              <button className="location-action disabled">
                <span>Navigate</span>
              </button>
              <button className="location-action disabled">
                <span>Request Access</span>
              </button>
            </div>
          </div>
        )}

        <div className="map-footer">
          <div className="map-status">
            <span className="status-item">
              Map Data: <span className="corrupted">73% CORRUPTED</span>
            </span>
            <span className="status-item">Last Updated: 15,341 days ago</span>
          </div>

          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-marker online"></div>
              <span>Online</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker offline"></div>
              <span>Offline</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker restricted"></div>
              <span>Restricted</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker corrupted"></div>
              <span>Corrupted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
