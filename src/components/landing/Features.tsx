"use client"

import { motion } from "framer-motion"
import {
    LayoutDashboard,
    GitBranch,
    Calendar,
    Bell,
    FileText,
    Zap,
    Download,
    Eye,
    ScanSearch,
    FileCheck,
    FileCog,
    Sparkles
} from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { HoverEffect } from "@/components/ui/card-hover-effect"

export function Features() {
    const { theme } = useTheme()
    const features = [
        {
            icon: LayoutDashboard,
            title: "Job Tracking Dashboard",
            description: "See all your applications in one place. Filter by status, sort by date, search by company. Your entire job search at a glance.",
            color: "violet",
            badge: null
        },
        {
            icon: GitBranch,
            title: "Status Pipeline",
            description: "Move applications through stages: Applied, Screening, Interview, Offer, Rejected. Visual progress tracking keeps you motivated.",
            color: "orange",
            badge: null
        },
        {
            icon: ScanSearch,
            title: "ATS Score Checker",
            description: "Check your resume's ATS compatibility score. Get keyword suggestions and optimization tips to pass automated screening systems.",
            color: "green",
            badge: null
        },
        {
            icon: FileCheck,
            title: "Resume-JD Matcher",
            description: "Match your resume against job descriptions. See skill gaps, missing keywords, and get suggestions to tailor your resume for each role.",
            color: "violet",
            badge: null
        },
        {
            icon: FileCog,
            title: "Resume Versioning",
            description: "Create and manage multiple resume versions for different roles. Track which version you sent to which company. Never lose a version.",
            color: "orange",
            badge: null
        },
        {
            icon: Sparkles,
            title: "AI Resume Builder",
            description: "Generate tailored resume bullets using AI. Optimize your experience descriptions to match job requirements and stand out.",
            color: "green",
            badge: null
        },
        {
            icon: Calendar,
            title: "Interview Calendar",
            description: "Dedicated calendar view for all scheduled interviews. Sync with your calendar app. Never double-book or miss a call.",
            color: "violet",
            badge: null
        },
        {
            icon: Bell,
            title: "Smart Reminders",
            description: "Set reminders for interview prep, follow-up emails, application deadlines. Get notified before it's too late.",
            color: "orange",
            badge: null
        },
        {
            icon: FileText,
            title: "Notes & Research",
            description: "Attach notes to each application. Store company research, interview questions, salary expectations—anything you need to remember.",
            color: "green",
            badge: null
        },
        {
            icon: Zap,
            title: "Quick Add",
            description: "Add new applications in seconds with a fast, simple form. No complicated fields or required information. Just the essentials.",
            color: "violet",
            badge: null
        },
        {
            icon: Download,
            title: "Export Your Data",
            description: "Your data belongs to you. Export to CSV or JSON anytime. No lock-in, no hassle.",
            color: "orange",
            badge: null
        },
        {
            icon: Eye,
            title: "Distraction-Free UI",
            description: "No clutter, no complexity. JobZy focuses on what matters: helping you stay organized without getting in your way.",
            color: "green",
            badge: null
        },
    ]

    return (
        <section id="features" className={`relative py-24 px-6 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-black' : 'bg-[#FFFBF0]'
            }`}>
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-4"
                >
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 ${theme === "dark" ? "bg-neutral-800 text-gray-300" : "bg-white border border-gray-200 text-gray-600 shadow-sm"}`}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        Powerful Capabilities
                    </div>
                    <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-display ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        Everything you need to manage your job search
                    </h2>
                    <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Simple tools that actually help you stay organized
                    </p>
                </motion.div>

                {/* Features Grid - Now using Aceternity HoverEffect */}
                <HoverEffect items={features} />
            </div>
        </section>
    )
}
