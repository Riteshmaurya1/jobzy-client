"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export function CTA() {
    const { theme } = useTheme()
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setStatus("error")
            setMessage("Please enter a valid email")
            return
        }

        setStatus("loading")

        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            setStatus("success")
            setMessage("✅ Check your email!")
            setEmail("")

            // Reset after 5 seconds
            setTimeout(() => {
                setStatus("idle")
                setMessage("")
            }, 5000)
        }, 1500)
    }

    return (
        <section className={`relative py-24 px-6 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-black' : 'bg-[#FFFBF0]'
            }`}>
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-2xl p-12 sm:p-16 text-center overflow-hidden"
                    style={{
                        background: theme === 'dark'
                            ? "linear-gradient(135deg, #F97316 0%, #7C3AED 100%)"
                            : "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)",
                        boxShadow: theme === 'dark'
                            ? "0 0 40px rgba(249, 115, 22, 0.3)"
                            : "0 0 40px rgba(124, 58, 237, 0.2)"
                    }}
                >
                    {/* Glassmorphism overlay */}
                    <div className={`absolute inset-0 backdrop-blur-xl -z-10 ${theme === 'dark' ? 'bg-black/40' : 'bg-white/10'
                        }`} />

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Stop losing track of your job applications
                        </h2>

                        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10">
                            Join JobZy early and manage your job search the smart way.
                        </p>

                        {/* Email Form */}
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    disabled={status === "loading" || status === "success"}
                                    className={`flex-1 px-4 py-4 rounded-lg text-base border placeholder-gray-400
                                       focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed
                                       transition-all duration-200 ${theme === 'dark'
                                            ? 'bg-white/10 border-white/20 text-white focus:ring-white/50 focus:border-white/50'
                                            : 'bg-white/90 border-white/40 text-gray-900 focus:ring-violet-500/50 focus:border-violet-500/50'
                                        }`}
                                    style={{ fontSize: "16px" }} // Prevents iOS zoom
                                />

                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className={`px-8 py-4 rounded-lg font-semibold text-base
                                       hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0
                                       disabled:opacity-50 disabled:cursor-not-allowed
                                       transition-all duration-200 flex items-center justify-center gap-2 ${theme === 'dark'
                                            ? 'bg-white text-violet-700 hover:bg-gray-50'
                                            : 'bg-black text-white hover:bg-gray-900'
                                        }`}
                                >
                                    {status === "loading" ? (
                                        <>
                                            <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${theme === 'dark' ? 'border-violet-700' : 'border-white'
                                                }`} />
                                            Subscribing...
                                        </>
                                    ) : status === "success" ? (
                                        <>
                                            <CheckCircle2 className="w-5 h-5" />
                                            Subscribed!
                                        </>
                                    ) : (
                                        <>
                                            Get Early Access
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Status Messages */}
                            {status === "error" && (
                                <p className="mt-3 text-sm text-red-200 flex items-center justify-center gap-1">
                                    ⚠️ {message}
                                </p>
                            )}
                            {status === "success" && (
                                <p className="mt-3 text-sm text-green-200 font-medium">
                                    {message}
                                </p>
                            )}
                        </form>

                        {/* Trust Indicator */}
                        <p className="mt-6 text-sm text-white/70 flex items-center justify-center gap-2">
                            <span>🔒</span>
                            <span>No spam, ever. Unsubscribe in one click.</span>
                        </p>
                    </div>

                    {/* Border Glow */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/10 pointer-events-none" />
                </motion.div>
            </div>
        </section>
    )
}
