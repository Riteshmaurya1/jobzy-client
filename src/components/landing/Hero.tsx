"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Play, Sparkles, Users, BarChart3, TrendingUp } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { BackgroundRippleEffect } from "@/components/ui/ripple"

export function Hero() {
    const { theme } = useTheme()

    const stats = [
        { value: "500+", label: "active job seekers", icon: Users },
        { value: "10K+", label: "applications tracked", icon: BarChart3 },
        { value: "94%", label: "report better visibility", icon: TrendingUp },
    ]

    return (
        <section className={`
            relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 transition-colors overflow-hidden
            ${theme === 'dark' ? 'bg-black' : 'bg-[#FFFBF0]'}
        `}>
            {/* Interactive Background Boxes Ripple Effect */}
            <BackgroundRippleEffect
                rows={8}
                cols={16}
                cellSize={90}
                className="opacity-50"
            />

            {/* Gradient Overlays for depth */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top fade */}
                <div className={`absolute top-0 left-0 right-0 h-32 
                    ${theme === 'dark'
                        ? 'bg-gradient-to-b from-black to-transparent'
                        : 'bg-gradient-to-b from-[#FFFBF0] to-transparent'}
                `} />
                {/* Bottom fade */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 
                    ${theme === 'dark'
                        ? 'bg-gradient-to-t from-black to-transparent'
                        : 'bg-gradient-to-t from-[#FFFBF0] to-transparent'}
                `} />
                {/* Center radial glow */}
                <div className={`absolute inset-0 
                    ${theme === 'dark'
                        ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent'
                        : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200/40 via-transparent to-transparent'}
                `} />
            </div>

            {/* Content Container */}
            <div className="text-center max-w-4xl mx-auto relative z-10">

                {/* AI Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium relative
                        ${theme === 'dark'
                            ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20'
                            : 'bg-violet-100 text-violet-700 border border-violet-200'
                        }`}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.2, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`absolute inset-0 rounded-full blur-lg -z-10
                                ${theme === 'dark' ? 'bg-violet-500/30' : 'bg-violet-300/40'}
                            `}
                        />
                        <Sparkles className="h-4 w-4" />
                        <span>AI-powered job track copilot</span>
                    </div>
                </motion.div>

                {/* Main Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mb-6"
                >
                    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight
                        ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                    `}>
                        Land your next job
                        <br />
                        <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                            10x faster
                        </span>
                        {' '}with JobZy
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10
                        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                    `}
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Centralize all your applications, automate follow-ups, and get AI insights on
                    what to do next—without spreadsheets or chaos.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                >
                    {/* Primary CTA - Matching Navbar Style */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <a href="https://tr.ee/lZYoG2GxNR" target="_blank" rel="noopener noreferrer">
                            <Button
                                size="default"
                                className={`rounded-full px-6 py-3 text-sm font-medium backdrop-blur-xl saturate-200 contrast-150 transition-all duration-300 border-2
                                    ${theme === 'dark'
                                        ? 'bg-neutral-900/90 text-white border-violet-400/50 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.7)] hover:bg-neutral-800/90'
                                        : 'bg-white/90 text-neutral-900 border-violet-400/50 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] hover:bg-white'
                                    }`}
                            >
                                Get Early Access
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </a>
                    </motion.div>

                    {/* Secondary CTA - Similar Style with Orange Accent */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <a href="https://www.instagram.com/jobzy.in/" target="_blank" rel="noopener noreferrer">
                            <Button
                                size="default"
                                variant="ghost"
                                className={`rounded-full px-6 py-3 text-sm font-medium backdrop-blur-xl saturate-200 contrast-150 transition-all duration-300 border-2
                                    ${theme === 'dark'
                                        ? 'bg-neutral-900/90 text-white border-orange-400/50 shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.6)] hover:bg-neutral-800/90 hover:text-white'
                                        : 'bg-white/90 text-neutral-900 border-orange-400/50 shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] hover:bg-white hover:text-neutral-900'
                                    }`}
                            >
                                <Play className="mr-2 h-4 w-4" />
                                Watch 2 min demo
                            </Button>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Stats Bar - Visible on landing */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                        >
                            <span className={`text-xl sm:text-2xl font-bold
                                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                            `}>
                                {stat.value}
                            </span>
                            <span className={`text-xs sm:text-sm
                                ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}
                            `}>
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
