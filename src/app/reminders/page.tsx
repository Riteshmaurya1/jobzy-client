"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import DashboardLayout from "@/app/dashboard/layout"
import { Topbar } from "@/components/dashboard/Topbar"
import { useTheme } from "@/contexts/ThemeContext"
import { useToast } from "@/components/ui/use-toast"
import { interviewsService, Interview } from "@/services/interviewsService"
import {
    Bell, Calendar, Clock, MapPin, Video, Phone, User,
    StickyNote, BookOpen, Rocket, Loader2, AlertCircle,
    Briefcase, ChevronRight, ExternalLink
} from "lucide-react"
import { format, isToday, isTomorrow, differenceInDays, parseISO, startOfDay } from "date-fns"

/* ──────────────── helpers ──────────────── */

function daysUntil(dateStr: string): number {
    const today = startOfDay(new Date())
    const target = startOfDay(parseISO(dateStr))
    return differenceInDays(target, today)
}

function bucketInterviews(interviews: Interview[]) {
    const today: Interview[] = []
    const in2Days: Interview[] = []
    const in7Days: Interview[] = []

    for (const iv of interviews) {
        if (iv.status === "cancelled") continue
        const d = daysUntil(iv.interviewDate)
        if (d < 0) continue           // past
        if (d === 0) today.push(iv)
        else if (d <= 2) in2Days.push(iv)
        else if (d <= 7) in7Days.push(iv)
    }

    return { today, in2Days, in7Days }
}

function modeIcon(mode: string) {
    switch (mode) {
        case "video-call": return <Video className="h-3.5 w-3.5" />
        case "audio-call": return <Phone className="h-3.5 w-3.5" />
        default: return <MapPin className="h-3.5 w-3.5" />
    }
}

function modeLabel(mode: string) {
    switch (mode) {
        case "video-call": return "Video Call"
        case "audio-call": return "Audio Call"
        default: return "In Person"
    }
}

/* ──────────────── column config ──────────────── */

const COLUMNS = [
    {
        key: "today",
        title: "Today",
        subtitle: "Review details & notes",
        icon: Bell,
        accent: "violet",
        gradientFrom: "from-violet-500",
        gradientTo: "to-purple-600",
        emptyMsg: "No interviews today",
    },
    {
        key: "in2Days",
        title: "In 2 Days",
        subtitle: "Prepare all topics",
        icon: BookOpen,
        accent: "amber",
        gradientFrom: "from-amber-400",
        gradientTo: "to-orange-500",
        emptyMsg: "Nothing in the next 2 days",
    },
    {
        key: "in7Days",
        title: "In 7 Days",
        subtitle: "Start preparing",
        icon: Rocket,
        accent: "emerald",
        gradientFrom: "from-emerald-400",
        gradientTo: "to-teal-500",
        emptyMsg: "Nothing in the next 7 days",
    },
] as const

/* ──────────────── Interview Card ──────────────── */

function InterviewCard({ iv, accent, theme }: { iv: Interview; accent: string; theme: string }) {
    const dark = theme === "dark"
    const daysLeft = daysUntil(iv.interviewDate)
    const dateLabel = isToday(parseISO(iv.interviewDate))
        ? "Today"
        : isTomorrow(parseISO(iv.interviewDate))
            ? "Tomorrow"
            : format(parseISO(iv.interviewDate), "EEE, MMM d")

    const accentStyles: Record<string, { badge: string; border: string; glow: string }> = {
        violet: {
            badge: dark ? "bg-violet-950/40 text-violet-400 border-violet-800" : "bg-violet-50 text-violet-600 border-violet-200",
            border: dark ? "border-violet-800/40 hover:border-violet-700/60" : "border-violet-100 hover:border-violet-200",
            glow: dark ? "shadow-violet-500/5" : "shadow-violet-500/5",
        },
        amber: {
            badge: dark ? "bg-amber-950/40 text-amber-400 border-amber-800" : "bg-amber-50 text-amber-600 border-amber-200",
            border: dark ? "border-amber-800/40 hover:border-amber-700/60" : "border-amber-100 hover:border-amber-200",
            glow: dark ? "shadow-amber-500/5" : "shadow-amber-500/5",
        },
        emerald: {
            badge: dark ? "bg-emerald-950/40 text-emerald-400 border-emerald-800" : "bg-emerald-50 text-emerald-600 border-emerald-200",
            border: dark ? "border-emerald-800/40 hover:border-emerald-700/60" : "border-emerald-100 hover:border-emerald-200",
            glow: dark ? "shadow-emerald-500/5" : "shadow-emerald-500/5",
        },
    }

    const s = accentStyles[accent] || accentStyles.violet

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl border p-4 transition-all duration-300 shadow-md
                ${dark
                    ? `bg-neutral-900/80 ${s.border} ${s.glow}`
                    : `bg-white ${s.border} ${s.glow}`
                }`}
        >
            {/* Header: Company + Round */}
            <div className="flex items-start justify-between mb-3">
                <div className="min-w-0">
                    <h4 className={`text-sm font-bold truncate ${dark ? "text-white" : "text-gray-900"}`}>
                        {iv.job?.company || "Unknown Company"}
                    </h4>
                    <p className={`text-xs truncate mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                        {iv.job?.position || "—"}
                    </p>
                </div>
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border flex-shrink-0 ml-2 ${s.badge}`}>
                    {iv.round}
                </span>
            </div>

            {/* Meta row */}
            <div className={`flex flex-wrap gap-x-4 gap-y-1.5 text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>
                <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> {dateLabel}
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {iv.interviewTime || "TBD"}
                </span>
                <span className="flex items-center gap-1.5">
                    {modeIcon(iv.interviewMode)} {modeLabel(iv.interviewMode)}
                </span>
            </div>

            {/* Interviewer */}
            {iv.interviewerName && (
                <div className={`flex items-center gap-1.5 text-xs mt-2 ${dark ? "text-gray-500" : "text-gray-400"}`}>
                    <User className="h-3 w-3" />
                    <span>{iv.interviewerName}</span>
                </div>
            )}

            {/* Notes */}
            {iv.notes && (
                <div className={`mt-3 rounded-xl p-3 text-xs leading-relaxed
                    ${dark
                        ? "bg-neutral-950 text-gray-400 border border-zinc-800"
                        : "bg-gray-50 text-gray-600 border border-gray-100"
                    }`}
                >
                    <div className={`flex items-center gap-1.5 mb-1.5 font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>
                        <StickyNote className="h-3 w-3" /> Notes
                    </div>
                    <p className="line-clamp-3">{iv.notes}</p>
                </div>
            )}

            {/* Meeting link */}
            {iv.meetingLink && (
                <a
                    href={iv.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                        ${dark
                            ? "bg-transparent text-white border-zinc-600 hover:border-zinc-500 hover:bg-zinc-700/50"
                            : "bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                        }
                    `}
                >
                    <ExternalLink className="h-3 w-3" /> Join Meeting
                </a>
            )}
        </motion.div>
    )
}

