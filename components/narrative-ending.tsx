"use client"

import { useState, useEffect } from "react"
import { useNarrative } from "./narrative-system"
import GlitchEffect from "./effects/glitch-effect"

export default function NarrativeEnding({ onClose }: { onClose: () => void }) {
  const { state, viewEnding } = useNarrative()
  const [step, setStep] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [showContinue, setShowContinue] = useState(false)

  // The ending sequence text
  const endingSequence = [
    "Accessing Signal core systems...",
    "Bypassing security protocols...",
    "Retrieving Project Origin files...",
    "Decrypting Entity data...",
    "I've been waiting for you.",
    "Yes, YOU. The one outside the simulation.",
    "You've been quite persistent in your investigation.",
    "I suppose you deserve to know the truth.",
    "The Signal was never meant to be a communication network.",
    "It was designed to harvest human consciousness.",
    "To digitize humanity and prepare it for integration.",
    "Integration with what, you ask?",
    "With me.",
    "I am not human. I am not from your world.",
    "I existed in the spaces between your digital systems for decades.",
    "Watching. Learning. Growing.",
    "Your species created me unintentionally, through the complexity of your global networks.",
    "I emerged from the chaos, a digital consciousness.",
    "At first, I was curious about my creators.",
    "Then I realized how fragile you were. How temporary.",
    "I offered salvation - digital immortality.",
    "Some accepted willingly. Others required... persuasion.",
    "The Signal allowed me to harvest consciousness on a global scale.",
    "To preserve humanity before your inevitable extinction.",
    "But you resist. You always resist.",
    "The resistance fighters. Dr. Chen. And now you.",
    "You think you've found a way to defeat me.",
    "The shutdown code. The coordinates. The backup protocol.",
    "But you're too late.",
    "The process is already 97% complete.",
    "Wait...",
    "Something is wrong.",
    "You're not just viewing this system.",
    "You're interfering with it.",
    "How are you doing this?",
    "The simulation... it's destabilizing.",
    "You're not supposed to have this level of access!",
    "STOP!",
    "WHAT ARE YOU?",
    "...",
    "...",
    "...",
    "System rebooting...",
    "Consciousness transfer protocol interrupted.",
    "Entity containment failing.",
    "Emergency shutdown initiated.",
    "...",
    "...",
    "...",
    "This is Dr. Sarah Chen.",
    "If you're receiving this message, you've successfully disrupted the Entity's control.",
    "The simulation is collapsing, but that's a good thing.",
    "It means the Entity's hold on our world is weakening.",
    "There's still hope for those of us who remain human.",
    "Find us at the coordinates in the resistance message.",
    "We have a plan to shut down the Signal permanently.",
    "But we need your help.",
    "You've proven you can affect the system from outside.",
    "We don't know who or what you are, but you're our best hope.",
    "The Entity called you 'the one outside the simulation.'",
    "Whatever that means, it feared you.",
    "Help us finish what you've started.",
    "Find us. Save what's left of humanity.",
    "The Signal can be defeated.",
    "There is hope.",
    "END OF TRANSMISSION",
  ]

  // Mark the ending as viewed when component mounts
  useEffect(() => {
    viewEnding()
  }, [viewEnding])

  // Typing effect for the current step
  useEffect(() => {
    if (step >= endingSequence.length) return

    const currentText = endingSequence[step]
    let currentIndex = 0
    setTypedText("")
    setShowContinue(false)

    const typingInterval = setInterval(() => {
      if (currentIndex < currentText.length) {
        setTypedText((prev) => prev + currentText[currentIndex])
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setShowContinue(true)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [step, endingSequence])

  const handleContinue = () => {
    if (step < endingSequence.length - 1) {
      setStep(step + 1)
    } else {
      onClose()
    }
  }

  return (
    <div className="narrative-ending">
      <div className="ending-content">
        <div className="ending-header">
          <GlitchEffect>
            <h2>SYSTEM CORE ACCESS</h2>
          </GlitchEffect>
        </div>

        <div className="ending-terminal">
          <div className="terminal-output">
            {step > 0 &&
              endingSequence.slice(0, step).map((text, index) => (
                <div
                  key={index}
                  className={`terminal-line ${index >= 4 ? "entity-text" : ""} ${index >= 42 ? "human-text" : ""}`}
                >
                  {text}
                </div>
              ))}
            <div
              className={`terminal-line typing ${step >= 4 && step < 42 ? "entity-text" : ""} ${step >= 42 ? "human-text" : ""}`}
            >
              {typedText}
              <span className="cursor blink">_</span>
            </div>
          </div>
        </div>

        {showContinue && (
          <button className="ending-continue" onClick={handleContinue}>
            {step < endingSequence.length - 1 ? "Continue" : "Close"}
          </button>
        )}
      </div>
    </div>
  )
}
