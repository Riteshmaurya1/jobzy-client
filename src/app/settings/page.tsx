"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import DashboardLayout from "@/app/dashboard/layout"
import { Topbar } from "@/components/dashboard/Topbar"
import { useTheme } from "@/contexts/ThemeContext"
import { useToast } from "@/components/ui/use-toast"
import { profileService } from "@/services/profileService"
import { paymentsService } from "@/services/paymentsService"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    User, Upload, Trash2, KeyRound, Lock,
    AlertTriangle, Loader2, Shield, CreditCard,
    Calendar, Clock, X
} from "lucide-react"
import { AnimatePresence } from "framer-motion"

export default function SettingsPage() {
    const [profile, setProfile] = useState<any>(null)
    const [subscription, setSubscription] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { theme } = useTheme()
    const { toast } = useToast()
    const router = useRouter()

    // Profile form
    const [formData, setFormData] = useState({ firstName: "", lastName: "", phoneNumber: "" })
    const [saving, setSaving] = useState(false)

    // Password form
    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" })
    const [changingPassword, setChangingPassword] = useState(false)

    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteConfirmText, setDeleteConfirmText] = useState("")
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem("accessToken")
                if (!token) { router.push("/signin"); return }

                const [profileRes, subRes] = await Promise.all([
                    profileService.getProfile(),
                    paymentsService.getSubscription()
                ])

                if (profileRes.success) {
                    setProfile(profileRes.profile)
                    const nameParts = (profileRes.profile.name || "").split(" ")
                    setFormData({
                        firstName: nameParts[0] || "",
                        lastName: nameParts.slice(1).join(" ") || "",
                        phoneNumber: profileRes.profile.phoneNumber || "",
                    })
                }
                if (subRes.success) setSubscription(subRes.subscription)
            } catch (error) {
                console.error("Failed to load settings data", error)
                toast({ title: "Error", description: "Failed to load settings data", variant: "destructive" })
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [router, toast])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            const fullName = `${formData.firstName} ${formData.lastName}`.trim()
            const res = await profileService.updateProfile({ name: fullName, phoneNumber: formData.phoneNumber })
            if (res.success) {
                toast({ title: "Profile Updated ✅", description: "Your profile has been updated." })
                setProfile({ ...profile, name: fullName, phoneNumber: formData.phoneNumber })
            } else {
                toast({ title: "Update Failed", description: res.message || "Could not update profile.", variant: "destructive" })
            }
        } catch {
            toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" })
        } finally {
            setSaving(false)
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setChangingPassword(true)
        try {
            const res = await profileService.changePassword(passwords)
            if (res.success) {
                toast({ title: "Password Changed 🔒", description: "Your password has been updated." })
                setPasswords({ currentPassword: "", newPassword: "" })
            } else {
                toast({ title: "Failed", description: res.message || "Could not change password.", variant: "destructive" })
            }
        } catch {
            toast({ title: "Error", description: "Failed to update password.", variant: "destructive" })
        } finally {
            setChangingPassword(false)
        }
    }

    const handleDeleteAccount = async () => {
        if (deleteConfirmText !== "DELETE") return
        setDeleting(true)
        try {
            const res = await profileService.deleteAccount()
            if (res.success) {
                toast({ title: "Account Deleted", description: "Redirecting..." })
                localStorage.removeItem("accessToken")
                setShowDeleteModal(false)
                setTimeout(() => { window.location.href = "/" }, 1500)
            } else {
                toast({ title: "Failed", description: res.message || "Could not delete account.", variant: "destructive" })
            }
        } catch {
            toast({ title: "Error", description: "Failed to delete account.", variant: "destructive" })
        } finally {
            setDeleting(false)
        }
    }

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex h-[60vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                </div>
            </DashboardLayout>
        )
    }

    if (!profile) return null

    const initials = `${formData.firstName[0] || ""}${formData.lastName[0] || ""}`.toUpperCase()

    return (
        <DashboardLayout>
            <Topbar breadcrumbs={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Profile & Settings" }
            ]} />

            <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">

                {/* ===== SECTION 1: PROFILE ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-[2rem] border overflow-hidden transition-all
                        ${theme === "dark"
                            ? "bg-neutral-900 border-zinc-800"
                            : "bg-white border-gray-200 shadow-sm"
                        }`}
                >
                    <div className={`px-6 sm:px-8 py-5 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-100"}`}>
                        <h3 className={`text-base font-bold flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            <User className="h-4 w-4 text-violet-500" />
                            Profile
                        </h3>
                        <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                            Your personal information and account details
                        </p>
                    </div>

                    <div className="px-6 sm:px-8 py-8">
                        {/* Avatar */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                            <Avatar className={`h-20 w-20 border-4 shadow-lg ${theme === "dark" ? "border-zinc-800" : "border-white"}`}>
                                <AvatarImage src="/avatar-placeholder.jpg" alt="Profile" />
                                <AvatarFallback className="text-xl bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-2 pt-2">
                                <h4 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    {profile.name}
                                </h4>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                    {profile.email}
                                </p>
                                <div className="flex gap-2 mt-1">
                                    <span className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border
                                        ${theme === "dark"
                                            ? "bg-violet-950/30 text-violet-400 border-violet-800"
                                            : "bg-violet-50 text-violet-600 border-violet-200"
                                        }`}>
                                        {profile.tier} Plan
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Form */}
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                        First name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className={`h-11 ${theme === "dark" ? "bg-neutral-950 border-zinc-800" : "bg-white"}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                        Last name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className={`h-11 ${theme === "dark" ? "bg-neutral-950 border-zinc-800" : "bg-white"}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        value={profile.email}
                                        disabled
                                        className={`h-11 opacity-60 cursor-not-allowed ${theme === "dark" ? "bg-neutral-950 border-zinc-800" : "bg-gray-50"}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                        Phone number
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        className={`h-11 ${theme === "dark" ? "bg-neutral-950 border-zinc-800" : "bg-white"}`}
                                    />
                                </div>
                            </div>

                            <div className={`flex justify-end gap-3 pt-4 border-t ${theme === "dark" ? "border-zinc-800" : "border-gray-100"}`}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const nameParts = (profile.name || "").split(" ")
                                        setFormData({
                                            firstName: nameParts[0] || "",
                                            lastName: nameParts.slice(1).join(" ") || "",
                                            phoneNumber: profile.phoneNumber || "",
                                        })
                                    }}
                                    className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                        ${theme === "dark"
                                            ? "bg-transparent text-white border-zinc-600 hover:border-zinc-500 hover:bg-zinc-700/50"
                                            : "bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                        ${theme === "dark"
                                            ? "bg-neutral-900 text-white border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.7)] hover:bg-neutral-800"
                                            : "bg-white text-neutral-900 border-violet-400/50 shadow-[0_0_15px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.5)] hover:bg-gray-50"
                                        }
                                        ${saving ? "opacity-70 cursor-wait" : ""}
                                    `}
                                >
                                    {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving...</> : "Update Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* ===== SECTION 2: SETTINGS ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className={`rounded-[2rem] border overflow-hidden transition-all
                        ${theme === "dark"
                            ? "bg-neutral-900 border-zinc-800"
                            : "bg-white border-gray-200 shadow-sm"
                        }`}
                >
                    <div className={`px-6 sm:px-8 py-5 border-b ${theme === "dark" ? "border-zinc-800" : "border-gray-100"}`}>
                        <h3 className={`text-base font-bold flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            <Shield className="h-4 w-4 text-violet-500" />
                            Security & Account
                        </h3>
                        <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                            Manage your password and account settings
                        </p>
                    </div>

                    <div className="px-6 sm:px-8 py-8 space-y-8">
                        {/* Change Password */}
                        <div>
                            <h4 className={`text-sm font-bold flex items-center gap-2 mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                <Lock className="h-3.5 w-3.5 text-gray-400" />
                                Change Password
                            </h4>
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                            Current Password
                                        </Label>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwords.currentPassword}
                                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                            className={`h-11 ${theme === "dark" ? "bg-neutral-950 border-zinc-800" : "bg-white"}`}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                            New Password
                                        </Label>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwords.newPassword}
                                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                            className={`h-11 ${theme === "dark" ? "bg-neutral-950 border-zinc-800" : "bg-white"}`}
                                        />
                                        <p className={`text-[10px] ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                                            Use at least 6 characters.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={changingPassword || !passwords.currentPassword || !passwords.newPassword}
                                        className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer min-w-[160px]
                                            ${theme === "dark"
                                                ? "bg-transparent text-white border-zinc-600 hover:border-zinc-500 hover:bg-zinc-700/50"
                                                : "bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                                            }
                                            ${(changingPassword || !passwords.currentPassword || !passwords.newPassword) ? "opacity-40 cursor-not-allowed" : ""}
                                        `}
                                    >
                                        <KeyRound className="h-3.5 w-3.5" />
                                        {changingPassword ? "Updating..." : "Change Password"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Subscription Info */}
                        {subscription && (
                            <div>
                                <div className={`h-px w-full mb-8 ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`} />
                                <h4 className={`text-sm font-bold flex items-center gap-2 mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                                    Subscription
                                </h4>
                                <div className={`rounded-2xl p-4 border space-y-3
                                    ${theme === "dark"
                                        ? "bg-violet-950/10 border-violet-800/30"
                                        : "bg-violet-50/50 border-violet-100"
                                    }`}
                                >
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={`flex items-center gap-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            <CreditCard className="w-3.5 h-3.5" /> Plan cost
                                        </span>
                                        <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            ₹{subscription.amount / 100} / {subscription.planDuration}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={`flex items-center gap-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            <Calendar className="w-3.5 h-3.5" /> Valid until
                                        </span>
                                        <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            {new Date(subscription.validUntil).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={`flex items-center gap-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                            <Clock className="w-3.5 h-3.5" /> Days remaining
                                        </span>
                                        <span className={`font-medium ${subscription.daysRemaining < 7 ? "text-red-500" : "text-emerald-500"}`}>
                                            {subscription.daysRemaining} days
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Danger Zone */}
                        <div>
                            <div className={`h-px w-full mb-8 ${theme === "dark" ? "bg-zinc-800" : "bg-gray-100"}`} />
                            <div className={`rounded-2xl p-5 border
                                ${theme === "dark"
                                    ? "bg-red-950/10 border-red-900/30"
                                    : "bg-red-50/50 border-red-100"
                                }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className={`rounded-full p-2 mt-0.5 ${theme === "dark" ? "bg-red-900/30 text-red-500" : "bg-red-100 text-red-600"}`}>
                                            <AlertTriangle className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-bold ${theme === "dark" ? "text-red-400" : "text-red-900"}`}>
                                                Delete Account
                                            </h4>
                                            <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-red-300/60" : "text-red-600/70"}`}>
                                                Permanently delete your account and all data. This cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setDeleteConfirmText(""); setShowDeleteModal(true) }}
                                        className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer flex-shrink-0
                                            ${theme === "dark"
                                                ? "bg-red-950/30 text-red-400 border-red-800 hover:bg-red-900/40 hover:border-red-700"
                                                : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300"
                                            }
                                        `}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" /> Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowDeleteModal(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl
                                ${theme === "dark"
                                    ? "bg-neutral-900 border-zinc-800"
                                    : "bg-white border-gray-200"
                                }`}
                        >
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className={`absolute top-4 right-4 p-1 rounded-full transition-colors
                                    ${theme === "dark" ? "text-gray-500 hover:text-white hover:bg-zinc-800" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"}`}
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`rounded-full p-2.5 ${theme === "dark" ? "bg-red-900/30 text-red-500" : "bg-red-100 text-red-600"}`}>
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                        Delete Account
                                    </h3>
                                    <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                                        This action is permanent and cannot be undone
                                    </p>
                                </div>
                            </div>

                            <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                All your data including job applications, interviews, notes, and account info will be permanently removed.
                            </p>

                            <div className="mb-4">
                                <Label className={`text-xs font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    Type <span className="font-mono font-bold text-red-500">DELETE</span> to confirm
                                </Label>
                                <Input
                                    value={deleteConfirmText}
                                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                                    placeholder="Type DELETE here"
                                    className={`mt-2 h-11 font-mono tracking-wider ${theme === "dark" ? "bg-neutral-950 border-zinc-800" : "bg-white"}`}
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                        ${theme === "dark"
                                            ? "bg-transparent text-white border-zinc-600 hover:border-zinc-500 hover:bg-zinc-700/50"
                                            : "bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmText !== "DELETE" || deleting}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer
                                        ${theme === "dark"
                                            ? "bg-red-950/30 text-red-400 border-red-800 hover:bg-red-900/40 hover:border-red-700"
                                            : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300"
                                        }
                                        ${(deleteConfirmText !== "DELETE" || deleting) ? "opacity-40 cursor-not-allowed" : ""}
                                    `}
                                >
                                    {deleting ? (
                                        <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Deleting...</>
                                    ) : (
                                        <><Trash2 className="h-3.5 w-3.5" /> Delete Forever</>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    )
}
