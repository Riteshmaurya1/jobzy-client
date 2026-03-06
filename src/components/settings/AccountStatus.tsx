"use client"

import { Activity, RefreshCw, CreditCard, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AccountStatusProps {
    stats: any;
    subscription?: any;
}

export function AccountStatus({ stats, subscription }: AccountStatusProps) {
    return (
        <Card className="border-neutral-200 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold text-neutral-900 dark:text-white">Plan & Usage</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                    <RefreshCw className="h-3 w-3 mr-2" /> Refresh
                </Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
                <div className="rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 border border-neutral-200 dark:from-neutral-800 dark:to-neutral-900 dark:border-neutral-700">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Plan</div>
                    <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-neutral-900 dark:text-white uppercase">{stats.tier}</div>
                        <div className="text-xs px-2 py-1 rounded bg-white border border-neutral-200 text-neutral-600 dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-400">Active</div>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">You are on the {stats.tier} plan.</div>
                </div>

                <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">Monthly Jobs Usage</div>
                    <div className="text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        <span className="font-bold">{stats.monthlyJobsUsed}</span> of {stats.limit} jobs tracked this month
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden dark:bg-neutral-800">
                        <div
                            className="h-full bg-green-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                            style={{ width: `${100 - ((stats.remaining / stats.limit) * 100)}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">{stats.remaining} remaining</div>
                        <div className="text-xs text-neutral-400">Resets {new Date(stats.lastReset).toLocaleDateString()}</div>
                    </div>
                </div>

                {subscription && (
                    <div className="rounded-xl bg-violet-50/50 p-4 border border-violet-100 dark:bg-violet-900/10 dark:border-violet-800/30 space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-1">Subscription Details</div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" /> Plan cost</span>
                            <span className="font-medium text-neutral-900 dark:text-white">₹{subscription.amount / 100} / {subscription.planDuration}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Valid until</span>
                            <span className="font-medium text-neutral-900 dark:text-white">{new Date(subscription.validUntil).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Days remaining</span>
                            <span className={`font-medium ${subscription.daysRemaining < 7 ? 'text-red-500' : 'text-emerald-500'}`}>
                                {subscription.daysRemaining} days
                            </span>
                        </div>
                    </div>
                )}

                <div className="text-xs text-neutral-400 text-center">
                    Member since {new Date(stats.memberSince).toLocaleDateString()}
                </div>
            </CardContent>
        </Card>
    )
}