/* ──────────────── Page ──────────────── */

export default function RemindersPage() {
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { theme } = useTheme()
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        async function load() {
            const token = localStorage.getItem("accessToken")
            if (!token) { router.push("/signin"); return }

            try {
                // Fetch all scheduled interviews (large limit to get everything)
                const res = await interviewsService.getAll({ status: "scheduled" }, 1, 100)
                if (res.success) {
                    setInterviews(res.interviews || [])
                } else {
                    toast({ title: "Error", description: res.message || "Failed to load interviews", variant: "destructive" })
                }
            } catch {
                toast({ title: "Error", description: "Could not load interview data", variant: "destructive" })
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [router, toast])

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[60vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                </div>
            </DashboardLayout>
        )
    }

    const { today, in2Days, in7Days } = bucketInterviews(interviews)
    const buckets: Record<string, Interview[]> = { today, in2Days, in7Days }
    const totalUpcoming = today.length + in2Days.length + in7Days.length

    return (
        <DashboardLayout>
            <Topbar breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Reminders" }
            ]} />

            <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">

                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                    <div>
                        <h2 className={`text-xl font-bold font-display flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            <Bell className="h-5 w-5 text-violet-500" />
                            Interview Reminders
                        </h2>
                        <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            {totalUpcoming} upcoming interview{totalUpcoming !== 1 ? "s" : ""} in the next 7 days
                        </p>
                    </div>
                    <a
                        href="/interviews"
                        className={`flex items-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                            ${theme === "dark"
                                ? "bg-transparent text-white border-zinc-600 hover:border-zinc-500 hover:bg-zinc-700/50"
                                : "bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            }
                        `}
                    >
                        <Briefcase className="h-3.5 w-3.5" /> View All Interviews <ChevronRight className="h-3 w-3" />
                    </a>
                </motion.div>

                {/* Three columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {COLUMNS.map((col, colIdx) => {
                        const items = buckets[col.key]
                        return (
                            <motion.div
                                key={col.key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: colIdx * 0.1, duration: 0.5 }}
                                className={`rounded-[2rem] border overflow-hidden transition-all
                                    ${theme === "dark"
                                        ? "bg-neutral-900 border-zinc-800"
                                        : "bg-white border-gray-200 shadow-sm"
                                    }`}
                            >
                                {/* Column header */}
                                <div className={`px-5 py-4 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-100"}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${col.gradientFrom} ${col.gradientTo} shadow-lg`}>
                                            <col.icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h3 className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                {col.title}
                                            </h3>
                                            <p className={`text-[11px] ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                                                {col.subtitle}
                                            </p>
                                        </div>
                                        <span className={`ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full
                                            ${theme === "dark" ? "bg-zinc-800 text-gray-300" : "bg-gray-100 text-gray-600"}
                                        `}>
                                            {items.length}
                                        </span>
                                    </div>
                                </div>

                                {/* Cards */}
                                <div className="px-4 py-4 space-y-3 min-h-[200px]">
                                    {items.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-[180px] text-center">
                                            <div className={`rounded-full p-3 mb-3 ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}>
                                                <AlertCircle className={`h-5 w-5 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
                                            </div>
                                            <p className={`text-xs font-medium ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                                                {col.emptyMsg}
                                            </p>
                                        </div>
                                    ) : (
                                        items.map((iv) => (
                                            <InterviewCard key={iv.id} iv={iv} accent={col.accent} theme={theme} />
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

            </div>
        </DashboardLayout>
    )
}
