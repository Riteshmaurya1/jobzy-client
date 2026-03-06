"use client"

import { Briefcase, Building2, MapPin, CheckCircle2 } from "lucide-react"

interface JobBreakdownProps {
    data: {
        status: Record<string, number>;
        workMode: Record<string, number>;
        type: Record<string, number>;
    }
}

export function JobBreakdown({ data }: JobBreakdownProps) {
    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Job breakdown</h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6">How your opportunities are distributed.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-violet-500" />
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">By status</h4>
                    </div>
                    {Object.entries(data.status).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-xs mb-2 last:mb-0">
                            <span className="text-neutral-500 dark:text-neutral-400 capitalize">{key.replace("-", " ")}</span>
                            <span className="font-bold text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-100 dark:border-neutral-700 shadow-sm">{value}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-pink-500" />
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">By work mode</h4>
                    </div>
                    {Object.entries(data.workMode).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-xs mb-2 last:mb-0">
                            <span className="text-neutral-500 dark:text-neutral-400 capitalize">{key}</span>
                            <span className="font-bold text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-100 dark:border-neutral-700 shadow-sm">{value}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">By type</h4>
                    </div>
                    {Object.entries(data.type).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-xs mb-2 last:mb-0">
                            <span className="text-neutral-500 dark:text-neutral-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-bold text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-100 dark:border-neutral-700 shadow-sm">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
