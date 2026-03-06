"use client"

import { useState } from "react"
import { Upload, Trash2, MapPin, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

interface ProfileFormProps {
    user: any;
    onUpdate: (data: any) => Promise<void>;
}

export function ProfileForm({ user, onUpdate }: ProfileFormProps) {
    const [formData, setFormData] = useState({
        firstName: user.name.split(' ')[0] || "",
        lastName: user.name.split(' ').slice(1).join(' ') || "",
        phoneNumber: user.phoneNumber || "",
        location: "Pontianak, Indonesia", // Mock default
        position: "Interaction Designer", // Mock default
        bio: "Hello, I'm a UI/UX Designer and Design Mentor. I have been designing for 4 years, handling website, mobile app and digital products.", // Mock default
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Recombine name for backend compatibility
            const fullName = `${formData.firstName} ${formData.lastName}`.trim()
            await onUpdate({
                name: fullName,
                phoneNumber: formData.phoneNumber,
                // In a real app, we'd send location, bio, position here too
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-neutral-200 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">
            <CardHeader className="border-b border-neutral-100 dark:border-neutral-800 pb-6">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold text-neutral-900 dark:text-white">Account preferences</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="pt-8">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg dark:border-neutral-800">
                        <AvatarImage src="/avatar-placeholder.jpg" alt="Profile" />
                        <AvatarFallback className="text-2xl bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                            {formData.firstName[0]}{formData.lastName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-3 pt-2">
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="h-9 px-4 text-neutral-700 border-neutral-300 hover:bg-neutral-50 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-all hover:scale-105">
                                <Upload className="w-4 h-4 mr-2" /> Change
                            </Button>
                            <Button variant="outline" size="sm" className="h-9 px-4 text-red-600 border-neutral-300 hover:bg-red-50 hover:border-red-200 dark:text-red-400 dark:border-neutral-700 dark:hover:bg-red-900/20 transition-all hover:scale-105">
                                <Trash2 className="w-4 h-4 mr-2" /> Remove
                            </Button>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">First name</Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="bg-white dark:bg-neutral-950 h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Last name</Label>
                            <div className="relative">
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="bg-white dark:bg-neutral-950 h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Location</Label>
                            <div className="relative group">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400 group-focus-within:text-violet-500 transition-colors" />
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="pl-10 bg-white dark:bg-neutral-950 h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="position" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Current position</Label>
                            <div className="relative group">
                                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-neutral-400 group-focus-within:text-violet-500 transition-colors" />
                                <Input
                                    id="position"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    className="pl-10 bg-white dark:bg-neutral-950 h-11"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="bio" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Description</Label>
                            <Textarea
                                id="bio"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="min-h-[120px] bg-white dark:bg-neutral-950 resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setFormData({
                                firstName: user.name.split(' ')[0] || "",
                                lastName: user.name.split(' ').slice(1).join(' ') || "",
                                phoneNumber: user.phoneNumber,
                                location: "Pontianak, Indonesia",
                                position: "Interaction Designer",
                                bio: "Hello, I'm a UI/UX Designer and Design Mentor. I have been designing for 4 years, handling website, mobile app and digital products."
                            })}
                            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
                        >
                            {loading ? "Saving..." : "Update"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
