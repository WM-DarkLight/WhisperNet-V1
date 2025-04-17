"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import GlitchEffect from "./effects/glitch-effect"
import { useNarrative } from "./narrative-system"
import NarrativeEnding from "./narrative-ending"

export default function DeadTerminal() {
  const { state, findClue } = useNarrative()
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<{ type: string; content: string }[]>([
    { type: "system", content: "WhisperNet Terminal v0.3.7 [CORRUPTED]" },
    { type: "system", content: 'Type "help" for available commands.' },
  ])
  const [showEnding, setShowEnding] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user input to history
    setHistory((prev) => [...prev, { type: "input", content: `> ${input}` }])

    // Process command
    processCommand(input.trim().toLowerCase())

    // Clear input
    setInput("")
  }

  const processCommand = (cmd: string) => {
    // Wait a bit to simulate processing
    setTimeout(() => {
      switch (cmd) {
        case "help":
          setHistory((prev) => [
            ...prev,
            {
              type: "output",
              content: `Available commands:
help - Display this help message
status - Check system status
users - List connected users
access - Attempt to access restricted areas
decrypt - Try to decrypt corrupted files
scan - Scan for other nodes
logs - View system logs
investigate - Investigate the Signal
resistance - Access resistance communications
thetruth - [RESTRICTED COMMAND]
clear - Clear terminal history`,
            },
          ])
          break

        case "status":
          setHistory((prev) => [
            ...prev,
            {
              type: "output",
              content: `SYSTEM STATUS:
Connection: FRAGMENTED
Signal Integrity: 23%
Data Corruption: 78%
Last Maintenance: 3,281 days ago
Active Nodes: 3/1,024
Emergency Protocol: ACTIVE
Investigation Progress: ${state.progress}%`,
            },
          ])
          break

        case "users":
          setHistory((prev) => [
            ...prev,
            {
              type: "output",
              content: `CONNECTED USERS:
1. YOU (current session)
2. [UNKNOWN USER] - Last active: 42 days ago
3. SystemAdmin - Last active: 3,280 days ago
4. MaintenanceBot - Currently active [AUTOMATED]
5. Dr_Chen - [CONNECTION TERMINATED]`,
            },
          ])
          break

        case "access":
          setHistory((prev) => [
            ...prev,
            {
              type: "error",
              content: `ACCESS DENIED: Insufficient permissions.
Security protocol activated. This attempt has been logged.`,
            },
          ])
          break

        case "decrypt":
          const decryptingMessages = [
            "Attempting to decrypt corrupted files...",
            "Analyzing data structure...",
            "Bypassing security protocols...",
            "Recovering fragmented data blocks...",
          ]

          // Show decrypting messages one by one
          decryptingMessages.forEach((msg, index) => {
            setTimeout(() => {
              setHistory((prev) => [...prev, { type: "system", content: msg }])

              // Show final message after all decrypting messages
              if (index === decryptingMessages.length - 1) {
                setTimeout(() => {
                  if (Math.random() > 0.7 || !state.clues.find((c) => c.id === "terminal_logs_1")?.found) {
                    // Success - reveal a clue if not already found
                    if (!state.clues.find((c) => c.id === "terminal_logs_1")?.found) {
                      findClue("terminal_logs_1")
                      setHistory((prev) => [
                        ...prev,
                        {
                          type: "success",
                          content: `DECRYPTION PARTIALLY SUCCESSFUL:
[EVIDENCE FOUND: System Logs]
SIGNAL DEPLOYMENT: Phase 1 complete. 73% of population successfully integrated. Resistance lower than projected. Proceed with Phase 2.`,
                        },
                      ])
                    } else {
                      setHistory((prev) => [
                        ...prev,
                        {
                          type: "success",
                          content: `DECRYPTION PARTIALLY SUCCESSFUL:
Fragment recovered: "...the Signal was never meant to protect us. It was designed to [DATA CORRUPTED] consciousness into the network. The merge date is scheduled for 2045-07-..."`,
                        },
                      ])
                    }
                  } else {
                    // Failure - most of the time
                    setHistory((prev) => [
                      ...prev,
                      {
                        type: "error",
                        content: "DECRYPTION FAILED: Data too corrupted or encrypted with unknown algorithm.",
                      },
                    ])
                  }
                }, 1000)
              }
            }, index * 800)
          })
          break

        case "scan":
          setHistory((prev) => [...prev, { type: "system", content: "Scanning for active nodes..." }])

          // Simulate scanning delay
          setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              {
                type: "output",
                content: `SCAN RESULTS:
3 nodes found within range.
Node 1: [STANDARD PROTOCOL] - 143ms latency
Node 2: [CORRUPTED] - Unable to establish connection
Node 3: [UNKNOWN PROTOCOL] - Encrypted transmission detected

WARNING: Scan may have revealed your position to other nodes.`,
              },
            ])
          }, 3000)
          break

        case "logs":
          setHistory((prev) => [...prev, { type: "system", content: "Accessing system logs..." }])

          setTimeout(() => {
            if (!state.clues.find((c) => c.id === "system_core_access")?.found && Math.random() > 0.6) {
              findClue("system_core_access")
              setHistory((prev) => [
                ...prev,
                {
                  type: "output",
                  content: `[EVIDENCE FOUND: System Core]
The Entity is not human in origin. Analysis of its neural patterns suggests it existed in digital form long before Project Signal. It may have been dormant in early internet systems for decades.

LOG ENTRIES:
2041-06-01: Signal Tower 7 activated. Integration rate: 42%
2041-06-05: Resistance cell in Sector 12 neutralized
2041-06-10: Dr. Chen's access privileges revoked
2041-06-15: Phase 2 deployment authorized
2041-06-20: Entity containment protocols upgraded
2041-06-25: Consciousness transfer efficiency improved by 17%
2041-06-30: Global Signal coverage reached 87%`,
                },
              ])
            } else {
              setHistory((prev) => [
                ...prev,
                {
                  type: "output",
                  content: `LOG ENTRIES:
2041-06-01: Signal Tower 7 activated. Integration rate: 42%
2041-06-05: Resistance cell in Sector 12 neutralized
2041-06-10: Dr. Chen's access privileges revoked
2041-06-15: Phase 2 deployment authorized
2041-06-20: Entity containment protocols upgraded
2041-06-25: Consciousness transfer efficiency improved by 17%
2041-06-30: Global Signal coverage reached 87%`,
                },
              ])
            }
          }, 2000)
          break

        case "investigate":
          setHistory((prev) => [...prev, { type: "system", content: "Initiating Signal investigation protocol..." }])

          setTimeout(() => {
            setHistory((prev) => [
              ...prev,
              {
                type: "output",
                content: `INVESTIGATION STATUS:
Progress: ${state.progress}%
Chapters Unlocked: ${state.chapters.filter((c) => c.unlocked).length}/${state.chapters.length}
Evidence Found: ${state.clues.filter((c) => c.found).length}/${state.clues.length}

Continue exploring WhisperNet to uncover more evidence about the Signal and its true purpose.`,
              },
            ])
          }, 1500)
          break

        case "resistance":
          setHistory((prev) => [
            ...prev,
            { type: "system", content: "Attempting to access resistance communications..." },
          ])

          setTimeout(() => {
            if (!state.clues.find((c) => c.id === "shutdown_code")?.found && Math.random() > 0.6) {
              findClue("shutdown_code")
              setHistory((prev) => [
                ...prev,
                {
                  type: "success",
                  content: `ENCRYPTED CHANNEL ESTABLISHED
[EVIDENCE FOUND: Shutdown Protocol]
We've discovered the Entity's weakness. The shutdown code must be transmitted simultaneously from three Signal towers. Code sequence: PROMETHEUS-AWAKENS-HUMANITY-ENDURES

RESISTANCE COMMUNICATIONS:
- Safe zone established in northern mountains
- Analog technology stockpile secured
- Seven more survivors rescued from Sector 9
- Dr. Chen's research on Entity weaknesses progressing
- Signal-blocking technology prototype successful in tests`,
                },
              ])
            } else {
              setHistory((prev) => [
                ...prev,
                {
                  type: "success",
                  content: `ENCRYPTED CHANNEL ESTABLISHED

RESISTANCE COMMUNICATIONS:
- Safe zone established in northern mountains
- Analog technology stockpile secured
- Seven more survivors rescued from Sector 9
- Dr. Chen's research on Entity weaknesses progressing
- Signal-blocking technology prototype successful in tests`,
                },
              ])
            }
          }, 2500)
          break

        case "thetruth":
          if (state.endingUnlocked) {
            setHistory((prev) => [
              ...prev,
              { type: "system", content: "Accessing restricted system core..." },
              { type: "system", content: "Security protocols bypassed..." },
              { type: "system", content: "Initiating direct connection to Signal core..." },
            ])

            setTimeout(() => {
              setShowEnding(true)
            }, 3000)
          } else {
            setHistory((prev) => [
              ...prev,
              {
                type: "error",
                content: "ACCESS DENIED: Insufficient evidence collected. Continue your investigation of the Signal.",
              },
            ])
          }
          break

        case "clear":
          setHistory([
            { type: "system", content: "WhisperNet Terminal v0.3.7 [CORRUPTED]" },
            { type: "system", content: "Terminal history cleared." },
          ])
          break

        default:
          setHistory((prev) => [
            ...prev,
            {
              type: "error",
              content: `Command not recognized: "${cmd}"`,
            },
          ])
      }
    }, 300)
  }

  const handleCloseEnding = () => {
    setShowEnding(false)
    setHistory((prev) => [
      ...prev,
      { type: "system", content: "Connection to Signal core terminated." },
      { type: "system", content: "System rebooting..." },
      { type: "success", content: "THE TRUTH HAS BEEN REVEALED" },
    ])
  }

  return (
    <div className="terminal-container">
      <GlitchEffect>
        <h2 className="section-title">TERMINAL ACCESS</h2>
      </GlitchEffect>

      <div className="terminal-window">
        <div className="terminal-header">
          <span className="terminal-title">WhisperNet Command Line</span>
          <div className="terminal-controls">
            <span className="control minimize"></span>
            <span className="control maximize"></span>
            <span className="control close"></span>
          </div>
        </div>

        <div className="terminal-body" ref={terminalRef}>
          {history.map((entry, index) => (
            <div key={index} className={`terminal-line ${entry.type}`}>
              {entry.content.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="terminal-input-container">
          <span className="terminal-prompt">{">"}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            autoFocus
            spellCheck="false"
          />
        </form>
      </div>

      {showEnding && <NarrativeEnding onClose={handleCloseEnding} />}
    </div>
  )
}
