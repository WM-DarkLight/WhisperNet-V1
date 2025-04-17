"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface AudioGlitchProps {
  glitchTypes?: string[]
}

export default function AudioGlitch({ glitchTypes = [] }: AudioGlitchProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentGlitch, setCurrentGlitch] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)

  // Audio context reference
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null)

  // Default glitch types if none provided
  const defaultGlitchTypes = ["static", "interference", "whispers", "signal_lost", "transmission"]

  // Use provided glitch types or defaults
  const availableGlitches = glitchTypes.length > 0 ? glitchTypes : defaultGlitchTypes

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

    // Create main gain node for volume control
    gainNodeRef.current = audioContextRef.current.createGain()
    gainNodeRef.current.gain.value = isMuted ? 0 : volume
    gainNodeRef.current.connect(audioContextRef.current.destination)

    // Set up random audio glitches
    const glitchInterval = setInterval(() => {
      // 10% chance of audio glitch
      if (Math.random() < 0.1) {
        playRandomGlitch()
      }
    }, 30000) // Check every 30 seconds

    return () => {
      clearInterval(glitchInterval)
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        stopCurrentSound()
        audioContextRef.current.close()
      }
    }
  }, [])

  // Update audio volume when volume state changes
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Generate white noise buffer
  const createNoiseBuffer = () => {
    if (!audioContextRef.current) return null

    const bufferSize = audioContextRef.current.sampleRate * 2 // 2 seconds of noise
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    return buffer
  }

  // Stop any currently playing sound
  const stopCurrentSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current.disconnect()
      oscillatorRef.current = null
    }

    if (noiseSourceRef.current) {
      noiseSourceRef.current.stop()
      noiseSourceRef.current.disconnect()
      noiseSourceRef.current = null
    }
  }

  // Play static noise
  const playStatic = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    stopCurrentSound()

    const noiseBuffer = createNoiseBuffer()
    if (!noiseBuffer) return

    const source = audioContextRef.current.createBufferSource()
    source.buffer = noiseBuffer

    // Create a bandpass filter for static effect
    const filter = audioContextRef.current.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = 1000
    filter.Q.value = 0.5

    // Connect nodes
    source.connect(filter)
    filter.connect(gainNodeRef.current)

    // Start playback
    source.start()
    noiseSourceRef.current = source

    // Stop after random duration between 1-3 seconds
    const duration = 1000 + Math.random() * 2000
    setTimeout(() => {
      if (noiseSourceRef.current === source) {
        stopCurrentSound()
        setIsPlaying(false)
        setCurrentGlitch(null)
      }
    }, duration)
  }

  // Play interference sound
  const playInterference = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    stopCurrentSound()

    // Create oscillator for interference tone
    const osc = audioContextRef.current.createOscillator()
    osc.type = "sawtooth"
    osc.frequency.value = 440

    // Create modulator for frequency
    const modulator = audioContextRef.current.createOscillator()
    modulator.frequency.value = 5

    const modulationGain = audioContextRef.current.createGain()
    modulationGain.gain.value = 100

    // Connect modulation
    modulator.connect(modulationGain)
    modulationGain.connect(osc.frequency)

    // Create distortion for interference effect
    const distortion = audioContextRef.current.createWaveShaper()
    function makeDistortionCurve(amount = 50) {
      const samples = 44100
      const curve = new Float32Array(samples)
      for (let i = 0; i < samples; ++i) {
        const x = (i * 2) / samples - 1
        curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x))
      }
      return curve
    }
    distortion.curve = makeDistortionCurve()

    // Connect nodes
    osc.connect(distortion)
    distortion.connect(gainNodeRef.current)

    // Start oscillators
    modulator.start()
    osc.start()
    oscillatorRef.current = osc

    // Frequency sweep
    osc.frequency.setValueAtTime(440, audioContextRef.current.currentTime)
    osc.frequency.linearRampToValueAtTime(880, audioContextRef.current.currentTime + 0.5)
    osc.frequency.linearRampToValueAtTime(220, audioContextRef.current.currentTime + 1.0)

    // Stop after random duration between 1-3 seconds
    const duration = 1000 + Math.random() * 2000
    setTimeout(() => {
      if (oscillatorRef.current === osc) {
        modulator.stop()
        stopCurrentSound()
        setIsPlaying(false)
        setCurrentGlitch(null)
      }
    }, duration)
  }

  // Play whispers sound
  const playWhispers = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    stopCurrentSound()

    const noiseBuffer = createNoiseBuffer()
    if (!noiseBuffer) return

    const source = audioContextRef.current.createBufferSource()
    source.buffer = noiseBuffer

    // Create filters for whisper effect
    const lowpass = audioContextRef.current.createBiquadFilter()
    lowpass.type = "lowpass"
    lowpass.frequency.value = 800
    lowpass.Q.value = 0.7

    const highpass = audioContextRef.current.createBiquadFilter()
    highpass.type = "highpass"
    highpass.frequency.value = 300

    // Create tremolo effect
    const tremolo = audioContextRef.current.createGain()
    const lfo = audioContextRef.current.createOscillator()
    lfo.type = "sine"
    lfo.frequency.value = 4 + Math.random() * 4 // 4-8 Hz tremolo

    const lfoGain = audioContextRef.current.createGain()
    lfoGain.gain.value = 0.4 // Depth of tremolo

    // Connect tremolo
    lfo.connect(lfoGain)
    lfoGain.connect(tremolo.gain)

    // Connect nodes
    source.connect(highpass)
    highpass.connect(lowpass)
    lowpass.connect(tremolo)
    tremolo.connect(gainNodeRef.current)

    // Start playback
    lfo.start()
    source.start()
    noiseSourceRef.current = source

    // Stop after random duration between 2-5 seconds
    const duration = 2000 + Math.random() * 3000
    setTimeout(() => {
      if (noiseSourceRef.current === source) {
        lfo.stop()
        stopCurrentSound()
        setIsPlaying(false)
        setCurrentGlitch(null)
      }
    }, duration)
  }

  // Play signal lost sound
  const playSignalLost = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    stopCurrentSound()

    // Create oscillator for tone
    const osc = audioContextRef.current.createOscillator()
    osc.type = "sine"

    // Create gain node for beeping effect
    const beepGain = audioContextRef.current.createGain()
    beepGain.gain.value = 0

    // Connect nodes
    osc.connect(beepGain)
    beepGain.connect(gainNodeRef.current)

    // Start oscillator
    osc.start()
    oscillatorRef.current = osc

    // Create beeping pattern
    const beepInterval = 200 // ms
    let beepCount = 0
    const maxBeeps = 5 + Math.floor(Math.random() * 5) // 5-10 beeps

    const beepTimer = setInterval(() => {
      if (beepCount >= maxBeeps || !audioContextRef.current) {
        clearInterval(beepTimer)
        if (oscillatorRef.current === osc) {
          stopCurrentSound()
          setIsPlaying(false)
          setCurrentGlitch(null)
        }
        return
      }

      const time = audioContextRef.current.currentTime
      beepGain.gain.setValueAtTime(1, time)
      beepGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1)

      // Decrease frequency with each beep
      osc.frequency.setValueAtTime(880 - beepCount * 80, time)

      beepCount++
    }, beepInterval)
  }

  // Play transmission sound
  const playTransmission = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    stopCurrentSound()

    // Create oscillator for carrier tone
    const carrier = audioContextRef.current.createOscillator()
    carrier.type = "sine"
    carrier.frequency.value = 1500

    // Create oscillator for modulator
    const modulator = audioContextRef.current.createOscillator()
    modulator.type = "sine"
    modulator.frequency.value = 50

    const modulationGain = audioContextRef.current.createGain()
    modulationGain.gain.value = 500

    // Connect modulation
    modulator.connect(modulationGain)
    modulationGain.connect(carrier.frequency)

    // Create filter
    const filter = audioContextRef.current.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = 1500
    filter.Q.value = 5

    // Connect nodes
    carrier.connect(filter)
    filter.connect(gainNodeRef.current)

    // Start oscillators
    modulator.start()
    carrier.start()
    oscillatorRef.current = carrier

    // Random frequency changes
    const changeFreq = () => {
      if (!audioContextRef.current || !carrier) return

      const time = audioContextRef.current.currentTime
      const newFreq = 1200 + Math.random() * 600
      carrier.frequency.exponentialRampToValueAtTime(newFreq, time + 0.1)
      filter.frequency.exponentialRampToValueAtTime(newFreq, time + 0.1)
    }

    // Change frequency a few times
    for (let i = 0; i < 5; i++) {
      setTimeout(changeFreq, 300 * i)
    }

    // Stop after random duration between 2-4 seconds
    const duration = 2000 + Math.random() * 2000
    setTimeout(() => {
      if (oscillatorRef.current === carrier) {
        modulator.stop()
        stopCurrentSound()
        setIsPlaying(false)
        setCurrentGlitch(null)
      }
    }, duration)
  }

  // Play a random audio glitch
  const playRandomGlitch = () => {
    if (!audioContextRef.current || isPlaying || isMuted) return

    // Resume audio context if it's suspended (browser autoplay policy)
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }

    // Select random glitch type
    const randomIndex = Math.floor(Math.random() * availableGlitches.length)
    const glitchType = availableGlitches[randomIndex]

    setIsPlaying(true)
    setCurrentGlitch(glitchType)

    // Play the selected glitch type
    switch (glitchType) {
      case "static":
        playStatic()
        break
      case "interference":
        playInterference()
        break
      case "whispers":
        playWhispers()
        break
      case "signal_lost":
        playSignalLost()
        break
      case "transmission":
        playTransmission()
        break
      default:
        playStatic()
    }
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (isPlaying && !isMuted) {
      stopCurrentSound()
      setIsPlaying(false)
      setCurrentGlitch(null)
    }
  }

  // Format glitch type name for display
  const formatGlitchName = (type: string): string => {
    return type.replace(/_/g, " ")
  }

  return (
    <div className="audio-glitch-container">
      <button className="audio-glitch-button" onClick={toggleMute}>
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        {isMuted ? "Audio Muted" : "Audio Enabled"}
      </button>

      {isPlaying && !isMuted && currentGlitch && (
        <div className="audio-glitch-button">
          <div className="audio-visualizer">
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
          </div>
          <span>{formatGlitchName(currentGlitch)}</span>
        </div>
      )}
    </div>
  )
}
