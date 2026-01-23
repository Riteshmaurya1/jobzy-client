"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export function BuilderStory() {
    const { theme } = useTheme()

    // Combined text for the generate effect to read as one cohesive story
    const storyText = "No fancy office. No fancy setup. Just a solo developer who faced this problem during job hunting and decided to build a simple solution. JobZy isn't backed by investors or built by a big team. It's a real tool, built by someone who needed it, for others facing the same struggle. I've been there — applying to hundreds of jobs, losing track, missing opportunities. I built JobZy for me first. Now I'm sharing it with you."

    return (
        <section className={`relative py-24 px-6 transition-colors ${theme === 'dark'
            ? 'bg-black border-gray-900'
            : 'bg-[#FFFBF0] border-violet-100'
            }`}>
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-3xl ${theme === 'dark' ? 'bg-violet-500/5' : 'bg-violet-300/10'
                    }`} />
            </div>

            <div className="mx-auto max-w-4xl">
                <div className="text-center">
                    {/* Avatar / Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className={`inline-flex items-center uppercase gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-6 
                        ${theme === "dark" ? "bg-neutral-800 text-gray-300" : "bg-white border border-gray-200 text-gray-600 shadow-sm"}`
                        }>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Builder Story
                    </motion.div>

                    {/* Story Content - Using TextGenerateEffect */}
                    <div className="mb-12" style={{ fontFamily: 'var(--font-body), Inter, sans-serif' }}>
                        <TextGenerateEffect
                            words={storyText}
                            className={`text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                                }`}
                        />
                    </div>

                    {/* Signature / Author */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }} // Delays until text mostly finishes
                        viewport={{ once: true }}
                        className="mt-12"
                    >
                        <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Ritesh Maurya</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Solo Developer & Founder of JobZy</div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
