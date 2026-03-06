"use client"

import { User, Lock, Activity, Bell, Shield, Wallet } from "lucide-react"

interface SettingsSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export function SettingsSidebar({ activeTab, setActiveTab }: SettingsSidebarProps) {
    const menuItems = [
        { id: "account", label: "Account preferences", icon: User },
        { id: "security", label: "Sign in & security", icon: Lock },
        { id: "plan", label: "Plan & Billing", icon: Wallet },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "privacy", label: "Data privacy", icon: Shield },
    ]

    return (
        <div className="w-full lg:w-64 flex-shrink-0 space-y-1">
            <h2 className="px-4 text-lg font-bold text-neutral-900 dark:text-white mb-4">Settings</h2>
            <nav className="space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                                ${isActive
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                }
                            `}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-neutral-500 dark:text-neutral-500"}`} />
                            {item.label}
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}
