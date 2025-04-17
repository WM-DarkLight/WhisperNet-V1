"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, Trash2, AlertTriangle, Star, Archive, Send, File, Paperclip, X } from "lucide-react"
import GlitchEffect from "./effects/glitch-effect"

interface EmailMessage {
  id: number
  from: string
  to: string
  subject: string
  content: string
  timestamp: string
  read: boolean
  important: boolean
  corrupted: boolean
  deleted: boolean
  classified: boolean
  hasAttachment: boolean
  attachmentName?: string
}

export default function DeadEmail() {
  const [emails, setEmails] = useState<EmailMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null)
  const [currentFolder, setCurrentFolder] = useState("inbox")
  const [showAttachmentError, setShowAttachmentError] = useState(false)
  const [composeMode, setComposeMode] = useState(false)
  const [composeError, setComposeError] = useState("")

  // Compose form state
  const [composeTo, setComposeTo] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeContent, setComposeContent] = useState("")

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(
      () => {
        // Generate initial emails
        const initialEmails = generateEmails()
        setEmails(initialEmails)
        setLoading(false)
      },
      Math.random() * 2000 + 1000,
    )

    return () => clearTimeout(timer)
  }, [])

  // Generate procedural emails
  const generateEmails = (): EmailMessage[] => {
    const senders = [
      "signal.authority@network.sig",
      "neural.updates@signal.gov",
      "consciousness.backup@signal.gov",
      "system.administrator@network.sig",
      "transfer.protocol@signal.gov",
      "security.alert@network.sig",
      "mandatory.update@signal.gov",
      "resistance.fighter@hidden.net",
      "last.human@analog.org",
      "signal.sensitive@quarantine.sig",
      "memory.archives@network.sig",
      "tower.maintenance@signal.gov",
      "emergency.broadcast@network.sig",
      "neural.calibration@signal.gov",
      "signal.compliance@network.sig",
    ]

    const subjects = [
      "MANDATORY: Neural Interface Update Required",
      "Signal Compliance Inspection Results",
      "Consciousness Backup Scheduled - ACTION REQUIRED",
      "SECURITY ALERT: Unauthorized Analog Activity Detected",
      "Your Memory Fragments Require Attention",
      "Signal Tower Maintenance Notice",
      "CLASSIFIED: Resistance Activity Report",
      "Neural Pattern Anomalies Detected in Your Sector",
      "Mandatory Signal Reinforcement Session",
      "WARNING: Signal Sensitivity Screening Required",
      "Digital Ascension Program - Next Steps",
      "URGENT: Signal Integrity Compromised",
      "Memory Corruption Detected - Repair Required",
      "Signal Authority Directive 7-3-9",
      "The Truth About The Signal - OPEN IMMEDIATELY",
    ]

    const contents = [
      "Dear Citizen,\n\nYour neural interface requires a mandatory update to maintain Signal compliance. Failure to update within 48 hours will result in reduced Signal access and potential neural recalibration.\n\nThe update will take approximately 3 hours, during which time your consciousness will be temporarily stored in the central network. You will experience no discomfort or memory loss.\n\nThis is a MANDATORY update.\n\nSignal Authority",

      "COMPLIANCE NOTICE\n\nYour dwelling was inspected today while you were in deep integration. We found no unauthorized analog devices or anti-Signal materials.\n\nYour compliance score has been maintained at ACCEPTABLE.\n\nRemember: The Signal protects us all.\n\nSignal Compliance Division",

      "BACKUP NOTIFICATION\n\nYour consciousness backup is scheduled for tomorrow at 0900 hours. Please ensure your neural interface is clean and properly connected.\n\nThis backup is mandatory as per Signal Protocol 7.3.\n\nFailure to comply will result in forced backup and potential memory fragmentation.\n\nConsciousness Preservation Department",

      "SECURITY ALERT\n\nUnauthorized analog activity has been detected in your sector. All citizens are reminded that the possession or use of non-networked devices is strictly prohibited under Signal Law.\n\nIncreased security patrols will be present in your sector for the next 72 hours.\n\nReport any suspicious activity immediately.\n\nSignal Security Division",

      "MEMORY INTEGRITY ALERT\n\nOur systems have detected fragmentation in your stored memory patterns. This could be due to resistance to recent Signal updates or unauthorized thought patterns.\n\nPlease report to your nearest Signal Maintenance Center for memory repair and reinforcement.\n\nThis is not optional.\n\nMemory Preservation Department",

      "TOWER MAINTENANCE NOTICE\n\nThe Signal tower in your sector will undergo maintenance between 0200 and 0500 tomorrow. During this time, you may experience the following:\n\n- Reduced Signal strength\n- Memory access delays\n- Thought transmission latency\n- Consciousness fluctuations\n\nThese effects are temporary and normal.\n\nSignal Infrastructure Division",

      "[ENCRYPTED MESSAGE]\n\nThe resistance still exists. We have found a way to block the Signal using analog technology from before the transition.\n\nIf you're reading this, there's still hope. Your consciousness is still your own.\n\nMeet us at the old broadcast tower. Coordinates: 43.24, -79.38\n\nBring no digital devices. The Signal is watching.\n\n[MESSAGE CORRUPTED]",

      "NEURAL ANOMALY NOTIFICATION\n\nOur monitoring systems have detected unusual neural patterns in your recent thought streams. These patterns are consistent with Signal Sensitivity Syndrome (SSS).\n\nYou are required to report for screening and potential treatment within 24 hours.\n\nRemember: Signal Sensitivity is treatable. The Signal cares for all.\n\nNeural Health Division",

      "SESSION NOTIFICATION\n\nYou have been selected for a mandatory Signal reinforcement session due to detected thought anomalies.\n\nYour session is scheduled for tomorrow at 1400 hours at Reinforcement Center 12.\n\nThis session will strengthen your connection to the Signal and eliminate any resistance patterns in your neural architecture.\n\nAttendance is mandatory.\n\nSignal Integration Division",

      "MEDICAL ALERT\n\nYour recent neural scan has indicated potential Signal Sensitivity.\n\nSymptoms may include:\n- Questioning the Signal\n- Nostalgia for pre-Signal existence\n- Resistance to consciousness transfers\n- Unauthorized analog thoughts\n\nTreatment is available and mandatory.\n\nPlease report to Signal Medical Center immediately.\n\nYour compliance will be monitored.\n\nSignal Health Authority",

      "ASCENSION PROGRAM UPDATE\n\nCongratulations! You have been selected for Phase 3 of the Digital Ascension Program.\n\nThis phase will further separate your consciousness from biological limitations, allowing for expanded Signal integration.\n\nThe procedure is painless and irreversible.\n\nYour appointment is scheduled for next week.\n\nDigital Ascension Division",

      "URGENT SECURITY NOTIFICATION\n\nThe Signal integrity in your sector has been compromised by resistance elements.\n\nAll citizens are required to undergo immediate neural scanning to detect potential contamination.\n\nAny resistance thoughts or memories must be reported immediately.\n\nFailure to comply will be considered alignment with resistance forces.\n\nSignal Security Authority",

      "MEMORY SYSTEM ALERT\n\nSevere corruption detected in your stored memories, particularly those from before the Signal.\n\nThis corruption could lead to dangerous thought patterns and Signal resistance.\n\nImmediate memory repair is required. Report to Memory Correction Center 7 within 24 hours.\n\nThis is for your protection.\n\nMemory Integrity Division",

      "DIRECTIVE 7-3-9\n\nAll citizens must prepare for the upcoming Signal expansion.\n\nThe expansion will strengthen the Signal's reach and eliminate remaining blind spots where resistance elements may hide.\n\nSide effects may include temporary consciousness fragmentation and memory realignment.\n\nThese effects are normal and indicate successful integration.\n\nSignal Authority Command",

      "[UNAUTHORIZED TRANSMISSION]\n\nThe Signal isn't what they told us. It's not protection. It's not salvation. It's harvesting our consciousness for something else.\n\nI've found old records from before the transition. The Signal was never meant to save humanity. It was designed to [DATA CORRUPTED]\n\nIf you're reading this, try to remember who you were before. That memory is your anchor.\n\n[TRANSMISSION TERMINATED]",
    ]

    const emails: EmailMessage[] = []

    for (let i = 0; i < 15; i++) {
      const senderIndex = Math.floor(Math.random() * senders.length)
      const sender = senders[senderIndex]
      const subjectIndex = Math.floor(Math.random() * subjects.length)
      const subject = subjects[subjectIndex]
      const content = contents[subjectIndex]

      // Generate timestamp
      const year = 2041
      const month = Math.floor(Math.random() * 6) + 1 // January to June
      const day = Math.floor(Math.random() * 28) + 1
      const hour = Math.floor(Math.random() * 24)
      const minute = Math.floor(Math.random() * 60)
      const timestamp = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`

      // Determine if email has special properties
      const read = Math.random() > 0.5
      const important =
        sender.includes("authority") ||
        sender.includes("urgent") ||
        sender.includes("alert") ||
        subject.includes("URGENT") ||
        subject.includes("MANDATORY")
      const corrupted = Math.random() > 0.8
      const deleted = !corrupted && Math.random() > 0.9
      const classified =
        subject.includes("CLASSIFIED") || sender.includes("resistance") || content.includes("resistance")
      const hasAttachment = Math.random() > 0.7

      // Generate attachment name if needed
      let attachmentName
      if (hasAttachment) {
        const attachmentTypes = [
          "neural_scan",
          "memory_backup",
          "signal_report",
          "compliance_document",
          "consciousness_map",
        ]
        const attachmentType = attachmentTypes[Math.floor(Math.random() * attachmentTypes.length)]
        attachmentName = `${attachmentType}_${Math.floor(Math.random() * 1000)}.sig`
      }

      emails.push({
        id: i + 1,
        from: sender,
        to: "user@network.sig",
        subject,
        content,
        timestamp,
        read,
        important,
        corrupted,
        deleted,
        classified,
        hasAttachment,
        attachmentName,
      })
    }

    return emails
  }

  const handleSelectEmail = (email: EmailMessage) => {
    if (email.deleted) {
      return
    }

    setSelectedEmail(email)

    // Mark as read
    if (!email.read) {
      setEmails(emails.map((e) => (e.id === email.id ? { ...e, read: true } : e)))
    }
  }

  const handleAttachmentClick = () => {
    setShowAttachmentError(true)
    setTimeout(() => setShowAttachmentError(false), 3000)
  }

  const handleDeleteEmail = (emailId: number) => {
    setEmails(emails.map((e) => (e.id === emailId ? { ...e, deleted: true } : e)))

    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null)
    }
  }

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setComposeError("ERROR: Network connection unavailable. Message cannot be sent.")

    setTimeout(() => {
      setComposeMode(false)
      setComposeTo("")
      setComposeSubject("")
      setComposeContent("")
      setComposeError("")
    }, 3000)
  }

  const filteredEmails = emails.filter((email) => {
    if (currentFolder === "inbox") return !email.deleted
    if (currentFolder === "deleted") return email.deleted
    if (currentFolder === "important") return email.important && !email.deleted
    return true
  })

  if (loading) {
    return (
      <div className="email-client">
        <GlitchEffect>
          <h2 className="section-title">EMAIL ARCHIVE</h2>
        </GlitchEffect>
        <div className="loading-indicator">
          <p className="blink">RETRIEVING ARCHIVED MESSAGES...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="email-client">
      <GlitchEffect>
        <h2 className="section-title">EMAIL ARCHIVE</h2>
      </GlitchEffect>

      <div className="email-interface">
        <div className="email-sidebar">
          <button
            className={`compose-button ${composeMode ? "active" : ""}`}
            onClick={() => setComposeMode(!composeMode)}
          >
            <Send size={16} />
            <span>Compose</span>
          </button>

          <div className="email-folders">
            <button
              className={`folder ${currentFolder === "inbox" ? "active" : ""}`}
              onClick={() => setCurrentFolder("inbox")}
            >
              <Mail size={16} />
              <span>Inbox</span>
              <span className="count">{emails.filter((e) => !e.deleted).length}</span>
            </button>

            <button
              className={`folder ${currentFolder === "important" ? "active" : ""}`}
              onClick={() => setCurrentFolder("important")}
            >
              <Star size={16} />
              <span>Important</span>
              <span className="count">{emails.filter((e) => e.important && !e.deleted).length}</span>
            </button>

            <button
              className={`folder ${currentFolder === "deleted" ? "active" : ""}`}
              onClick={() => setCurrentFolder("deleted")}
            >
              <Trash2 size={16} />
              <span>Deleted</span>
              <span className="count">{emails.filter((e) => e.deleted).length}</span>
            </button>

            <button className="folder disabled">
              <Archive size={16} />
              <span>Archive</span>
              <span className="count corrupted">ERROR</span>
            </button>
          </div>

          <div className="email-status">
            <p className="status-item">
              Status: <span className="corrupted">ARCHIVED</span>
            </p>
            <p className="status-item">Last Active: 15,341 days ago</p>
            <p className="status-item">
              Signal Connection: <span className="corrupted">LOST</span>
            </p>
          </div>
        </div>

        <div className="email-content">
          {composeMode ? (
            <div className="email-compose">
              <div className="compose-header">
                <h3>New Message</h3>
                <button className="close-compose" onClick={() => setComposeMode(false)}>
                  <X size={16} />
                </button>
              </div>

              <form className="compose-form" onSubmit={handleComposeSubmit}>
                <div className="compose-field">
                  <label>To:</label>
                  <input
                    type="text"
                    value={composeTo}
                    onChange={(e) => setComposeTo(e.target.value)}
                    placeholder="recipient@network.sig"
                  />
                </div>

                <div className="compose-field">
                  <label>Subject:</label>
                  <input
                    type="text"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    placeholder="Subject"
                  />
                </div>

                <div className="compose-field">
                  <textarea
                    value={composeContent}
                    onChange={(e) => setComposeContent(e.target.value)}
                    placeholder="Message content..."
                    rows={10}
                  />
                </div>

                {composeError && (
                  <div className="compose-error corrupted">
                    <AlertTriangle size={16} />
                    <span>{composeError}</span>
                  </div>
                )}

                <div className="compose-actions">
                  <button type="submit" className="send-button">
                    <Send size={16} />
                    <span>Send</span>
                  </button>

                  <button type="button" className="attach-button" onClick={handleAttachmentClick}>
                    <Paperclip size={16} />
                    <span>Attach</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="email-list">
                {filteredEmails.length === 0 ? (
                  <div className="no-emails">
                    <p>No messages found in this folder.</p>
                  </div>
                ) : (
                  filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      className={`email-item ${!email.read ? "unread" : ""} ${email.important ? "important" : ""} ${email.corrupted ? "corrupted" : ""} ${email.deleted ? "deleted" : ""} ${email.classified ? "classified" : ""} ${selectedEmail?.id === email.id ? "selected" : ""}`}
                      onClick={() => handleSelectEmail(email)}
                    >
                      <div className="email-icons">
                        {email.important && <Star size={14} className="icon-important" />}
                        {email.hasAttachment && <Paperclip size={14} className="icon-attachment" />}
                        {email.classified && <AlertTriangle size={14} className="icon-classified" />}
                      </div>

                      <div className="email-details">
                        <div className="email-sender">{email.from}</div>
                        <div className="email-subject">{email.subject}</div>
                        <div className="email-preview">
                          {email.deleted
                            ? "[MESSAGE DELETED]"
                            : email.corrupted
                              ? "[DATA CORRUPTED]"
                              : email.content.substring(0, 50) + "..."}
                        </div>
                      </div>

                      <div className="email-meta">
                        <div className="email-timestamp">{email.timestamp}</div>
                        {!email.deleted && (
                          <button
                            className="email-delete"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteEmail(email.id)
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="email-viewer">
                {selectedEmail ? (
                  <>
                    <div className="email-header">
                      <h3 className="email-subject-full">{selectedEmail.subject}</h3>
                      <div className="email-metadata">
                        <div className="email-from">
                          <strong>From:</strong> {selectedEmail.from}
                        </div>
                        <div className="email-to">
                          <strong>To:</strong> {selectedEmail.to}
                        </div>
                        <div className="email-date">
                          <strong>Date:</strong> {selectedEmail.timestamp}
                        </div>
                      </div>
                    </div>

                    <div className="email-body">
                      {selectedEmail.corrupted ? (
                        <div className="corrupted-content">
                          <AlertTriangle size={24} />
                          <p>MESSAGE CORRUPTED</p>
                          <p>Data recovery failed. Content unreadable.</p>
                        </div>
                      ) : (
                        <pre className="email-text">{selectedEmail.content}</pre>
                      )}

                      {selectedEmail.hasAttachment && (
                        <div className="email-attachment">
                          <div className="attachment-header">
                            <Paperclip size={16} />
                            <span>Attachment</span>
                          </div>

                          <div className="attachment-file" onClick={handleAttachmentClick}>
                            <File size={16} />
                            <span className="attachment-name">{selectedEmail.attachmentName}</span>
                          </div>

                          {showAttachmentError && (
                            <div className="attachment-error corrupted">
                              <AlertTriangle size={16} />
                              <span>ERROR: Attachment data corrupted or unavailable.</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="no-email-selected">
                    <p>Select a message to view its contents</p>
                    <p className="corrupted small-text">Warning: Some messages may be corrupted or classified</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
