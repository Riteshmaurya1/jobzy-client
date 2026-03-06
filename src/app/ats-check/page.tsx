"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import DashboardLayout from "@/app/dashboard/layout"
import { Topbar } from "@/components/dashboard/Topbar"
import { useTheme } from "@/contexts/ThemeContext"
import { useToast } from "@/components/ui/use-toast"
import { atsService } from "@/services/atsService"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    FileCheck, Upload, FileText, Loader2, AlertCircle,
    CheckCircle2, XCircle, Sparkles, Target, TrendingUp,
    ChevronRight, BarChart3, Zap, ShieldCheck, ShieldAlert,
    BookOpen
} from "lucide-react"

/* ──────────────── types ──────────────── */

interface ATSData {
    atsScore: number
    overallFeedback: string
    strengths: string[]
    weaknesses: string[]
    missingKeywords: string[]
    suggestions: string[]
    sectionScores: Record<string, number>
    keywordMatches: { found: string[]; missing: string[] }
    expectedKeywords: string[]
    jobRole: string
    documentId: string
}

/* ──────────────── Score Ring ──────────────── */

function ScoreRing({ score, size = 150, theme }: { score: number; size?: number; theme: string }) {
    const dark = theme === "dark"
    const radius = (size - 16) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference
    const color = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444"

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius}
                    stroke={dark ? "#27272a" : "#f3f4f6"} strokeWidth="10" fill="none" />
                <motion.circle cx={size / 2} cy={size / 2} r={radius}
                    stroke={color} strokeWidth="10" fill="none" strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    strokeDasharray={circumference} />
            </svg>
            <div className="absolute flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className={`text-3xl font-black ${dark ? "text-white" : "text-gray-900"}`}
                >{score}</motion.span>
                <span className={`text-[10px] font-medium uppercase tracking-wider ${dark ? "text-gray-500" : "text-gray-400"}`}>
                    ATS Score
                </span>
            </div>
        </div>
    )
}

/* ──────────────── Section Score Bar ──────────────── */

function SectionBar({ label, score, theme }: { label: string; score: number; theme: string }) {
    const dark = theme === "dark"
    const color = score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500"
    return (
        <div className="space-y-1">
            <div className="flex justify-between">
                <span className={`text-[11px] font-medium capitalize ${dark ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
                <span className={`text-[11px] font-bold ${dark ? "text-gray-300" : "text-gray-700"}`}>{score}%</span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-zinc-800" : "bg-gray-100"}`}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    )
}

/* ──────────────── Page ──────────────── */

