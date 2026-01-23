"use client"

import { motion } from "framer-motion"
import { BarChart3, CheckCircle2, Calendar, FileText } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { WobbleCard } from "@/components/ui/wobble-card"

export function Solution() {
    const { theme } = useTheme()
    const solutions = [
        {
            icon: BarChart3,
            title: "Track every job application",
            description: "Add all your applications in seconds. See everything in one clean dashboard - no more scattered spreadsheets.",
            color: "violet"
        },
        {
            icon: CheckCircle2,
            title: "Update status & timeline",
            description: "Mark applications as Applied, Interviewing, Offered, or Rejected. Know exactly where each opportunity stands.",
            color: "green"
        },
        {
            icon: Calendar,
            title: "Never miss an interview",
            description: "See all upcoming interviews at a glance. Set reminders so you're always prepared and on time.",
            color: "orange"
        },
        {
            icon: FileText,
            title: "Add notes & context",
            description: "Attach important details to each application - interview prep, compensation notes, contact names, anything you need to remember.",
            color: "violet"
        },
    ]

    return (
        <section className={`relative py-24 px-6 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-black' : 'bg-[#FFFBF0]'
            }`}>
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column - Solution Points */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15
                                }
                            }
                        }}
                    >
                        <motion.h2
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}
                        >
                            JobZy fixes this
                        </motion.h2>

                        <div className="space-y-6">
                            {solutions.map((solution, idx) => {
                                const Icon = solution.icon
                                return (
                                    <motion.div
                                        key={idx}
                                        variants={{
                                            hidden: { opacity: 0, x: -40 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex gap-4 items-start"
                                    >
                                        {/* Icon */}
                                        <div className={`
                      flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                      ${solution.color === 'violet' ? 'bg-violet-500/20 text-violet-500' : ''}
                      ${solution.color === 'orange' ? 'bg-orange-500/20 text-orange-500' : ''}
                      ${solution.color === 'green' ? 'bg-green-500/20 text-green-500' : ''}
                    `}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1">
                                            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                {solution.title}
                                            </h3>
                                            <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                {solution.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Right Column - Dashboard Visual (Wobble Card) */}
                    <div className="hidden lg:block relative">
                        <WobbleCard containerClassName={`shadow-2xl ${theme === 'dark'
                            ? 'bg-gradient-to-br from-violet-900/50 to-black border-violet-500/20'
                            : 'bg-gradient-to-br from-violet-100 to-white border-violet-200'
                            }`}>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
                                {[
                                    { label: "Total Apps", value: "42", color: "violet" },
                                    { label: "Interviews", value: "8", color: "orange" },
                                    { label: "Offers", value: "2", color: "green" },
                                ].map((stat, idx) => (
                                    <div key={idx} className={`p-4 rounded-lg border ${theme === 'dark'
                                        ? 'bg-gray-900/80 border-gray-800'
                                        : 'bg-white border-violet-200'
                                        }`}>
                                        <div className={`text-2xl font-bold mb-1
                      ${stat.color === 'violet' ? 'text-violet-500' : ''}
                      ${stat.color === 'orange' ? 'text-orange-500' : ''}
                      ${stat.color === 'green' ? 'text-green-500' : ''}
                    `}>
                                            {stat.value}
                                        </div>
                                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Application List Preview */}
                            <div className="space-y-3 relative z-10">
                                <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Recent Activity</div>
                                {[
                                    { company: "Stripe", status: "Offered", statusColor: "green" },
                                    { company: "Vercel", status: "Interviewing", statusColor: "orange" },
                                    { company: "Linear", status: "Applied", statusColor: "blue" },
                                ].map((app, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-center justify-between p-3 rounded-lg border ${theme === 'dark'
                                            ? 'bg-gray-900/60 border-gray-800/50'
                                            : 'bg-white border-violet-200'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-violet-500/10 flex items-center justify-center text-violet-500 text-xs font-bold">
                                                {app.company[0]}
                                            </div>
                                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                }`}>{app.company}</span>
                                        </div>
                                        <div className={`px-2 py-1 rounded text-xs font-semibold
                      ${app.statusColor === 'green' ? 'bg-green-500/20 text-green-500' : ''}
                      ${app.statusColor === 'orange' ? 'bg-orange-500/20 text-orange-500' : ''}
                      ${app.statusColor === 'blue' ? 'bg-blue-500/20 text-blue-500' : ''}
                    `}>
                                            {app.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </WobbleCard>
                    </div>

                </div>
            </div>
        </section>
    )
}
