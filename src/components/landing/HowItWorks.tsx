"use client"

import { motion } from "framer-motion"
import { FilePlus, RefreshCw, Bell, ArrowRight } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

export function HowItWorks() {
    const { theme } = useTheme()
    const steps = [
        {
            number: "01",
            icon: FilePlus,
            title: "Add job applications",
            description: "Quickly log each company you apply to. Add job title, application date, and any initial notes. Takes less than 30 seconds per application.",
            gradient: "from-violet-500 to-purple-600"
        },
        {
            number: "02",
            icon: RefreshCw,
            title: "Update status & notes",
            description: "As you hear back, update the status: Applied → Screening → Interviewing → Offer. Add notes about each interaction so you never lose context.",
            gradient: "from-purple-500 to-indigo-600"
        },
        {
            number: "03",
            icon: Bell,
            title: "Track interviews & follow-ups",
            description: "See all your upcoming interviews in one view. Set reminders for preparation and follow-ups. Stay on top of every opportunity.",
            gradient: "from-indigo-500 to-violet-600"
        },
    ]

    return (
        <section id="how-it-works" className={`relative py-28 px-6 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-black' : 'bg-[#FFFBF0]'
            }`}>
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                {theme === 'dark' ? (
                    <>
                        <div className="absolute right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-3xl" />
                        <div className="absolute left-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-3xl" />
                    </>
                ) : (
                    <>
                        <div className="absolute right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-violet-200/30 blur-3xl" />
                        <div className="absolute left-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-orange-200/20 blur-3xl" />
                    </>
                )}
            </div>

            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${theme === 'dark'
                        ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                        : 'bg-violet-100 text-violet-600 border border-violet-200'
                        }`}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                        </span>
                        Simple 3-Step Process
                    </div>
                    <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        <span className="whitespace-nowrap">How It <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">Works</span></span>
                    </h2>
                    <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Get started in minutes. Stay organized forever.
                    </p>
                </motion.div>

                {/* Steps Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {steps.map((step, idx) => {
                        const Icon = step.icon
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                className="group relative"
                            >
                                {/* Connector Line (only between cards) */}
                                {idx < steps.length - 1 && (
                                    <div className={`hidden md:block absolute top-12 -right-4 lg:-right-5 w-8 lg:w-10 h-px ${theme === 'dark' ? 'bg-gradient-to-r from-violet-500/50 to-transparent' : 'bg-gradient-to-r from-violet-300 to-transparent'
                                        }`}>
                                        <ArrowRight className={`absolute -right-1 -top-1.5 w-3 h-3 ${theme === 'dark' ? 'text-violet-500/50' : 'text-violet-300'}`} />
                                    </div>
                                )}

                                {/* Card */}
                                <div className={`relative h-full rounded-2xl border p-6 lg:p-8 transition-all duration-500 overflow-hidden
                                    ${theme === 'dark'
                                        ? 'bg-gray-900/50 border-gray-800 hover:border-violet-500/40 hover:bg-gray-900/70'
                                        : 'bg-white/70 border-gray-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5'
                                    }`}
                                >
                                    {/* Gradient Glow on Hover */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5' : 'bg-gradient-to-br from-violet-50 via-transparent to-purple-50'
                                        }`} />

                                    {/* Step Number */}
                                    <div className={`absolute top-4 right-4 text-6xl font-black opacity-5 group-hover:opacity-10 transition-opacity ${theme === 'dark' ? 'text-white' : 'text-violet-900'
                                        }`}>
                                        {step.number}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 bg-gradient-to-br ${step.gradient} shadow-lg`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>

                                        {/* Step Label */}
                                        <div className={`flex items-center gap-2 mb-3`}>
                                            <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'
                                                }`}>
                                                Step {step.number}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className={`text-xl lg:text-2xl font-semibold mb-4 group-hover:translate-x-1 transition-transform duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className={`text-sm lg:text-base leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            {step.description}
                                        </p>
                                    </div>

                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
