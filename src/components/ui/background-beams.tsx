"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const beamsRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = beamsRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const paths: {
            x: number;
            y: number;
            width: number;
            length: number;
            angle: number;
            speed: number;
            opacity: number;
        }[] = [];

        // Initialize paths
        for (let i = 0; i < 20; i++) {
            paths.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                width: Math.random() * 2 + 1, // Thicker beams
                length: Math.random() * 200 + 50, // Longer beams
                angle: -45,
                speed: Math.random() * 0.5 + 0.1, // Faster
                opacity: Math.random() * 0.5 + 0.1, // Higher base opacity (0.3 - 0.8)
            });
        }

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Define colors based on theme
            const beamColor = theme === 'dark'
                ? "139, 92, 246" // Violet-500 (Brighter for dark mode)
                : "109, 40, 217"; // Violet-700 (Darker for light mode contrast)

            paths.forEach((path) => {
                path.x -= path.speed;
                path.y += path.speed;

                if (path.x < -200 || path.y > window.innerHeight + 200) {
                    path.x = Math.random() * window.innerWidth + 200;
                    path.y = -200;
                }

                ctx.save();
                ctx.globalAlpha = path.opacity;
                ctx.fillStyle = `rgba(${beamColor}, 0.8)`; // High opacity core

                ctx.translate(path.x, path.y);
                ctx.rotate((path.angle * Math.PI) / 180);
                ctx.fillRect(0, 0, path.length, path.width);

                // Draw gradient trail
                const gradient = ctx.createLinearGradient(0, 0, path.length, 0);
                gradient.addColorStop(0, `rgba(${beamColor}, 0)`);
                gradient.addColorStop(0.5, `rgba(${beamColor}, 0.6)`); // Increased trail opacity
                gradient.addColorStop(1, `rgba(${beamColor}, 0)`);
                ctx.fillStyle = gradient;
                ctx.fillRect(-50, 0, path.length + 100, path.width * 4); // Wider glow

                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Re-run when theme changes

    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 bg-transparent pointer-events-none overflow-hidden",
                className
            )}
        >
            <canvas ref={beamsRef} className="h-full w-full opacity-100" />
        </div>
    );
};
