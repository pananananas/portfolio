"use client";

import { useEffect, useRef, useState } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [initialHeightSet, setInitialHeightSet] = useState(false);

  useEffect(() => {
    // Set initial height only once after component mounts
    if (!initialHeightSet) {
      // Use window.innerHeight directly instead of vh units
      const height = Math.floor(window.innerHeight * (2 / 3));
      setContainerHeight(height);
      setInitialHeightSet(true);
    }
  }, [initialHeightSet]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on container's current dimensions
    const setCanvasSize = () => {
      // Use window.innerHeight directly instead of vh units
      const height = Math.floor(window.innerHeight * (2 / 3));

      // Get the device pixel ratio
      const dpr = window.devicePixelRatio || 1;

      // Set canvas dimensions to match container, accounting for device pixel ratio
      canvas.width = window.innerWidth * dpr;
      canvas.height = height * dpr;

      // Scale the canvas context to account for the pixel ratio
      ctx.scale(dpr, dpr);

      // Set the canvas display size through CSS
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${height}px`;
    };

    // Initial setup
    setCanvasSize();

    // Only update on window resize, not during scroll
    // Use a debounced resize listener to avoid frequent updates
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setCanvasSize();
      }, 150); // Debounce resize events
    };

    window.addEventListener("resize", handleResize);

    // Create stars
    const stars: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
    }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.7), // Keep stars in upper portion
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.001 + 0.0003, // Slow twinkle
      });
    }

    // Improved shooting stars
    const shootingStars: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      trail: { x: number; y: number; opacity: number }[];
    }[] = [];

    const createShootingStar = () => {
      if (Math.random() > 0.99) {
        // Less frequent shooting stars
        // Start position - anywhere along the top half of the screen
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height * 0.3);

        // Angle between 30 and 60 degrees (falling diagonally)
        const angle = (Math.random() * 30 + 30) * (Math.PI / 180);
        // Direction: 50% chance of falling left or right
        const direction = 1;

        // Calculate velocity components
        const speed = Math.random() * 3 + 2;
        const vx = Math.cos(angle) * speed * direction;
        const vy = Math.sin(angle) * speed;

        // Life determines how long the star will live
        const maxLife = Math.random() * 100 + 50;

        shootingStars.push({
          x: startX,
          y: startY,
          vx: vx,
          vy: vy,
          life: maxLife,
          maxLife: maxLife,
          size: Math.random() * 2 + 1,
          trail: [], // Will store the trail positions
        });
      }
    };

    // Animation loop
    const animate = () => {
      // Get current device pixel ratio in case it changed
      const dpr = window.devicePixelRatio || 1;

      // Reset transformation matrix before clearing and drawing
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply the scaling for high DPI again
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw dark blue background with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#000823");
      gradient.addColorStop(1, "#002b4d");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Slower twinkle effect
        star.opacity =
          Math.sin(Date.now() * star.twinkleSpeed + star.x) * 0.5 + 0.5;
      });

      // Create and update shooting stars
      createShootingStar();

      // Draw shooting stars
      shootingStars.forEach((star, index) => {
        // Update trail
        star.trail.unshift({ x: star.x, y: star.y, opacity: 1 });

        // Limit trail length
        if (star.trail.length > 20) {
          star.trail.pop();
        }

        // Draw trail
        star.trail.forEach((point, i) => {
          // Calculate opacity based on position in trail
          const opacity =
            (1 - i / star.trail.length) * (star.life / star.maxLife);

          // Draw trail segment
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = star.size * (1 - i / star.trail.length); // Trail gets thinner

          if (i < star.trail.length - 1) {
            // Fix for linter error - ensure next point exists
            const nextPoint = star.trail[i + 1];
            if (nextPoint) {
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(nextPoint.x, nextPoint.y);
              ctx.stroke();
            }
          }
        });

        // Draw the star head (brighter)
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.life / star.maxLife})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Add a glow effect
        ctx.beginPath();
        const glow = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 4,
        );
        glow.addColorStop(
          0,
          `rgba(255, 255, 255, ${(star.life / star.maxLife) * 0.5})`,
        );
        glow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = glow;
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Move shooting star
        star.x += star.vx;
        star.y += star.vy;
        star.life -= 1;

        // Remove if off screen or end of life
        if (
          star.x < 0 ||
          star.x > canvas.width ||
          star.y > canvas.height ||
          star.life <= 0
        ) {
          shootingStars.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [containerHeight]);

  return (
    <>
      <div
        ref={containerRef}
        className="absolute left-0 right-0 top-0 z-[-1] w-full overflow-hidden bg-[#001833]"
        style={{
          height: containerHeight > 0 ? `${containerHeight}px` : "66vh",
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="aurora-container absolute inset-0">
          <div className="aurora aurora-1" />
          <div className="aurora aurora-2" />
          <div className="aurora aurora-3" />
          <div className="aurora aurora-4" />
          <div className="aurora aurora-5" />
          <div className="aurora aurora-6" />
          <div className="aurora aurora-7" />
          <div className="aurora aurora-8" />
          <div className="aurora aurora-9" />
          <div className="aurora aurora-10" />
          <div className="aurora aurora-11" />
          <div className="aurora aurora-12" />
        </div>

        <div className="absolute inset-0 flex items-end justify-center">
          <div
            className="relative h-2/3 w-full md:max-w-2xl"
            style={{ maxHeight: "80%" }}
          >
            <img
              src="/me.svg"
              alt="Shadow silhouette"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#101010] to-transparent" />
      </div>

      <div
        className="absolute left-0 right-0 z-[-2] w-full bg-[#101010]"
        style={{
          top: containerHeight > 0 ? `${containerHeight}px` : "66vh",
          minHeight: "33vh",
        }}
      />
      <style jsx>{`
        .aurora-container {
          filter: blur(40px);
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        .aurora {
          position: absolute;
          height: 100%; /* Use 100% instead of 100vh */
          width: 100px;
          border-radius: 50% 50% 0 0;
          transform-origin: bottom center;
          animation-duration: 35s; /* Slower animation */
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          opacity: 0;
          bottom: 0; /* Position at bottom of container */
        }

        .aurora-1 {
          background: linear-gradient(
            180deg,
            rgba(0, 255, 209, 0) 0%,
            rgba(0, 255, 209, 0.5) 50%,
            rgba(0, 255, 209, 0) 100%
          );
          left: 10%;
          width: 150px;
          animation-name: aurora-movement-1;
          animation-delay: -1s;
        }

        .aurora-2 {
          background: linear-gradient(
            180deg,
            rgba(0, 255, 179, 0) 0%,
            rgba(0, 255, 179, 0.5) 50%,
            rgba(0, 255, 179, 0) 100%
          );
          left: 25%;
          width: 120px;
          animation-name: aurora-movement-2;
          animation-delay: -1s;
        }

        .aurora-3 {
          background: linear-gradient(
            180deg,
            rgba(0, 255, 149, 0) 0%,
            rgba(0, 255, 149, 0.5) 50%,
            rgba(0, 255, 149, 0) 100%
          );
          left: 40%;
          width: 180px;
          animation-name: aurora-movement-3;
          animation-delay: -1s;
        }

        .aurora-4 {
          background: linear-gradient(
            180deg,
            rgba(0, 255, 119, 0) 0%,
            rgba(0, 255, 119, 0.5) 50%,
            rgba(0, 255, 119, 0) 100%
          );
          left: 55%;
          width: 140px;
          animation-name: aurora-movement-4;
          animation-delay: -11s;
        }

        .aurora-5 {
          background: linear-gradient(
            180deg,
            rgba(0, 255, 89, 0) 0%,
            rgba(0, 255, 89, 0.5) 50%,
            rgba(0, 255, 89, 0) 100%
          );
          left: 70%;
          width: 160px;
          animation-name: aurora-movement-5;
          animation-delay: -11s;
        }

        .aurora-6 {
          background: linear-gradient(
            180deg,
            rgba(0, 255, 59, 0) 0%,
            rgba(0, 255, 59, 0.5) 50%,
            rgba(0, 255, 59, 0) 100%
          );
          left: 85%;
          width: 130px;
          animation-name: aurora-movement-6;
          animation-delay: -11s;
        }

        .aurora-7 {
          background: linear-gradient(
            180deg,
            rgba(0, 200, 255, 0) 0%,
            rgba(0, 200, 255, 0.5) 50%,
            rgba(0, 200, 255, 0) 100%
          );
          left: 20%;
          width: 140px;
          animation-name: aurora-movement-7;
          animation-delay: -1s;
        }

        .aurora-8 {
          background: linear-gradient(
            180deg,
            rgba(0, 150, 255, 0) 0%,
            rgba(0, 150, 255, 0.5) 50%,
            rgba(0, 150, 255, 0) 100%
          );
          left: 60%;
          width: 170px;
          animation-name: aurora-movement-8;
          animation-delay: -1s;
        }

        .aurora-9 {
          background: linear-gradient(
            180deg,
            rgba(0, 180, 255, 0) 0%,
            rgba(0, 180, 255, 0.4) 50%,
            rgba(0, 180, 255, 0) 100%
          );
          left: 15%;
          width: 145px;
          animation-name: aurora-movement-9;
          animation-delay: -1s;
        }

        .aurora-10 {
          background: linear-gradient(
            180deg,
            rgba(0, 220, 255, 0) 0%,
            rgba(0, 220, 255, 0.6) 50%,
            rgba(0, 220, 255, 0) 100%
          );
          left: 45%;
          width: 155px;
          animation-name: aurora-movement-10;
          animation-delay: -1s;
        }

        .aurora-11 {
          background: linear-gradient(
            180deg,
            rgba(0, 255, 230, 0) 0%,
            rgba(0, 255, 230, 0.5) 50%,
            rgba(0, 255, 230, 0) 100%
          );
          left: 75%;
          width: 165px;
          animation-name: aurora-movement-11;
          animation-delay: -11s;
        }

        .aurora-12 {
          background: linear-gradient(
            180deg,
            rgba(0, 255, 170, 0) 0%,
            rgba(0, 255, 170, 0.7) 50%,
            rgba(0, 255, 170, 0) 100%
          );
          left: 35%;
          width: 175px;
          animation-name: aurora-movement-12;
          animation-delay: -11s;
        }

        /* Media query for screens larger than the md breakpoint (768px) */
        @media (min-width: 768px) {
          .aurora-1 {
            width: calc(150px * 2.5);
          }

          .aurora-2 {
            width: calc(120px * 2.5);
          }

          .aurora-3 {
            width: calc(180px * 2.5);
          }

          .aurora-4 {
            width: calc(140px * 2.5);
          }

          .aurora-5 {
            width: calc(160px * 2.5);
          }

          .aurora-6 {
            width: calc(130px * 2.5);
          }

          .aurora-7 {
            width: calc(140px * 2.5);
          }

          .aurora-8 {
            width: calc(170px * 2.5);
          }

          .aurora-9 {
            width: calc(145px * 2.5);
          }

          .aurora-10 {
            width: calc(155px * 2.5);
          }

          .aurora-11 {
            width: calc(165px * 2.5);
          }

          .aurora-12 {
            width: calc(175px * 2.5);
          }
        }

        @keyframes aurora-movement-1 {
          0% {
            transform: translateX(-100vw) rotate(-5deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100vw) rotate(5deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-2 {
          0% {
            transform: translateX(-100vw) rotate(2deg);
            opacity: 0;
          }
          20% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(100vw) rotate(-2deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-3 {
          0% {
            transform: translateX(-100vw) rotate(-8deg);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.9;
          }
          100% {
            transform: translateX(100vw) rotate(8deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-4 {
          0% {
            transform: translateX(-100vw) rotate(5deg);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(100vw) rotate(-5deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-5 {
          0% {
            transform: translateX(-100vw) rotate(-3deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100vw) rotate(3deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-6 {
          0% {
            transform: translateX(-100vw) rotate(7deg);
            opacity: 0;
          }
          20% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(100vw) rotate(-7deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-7 {
          0% {
            transform: translateX(-100vw) rotate(-6deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(100vw) rotate(6deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-8 {
          0% {
            transform: translateX(-100vw) rotate(4deg);
            opacity: 0;
          }
          20% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translateX(100vw) rotate(-4deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-9 {
          0% {
            transform: translateX(-100vw) rotate(-12deg);
            opacity: 0;
          }
          15% {
            transform: translateX(-50vw) rotate(-5deg);
            opacity: 0.7;
          }
          85% {
            transform: translateX(50vw) rotate(5deg);
            opacity: 0.7;
          }
          100% {
            transform: translateX(100vw) rotate(12deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-10 {
          0% {
            transform: translateX(-100vw) rotate(10deg);
            opacity: 0;
          }
          15% {
            transform: translateX(-50vw) rotate(5deg);
            opacity: 0.8;
          }
          85% {
            transform: translateX(50vw) rotate(-5deg);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100vw) rotate(-10deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-11 {
          0% {
            transform: translateX(-100vw) rotate(-15deg);
            opacity: 0;
          }
          15% {
            transform: translateX(-50vw) rotate(-8deg);
            opacity: 0.6;
          }
          85% {
            transform: translateX(50vw) rotate(8deg);
            opacity: 0.6;
          }
          100% {
            transform: translateX(100vw) rotate(15deg);
            opacity: 0;
          }
        }

        @keyframes aurora-movement-12 {
          0% {
            transform: translateX(-100vw) rotate(18deg);
            opacity: 0;
          }
          15% {
            transform: translateX(-50vw) rotate(9deg);
            opacity: 0.9;
          }
          85% {
            transform: translateX(50vw) rotate(-9deg);
            opacity: 0.9;
          }
          100% {
            transform: translateX(100vw) rotate(-18deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
