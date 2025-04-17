"use client"

import { useState, useEffect } from "react"
import { useNarrative } from "../narrative-system"
import { X } from "lucide-react"

interface MemoryFragmentProps {
  title: string
  content: string
  timestamp: string
  clueId?: string
  onClose: () => void
}

export default function MemoryFragment({ title, content, timestamp, clueId, onClose }: MemoryFragmentProps) {
  const { findClue } = useNarrative()
  const [isVisible, setIsVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false)

  // If this fragment contains a clue, register it as found
  useEffect(() => {
    if (clueId) {
      findClue(clueId)
    }
  }, [clueId, findClue])

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 500) // Match this with the CSS animation duration
  }

  // Auto-dismiss after a timeout if not manually dismissed
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, 20000) // 20 seconds auto-dismiss

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className={`memory-fragment ${isClosing ? "closing" : ""}`}>
      <div className="memory-fragment-content">
        <div className="memory-fragment-header">
          <h3>{title}</h3>
          <button className="memory-fragment-close" onClick={handleClose} aria-label="Close memory fragment">
            <X size={18} />
          </button>
        </div>
        <div className="memory-fragment-body">
          <p>{content}</p>
        </div>
        <div className="memory-fragment-footer">
          <span className="memory-fragment-timestamp">{timestamp}</span>
          <button className="memory-fragment-dismiss" onClick={handleClose}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
