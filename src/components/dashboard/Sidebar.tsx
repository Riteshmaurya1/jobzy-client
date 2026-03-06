"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Briefcase,
    Calendar,
    Bell,
    FileText,
    FileCheck,
    CreditCard,
    LogOut,
    Settings,
    Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    {
        name: "Overview", items: [
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { name: "Manage Jobs", href: "/jobs", icon: Briefcase },
            { name: "Manage Interviews", href: "/interviews", icon: Calendar },
        ]
    },
    {
        name: "Productivity", items: [
            { name: "Calendar", href: "/calendar", icon: Calendar },
            { name: "Reminders", href: "/reminders", icon: Bell },
            { name: "Documents", href: "/documents", icon: FileText },
        ]
    },
    {
        name: "ATS & AI Tools", items: [
            { name: "ATS Resume Check", href: "/ats-check", icon: FileCheck },
            { name: "Keyword Suggestions", href: "/keywords", icon: Sparkles },
        ]
    },
    {
        name: "Account", items: [
            { name: "Profile & Settings", href: "/settings", icon: Settings },
            { name: "Billing & Usage", href: "/billing", icon: CreditCard },
        ]
    }
]

import { useAuth } from "@/contexts/AuthContext"

interface SidebarProps {
    onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps) {
    const pathname = usePathname()
    const { signOut } = useAuth()

    return (
        <div className="flex h-full flex-col justify-between bg-white dark:bg-neutral-900 overflow-y-auto pt-24 lg:pt-0">
            <div className="px-4 py-6">
                <Link href="/dashboard" className="hidden lg:flex items-center gap-2 px-2" onClick={onLinkClick}>
                    <div className="relative h-8 w-8">
                        <Image src="/logo.png" alt="JobZy Logo" fill className="object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-xl text-neutral-900 dark:text-white leading-none tracking-tight">JobZy</span>
                    </div>
                </Link>

                <div className="mt-8 space-y-6">
                    {navigation.map((group) => (
                        <div key={group.name}>
                            <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {group.name}
                            </h3>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={onLinkClick}
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                                isActive
                                                    ? "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400"
                                                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                            )}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-4 py-6 space-y-4">
                <button
                    onClick={() => signOut()}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </button>

                <div className="rounded-xl bg-violet-50 p-4 dark:bg-violet-950/30">
                    <h4 className="font-semibold text-sm">Upgrade to Pro</h4>
                    <p className="mt-1 text-xs text-muted-foreground">Unlock advanced analytics & AI tools</p>
                    <button className="mt-3 w-full rounded-lg bg-violet-600 py-2 text-xs font-medium text-white hover:bg-violet-700 transition-colors">
                        View plans
                    </button>
                </div>
            </div>
        </div>
    )
}
