"use client"

import { TrendingUp } from "lucide-react"

interface MonthlyApplicationsProps {
    data: { month: string; count: number }[]
}

export function MonthlyApplications({ data }: MonthlyApplicationsProps) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Monthly applications</h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-4">How many jobs you applied to per month.</p>

            <div className="space-y-2">
                {data.length === 0 ? (
                    <div className="text-center py-4 text-sm text-neutral-500">No application history yet.</div>
                ) : (
                    data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3 border border-neutral-100 dark:border-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white dark:bg-neutral-800 rounded-md shadow-sm">
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                </div>
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{item.month}</span>
                            </div>
                            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{item.count} <span className="text-xs font-normal text-neutral-500">apps</span></span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
