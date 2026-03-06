"use client"

import { FileText, UserCheck, Calendar, Award } from "lucide-react"

interface PipelineOverviewProps {
    data: {
        applied: number;
        screening: number;
        interviewScheduled: number;
        offered: number;
        accepted: number;
    }
}

export function PipelineOverview({ data }: PipelineOverviewProps) {
    const stages = [
        {
            label: "APPLIED",
            value: data.applied,
            subtext: "Waiting on first response",
            icon: FileText,
            color: "text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-900/10",
            borderColor: "border-blue-100 dark:border-blue-900/30"
        },
        {
            label: "SCREENING",
            value: data.screening,
            subtext: "Recruiter / HR reviewing",
            icon: UserCheck,
            color: "text-purple-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/10",
            borderColor: "border-purple-100 dark:border-purple-900/30"
        },
        {
            label: "INTERVIEW SCHEDULED",
            value: data.interviewScheduled,
            subtext: "Upcoming rounds",
            icon: Calendar,
            color: "text-amber-500",
            bgColor: "bg-amber-50 dark:bg-amber-900/10",
            borderColor: "border-amber-100 dark:border-amber-900/30"
        },
        {
            label: "OFFERS & DECISIONS",
            value: `${data.offered}/${data.accepted}`,
            subtext: "Offers vs accepted roles",
            icon: Award,
            color: "text-emerald-500",
            bgColor: "bg-emerald-50 dark:bg-emerald-900/10",
            borderColor: "border-emerald-100 dark:border-emerald-900/30"
        }
    ]

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Pipeline overview</h3>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">How your applications are distributed across stages.</p>
                </div>
                <button className="rounded-lg border px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors">
                    Open board
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stages.map((stage, index) => {
                    const Icon = stage.icon
                    return (
                        <div key={index} className={`rounded-xl p-4 border transition-all duration-200 hover:shadow-md ${stage.bgColor} ${stage.borderColor}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2.5 rounded-xl bg-white/60 dark:bg-black/20 backdrop-blur-sm shadow-sm">
                                    <Icon className={`w-5 h-5 ${stage.color}`} />
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${stage.color} opacity-90 bg-white/40 dark:bg-black/20 px-2 py-0.5 rounded-full`}>{stage.label}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">{stage.value}</div>
                                <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-tight">{stage.subtext}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
