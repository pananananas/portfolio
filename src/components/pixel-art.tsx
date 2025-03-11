"use client"

import { useEffect, useRef } from "react"

export default function PixelArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = Math.min(800, window.innerWidth - 40)
      canvas.height = 300
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create brain-like pixel art
    const gridSize = 10
    const cols = Math.floor(canvas.width / gridSize)
    const rows = Math.floor(canvas.height / gridSize)

    // Clear canvas
    ctx.fillStyle = "#101010"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw brain-like pattern
    const centerX = Math.floor(cols / 2)
    const centerY = Math.floor(rows / 2)
    const maxRadius = Math.min(centerX, centerY) - 2

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Calculate distance from center
        const dx = x - centerX
        const dy = y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxRadius) {
          // Random chance to draw a pixel based on distance from center
          const chance = 1 - distance / maxRadius
          if (Math.random() < chance * 0.8) {
            // Determine color - mostly gray with occasional purple highlight
            const isHighlight = Math.random() < 0.05
            ctx.fillStyle = isHighlight ? "#5EEAD4" : `rgba(200, 200, 200, ${0.3 + Math.random() * 0.4})`
            ctx.fillRect(x * gridSize, y * gridSize, gridSize - 1, gridSize - 1)
          }
        }
      }
    }

    return () => window.removeEventListener("resize", setCanvasDimensions)
  }, [])

  return (
    <div className="flex justify-center my-8">
      <canvas
        ref={canvasRef}
        className="max-w-full"
        aria-label="Decorative pixel art representing a brain-like pattern"
      />
    </div>
  )
}

