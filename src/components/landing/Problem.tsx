"use client"

import { motion } from "framer-motion"
import { FolderPlus, Brain, AlertTriangle, Shuffle } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { HoverEffect } from "@/components/ui/card-hover-effect"

export function Problem() {
    const { theme } = useTheme()
    const problems = [
        {
            icon: FolderPlus,
            title: "Applied to too many companies",
            description: "After 50+ applications, you can't remember which companies you've applied to, what positions you targeted, or when you sent them.",
            color: "violet"
        },
        {
            icon: Brain,
            title: "Forgot where you applied",
            description: "You get an interview invite but can't recall the job description, your application answers, or what you claimed your strengths were.",
            color: "orange"
        },
        {
            icon: AlertTriangle,
            title: "Missed interview dates",
            description: "Critical interview emails got buried in your inbox. By the time you saw it, the slot was gone and your chance disappeared.",
            color: "violet"
        },
        {
            icon: Shuffle,
            title: "Notes scattered everywhere",
            description: "Application details in email, interview prep in WhatsApp, company research in Notes app, compensation data in Excel. Nothing is together.",
            color: "orange"
        },
    ]

    return (
        <section className={`relative py-24 px-6 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-black' : 'bg-[#FFFBF0]'
            }`}>
            {/* Background decoration */}
            <div className={`absolute inset-0 -z-10 ${theme === 'dark' ? 'section-radial-violet' : ''}`}>
                {theme === 'light' && (
                    <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
                )}
            </div>

            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-8"
                >
                    <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        Why job hunting feels messy
                    </h2>
                    <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        If you've applied to dozens of jobs, you've probably felt this...
                    </p>
                </motion.div>

                {/* Problem Cards Grid - Using Aceternity HoverEffect with custom grid */}
                <HoverEffect
                    items={problems}
                    className="grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                />
            </div>
        </section>
    )
}
