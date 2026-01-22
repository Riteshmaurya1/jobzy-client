"use client"

import { motion, useInView } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { useRef } from "react"
import {
    Briefcase,
    GraduationCap,
    Code,
    Target,
    Clock,
    Zap,
    LayoutDashboard,
    Search,
    FileText,
    Mail,
    Calendar,
    Bell,
    Star,
    Heart,
    Bookmark,
    Send,
    CheckCircle,
    Award,
    Sparkles,
    Rocket
} from "lucide-react"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { WobbleCard } from "@/components/ui/wobble-card"

export function About() {
    const { theme } = useTheme()
    const iconContainerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(iconContainerRef, { amount: 0.5 })

    // Icons for the scatter animation
    const scatterIcons = [
        { Icon: Briefcase, scatterX: -120, scatterY: -80, rotation: -15 },
        { Icon: FileText, scatterX: 100, scatterY: -100, rotation: 20 },
        { Icon: Mail, scatterX: -80, scatterY: 60, rotation: -25 },
        { Icon: Calendar, scatterX: 120, scatterY: 40, rotation: 15 },
        { Icon: Bell, scatterX: -60, scatterY: -120, rotation: 30 },
        { Icon: Star, scatterX: 80, scatterY: 100, rotation: -20 },
        { Icon: Heart, scatterX: -140, scatterY: 20, rotation: 10 },
        { Icon: Bookmark, scatterX: 60, scatterY: -60, rotation: -30 },
        { Icon: Send, scatterX: -100, scatterY: 100, rotation: 25 },
        { Icon: CheckCircle, scatterX: 140, scatterY: -40, rotation: -10 },
        { Icon: Award, scatterX: -40, scatterY: 120, rotation: 35 },
        { Icon: Sparkles, scatterX: 40, scatterY: -140, rotation: -35 },
    ]

    const personas = [
        {
            icon: GraduationCap,
            title: "Students",
            desc: "Applying during placement season",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            icon: Code,
            title: "Developers",
            desc: "Switching to product-based companies",
            color: "text-violet-500",
            bg: "bg-violet-500/10"
        },
        {
            icon: Briefcase,
            title: "Professionals",
            desc: "Managing multiple interview pipelines",
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        }
    ]

    const features = [
        {
            icon: Target,
            text: "Track every job application status",
        },
        {
            icon: Clock,
            text: "Plan interviews & never miss dates",
        },
        {
            icon: Search,
            text: "Store notes & company research",
        },
        {
            icon: LayoutDashboard,
            text: "View entire progress at a glance",
        }
    ]

    return (
        <section id="about" className={`py-24 px-6 transition-colors scroll-mt-20 overflow-hidden ${theme === "dark" ? "bg-black" : "bg-[#FFFBF0]"}`}>
            <div className="mx-auto max-w-6xl">

                {/* 1. Why JobZy Exists - Intro */}
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* About Badge with Glowing Dot - Matching Pricing Style */}
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 ${theme === 'dark'
                            ? 'bg-neutral-800 text-gray-300'
                            : 'bg-white border border-gray-200 text-gray-600 shadow-sm'
                            }`}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            About
                        </div>
                        <h3 className={`text-4xl sm:text-5xl font-extrabold font-display mb-8 leading-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            Finding a job is hard because <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
                                everything is scattered.
                            </span>
                        </h3>
                    </motion.div>

                    <div className={`text-lg sm:text-xl leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        <p className="mb-6">
                            Applications live in emails. Interview dates sit in calendars. Notes are buried in WhatsApp messages. Follow-ups are forgotten.
                        </p>
                        <div className={`p-6 rounded-2xl border border-dashed ${theme === "dark" ? "border-zinc-800 bg-zinc-900/50" : "border-violet-200 bg-white/50"}`}>
                            <p className="font-semibold text-xl mb-2">JobZy brings order to this chaos.</p>
                            <p className="text-base">One clear system to manage your entire job search from start to finish.</p>
                        </div>
                    </div>
                </div>

                {/* 2. Built for Real Job Seekers - Cards */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h3 className={`text-3xl font-bold font-display mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            Built for Real Job Seekers
                        </h3>
                        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            Not for recruiters. Not for HR. Built for you.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {personas.map((persona, index) => {
                            const Icon = persona.icon
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className={`p-8 rounded-3xl border transition-all duration-300
                                        ${theme === "dark"
                                            ? "bg-neutral-900 border-neutral-800 hover:border-violet-500/30"
                                            : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-violet-100"
                                        }
                                    `}
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${persona.bg} ${persona.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h4 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                        {persona.title}
                                    </h4>
                                    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        {persona.desc}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* 3. Wobble Card - Mission & Features Split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                    {/* Left: What You Can Do */}
                    <div className={`p-8 sm:p-12 rounded-[2.5rem] flex flex-col justify-center
                        ${theme === "dark" ? "bg-zinc-900" : "bg-white border border-gray-100 shadow-lg shadow-violet-50/50"}
                    `}>
                        <h3 className={`text-2xl sm:text-3xl font-bold font-display mb-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            What you can do with JobZy
                        </h3>
                        <ul className="space-y-6">
                            {features.map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        whileHover={{ scale: 1.05, x: 8 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4 cursor-pointer"
                                    >
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                                            ${theme === "dark" ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"}
                                        `}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className={`text-lg font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
                                            {item.text}
                                        </span>
                                    </motion.li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Right: Our Goal (Wobble Card) */}
                    <div className="h-full min-h-[400px]" ref={iconContainerRef}>
                        <WobbleCard containerClassName="h-full bg-violet-600 min-h-[400px]">
                            <div className="max-w-xs relative z-10">
                                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                    Our Goal is Simple
                                </h2>
                                <p className="mt-4 text-left text-base/6 text-neutral-200">
                                    To help you stay organized, confident, and consistent — until you land the offer.
                                </p>
                                <p className="mt-4 text-left text-base/6 text-neutral-200 font-medium italic">
                                    "Not just a tool. A companion for your career."
                                </p>
                            </div>

                            {/* Scattered Icons Animation */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {scatterIcons.map(({ Icon, scatterX, scatterY, rotation }, index) => (
                                    <motion.div
                                        key={index}
                                        className="absolute"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                        }}
                                        initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
                                        animate={{
                                            x: isInView ? scatterX : 0,
                                            y: isInView ? scatterY : 0,
                                            opacity: isInView ? 1 : 0.3,
                                            rotate: isInView ? rotation : 0,
                                            scale: isInView ? 1 : 0.5,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: index * 0.05,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        <Icon className="w-8 h-8 text-white/20" />
                                    </motion.div>
                                ))}
                            </div>
                        </WobbleCard>
                    </div>
                </div>

                {/* 4. Simple Footer for Section */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className={`text-sm font-semibold uppercase tracking-widest mb-4 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                        DESIGNED TO STAY OUT OF YOUR WAY
                    </p>
                    <h3 className={`text-2xl sm:text-3xl font-bold font-display ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        We believe that clarity matters more than complexity.
                    </h3>
                </div>

            </div>
        </section>
    )
}

export default About
