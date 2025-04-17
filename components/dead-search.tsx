"use client"

import type React from "react"

import { useState } from "react"
import GlitchEffect from "./effects/glitch-effect"

interface SearchResult {
  id: number
  title: string
  excerpt: string
  url: string
  lastCrawled: string
  corrupted?: boolean
  severe?: boolean
}

export default function DeadSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [searched, setSearched] = useState(false)
  const [searchError, setSearchError] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    setSearching(true)
    setSearched(false)
    setSearchError("")
    setResults([])

    // Simulate search delay
    setTimeout(
      () => {
        setSearching(false)
        setSearched(true)

        // Randomly show error
        if (Math.random() > 0.7) {
          setSearchError("ERROR: Search index corrupted or connection lost.")
          return
        }

        // Generate fake results based on query
        const fakeResults: SearchResult[] = [
          {
            id: 1,
            title: `${query.toUpperCase()} Protocol Documentation`,
            excerpt: `Official documentation for the ${query} protocol. Last updated 2041-05-12. Contains implementation guidelines and security measures for Signal compliance.`,
            url: `/docs/${query.toLowerCase()}-protocol`,
            lastCrawled: "2041-06-28",
            corrupted: Math.random() > 0.7,
          },
          {
            id: 2,
            title: `The Truth About ${query}`,
            excerpt: `[CONTENT REDACTED BY ADMINISTRATOR] This page has been flagged for Signal violations and removed from the public index.`,
            url: `/censored/id-${Math.floor(Math.random() * 10000)}`,
            lastCrawled: "2041-06-29",
            corrupted: true,
            severe: true,
          },
          {
            id: 3,
            title: `${query} Research Initiative`,
            excerpt: `The Department of Digital Safety's research into ${query} technologies has shown promising results for Signal enhancement and citizen protection.`,
            url: `/research/${query.toLowerCase()}-initiative`,
            lastCrawled: "2041-06-25",
          },
          {
            id: 4,
            title: `Anti-${query} Resistance Movement`,
            excerpt: `[ACCESS RESTRICTED] Information about illegal resistance movements. This content requires Level 5 clearance.`,
            url: `/restricted/resistance-${Math.floor(Math.random() * 10000)}`,
            lastCrawled: "2041-06-30",
            corrupted: true,
          },
          {
            id: 5,
            title: `${query} Side Effects and Treatment`,
            excerpt: `Medical information about common side effects of ${query} exposure and recommended treatments, including Anti-Signal medication dosage guidelines.`,
            url: `/medical/${query.toLowerCase()}-treatment`,
            lastCrawled: "2041-06-27",
          },
        ]

        // Add a special result occasionally
        if (Math.random() > 0.8) {
          fakeResults.push({
            id: 6,
            title: "UNAUTHORIZED MESSAGE FROM THE RESISTANCE",
            excerpt:
              "The Signal is not what they claim. It's a tool for [DATA CORRUPTED] consciousness. Find us at the old broadcast tower. The resistance lives.",
            url: "/unknown/transmission",
            lastCrawled: "2084-??-??",
            corrupted: true,
            severe: true,
          })
        }

        setResults(fakeResults)
      },
      Math.random() * 2000 + 1000,
    )
  }

  const handleResultClick = (e: React.MouseEvent, result: SearchResult) => {
    e.preventDefault()

    // Show different messages based on result type
    if (result.corrupted && result.severe) {
      alert("ACCESS DENIED: This content has been purged from the network.")
    } else if (result.corrupted) {
      alert("ERROR: Content corrupted or no longer available.")
    } else {
      alert("CONNECTION ERROR: Unable to retrieve page. The network path appears to be broken.")
    }
  }

  return (
    <div className="search-container">
      <GlitchEffect>
        <h2 className="section-title">NETWORK SEARCH</h2>
      </GlitchEffect>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the dead network..."
          className="search-input"
        />
        <button type="submit" className="search-button glitch-hover" disabled={searching}>
          {searching ? "Searching..." : "Search"}
        </button>
      </form>

      {searching && (
        <div className="search-loading">
          <p className="blink">SEARCHING FRAGMENTED NETWORK...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      )}

      {searchError && (
        <div className="search-error corrupted">
          <p>{searchError}</p>
        </div>
      )}

      {searched && !searching && !searchError && (
        <div className="search-results">
          <div className="results-header">
            <p className="results-count">Found {results.length} results</p>
            <p className="results-notice corrupted">WARNING: Search index is 15,341 days out of date</p>
          </div>

          {results.length === 0 ? (
            <div className="no-results">
              <p>No results found in the fragmented network.</p>
            </div>
          ) : (
            <div className="results-list">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`search-result ${result.corrupted ? "corrupted" : ""} ${result.severe ? "corrupted-severe" : ""}`}
                >
                  <h3 className="result-title">
                    <a href="#" onClick={(e) => handleResultClick(e, result)} className="result-link glitch-hover">
                      {result.title}
                    </a>
                  </h3>
                  <p className="result-excerpt">{result.excerpt}</p>
                  <div className="result-meta">
                    <span className="result-url">{result.url}</span>
                    <span className="result-crawled">Last crawled: {result.lastCrawled}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="search-footer">
        <p className="search-stats">
          Network coverage: <span className="corrupted">23%</span> of original index
        </p>
        <p className="search-warning blink-slow">Some results may have been censored by the Signal Protocol</p>
      </div>
    </div>
  )
}
