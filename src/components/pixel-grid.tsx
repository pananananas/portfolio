"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useMediaQuery } from "react-responsive";

const PixelGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  // Base canvas size that will be scaled based on screen size
  const baseCanvasSize = 300;
  const canvasSize = useMemo(
    () => (isLargeScreen ? baseCanvasSize * 1.5 : baseCanvasSize),
    [isLargeScreen],
  );

  // Memoize pixel rendering constants to prevent unnecessary recalculations
  const renderConstants = useMemo(() => {
    // Adjust pixel size based on screen size
    const basePixelSize = 4;
    const pixelSize = isLargeScreen ? basePixelSize * 2 : basePixelSize;
    const gap = isLargeScreen ? 4 : 3;

    // Keep grid size consistent regardless of screen size
    const gridSize = 100;
    // Only render the bottom half of the grid
    const startRow = Math.floor(gridSize / 2);

    return { pixelSize, gap, gridSize, startRow };
  }, [isLargeScreen]);

  // Special colors for random pixels - memoize to prevent recreation
  const specialColors = useMemo(() => ["#5EEAD4", "#d1875c", "#c379ea"], []);
  const specialColorChance = 0.001;

  // Animation speed control (higher = faster)
  const animationSpeed = 0.007;

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: canvasSize,
      height: canvasSize / 2, // Only render bottom half
    });
  }, [canvasSize]);

  // Memoize animation functions to prevent recreating them on each render
  const getCircleRadius = useCallback(
    (frame: number) => {
      const minRadius = canvasSize * 0.2;
      const maxRadius = canvasSize * 0.5;
      const amplitude = (maxRadius - minRadius) / 2;
      const centerRadius = minRadius + amplitude;
      return centerRadius + amplitude * Math.sin(frame * animationSpeed);
    },
    [canvasSize, animationSpeed],
  );

  const isInsideCircle = useCallback(
    (
      x: number,
      y: number,
      radius: number,
      centerX: number,
      centerY: number,
    ) => {
      const dx = x - centerX;
      const dy = y - centerY;
      return dx * dx + dy * dy <= radius * radius;
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set the canvas size with device pixel ratio for higher resolution
    const dpr = window.devicePixelRatio ?? 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;

    // Set the display size
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale all drawing operations by the device pixel ratio
    ctx.scale(dpr, dpr);

    const { pixelSize, gap, gridSize, startRow } = renderConstants;

    // Only need to track opacities for the visible half
    const visibleRows = gridSize - startRow;

    // Create these arrays only once per effect run with proper typing
    const pixelOpacities = Array.from<number>({
      length: visibleRows * gridSize,
    }).fill(0);
    const pixelColorIndices = Array.from<number>({
      length: visibleRows * gridSize,
    }).fill(-1); // -1 means default color
    let frameCount = 0;

    const drawPixels = (_radius: number) => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Only render from startRow to gridSize
      for (let y = startRow; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const index = (y - startRow) * gridSize + x;

          // Skip rendering pixels with zero opacity for performance
          if (pixelOpacities[index] === 0) continue;

          const colorIndex = pixelColorIndices[index] ?? -1;
          if (colorIndex >= 0 && colorIndex < specialColors.length) {
            // Use special color with the same opacity
            const hexOpacity = Math.round((pixelOpacities[index] ?? 0) * 255)
              .toString(16)
              .padStart(2, "0");
            const color = specialColors[colorIndex] ?? "#5EEAD4";
            ctx.fillStyle = `${color}${hexOpacity}`;
          } else {
            // Use default color with the calculated opacity
            ctx.fillStyle = `rgba(200, 200, 200, ${pixelOpacities[index] ?? 0})`;
          }

          ctx.fillRect(
            x * (pixelSize + gap),
            (y - startRow) * (pixelSize + gap),
            pixelSize,
            pixelSize,
          );
        }
      }
    };

    const updatePixels = (radius: number) => {
      const visibleRows = gridSize - startRow;
      const pixelsToUpdate = Math.floor(visibleRows * gridSize * 0.2);
      const centerX = dimensions.width / 2;
      const centerY = 0; // Place center at the top of our visible area

      for (let i = 0; i < pixelsToUpdate; i++) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * visibleRows) + startRow;
        const index = (y - startRow) * gridSize + x;
        const pixelCenterX = x * (pixelSize + gap) + pixelSize / 2;
        const pixelCenterY = (y - startRow) * (pixelSize + gap) + pixelSize / 2;

        if (
          isInsideCircle(pixelCenterX, pixelCenterY, radius, centerX, centerY)
        ) {
          pixelOpacities[index] = Math.random() * 0.6 + 0.2; // Random opacity between 0.2 and 0.8

          // Small chance to make this pixel a special color
          if (Math.random() < specialColorChance) {
            // Randomly select one of the special colors
            pixelColorIndices[index] = Math.floor(
              Math.random() * specialColors.length,
            );
          } else {
            pixelColorIndices[index] = -1; // Default color
          }
        } else {
          pixelOpacities[index] = 0; // Set opacity to 0 for pixels outside the circle
          pixelColorIndices[index] = -1; // Reset to default color for pixels outside the circle
        }
      }
    };

    const animate = () => {
      frameCount++;
      const radius = getCircleRadius(frameCount);

      // Update pixels every 5th frame for better performance
      if (frameCount % 5 === 0) {
        updatePixels(radius);
      }

      drawPixels(radius);
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation and store the reference
    animationRef.current = requestAnimationFrame(animate);

    // Proper cleanup function that cancels the animation frame
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    dimensions,
    renderConstants,
    specialColors,
    isInsideCircle,
    getCircleRadius,
  ]);

  return (
    <div className="bottom-[3px] left-0 z-10 w-full rotate-180">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        aria-label="Pixel grid animation with pulsating circle"
        role="img"
        className="mx-auto"
      />
    </div>
  );
};

export default PixelGrid;
