"use client"

import { Card } from "@/components/ui/card"
import { FileText, Briefcase, Building2, Calendar } from "lucide-react"

interface StatsCardsProps {
    stats: {
        totalApplications: number;
        activeJobs: number;
        companiesApplied: number;
        interviewsScheduled: number;
    }
}

export function StatsCards({ stats }: StatsCardsProps) {
    const cards = [
        {
            label: "Total applications",
            value: stats.totalApplications,
            subtext: "Across all companies",
            icon: FileText,
            color: "text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            label: "Active jobs",
            value: stats.activeJobs,
            subtext: "Currently in your pipeline",
            icon: Briefcase,
            color: "text-purple-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/20"
        },
        {
            label: "Companies applied",
            value: stats.companiesApplied,
            subtext: "Where you have at least one application",
            icon: Building2,
            color: "text-amber-500",
            bgColor: "bg-amber-50 dark:bg-amber-900/20"
        },
        {
            label: "Interviews scheduled",
            value: stats.interviewsScheduled,
            subtext: "Including upcoming rounds",
            icon: Calendar,
            color: "text-emerald-500",
            bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div key={index} className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800 transition-all hover:shadow-md">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-2 rounded-lg ${card.bgColor} ${card.color}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            {index === 1 && <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />}
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">{card.value}</div>
                            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{card.label}</h3>
                            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">{card.subtext}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
