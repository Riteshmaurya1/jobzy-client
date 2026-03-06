"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Job } from "@/services/jobsService"

interface JobModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Partial<Job>) => Promise<void>
    job?: Job | null // If provided, we are editing
}

export function JobModal({ isOpen, onClose, onSubmit, job }: JobModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<Partial<Job>>({
        company: "",
        position: "",
        jobLink: "",
        location: "",
        workMode: "hybrid",
        jobType: "full-time",
        salary: "",
        status: "applied",
        appliedDate: new Date().toISOString(),
        platform: "LinkedIn",
        notes: "",
        resumeVersion: "",
        followUpDate: ""
    })
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [followUpDate, setFollowUpDate] = useState<Date | undefined>()
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (job) {
            setFormData(job)
            setDate(job.appliedDate ? new Date(job.appliedDate) : new Date())
            setFollowUpDate(job.followUpDate ? new Date(job.followUpDate) : undefined)
        } else {
            // Reset form for new job
            setFormData({
                company: "",
                position: "",
                jobLink: "",
                location: "",
                workMode: "hybrid",
                jobType: "full-time",
                salary: "",
                status: "applied",
                appliedDate: new Date().toISOString(),
                platform: "LinkedIn",
                notes: "",
                resumeVersion: "",
                followUpDate: ""
            })
            setDate(new Date())
            setFollowUpDate(undefined)
        }
        setErrors({})
    }, [job, isOpen])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.company?.trim()) newErrors.company = "Company is required"
        if (!formData.position?.trim()) newErrors.position = "Position is required"
        if (!formData.resumeVersion?.trim()) newErrors.resumeVersion = "Resume version is required"

        // If user selects a date, we generally assume it's valid, but if followUpDate is somehow required by business logic when status changes, add here.
        // For now, based on user request "Missing Required Field Indicators", we will mark followUpDate as required if that's the intention, 
        // but typically follow-up is optional. However, the user issue explicitly says "resumeVersion and followUpDate as required fields".
        // Let's assume followUpDate is required for now as per user issue.
        if (!followUpDate && !formData.followUpDate) {
            // If the user hasn't selected a date via picker AND hasn't entered a string (if that was possible)
            // improved logic: check if the state `followUpDate` is null/undefined
            newErrors.followUpDate = "Follow up date is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        try {
            await onSubmit({
                ...formData,
                appliedDate: date ? date.toISOString() : new Date().toISOString(),
                followUpDate: followUpDate ? followUpDate.toISOString() : undefined
            })
            onClose()
        } catch (error) {
            console.error("Failed to submit job:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[640px] bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{job ? "Edit Job Application" : "Add New Job Application"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-2.5 py-2">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="company">Company <span className="text-red-500">*</span></Label>
                            <Input
                                id="company"
                                placeholder="e.g. Google"
                                value={formData.company}
                                onChange={(e) => {
                                    setFormData({ ...formData, company: e.target.value })
                                    if (errors.company) setErrors({ ...errors, company: "" })
                                }}
                                className={cn(errors.company && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="position">Position <span className="text-red-500">*</span></Label>
                            <Input
                                id="position"
                                placeholder="e.g. Frontend Engineer"
                                value={formData.position}
                                onChange={(e) => {
                                    setFormData({ ...formData, position: e.target.value })
                                    if (errors.position) setErrors({ ...errors, position: "" })
                                }}
                                className={cn(errors.position && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.position && <p className="text-xs text-red-500">{errors.position}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="applied">Applied</SelectItem>
                                    <SelectItem value="screening">Screening</SelectItem>
                                    <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                                    <SelectItem value="offer">Offer</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="jobLink">Job Link</Label>
                            <Input
                                id="jobLink"
                                placeholder="https://..."
                                value={formData.jobLink}
                                onChange={(e) => setFormData({ ...formData, jobLink: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="e.g. Bangalore, India"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="workMode">Work Mode</Label>
                            <Select
                                value={formData.workMode}
                                onValueChange={(value: any) => setFormData({ ...formData, workMode: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="onsite">On-site</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                    <SelectItem value="remote">Remote</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="salary">Salary (LPA/USD)</Label>
                            <Input
                                id="salary"
                                placeholder="e.g. 45 or 120k"
                                value={formData.salary}
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="type">Job Type</Label>
                            <Select
                                value={formData.jobType}
                                onValueChange={(value: any) => setFormData({ ...formData, jobType: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="full-time">Full-time</SelectItem>
                                    <SelectItem value="part-time">Part-time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                    <SelectItem value="internship">Internship</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="platform">Platform</Label>
                            <Select
                                value={formData.platform}
                                onValueChange={(value: any) => setFormData({ ...formData, platform: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                    <SelectItem value="Indeed">Indeed</SelectItem>
                                    <SelectItem value="Naukri">Naukri</SelectItem>
                                    <SelectItem value="Wellfound">Wellfound</SelectItem>
                                    <SelectItem value="Glassdoor">Glassdoor</SelectItem>
                                    <SelectItem value="Website">Company Website</SelectItem>
                                    <SelectItem value="Referral">Referral</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="resumeVersion">Resume Version <span className="text-red-500">*</span></Label>
                            <Input
                                id="resumeVersion"
                                placeholder="e.g. frontend_v3.pdf"
                                value={formData.resumeVersion || ""}
                                onChange={(e) => {
                                    setFormData({ ...formData, resumeVersion: e.target.value })
                                    if (errors.resumeVersion) setErrors({ ...errors, resumeVersion: "" })
                                }}
                                className={cn(errors.resumeVersion && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.resumeVersion && <p className="text-xs text-red-500">{errors.resumeVersion}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label>Applied Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-1">
                            <Label>Follow Up Date <span className="text-red-500">*</span></Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !followUpDate && "text-muted-foreground",
                                            errors.followUpDate && "border-red-500 text-red-500"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {followUpDate ? format(followUpDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={followUpDate}
                                        onSelect={(date) => {
                                            setFollowUpDate(date)
                                            if (errors.followUpDate) setErrors({ ...errors, followUpDate: "" })
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.followUpDate && <p className="text-xs text-red-500">{errors.followUpDate}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any notes..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading} className="h-9 rounded-full text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
                            Cancel
                        </Button>
                        <Button type="submit" className="h-9 rounded-full border border-amber-300 bg-white text-neutral-800 hover:bg-amber-50 dark:border-violet-500 dark:bg-black dark:text-white dark:hover:bg-violet-950 shadow-none transition-all duration-300" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {job ? "Update Job" : "Add Job"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
