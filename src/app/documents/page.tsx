"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import DashboardLayout from "@/app/dashboard/layout"
import { Topbar } from "@/components/dashboard/Topbar"
import { useTheme } from "@/contexts/ThemeContext"
import { useToast } from "@/components/ui/use-toast"
import { documentsService, Document, ATSDocStats } from "@/services/documentsService"
import { Input } from "@/components/ui/input"
import {
    FileText, Trash2, Download, Search, Loader2,
    AlertCircle, TrendingUp, TrendingDown, BarChart3,
    FileCheck, ChevronRight, X, CheckCircle2, XCircle,
    Sparkles, BookOpen, ShieldCheck, ShieldAlert, Eye
} from "lucide-react"
import { format } from "date-fns"

/* ──────────────── helpers ──────────────── */

function formatBytes(bytes: number) {
    if (!bytes) return "—"
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / 1048576).toFixed(1) + " MB"
}

function scoreColor(score: number | null) {
    if (score === null) return "text-gray-400"
    if (score >= 80) return "text-emerald-500"
    if (score >= 50) return "text-amber-500"
    return "text-red-500"
}

function scoreBg(score: number | null, dark: boolean) {
    if (score === null) return dark ? "bg-zinc-800" : "bg-gray-100"
    if (score >= 80) return dark ? "bg-emerald-950/30" : "bg-emerald-50"
    if (score >= 50) return dark ? "bg-amber-950/30" : "bg-amber-50"
    return dark ? "bg-red-950/30" : "bg-red-50"
}

function sectionLabel(key: string) {
    const map: Record<string, string> = {
        contactInfo: "Contact Info", summary: "Summary", experience: "Work Experience",
        skills: "Skills", education: "Education", formatting: "Formatting"
    }
    return map[key] || key
}

/* ──────────────── Score Ring (small) ──────────────── */

function ScoreRing({ score, size = 120, dark }: { score: number; size?: number; dark: boolean }) {
    const radius = (size - 12) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference
    const color = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444"

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius}
                    stroke={dark ? "#27272a" : "#f3f4f6"} strokeWidth="8" fill="none" />
                <motion.circle cx={size / 2} cy={size / 2} r={radius}
                    stroke={color} strokeWidth="8" fill="none" strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    strokeDasharray={circumference} />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={`text-2xl font-black ${dark ? "text-white" : "text-gray-900"}`}>{score}</span>
                <span className={`text-[9px] font-medium uppercase tracking-wider ${dark ? "text-gray-500" : "text-gray-400"}`}>Score</span>
            </div>
        </div>
    )
}

/* ──────────────── Section Bar ──────────────── */

