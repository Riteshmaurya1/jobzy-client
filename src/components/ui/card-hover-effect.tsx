"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        title: string;
        description: string;
        icon?: React.ElementType; // Allow passing Icon component
        link?: string;
        color?: string; // Allow passing specific color string
        badge?: string | null;
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { theme } = useTheme();

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
                className
            )}
        >
            {items.map((item, idx) => {
                const Icon = item.icon;
                return (
                    <div
                        key={idx}
                        className="relative group block p-2 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className={cn(
                                        "absolute inset-0 h-full w-full block rounded-3xl",
                                        theme === 'dark' ? "bg-violet-500/20" : "bg-violet-200/50"
                                    )}
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <div className={cn(
                            "rounded-2xl h-full w-full p-4 overflow-hidden relative z-20 border transition-colors duration-200",
                            theme === 'dark' ? "bg-black border-white/[0.2] group-hover:border-violet-500/50" : "bg-white border-violet-100 group-hover:border-violet-300"
                        )}>
                            <div className="relative z-50">
                                <div className="p-4">
                                    {/* Badge Support */}
                                    {item.badge && (
                                        <div className="absolute top-4 right-4">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                                theme === 'dark' ? "bg-violet-500/20 text-violet-300" : "bg-violet-100 text-violet-600"
                                            )}>
                                                {item.badge}
                                            </span>
                                        </div>
                                    )}

                                    {Icon && (
                                        <div className={cn(
                                            "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                                            theme === 'dark' ? "bg-violet-500/10 text-violet-400" : "bg-violet-100 text-violet-600",
                                            // Optional: Allow item specific override if needed
                                            item.color === 'orange' && (theme === 'dark' ? "bg-orange-500/10 text-orange-400" : "bg-orange-100 text-orange-600"),
                                            item.color === 'green' && (theme === 'dark' ? "bg-green-500/10 text-green-400" : "bg-green-100 text-green-600")
                                        )}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    )}
                                    <h4 className={cn("font-bold tracking-wide mt-4", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>
                                        {item.title}
                                    </h4>
                                    <p className={cn("mt-4 tracking-wide leading-relaxed text-sm", theme === 'dark' ? "text-zinc-400" : "text-zinc-500")}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
