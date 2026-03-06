"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/ThemeContext"
import { Quota } from "@/services/interviewsService"
import {
    Briefcase, Calendar, StickyNote, Mail, FileCheck,
    AlertTriangle, RotateCcw
} from "lucide-react"

interface QuotaUsageProps {
    quotas: Quota[]
}

const RESOURCE_META: Record<string, { label: string; icon: typeof Briefcase }> = {
    jobs: { label: "Job Applications", icon: Briefcase },
    interviews: { label: "Interviews", icon: Calendar },
    notes: { label: "Notes", icon: StickyNote },
    emails: { label: "Emails", icon: Mail },
    ats_checks: { label: "ATS Checks", icon: FileCheck },
}

function getProgressColor(percent: number) {
    if (percent >= 80) return { bar: "from-red-500 to-rose-500", text: "text-red-500 dark:text-red-400" }
    if (percent >= 50) return { bar: "from-amber-400 to-orange-500", text: "text-amber-500 dark:text-amber-400" }
    return { bar: "from-emerald-400 to-emerald-500", text: "text-emerald-500 dark:text-emerald-400" }
}

export function QuotaUsage({ quotas }: QuotaUsageProps) {
    const { theme } = useTheme()

    if (!quotas || quotas.length === 0) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className={`rounded-[2rem] border overflow-hidden transition-all
                ${theme === "dark"
                    ? "bg-neutral-900 border-zinc-800"
                    : "bg-white border-gray-200 shadow-sm"
                }`}
        >
            {/* Header */}
            <div className={`px-6 sm:px-8 py-5 border-b
                ${theme === "dark" ? "border-zinc-800" : "border-gray-100"}`}
            >
                <h3 className={`text-base font-bold flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    <RotateCcw className="h-4 w-4 text-violet-500" />
                    Usage & Quotas
                </h3>
                <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                    Track your resource consumption this billing cycle
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className={`border-b ${theme === "dark" ? "border-zinc-800 bg-zinc-800/30" : "border-gray-100 bg-gray-50/50"}`}>
                            <th className={`text-left py-3 px-6 sm:px-8 text-xs font-semibold uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Resource</th>
                            <th className={`text-center py-3 px-4 text-xs font-semibold uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Used</th>
                            <th className={`text-center py-3 px-4 text-xs font-semibold uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Limit</th>
                            <th className={`text-center py-3 px-4 text-xs font-semibold uppercase tracking-wide ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Remaining</th>
                            <th className={`text-left py-3 px-6 sm:px-8 text-xs font-semibold uppercase tracking-wide min-w-[180px] ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotas.map((quota, index) => {
                            const meta = RESOURCE_META[quota.resource] || {
                                label: quota.resource.charAt(0).toUpperCase() + quota.resource.slice(1),
                                icon: Briefcase
                            }
                            const Icon = meta.icon
                            const percent = quota.limit > 0 ? Math.round((quota.used / quota.limit) * 100) : 0
                            const colors = getProgressColor(percent)
                            const isNearLimit = percent >= 80

                            return (
                                <motion.tr
                                    key={quota.resource}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
                                    className={`border-b transition-colors ${theme === "dark" ? "border-zinc-800/50 hover:bg-zinc-800/20" : "border-gray-100 hover:bg-gray-50/50"}`}
                                >
                                    {/* Resource */}
                                    <td className={`py-3.5 px-6 sm:px-8 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                        <div className="flex items-center gap-3">
                                            <Icon className={`h-4 w-4 flex-shrink-0 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                                            <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                {meta.label}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Used */}
                                    <td className="py-3.5 px-4 text-center">
                                        <span className={`font-bold ${colors.text}`}>{quota.used}</span>
                                    </td>

                                    {/* Limit */}
                                    <td className={`py-3.5 px-4 text-center font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        {quota.limit}
                                    </td>

                                    {/* Remaining */}
                                    <td className={`py-3.5 px-4 text-center font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        {quota.remaining}
                                    </td>

                                    {/* Progress */}
                                    <td className="py-3.5 px-6 sm:px-8">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex-1 h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min(percent, 100)}%` }}
                                                    transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
                                                />
                                            </div>
                                            <span className={`text-xs font-semibold whitespace-nowrap ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {percent}%
                                            </span>
                                            {isNearLimit && (
                                                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}