function SectionBar({ label, score, dark }: { label: string; score: number; dark: boolean }) {
    const color = score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500"
    return (
        <div className="space-y-1">
            <div className="flex justify-between">
                <span className={`text-[11px] font-medium ${dark ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
                <span className={`text-[11px] font-bold ${dark ? "text-gray-300" : "text-gray-700"}`}>{score}%</span>
            </div>
            <div className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-zinc-800" : "bg-gray-100"}`}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${color}`} />
            </div>
        </div>
    )
}

/* ──────────────── Stat Card ──────────────── */

function StatCard({ label, value, icon: Icon, accent, dark }: {
    label: string; value: string | number; icon: any; accent: string; dark: boolean
}) {
    const accents: Record<string, { gradient: string; text: string }> = {
        violet: { gradient: "from-violet-500 to-purple-600", text: dark ? "text-white" : "text-gray-900" },
        emerald: { gradient: "from-emerald-400 to-teal-500", text: "text-emerald-500" },
        red: { gradient: "from-red-400 to-rose-500", text: "text-red-500" },
        amber: { gradient: "from-amber-400 to-orange-500", text: "text-amber-500" },
    }
    const a = accents[accent] || accents.violet
    return (
        <div className={`rounded-2xl border p-4 ${dark ? "bg-neutral-900 border-zinc-800" : "bg-white border-gray-200 shadow-sm"}`}>
            <div className="flex items-center gap-3">
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${a.gradient} shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                    <p className={`text-[11px] font-medium ${dark ? "text-gray-500" : "text-gray-400"}`}>{label}</p>
                    <p className={`text-lg font-black ${a.text}`}>{value}</p>
                </div>
            </div>
        </div>
    )
}

/* ──────────────── Detail Modal ──────────────── */

function DetailModal({ docId, dark, onClose }: { docId: string; dark: boolean; onClose: () => void }) {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetch() {
            try {
                const res = await documentsService.getById(docId)
                if (res.success && res.data) setData(res.data)
            } catch { /* */ }
            finally { setLoading(false) }
        }
        fetch()
    }, [docId])

    const analysis = data?.atsAnalysis

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto"
            >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-full max-w-3xl rounded-[2rem] border shadow-2xl mb-10
                        ${dark ? "bg-neutral-900 border-zinc-800" : "bg-white border-gray-200"}`}
                >
                    {/* Close */}
                    <button onClick={onClose}
                        className={`absolute top-5 right-5 p-2 rounded-full z-10 transition-colors
                            ${dark ? "hover:bg-zinc-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                        <X className="h-5 w-5" />
                    </button>

                    {loading ? (
                        <div className="flex items-center justify-center py-32">
                            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
                        </div>
                    ) : !data ? (
                        <div className="flex items-center justify-center py-32">
                            <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>Could not load document details.</p>
                        </div>
                    ) : (
                        <div className="px-6 sm:px-8 py-8 space-y-7">

                            {/* Header */}
                            <div>
                                <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                                    {data.fileName}
                                </h3>
                                <div className={`flex flex-wrap gap-3 mt-1.5 text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
                                    <span>{formatBytes(data.fileSize)}</span>
                                    <span>{data.fileType}</span>
                                    {data.uploadSource && <span className="uppercase">{data.uploadSource.replace(/_/g, " ")}</span>}
                                </div>
                            </div>

                            {analysis ? (
                                <>
                                    {/* Score ring + section scores */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <ScoreRing score={analysis.atsScore} dark={dark} />
                                            <p className={`text-sm font-medium text-center ${analysis.atsScore >= 80 ? "text-emerald-500" :
                                                    analysis.atsScore >= 50 ? "text-amber-500" : "text-red-500"}`}>
                                                {analysis.atsScore >= 80 ? "ATS-Friendly 🎉"
                                                    : analysis.atsScore >= 50 ? "Room for Improvement"
                                                        : "Needs Work"}
                                            </p>
                                        </div>
                                        {analysis.sectionScores && (
                                            <div className="space-y-2.5">
                                                <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                                                    Section Breakdown
                                                </h4>
                                                {Object.entries(analysis.sectionScores).map(([key, score]) => (
                                                    <SectionBar key={key} label={sectionLabel(key)} score={score as number} dark={dark} />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Overall feedback */}
                                    {analysis.overallFeedback && (
                                        <div className={`rounded-2xl p-4 border ${dark ? "bg-neutral-950 border-zinc-800" : "bg-gray-50 border-gray-100"}`}>
                                            <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                                                <BookOpen className="h-3.5 w-3.5 text-violet-500" /> Overall Feedback
                                            </h4>
                                            <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                                {analysis.overallFeedback}
                                            </p>
                                        </div>
                                    )}

                                    {/* Strengths + Weaknesses */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {analysis.strengths?.length > 0 && (
                                            <div>
                                                <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-2.5 ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                                                    <ShieldCheck className="h-3.5 w-3.5" /> Strengths
                                                </h4>
                                                <ul className="space-y-2">
                                                    {analysis.strengths.map((s: string, i: number) => (
                                                        <li key={i} className={`text-xs flex items-start gap-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                                            <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0 text-emerald-500" />
                                                            <span>{s}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {analysis.weaknesses?.length > 0 && (
                                            <div>
                                                <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-2.5 ${dark ? "text-red-400" : "text-red-600"}`}>
                                                    <ShieldAlert className="h-3.5 w-3.5" /> Weaknesses
                                                </h4>
                                                <ul className="space-y-2">
                                                    {analysis.weaknesses.map((w: string, i: number) => (
                                                        <li key={i} className={`text-xs flex items-start gap-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                                            <XCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-red-500" />
                                                            <span>{w}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Keywords Found + Missing */}
                                    {analysis.keywordMatches && (
                                        <div className="space-y-4">
                                            {analysis.keywordMatches.found?.length > 0 && (
                                                <div>
                                                    <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                                                        <CheckCircle2 className="h-3.5 w-3.5" /> Keywords Found ({analysis.keywordMatches.found.length})
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {analysis.keywordMatches.found.map((kw: string, i: number) => (
                                                            <span key={i} className={`text-[10px] font-medium px-2.5 py-1 rounded-full border
                                                                ${dark ? "bg-emerald-950/30 text-emerald-400 border-emerald-800"
                                                                    : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}>{kw}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {analysis.keywordMatches.missing?.length > 0 && (
                                                <div>
                                                    <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${dark ? "text-red-400" : "text-red-600"}`}>
                                                        <XCircle className="h-3.5 w-3.5" /> Missing Keywords ({analysis.keywordMatches.missing.length})
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {analysis.keywordMatches.missing.map((kw: string, i: number) => (
                                                            <span key={i} className={`text-[10px] font-medium px-2.5 py-1 rounded-full border
                                                                ${dark ? "bg-red-950/30 text-red-400 border-red-800"
                                                                    : "bg-red-50 text-red-600 border-red-200"}`}>{kw}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Suggestions */}
                                    {analysis.suggestions?.length > 0 && (
                                        <div>
                                            <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-2.5 ${dark ? "text-amber-400" : "text-amber-600"}`}>
                                                <Sparkles className="h-3.5 w-3.5" /> Suggestions
                                            </h4>
                                            <ul className="space-y-2">
                                                {analysis.suggestions.map((s: string, i: number) => (
                                                    <li key={i} className={`text-xs flex items-start gap-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                                        <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-violet-500" />
                                                        <span>{s}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <AlertCircle className={`h-8 w-8 mb-3 ${dark ? "text-gray-600" : "text-gray-400"}`} />
                                    <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>No ATS analysis available for this document.</p>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

/* ──────────────── Page ──────────────── */

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [filtered, setFiltered] = useState<Document[]>([])
    const [stats, setStats] = useState<ATSDocStats | null>(null)
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
    const { theme } = useTheme()
    const { toast } = useToast()
    const router = useRouter()
    const dark = theme === "dark"

    /* ── fetch ── */
    useEffect(() => {
        async function load() {
            const token = localStorage.getItem("accessToken")
            if (!token) { router.push("/signin"); return }

            try {
                const [docsRes, statsRes] = await Promise.all([
                    documentsService.getAll(),
                    documentsService.getATSStats()
                ])
                if (docsRes.success && docsRes.data) {
                    const docs = docsRes.data.documents || []
                    setDocuments(docs)
                    setFiltered(docs)
                }
                if (statsRes.success && statsRes.data) {
                    setStats(statsRes.data)
                }
            } catch {
                toast({ title: "Error", description: "Could not load documents", variant: "destructive" })
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [router, toast])

    /* ── search filter ── */
    useEffect(() => {
        if (!search.trim()) { setFiltered(documents); return }
        const q = search.toLowerCase()
        setFiltered(documents.filter(d => d.fileName.toLowerCase().includes(q)))
    }, [search, documents])

    /* ── download ── */
    const handleDownload = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        try {
            const res = await documentsService.getDownloadUrl(id)
            if (res.success && res.data?.downloadUrl) {
                window.open(res.data.downloadUrl, "_blank")
            } else {
                toast({ title: "Error", description: res.message || "Could not get download link.", variant: "destructive" })
            }
        } catch {
            toast({ title: "Error", description: "Download failed.", variant: "destructive" })
        }
    }

    /* ── delete ── */
    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        try {
            const res = await documentsService.delete(id)
            if (res.success) {
                setDocuments(prev => prev.filter(d => d.id !== id))
                toast({ title: "Deleted", description: "Document removed." })
            }
        } catch {
            toast({ title: "Error", description: "Could not delete.", variant: "destructive" })
        }
    }

    /* ── loading state ── */
    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[60vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <Topbar breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Documents" }
            ]} />

            <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                    <div>
                        <h2 className={`text-xl font-bold font-display flex items-center gap-2 ${dark ? "text-white" : "text-gray-900"}`}>
                            <FileText className="h-5 w-5 text-violet-500" />
                            Documents
                        </h2>
                        <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            {documents.length} document{documents.length !== 1 ? "s" : ""} stored — click any row to view full ATS analysis
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 ${dark ? "text-gray-500" : "text-gray-400"}`} />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search documents..."
                                className={`pl-9 h-9 text-xs w-56 rounded-full ${dark ? "bg-neutral-950 border-zinc-800" : "bg-white"}`}
                            />
                        </div>
                        <a href="/ats-check"
                            className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                ${dark
                                    ? "bg-neutral-900 text-white border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.7)] hover:bg-neutral-800"
                                    : "bg-white text-neutral-900 border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] hover:bg-gray-50"}`}>
                            <FileCheck className="h-3.5 w-3.5" /> ATS Check <ChevronRight className="h-3 w-3" />
                        </a>
                    </div>
                </motion.div>

                {/* ── Stats Cards ── */}
                {stats && (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard label="Total Documents" value={stats.totalDocuments} icon={BarChart3} accent="violet" dark={dark} />
                        <StatCard label="Average ATS Score" value={`${Math.round(Number(stats.averageScore))}%`} icon={FileCheck} accent="amber" dark={dark} />
                        <StatCard label="Highest Score" value={`${stats.highestScore}%`} icon={TrendingUp} accent="emerald" dark={dark} />
                        <StatCard label="Lowest Score" value={`${stats.lowestScore}%`} icon={TrendingDown} accent="red" dark={dark} />
                    </motion.div>
                )}

                {/* ── Documents Table ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className={`rounded-[2rem] border overflow-hidden transition-all
                        ${dark ? "bg-neutral-900 border-zinc-800" : "bg-white border-gray-200 shadow-sm"}`}
                >
                    {/* Table header */}
                    <div className={`hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-wider border-b
                        ${dark ? "text-gray-500 border-zinc-800 bg-neutral-950/50" : "text-gray-400 border-gray-100 bg-gray-50/50"}`}>
                        <div className="col-span-5">File Name</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2">ATS Score</div>
                        <div className="col-span-2">Source</div>
                        <div className="col-span-1 text-right">Actions</div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className={`rounded-full p-4 mb-4 ${dark ? "bg-zinc-800" : "bg-gray-100"}`}>
                                <AlertCircle className={`h-6 w-6 ${dark ? "text-gray-600" : "text-gray-400"}`} />
                            </div>
                            <p className={`text-sm font-medium ${dark ? "text-gray-500" : "text-gray-400"}`}>
                                {search ? "No documents match your search" : "No documents yet"}
                            </p>
                            <p className={`text-xs mt-1 ${dark ? "text-gray-600" : "text-gray-400"}`}>
                                Upload a resume via the ATS Check page to get started
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {filtered.map((doc, idx) => (
                                <motion.div
                                    key={doc.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.03 }}
                                    onClick={() => setSelectedDocId(doc.id)}
                                    className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center px-5 sm:px-6 py-4 transition-colors cursor-pointer
                                        ${dark ? "hover:bg-zinc-800/50" : "hover:bg-gray-50"}`}
                                >
                                    {/* File name */}
                                    <div className="sm:col-span-5 flex items-center gap-3 min-w-0">
                                        <div className={`flex-shrink-0 rounded-xl p-2.5 ${dark ? "bg-zinc-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
                                            <FileText className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className={`text-sm font-semibold truncate ${dark ? "text-white" : "text-gray-900"}`}>
                                                {doc.fileName}
                                            </p>
                                            <p className={`text-[10px] sm:hidden ${dark ? "text-gray-600" : "text-gray-400"}`}>
                                                {formatBytes(doc.fileSize)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Size */}
                                    <div className={`hidden sm:block sm:col-span-2 text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
                                        {formatBytes(doc.fileSize)}
                                    </div>

                                    {/* ATS Score */}
                                    <div className="sm:col-span-2">
                                        {doc.atsScore !== null && doc.atsScore !== undefined ? (
                                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${scoreBg(doc.atsScore, dark)} ${scoreColor(doc.atsScore)}`}>
                                                <FileCheck className="h-3 w-3" />
                                                {doc.atsScore}%
                                            </span>
                                        ) : (
                                            <span className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>—</span>
                                        )}
                                    </div>

                                    {/* Source */}
                                    <div className="hidden sm:block sm:col-span-2">
                                        <span className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border
                                            ${dark ? "bg-zinc-800 text-gray-300 border-zinc-700" : "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                            {doc.uploadSource?.replace(/_/g, " ") || "manual"}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="sm:col-span-1 flex items-center justify-end gap-1">
                                        <button
                                            onClick={(e) => handleDownload(e, doc.id)}
                                            className={`p-2 rounded-lg transition-colors ${dark ? "text-gray-500 hover:text-white hover:bg-zinc-800" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"}`}
                                            title="Download"
                                        >
                                            <Download className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, doc.id)}
                                            className={`p-2 rounded-lg transition-colors ${dark ? "text-gray-500 hover:text-red-400 hover:bg-red-950/20" : "text-gray-400 hover:text-red-600 hover:bg-red-50"}`}
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* ── Detail Modal ── */}
            {selectedDocId && (
                <DetailModal docId={selectedDocId} dark={dark} onClose={() => setSelectedDocId(null)} />
            )}
        </DashboardLayout>
    )
}
