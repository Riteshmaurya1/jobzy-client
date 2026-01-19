"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const Spotlight = ({ className, fill = "white" }) => {
    return (
        <svg
            className={cn(
                "animate-spotlight pointer-events-none absolute z-1 h-full w-full opacity-0",
                className
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
        >
            <g filter="url(#filter)">
                <ellipse cx="1894.5" cy="273" rx="1894.5" ry="273" fill={fill} />
            </g>
            <defs>
                <filter
                    id="filter"
                    x="0"
                    y="0"
                    width="3787"
                    height="2842"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="151" />
                </filter>
            </defs>
        </svg>
    );
};
