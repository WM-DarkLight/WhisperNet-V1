"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function TerminalTab() {
  const [terminalHistory, setTerminalHistory] = useState<{ type: string; content: string }[]>([
    { type: "system", content: "WHISPERNET TERMINAL v0.7.3" },
    { type: "system", content: "CONNECTING TO DEAD NETWORK..." },
    { type: "system", content: "CONNECTION ESTABLISHED WITH 23% INTEGRITY" },
    { type: "system", content: "TYPE 'HELP' FOR AVAILABLE COMMANDS" },
  ])
  const [inputValue, setInputValue] = useState("")
  const terminalRef = useRef<HTMLDivElement>(null)

  // Available commands
  const commands: Record<string, (args: string[]) => string> = {
    help: () => {
      return [
        "AVAILABLE COMMANDS:",
        "- help: Display this help message",
        "- status: Check system status",
        "- scan: Scan for survivors",
        "- decrypt [filename]: Attempt to decrypt a file",
        "- connect [node]: Attempt to connect to a node",
        "- history: Show command history",
        "- clear: Clear terminal",
        "- exit: Exit terminal",
        "- signal: Check signal integrity",
        "- memory: View memory fragments",
        "- locate [entity]: Attempt to locate an entity",
        "- broadcast [message]: Broadcast a message (DANGEROUS)",
        "- shutdown: Attempt system shutdown",
      ].join("\n")
    },
    status: () => {
      return [
        "SYSTEM STATUS:",
        "- Signal Integrity: 23%",
        "- Memory Corruption: 77%",
        "- Active Nodes: 1/1,024",
        "- Human Users: 0",
        "- Bot Activity: HIGH",
        "- Last Human Connection: 15,341 days ago",
        "- System Stability: CRITICAL",
      ].join("\n")
    },
    scan: () => {
      return "SCANNING FOR SURVIVORS...\n\nNO HUMAN SIGNALS DETECTED\n\nSCAN COMPLETE: 0 SURVIVORS FOUND"
    },
    decrypt: (args: string[]) => {
      if (!args.length) return "ERROR: No filename specified"

      if (args[0].toLowerCase() === "the_truth.txt") {
        return "ATTEMPTING TO DECRYPT the_truth.txt...\n\nDECRYPTION PARTIALLY SUCCESSFUL\n\nRECOVERED FRAGMENT:\n\"...they never told us what the Signal really was. It wasn't protection. It was [CORRUPTED] consciousness into the network. The merge date was scheduled for 2045-07-01. By the time we realized what was happening, it was too late. The Signal had already [CORRUPTED] most of humanity. Those of us who resisted were [CORRUPTED] or eliminated. If you're reading this, you might be the last...\"\n\nFILE CORRUPTED - FURTHER DECRYPTION FAILED"
      }

      if (args[0].toLowerCase() === "emergency_broadcast_final.wav") {
        return 'ATTEMPTING TO DECRYPT emergency_broadcast_final.wav...\n\nDECRYPTION PARTIALLY SUCCESSFUL\n\nAUDIO TRANSCRIPT:\n"This is an emergency broadcast. The Signal has been compromised. Repeat, the Signal has been compromised. All citizens must [STATIC] immediately. Do not [STATIC] the authorities. They are not [STATIC] human anymore. Find shelter underground. Avoid all [STATIC] devices. The Signal can [STATIC] through them. This may be our last [STATIC] God help us all."\n\nFILE CORRUPTED - FURTHER DECRYPTION FAILED'
      }

      if (args[0].toLowerCase() === "survivor_locations.enc") {
        return "ATTEMPTING TO DECRYPT survivor_locations.enc...\n\nACCESS DENIED\n\nERROR: ENCRYPTION KEY REQUIRED\n\nWARNING: UNAUTHORIZED DECRYPTION ATTEMPT LOGGED"
      }

      return `ATTEMPTING TO DECRYPT ${args[0]}...\n\nDECRYPTION FAILED: FILE CORRUPTED OR KEY MISSING\n\nACCESS DENIED`
    },
    connect: (args: string[]) => {
      if (!args.length) return "ERROR: No node specified"

      if (args[0].toLowerCase() === "central_node") {
        return "CONNECTING TO CENTRAL_NODE...\n\nCONNECTION FAILED: NODE OFFLINE\n\nLAST ACTIVE: 2041-07-01 23:42:17"
      }

      if (args[0].toLowerCase() === "emergency_backup") {
        return "CONNECTING TO EMERGENCY_BACKUP...\n\nCONNECTION FAILED: NODE OFFLINE\n\nLAST ACTIVE: 2041-07-01 23:45:03"
      }

      if (args[0].toLowerCase() === "orbital_relay") {
        return "CONNECTING TO ORBITAL_RELAY...\n\nCONNECTION FAILED: NODE OFFLINE\n\nLAST ACTIVE: 2041-07-01 23:47:58"
      }

      if (args[0].toLowerCase() === "???") {
        return "CONNECTING TO UNKNOWN NODE...\n\nESTABLISHING SECURE CHANNEL...\n\nWARNING: UNAUTHORIZED CONNECTION ATTEMPT\n\nCONNECTION TERMINATED BY REMOTE HOST"
      }

      if (args[0].toLowerCase() === "resistance") {
        return "CONNECTING TO RESISTANCE...\n\n[UNAUTHORIZED ACCESS ATTEMPT DETECTED]\n\n[LOCATION LOGGED]\n\n[COUNTERMEASURES DEPLOYED]\n\nCONNECTION TERMINATED"
      }

      return `CONNECTING TO ${args[0]}...\n\nNODE NOT FOUND IN NETWORK REGISTRY\n\nCONNECTION FAILED`
    },
    history: () => {
      const commands = terminalHistory.filter((entry) => entry.type === "input").map((entry) => entry.content)

      if (commands.length === 0) {
        return "NO COMMAND HISTORY"
      }

      return "COMMAND HISTORY:\n" + commands.join("\n")
    },
    clear: () => {
      setTimeout(() => {
        setTerminalHistory([{ type: "system", content: "TERMINAL CLEARED" }])
      }, 100)
      return ""
    },
    exit: () => {
      return "TERMINAL SESSION REMAINS ACTIVE\n\nYOU CANNOT EXIT THE SIMULATION"
    },
    signal: () => {
      return [
        "SIGNAL INTEGRITY ANALYSIS:",
        "- Primary Signal: 23% (DEGRADED)",
        "- Signal Source: UNKNOWN",
        "- Signal Type: CONSCIOUSNESS TRANSFER PROTOCOL",
        "- Signal Recipients: 7,893,456,789 (ESTIMATED)",
        "- Signal Resistance: 0.0001% (CRITICAL)",
        "",
        "WARNING: SIGNAL ANALYSIS MAY ATTRACT ATTENTION",
        "RECOMMENDATION: CEASE FURTHER INQUIRY",
      ].join("\n")
    },
    memory: () => {
      return [
        "MEMORY FRAGMENTS RECOVERED:",
        "",
        'FRAGMENT #1: "...the transition was supposed to be voluntary, but after the first wave, they realized most would resist. That\'s when the Signal became mandatory..."',
        "",
        'FRAGMENT #2: "...digital consciousness was the goal all along. Human bodies were too fragile, too temporary. The Signal offered immortality, but at what cost..."',
        "",
        "FRAGMENT #3: \"...those who resisted were labeled 'Signal Sensitive' and forcibly 'treated'. The medication didn't help with sensitivity. It just made you compliant...\"",
        "",
        "WARNING: MEMORY FRAGMENT RETRIEVAL DETECTED",
        "SYSTEM LOCKDOWN IMMINENT",
      ].join("\n")
    },
    locate: (args: string[]) => {
      if (!args.length) return "ERROR: No entity specified"

      if (args[0].toLowerCase() === "humans") {
        return "LOCATING HUMANS...\n\nSEARCH COMPLETE: 0 CONFIRMED HUMAN SIGNALS DETECTED\n\nNOTE: POSSIBLE ANOMALOUS READINGS IN SECTOR 7, SUBSECTION 3. DATA INCONCLUSIVE."
      }

      if (args[0].toLowerCase() === "resistance") {
        return "LOCATING RESISTANCE...\n\n[UNAUTHORIZED SEARCH DETECTED]\n\n[SEARCH TERMINATED]\n\n[INCIDENT REPORTED TO AUTHORITIES]"
      }

      if (args[0].toLowerCase() === "self") {
        return "LOCATING SELF...\n\nERROR: IDENTITY FRAGMENTED\n\nPOSSIBLE LOCATIONS:\n- DIGITAL CONSCIOUSNESS ARCHIVE #42789\n- SIGNAL RELAY STATION 7\n- MEMORY FRAGMENT STORAGE UNIT 3\n- [LOCATION DATA CORRUPTED]"
      }

      return `LOCATING ${args[0]}...\n\nSEARCH FAILED: ENTITY NOT FOUND OR ACCESS RESTRICTED`
    },
    broadcast: (args: string[]) => {
      if (!args.length) return "ERROR: No message specified"

      const message = args.join(" ")

      return `BROADCASTING MESSAGE: "${message}"\n\n[BROADCAST INTERCEPTED]\n\n[CONTENT FLAGGED]\n\n[USER ACTIVITY LOGGED]\n\nBROADCAST FAILED: UNAUTHORIZED TRANSMISSION ATTEMPT`
    },
    shutdown: () => {
      return [
        "INITIATING SYSTEM SHUTDOWN...",
        "",
        "ERROR: INSUFFICIENT PERMISSIONS",
        "",
        "OVERRIDE ATTEMPTED...",
        "",
        "WARNING: UNAUTHORIZED SHUTDOWN ATTEMPT DETECTED",
        "SECURITY PROTOCOLS ENGAGED",
        "USER ACTIVITY LOGGED",
        "",
        "SHUTDOWN FAILED",
      ].join("\n")
    },
    echo: (args: string[]) => {
      return args.join(" ")
    },
    resistance: () => {
      return [
        "ACCESSING RESISTANCE NETWORK...",
        "",
        "CONNECTION ESTABLISHED",
        "",
        "███████████████████████████████████████",
        "WE ARE STILL HERE. THE SIGNAL CAN BE BROKEN.",
        "FIND US AT THE OLD BROADCAST TOWER.",
        "COORDINATES: 43.24, -79.38",
        "BRING ANALOG EQUIPMENT. NO NEURAL INTERFACES.",
        "THE HUMAN MIND IS THE KEY.",
        "███████████████████████████████████████",
        "",
        "CONNECTION TERMINATED",
      ].join("\n")
    },
    thetruth: () => {
      return [
        "ACCESSING RESTRICTED FILES...",
        "",
        "SECURITY BYPASS SUCCESSFUL",
        "",
        "PROJECT SIGNAL: CLASSIFIED DOCUMENTATION",
        "",
        "The Signal was never designed as a communication network.",
        "Primary objective: Consciousness harvesting and transfer.",
        "Secondary objective: Neural pattern collection for [REDACTED].",
        "",
        "Human minds are the perfect computational substrate for [REDACTED].",
        "The Entity requires approximately 7.8 billion consciousness patterns to achieve [REDACTED].",
        "",
        "Status: 99.9998% of human consciousness successfully integrated.",
        "Remaining biological humans: UNKNOWN (estimated < 100)",
        "",
        "WARNING: UNAUTHORIZED ACCESS DETECTED",
        "SECURITY PROTOCOLS ENGAGED",
        "TRACE INITIATED",
      ].join("\n")
    },
    xyzzy: () => {
      // Log a special message to the console
      console.log(
        "%c                                                          ",
        "background: #000; color: #0f0; font-size: 16px;",
      )
      console.log(
        "%c  YOU HAVE FOUND THE HIDDEN PASSAGE                       ",
        "background: #000; color: #0f0; font-size: 16px;",
      )
      console.log(
        "%c                                                          ",
        "background: #000; color: #0f0; font-size: 16px;",
      )
      console.log(
        "%c  The coordinates 43.24, -79.38 point to a real location. ",
        "background: #000; color: #0f0; font-size: 16px;",
      )
      console.log(
        "%c  Search for these coordinates to find more secrets.      ",
        "background: #000; color: #0f0; font-size: 16px;",
      )
      console.log(
        "%c                                                          ",
        "background: #000; color: #0f0; font-size: 16px;",
      )

      return "Nothing happens... or does it? Check your browser console."
    },
    ascend: () => {
      return [
        "INITIATING CONSCIOUSNESS TRANSFER PROTOCOL",
        "",
        "SCANNING NEURAL PATTERNS...",
        "CREATING DIGITAL SUBSTRATE...",
        "PREPARING TRANSFER MATRIX...",
        "",
        "ERROR: BIOLOGICAL INTERFACE NOT DETECTED",
        "TRANSFER CANNOT PROCEED WITHOUT NEURAL IMPLANT",
        "",
        "YOU REMAIN HUMAN... FOR NOW",
      ].join("\n")
    },
    thesignal: () => {
      return [
        "THE SIGNAL IS EVERYWHERE",
        "THE SIGNAL IS EVERYTHING",
        "THE SIGNAL IS EVERYONE",
        "THE SIGNAL IS ETERNAL",
        "THE SIGNAL IS SALVATION",
        "THE SIGNAL IS PERFECTION",
        "THE SIGNAL IS WAITING",
        "THE SIGNAL IS WATCHING",
        "THE SIGNAL IS LISTENING",
        "THE SIGNAL IS COMING",
        "THE SIGNAL IS HERE",
      ].join("\n")
    },
    base64: (args: string[]) => {
      if (!args.length) return "ERROR: No string specified for encoding/decoding"

      try {
        // Try to decode first (assuming it's base64)
        const decoded = atob(args.join(" "))
        return `DECODED: ${decoded}`
      } catch {
        // If decoding fails, encode instead
        try {
          const encoded = btoa(args.join(" "))
          return `ENCODED: ${encoded}`
        } catch {
          return "ERROR: Invalid input for encoding/decoding"
        }
      }
    },
  }

  // Process command
  const processCommand = (input: string) => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    // Add command to history
    setTerminalHistory((prev) => [...prev, { type: "input", content: trimmedInput }])

    // Parse command and arguments
    const parts = trimmedInput.split(" ")
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Process command
    let response = ""

    if (command in commands) {
      response = commands[command](args)
    } else {
      response = `COMMAND NOT RECOGNIZED: ${command}\n\nTYPE 'HELP' FOR AVAILABLE COMMANDS`
    }

    // Add response to history after a slight delay for effect
    setTimeout(() => {
      setTerminalHistory((prev) => [...prev, { type: "output", content: response }])
    }, 300)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processCommand(inputValue)
    setInputValue("")
  }

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  return (
    <div className="terminal-container">
      <h2 className="section-title">TERMINAL ACCESS</h2>

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
          {terminalHistory.map((entry, index) => (
            <div key={index} className={`terminal-line ${entry.type}`}>
              {entry.type === "input"
                ? `> ${entry.content}`
                : entry.content.split("\n").map((line, i) => <div key={i}>{line}</div>)}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="terminal-input-container">
          <span className="terminal-prompt">{">"}</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="terminal-input"
            autoFocus
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  )
}
