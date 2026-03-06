"use client"

import { motion } from "framer-motion"
import { BarChart3, CheckCircle2, Calendar, FileText } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { JobCard } from "@/components/dashboard/jobs/JobCard"
import { Job } from "@/services/jobsService"

export function Solution() {
    const { theme } = useTheme()

    const mockJobs: Job[] = [
        {
            id: "1",
            company: "Stripe",
            position: "Frontend Engineer",
            jobLink: "",
            location: "San Francisco, CA",
            workMode: "hybrid",
            jobType: "full-time",
            salary: "$160k - $210k",
            status: "offer",
            appliedDate: new Date().toISOString(),
            platform: "LinkedIn"
        },
        {
            id: "2",
            company: "Vercel",
            position: "Product Designer",
            jobLink: "",
            location: "Remote",
            workMode: "remote",
            jobType: "full-time",
            salary: "$140k - $190k",
            status: "interview-scheduled",
            appliedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
            platform: "Wellfound"
        },
        {
            id: "3",
            company: "Linear",
            position: "Software Engineer",
            jobLink: "",
            location: "New York, NY",
            workMode: "onsite",
            jobType: "full-time",
            salary: "$150k - $200k",
            status: "applied",
            appliedDate: new Date(Date.now() - 86400000 * 5).toISOString(),
            platform: "Referral"
        }
    ]

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

                    <div className="hidden lg:block relative space-y-4">
                        {mockJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onEdit={() => { }}
                                onDelete={() => { }}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
