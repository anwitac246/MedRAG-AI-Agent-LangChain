'use client';
import { useRef, useEffect } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawCurve = (
      offset: number,
      amplitude: number,
      frequency: number,
      color: string,
      lineWidth: number,
      phase: number
    ) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;

      for (let x = 0; x <= w; x += 2) {
        const normalizedX = x / w;
        const y =
          h * offset +
          Math.sin(normalizedX * Math.PI * frequency + time * 0.4 + phase) * amplitude +
          Math.sin(normalizedX * Math.PI * frequency * 0.5 + time * 0.25 + phase * 1.3) * amplitude * 0.6 +
          Math.cos(normalizedX * Math.PI * 0.8 + time * 0.15) * amplitude * 0.3;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const lines = [
        { offset: 0.3, amp: 60, freq: 2.2, color: "rgba(0, 200, 120, 0.08)", width: 1.5, phase: 0 },
        { offset: 0.35, amp: 70, freq: 1.8, color: "rgba(0, 200, 120, 0.06)", width: 1, phase: 1 },
        { offset: 0.4, amp: 80, freq: 2.5, color: "rgba(0, 180, 130, 0.1)", width: 1.8, phase: 2 },
        { offset: 0.45, amp: 55, freq: 3.0, color: "rgba(0, 220, 100, 0.07)", width: 1, phase: 3 },
        { offset: 0.5, amp: 90, freq: 1.5, color: "rgba(0, 200, 120, 0.12)", width: 2, phase: 0.5 },
        { offset: 0.55, amp: 65, freq: 2.8, color: "rgba(100, 220, 180, 0.06)", width: 1, phase: 1.5 },
        { offset: 0.6, amp: 75, freq: 2.0, color: "rgba(0, 200, 120, 0.09)", width: 1.5, phase: 2.5 },
        { offset: 0.65, amp: 50, freq: 3.2, color: "rgba(0, 180, 140, 0.05)", width: 0.8, phase: 3.5 },
        { offset: 0.7, amp: 85, freq: 1.7, color: "rgba(0, 200, 120, 0.08)", width: 1.2, phase: 4 },
        { offset: 0.48, amp: 100, freq: 1.3, color: "rgba(180, 120, 255, 0.06)", width: 1.5, phase: 1.2 },
        { offset: 0.52, amp: 70, freq: 2.1, color: "rgba(180, 120, 255, 0.04)", width: 1, phase: 2.8 },
        { offset: 0.56, amp: 95, freq: 1.6, color: "rgba(220, 100, 180, 0.05)", width: 1.2, phase: 0.8 },
      ];

      for (const line of lines) {
        drawCurve(line.offset, line.amp, line.freq, line.color, line.width, line.phase);
      }

      time += 0.012;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

export default AnimatedBackground;
