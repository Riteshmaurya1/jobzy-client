"use client"

import { motion } from "framer-motion"
import DashboardLayout from "@/app/dashboard/layout"
import { Topbar } from "@/components/dashboard/Topbar"
import { useTheme } from "@/contexts/ThemeContext"
import Link from "next/link"
import { FileCheck, LayoutDashboard } from "lucide-react"

export default function KeywordsPage() {
    const { theme } = useTheme()
    const dark = theme === "dark"

    return (
        <DashboardLayout>
            <Topbar breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Keyword Suggestions" }
            ]} />

            <div className="flex items-center justify-center min-h-[75vh] px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center max-w-lg"
                >
                    {/* Animated SVG Illustration */}
                    <motion.svg
                        width="280" height="220" viewBox="0 0 280 220" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        {/* Background gradient circle */}
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.08" />
                            </linearGradient>
                            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>

                        {/* Soft background blob */}
                        <circle cx="140" cy="110" r="90" fill="url(#grad1)" />

                        {/* Document body */}
                        <rect x="85" y="45" width="110" height="140" rx="12"
                            fill={dark ? "#18181b" : "#ffffff"}
                            stroke={dark ? "#3f3f46" : "#e5e7eb"} strokeWidth="2" />

                        {/* Doc header strip */}
                        <rect x="85" y="45" width="110" height="28" rx="12"
                            fill="url(#grad2)" opacity="0.9" />
                        <rect x="85" y="61" width="110" height="12"
                            fill="url(#grad2)" opacity="0.9" />

                        {/* Header dots */}
                        <circle cx="100" cy="59" r="3" fill="white" opacity="0.7" />
                        <circle cx="110" cy="59" r="3" fill="white" opacity="0.7" />
                        <circle cx="120" cy="59" r="3" fill="white" opacity="0.7" />

                        {/* Text lines on document */}
                        <rect x="100" y="86" width="65" height="5" rx="2.5"
                            fill={dark ? "#3f3f46" : "#d1d5db"} />
                        <rect x="100" y="97" width="80" height="5" rx="2.5"
                            fill={dark ? "#3f3f46" : "#d1d5db"} />
                        <rect x="100" y="108" width="50" height="5" rx="2.5"
                            fill={dark ? "#3f3f46" : "#d1d5db"} />

                        {/* Keyword chips */}
                        <rect x="98" y="124" width="36" height="14" rx="7"
                            fill="#8b5cf6" opacity="0.2" />
                        <rect x="140" y="124" width="44" height="14" rx="7"
                            fill="#8b5cf6" opacity="0.2" />
                        <rect x="98" y="143" width="50" height="14" rx="7"
                            fill="#8b5cf6" opacity="0.2" />
                        <rect x="154" y="143" width="28" height="14" rx="7"
                            fill="#8b5cf6" opacity="0.2" />

                        {/* Sparkles / stars */}
                        <motion.g
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path d="M210 60 L213 68 L221 71 L213 74 L210 82 L207 74 L199 71 L207 68Z"
                                fill="#f59e0b" />
                        </motion.g>
                        <motion.g
                            animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            <path d="M60 80 L62 85 L67 87 L62 89 L60 94 L58 89 L53 87 L58 85Z"
                                fill="#8b5cf6" />
                        </motion.g>
                        <motion.g
                            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <path d="M225 140 L227 145 L232 147 L227 149 L225 154 L223 149 L218 147 L223 145Z"
                                fill="#22c55e" />
                        </motion.g>

                        {/* Gear / cog at bottom right */}
                        <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "220px 175px" }}
                        >
                            <circle cx="220" cy="175" r="12"
                                stroke={dark ? "#52525b" : "#9ca3af"} strokeWidth="3" fill="none" />
                            <circle cx="220" cy="175" r="4"
                                fill={dark ? "#52525b" : "#9ca3af"} />
                            {/* Gear teeth */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                                <rect key={deg} x="218" y="160" width="4" height="6" rx="1"
                                    fill={dark ? "#52525b" : "#9ca3af"}
                                    transform={`rotate(${deg} 220 175)`} />
                            ))}
                        </motion.g>

                        {/* Wrench icon */}
                        <motion.g
                            animate={{ rotate: [-10, 10, -10] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transformOrigin: "60px 155px" }}
                        >
                            <path d="M55 145 L50 155 L55 165 L60 165 L65 155 L60 145 Z"
                                fill={dark ? "#52525b" : "#9ca3af"} opacity="0.5" />
                            <rect x="55" y="155" width="10" height="20" rx="3"
                                fill={dark ? "#52525b" : "#9ca3af"} opacity="0.5" />
                        </motion.g>
                    </motion.svg>

                    {/* Text content */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-6 space-y-3"
                    >
                        <h2 className={`text-2xl font-black font-display ${dark ? "text-white" : "text-gray-900"}`}>
                            Under Development
                        </h2>
                        <p className={`text-sm leading-relaxed max-w-sm mx-auto ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            AI-powered keyword suggestions are being built to help you optimize
                            your resume for any job role. Stay tuned!
                        </p>
                    </motion.div>

                    {/* Navigation buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex gap-3 mt-8"
                    >
                        <Link href="/ats-check"
                            className={`flex items-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                ${dark
                                    ? "bg-neutral-900 text-white border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.7)] hover:bg-neutral-800"
                                    : "bg-white text-neutral-900 border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] hover:bg-gray-50"
                                }`}
                        >
                            <FileCheck className="h-3.5 w-3.5" /> ATS Resume Check
                        </Link>
                        <Link href="/dashboard"
                            className={`flex items-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                ${dark
                                    ? "bg-transparent text-gray-300 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </DashboardLayout>
    )
}