export default function ATSCheckPage() {
    const [result, setResult] = useState<ATSData | null>(null)
    const [checking, setChecking] = useState(false)
    const [fileName, setFileName] = useState("")
    const [jobRole, setJobRole] = useState("")
    const [usage, setUsage] = useState<any>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const selectedFileRef = useRef<File | null>(null)
    const { theme } = useTheme()
    const { toast } = useToast()
    const router = useRouter()
    const dark = theme === "dark"

    /* ── fetch usage on mount ── */
    useEffect(() => {
        async function load() {
            const token = localStorage.getItem("accessToken")
            if (!token) { router.push("/signin"); return }
            try {
                const res = await atsService.getUsage()
                if (res.success) setUsage(res.data)
            } catch { /* ignore */ }
        }
        load()
    }, [router])

    /* ── file select ── */
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        selectedFileRef.current = file
        setFileName(file.name)
    }

    /* ── ATS check ── */
    const handleCheck = async () => {
        if (!selectedFileRef.current) {
            toast({ title: "No file", description: "Please select a resume to check.", variant: "destructive" })
            return
        }
        setChecking(true)
        setResult(null)
        try {
            const fd = new FormData()
            fd.append("resume", selectedFileRef.current)
            if (jobRole.trim()) fd.append("jobRole", jobRole.trim())

            const res = await atsService.check(fd)
            if (res.success && res.data) {
                setResult(res.data)
                toast({ title: "ATS Check Complete ✅", description: `Score: ${res.data.atsScore}/100` })
                // refresh usage
                try {
                    const u = await atsService.getUsage()
                    if (u.success) setUsage(u.data)
                } catch { /* */ }
            } else {
                toast({ title: "Check Failed", description: res.message || "Could not analyze resume.", variant: "destructive" })
            }
        } catch {
            toast({ title: "Error", description: "ATS check failed.", variant: "destructive" })
        } finally {
            setChecking(false)
        }
    }

    /* ── reset ── */
    const handleReset = () => {
        setResult(null)
        setFileName("")
        setJobRole("")
        selectedFileRef.current = null
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    /* ── Section label formatting ── */
    const sectionLabel = (key: string) => {
        const map: Record<string, string> = {
            contactInfo: "Contact Info",
            summary: "Summary",
            experience: "Work Experience",
            skills: "Skills",
            education: "Education",
            formatting: "Formatting"
        }
        return map[key] || key
    }

    return (
        <DashboardLayout>
            <Topbar breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "ATS Resume Check" }
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
                            <FileCheck className="h-5 w-5 text-violet-500" />
                            ATS Resume Check
                        </h2>
                        <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            Upload your resume to check ATS compatibility and get improvement suggestions
                        </p>
                    </div>
                    {usage && (
                        <div className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border
                            ${dark ? "bg-zinc-800 border-zinc-700 text-gray-300" : "bg-gray-100 border-gray-200 text-gray-600"}`}>
                            <BarChart3 className="h-3.5 w-3.5" />
                            {usage.atsChecksUsed || 0} checks used
                        </div>
                    )}
                </motion.div>

                {/* ── Upload Panel (full width when no results, side-by-side when results) ── */}
                <div className={`grid gap-6 ${result ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1 max-w-2xl mx-auto"}`}>

                    {/* Upload Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.5 }}
                        className={`rounded-[2rem] border overflow-hidden ${result ? "lg:col-span-1" : ""}
                            ${dark ? "bg-neutral-900 border-zinc-800" : "bg-white border-gray-200 shadow-sm"}`}
                    >
                        <div className={`px-6 py-5 border-b ${dark ? "border-zinc-800" : "border-gray-100"}`}>
                            <h3 className={`text-sm font-bold flex items-center gap-2 ${dark ? "text-white" : "text-gray-900"}`}>
                                <Upload className="h-4 w-4 text-violet-500" /> Upload Resume
                            </h3>
                        </div>

                        <div className="px-6 py-6 space-y-5">
                            {/* Drop zone */}
                            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileSelect} />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`w-full rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer
                                    ${fileName
                                        ? (dark ? "border-violet-700 bg-violet-950/10" : "border-violet-300 bg-violet-50/50")
                                        : (dark ? "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50")
                                    }`}
                            >
                                {fileName ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <FileText className={`h-8 w-8 ${dark ? "text-violet-400" : "text-violet-500"}`} />
                                        <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>{fileName}</p>
                                        <p className={`text-[11px] ${dark ? "text-gray-500" : "text-gray-400"}`}>Click to change</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className={`h-8 w-8 ${dark ? "text-gray-600" : "text-gray-400"}`} />
                                        <p className={`text-sm font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Click to select resume</p>
                                        <p className={`text-[11px] ${dark ? "text-gray-600" : "text-gray-400"}`}>PDF, DOC, or DOCX</p>
                                    </div>
                                )}
                            </button>

                            {/* Job Role */}
                            <div className="space-y-2">
                                <Label className={`text-xs font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>
                                    Job Role
                                </Label>
                                <Input
                                    value={jobRole}
                                    onChange={(e) => setJobRole(e.target.value)}
                                    placeholder="e.g. backend, frontend, data engineer..."
                                    className={`rounded-xl h-10 text-sm
                                        ${dark
                                            ? "bg-neutral-950 border-zinc-800 text-white placeholder:text-gray-600"
                                            : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                                        }`}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                {result && (
                                    <button onClick={handleReset}
                                        className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                            ${dark ? "bg-transparent text-white border-zinc-600 hover:border-zinc-500 hover:bg-zinc-700/50"
                                                : "bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}>
                                        New Check
                                    </button>
                                )}
                                <button onClick={handleCheck} disabled={checking || !fileName}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                        ${dark
                                            ? "bg-neutral-900 text-white border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.7)] hover:bg-neutral-800"
                                            : "bg-white text-neutral-900 border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] hover:bg-gray-50"}
                                        ${(checking || !fileName) ? "opacity-40 cursor-not-allowed" : ""}`}>
                                    {checking
                                        ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Analyzing...</>
                                        : <><Zap className="h-3.5 w-3.5" /> Check Resume</>}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* ═══════════════ Results ═══════════════ */}
                    {(result || checking) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className={`lg:col-span-2 rounded-[2rem] border overflow-hidden
                                ${dark ? "bg-neutral-900 border-zinc-800" : "bg-white border-gray-200 shadow-sm"}`}
                        >
                            <div className={`px-6 py-5 border-b ${dark ? "border-zinc-800" : "border-gray-100"}`}>
                                <h3 className={`text-sm font-bold flex items-center gap-2 ${dark ? "text-white" : "text-gray-900"}`}>
                                    <Target className="h-4 w-4 text-violet-500" /> Analysis Results
                                </h3>
                            </div>

                            {checking ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-4">
                                    <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
                                    <p className={`text-sm font-medium ${dark ? "text-gray-400" : "text-gray-500"}`}>Analyzing your resume...</p>
                                </div>
                            ) : result && (
                                <div className="px-6 py-6 space-y-8">

                                    {/* Row 1: Score Ring + Section Scores */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <ScoreRing score={result.atsScore} theme={theme} />
                                            <p className={`text-center text-sm font-medium max-w-xs ${result.atsScore >= 80 ? "text-emerald-500" :
                                                    result.atsScore >= 50 ? "text-amber-500" : "text-red-500"}`}>
                                                {result.atsScore >= 80 ? "Great! Your resume is ATS-friendly 🎉"
                                                    : result.atsScore >= 50 ? "Good start, room for improvement"
                                                        : "Needs significant improvements"}
                                            </p>
                                        </div>

                                        {/* Section scores */}
                                        {result.sectionScores && (
                                            <div className="space-y-3">
                                                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                                                    Section Breakdown
                                                </h4>
                                                {Object.entries(result.sectionScores).map(([key, score]) => (
                                                    <SectionBar key={key} label={sectionLabel(key)} score={score} theme={theme} />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Overall feedback */}
                                    {result.overallFeedback && (
                                        <div className={`rounded-2xl p-5 border ${dark ? "bg-neutral-950 border-zinc-800" : "bg-gray-50 border-gray-100"}`}>
                                            <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                                                <BookOpen className="h-3.5 w-3.5 text-violet-500" /> Overall Feedback
                                            </h4>
                                            <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                                {result.overallFeedback}
                                            </p>
                                        </div>
                                    )}

                                    {/* Strengths + Weaknesses side by side */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {/* Strengths */}
                                        {result.strengths && result.strengths.length > 0 && (
                                            <div>
                                                <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-3 ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                                                    <ShieldCheck className="h-3.5 w-3.5" /> Strengths
                                                </h4>
                                                <ul className="space-y-2">
                                                    {result.strengths.map((s, i) => (
                                                        <li key={i} className={`text-xs flex items-start gap-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                                            <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0 text-emerald-500" />
                                                            <span>{s}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Weaknesses */}
                                        {result.weaknesses && result.weaknesses.length > 0 && (
                                            <div>
                                                <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-3 ${dark ? "text-red-400" : "text-red-600"}`}>
                                                    <ShieldAlert className="h-3.5 w-3.5" /> Weaknesses
                                                </h4>
                                                <ul className="space-y-2">
                                                    {result.weaknesses.map((w, i) => (
                                                        <li key={i} className={`text-xs flex items-start gap-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                                            <XCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-red-500" />
                                                            <span>{w}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Keywords: Found + Missing */}
                                    {result.keywordMatches && (
                                        <div className="space-y-4">
                                            {/* Found */}
                                            {result.keywordMatches.found && result.keywordMatches.found.length > 0 && (
                                                <div>
                                                    <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-2.5 ${dark ? "text-emerald-400" : "text-emerald-600"}`}>
                                                        <CheckCircle2 className="h-3.5 w-3.5" /> Keywords Found ({result.keywordMatches.found.length})
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {result.keywordMatches.found.map((kw, i) => (
                                                            <span key={i} className={`text-[10px] font-medium px-2.5 py-1 rounded-full border
                                                                ${dark ? "bg-emerald-950/30 text-emerald-400 border-emerald-800"
                                                                    : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}>
                                                                {kw}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {/* Missing */}
                                            {result.keywordMatches.missing && result.keywordMatches.missing.length > 0 && (
                                                <div>
                                                    <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-2.5 ${dark ? "text-red-400" : "text-red-600"}`}>
                                                        <XCircle className="h-3.5 w-3.5" /> Missing Keywords ({result.keywordMatches.missing.length})
                                                    </h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {result.keywordMatches.missing.map((kw, i) => (
                                                            <span key={i} className={`text-[10px] font-medium px-2.5 py-1 rounded-full border
                                                                ${dark ? "bg-red-950/30 text-red-400 border-red-800"
                                                                    : "bg-red-50 text-red-600 border-red-200"}`}>
                                                                {kw}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Suggestions */}
                                    {result.suggestions && result.suggestions.length > 0 && (
                                        <div>
                                            <h4 className={`text-xs font-bold flex items-center gap-1.5 mb-3 ${dark ? "text-amber-400" : "text-amber-600"}`}>
                                                <Sparkles className="h-3.5 w-3.5" /> Suggestions to Improve
                                            </h4>
                                            <ul className="space-y-2.5">
                                                {result.suggestions.map((s, i) => (
                                                    <li key={i} className={`text-xs flex items-start gap-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                                                        <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-violet-500" />
                                                        <span>{s}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Empty state when no results and not checking */}
                    {!result && !checking && (
                        <div className="hidden" /> /* upload panel is already centered */
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
