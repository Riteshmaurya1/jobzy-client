"use client"

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Menu, X, Bell, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/signin");
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
        </div>;
    }

    if (!user) {
        return null; // Don't render anything while redirecting
    }

    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-black">
            {/* Mobile Header - Floating & Styled like Landing Page */}
            <div className={`lg:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-4 py-3 rounded-2xl border shadow-lg backdrop-blur-xl transition-all duration-300
                ${theme === 'dark'
                    ? 'bg-neutral-900/80 border-neutral-800'
                    : 'bg-white/80 border-neutral-200'
                }`}>

                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="relative h-7 w-7">
                            <Image src="/logo.png" alt="JobZy Logo" fill className="object-contain" />
                        </div>
                        <span className="font-display font-bold text-lg text-neutral-900 dark:text-white leading-none tracking-tight">JobZy</span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-neutral-900"></span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
                    >
                        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Sidebar - Desktop: Fixed, Mobile: Slide-over */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:border-r
                ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
            `}>
                <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 w-full pt-16 lg:pt-0 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
