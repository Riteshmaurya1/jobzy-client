"use client"

import { Building2 } from "lucide-react"

interface TopCompaniesProps {
    companies: { name: string; count: number }[]
}

export function TopCompanies({ companies }: TopCompaniesProps) {
    const maxCount = Math.max(...companies.map(c => c.count), 1);

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Top companies you're targeting</h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6">Where you've sent the most applications.</p>

            <div className="space-y-4">
                {companies.map((company, index) => (
                    <div key={index} className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                                <span className="font-medium text-neutral-700 dark:text-neutral-300 capitalize">{company.name}</span>
                            </div>
                            <span className="text-neutral-500 text-xs font-medium">{company.count} apps</span>
                        </div>
                        <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-violet-500 rounded-full opacity-80"
                                style={{ width: `${(company.count / maxCount) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
