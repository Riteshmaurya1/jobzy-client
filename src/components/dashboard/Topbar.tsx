"use client"

import { Search, Bell, Sparkles, Sun, Moon, ChevronRight } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import Link from "next/link"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface TopbarProps {
    breadcrumbs?: BreadcrumbItem[]
}

export function Topbar({ breadcrumbs }: TopbarProps) {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="hidden lg:flex h-16 items-center justify-between border-b bg-white px-8 dark:bg-neutral-900 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <div className="hidden md:block">
                    {breadcrumbs && breadcrumbs.length > 0 ? (
                        <nav className="flex items-center gap-1.5 text-sm">
                            {breadcrumbs.map((crumb, index) => (
                                <span key={index} className="flex items-center gap-1.5">
                                    {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />}
                                    {crumb.href && index < breadcrumbs.length - 1 ? (
                                        <Link href={crumb.href} className="text-neutral-500 hover:text-violet-600 dark:text-neutral-400 dark:hover:text-violet-400 transition-colors">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="font-semibold text-neutral-900 dark:text-white">{crumb.label}</span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    ) : (
                        <>
                            <h1 className="flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-white">
                                Good evening, Ritesh
                                <Sparkles className="h-5 w-5 text-yellow-500 fill-yellow-500 animate-pulse" />
                            </h1>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Here's what's happening across your job search today.</p>
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-9 w-[250px] text-neutral-900 dark:text-white rounded-full border bg-neutral-50 pl-9 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:bg-neutral-800 dark:border-neutral-700 transition-all"
                    />
                </div>

                <button className="relative flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 transition-colors">
                    <Bell className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                    <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900"></span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <Sun className="h-4 w-4 text-neutral-500 dark:text-neutral-400" /> : <Moon className="h-4 w-4 text-neutral-500" />}
                </button>
            </div>
        </div>
    )
}
