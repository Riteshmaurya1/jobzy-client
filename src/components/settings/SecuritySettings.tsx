"use client"

import { useState } from "react"
import { Lock, Save, KeyRound } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SecuritySettingsProps {
    onUpdatePassword: (data: any) => Promise<void>;
}

export function SecuritySettings({ onUpdatePassword }: SecuritySettingsProps) {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: ""
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onUpdatePassword(passwords)
            setPasswords({ currentPassword: "", newPassword: "" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-neutral-200 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">
            <CardHeader className="border-b border-neutral-100 dark:border-neutral-800 pb-6">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold text-neutral-900 dark:text-white">Sign in & Security</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Current Password</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                className="bg-white dark:bg-neutral-950"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">New Password</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                className="bg-white dark:bg-neutral-950"
                            />
                            <p className="text-[10px] text-neutral-400">Use at least 6 characters.</p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            disabled={loading || !passwords.currentPassword}
                            className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            <KeyRound className="h-4 w-4 mr-2" /> {loading ? "Updating..." : "Change password"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
