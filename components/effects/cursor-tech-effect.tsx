"use client"

import { useState, useEffect, useRef } from "react"

interface CircuitLine {
  startX: number
  startY: number
  path: { x: number; y: number }[]
  progress: number
  maxLength: number
  opacity: number
  width: number
  lifespan: number
}

export default function CursorTechEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const circuitLinesRef = useRef<CircuitLine[]>([])
  const requestRef = useRef<number>()
  const lastSpawnTimeRef = useRef(0)

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Reduced delay between spawning lines (was 150ms, now 80ms)
      const now = Date.now()
      if (now - lastSpawnTimeRef.current > 80) {
        spawnCircuitLine(e.clientX, e.clientY)
        lastSpawnTimeRef.current = now
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  // Set up canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update circuit lines
      drawCircuitLines(ctx)

      // Continue animation
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  // Generate a new circuit line
  const spawnCircuitLine = (x: number, y: number) => {
    // Create 1-2 circuit lines (more often just 1 for subtlety)
    const count = Math.random() > 0.7 ? 2 : 1

    for (let i = 0; i < count; i++) {
      // Determine initial direction (0: right, 1: down, 2: left, 3: up)
      const direction = Math.floor(Math.random() * 4)

      // Create circuit with 2-3 segments (reduced from 2-4)
      const segments = Math.floor(Math.random() * 2) + 2
      // Shorter max length (was 10-25px, now 6-15px)
      const maxLength = Math.floor(Math.random() * 9) + 6

      const newLine: CircuitLine = {
        startX: x,
        startY: y,
        path: generateCircuitPath(x, y, direction, segments, maxLength),
        progress: 0,
        maxLength,
        // Reduced opacity (was 0.8, now 0.5)
        opacity: 0.5,
        // Thinner lines (was 0.5-1px, now 0.3-0.7px)
        width: Math.random() * 0.4 + 0.3,
        // Shorter lifespan for quicker animation (was 1.5-2.5s, now 0.8-1.5s)
        lifespan: Math.random() * 0.7 + 0.8,
      }

      circuitLinesRef.current.push(newLine)

      // Limit total number of lines for performance
      if (circuitLinesRef.current.length > 15) {
        // Reduced from 20
        circuitLinesRef.current.shift()
      }
    }
  }

  // Generate a path for the circuit line with right angles
  const generateCircuitPath = (
    x: number,
    y: number,
    initialDirection: number,
    segments: number,
    maxSegmentLength: number,
  ) => {
    const path: { x: number; y: number }[] = [{ x, y }]
    let currentX = x
    let currentY = y
    let currentDirection = initialDirection

    for (let i = 0; i < segments; i++) {
      // Determine segment length (2-maxSegmentLength pixels) (was 3-max)
      const length = Math.floor(Math.random() * (maxSegmentLength - 2)) + 2

      // Move in current direction
      switch (currentDirection) {
        case 0: // right
          currentX += length
          break
        case 1: // down
          currentY += length
          break
        case 2: // left
          currentX -= length
          break
        case 3: // up
          currentY -= length
          break
      }

      path.push({ x: currentX, y: currentY })

      // Change direction by 90 degrees (but don't go backwards)
      const turn = Math.random() > 0.5 ? 1 : 3 // turn right or left
      currentDirection = (currentDirection + turn) % 4
    }

    return path
  }

  // Draw the circuit lines
  const drawCircuitLines = (ctx: CanvasRenderingContext2D) => {
    const now = performance.now() / 1000 // seconds

    // Update and draw each circuit line
    circuitLinesRef.current = circuitLinesRef.current.filter((line) => {
      // Grow the line faster (was 0.01, now 0.02)
      line.progress += 0.02

      // Fade out when nearing end of lifespan
      if (line.progress > line.lifespan * 0.7) {
        line.opacity -= 0.04 // Faster fade (was 0.03)
      }

      if (line.opacity <= 0) return false

      // Calculate how much of the path to draw
      const progressRatio = Math.min(line.progress / line.lifespan, 1)
      const pathLength = line.path.length
      const segmentsToShow = Math.ceil(progressRatio * pathLength)

      if (segmentsToShow < 2) return true // Not visible yet

      // Draw the visible portion of the circuit
      ctx.beginPath()
      ctx.moveTo(line.path[0].x, line.path[0].y)

      for (let i = 1; i < segmentsToShow; i++) {
        ctx.lineTo(line.path[i].x, line.path[i].y)
      }

      // If partially through a segment, draw partial line
      if (segmentsToShow < pathLength) {
        const partialRatio = (progressRatio * pathLength) % 1
        const startPoint = line.path[segmentsToShow - 1]
        const endPoint = line.path[segmentsToShow]

        if (startPoint && endPoint) {
          const partialX = startPoint.x + (endPoint.x - startPoint.x) * partialRatio
          const partialY = startPoint.y + (endPoint.y - startPoint.y) * partialRatio
          ctx.lineTo(partialX, partialY)
        }
      }

      // Draw the line with reduced glow
      ctx.strokeStyle = `rgba(0, 150, 255, ${line.opacity})`
      ctx.lineWidth = line.width
      ctx.stroke()

      // Add very subtle glow (reduced opacity from 0.3 to 0.2)
      ctx.strokeStyle = `rgba(70, 180, 255, ${line.opacity * 0.2})`
      ctx.lineWidth = line.width + 0.3 // Reduced from 0.5
      ctx.filter = "blur(0.3px)" // Reduced from 0.5px
      ctx.stroke()
      ctx.filter = "none"

      // Add tiny nodes at corners (only at start and end for subtlety)
      for (let i = 0; i < segmentsToShow && i < line.path.length; i++) {
        // Only draw nodes at start, end, and occasionally at corners
        if (i === 0 || i === line.path.length - 1 || Math.random() > 0.7) {
          const point = line.path[i]
          ctx.beginPath()
          // Smaller nodes (was 0.8, now 0.6)
          ctx.arc(point.x, point.y, line.width * 0.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(100, 200, 255, ${line.opacity * 0.8})`
          ctx.fill()
        }
      }

      return line.progress < line.lifespan
    })
  }

  return (
    <canvas
      ref={canvasRef}
      className="cursor-tech-effect"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  )
}
