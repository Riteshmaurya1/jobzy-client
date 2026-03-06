import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Interview } from "@/services/interviewsService"
import { Job } from "@/services/jobsService"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface InterviewModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => Promise<void>
    interview: Interview | null
    jobs?: Job[] // Optional list of jobs for selection
}

export function InterviewModal({ isOpen, onClose, onSubmit, interview, jobs = [] }: InterviewModalProps) {
    const [formData, setFormData] = useState({
        round: "",
        interviewDate: "",
        interviewTime: "",
        interviewMode: "video-call",
        meetingLink: "",
        interviewerName: "",
        interviewerEmail: "",
        notes: "",
        jobId: "" // We need jobId if creating new
    })
    const [date, setDate] = useState<Date | undefined>()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (interview) {
            setFormData({
                round: interview.round || "",
                interviewDate: interview.interviewDate || "",
                interviewTime: interview.interviewTime || "",
                interviewMode: interview.interviewMode || "video-call",
                meetingLink: interview.meetingLink || "",
                interviewerName: interview.interviewerName || "",
                interviewerEmail: interview.interviewerEmail || "",
                notes: interview.notes || "",
                jobId: interview.jobId || ""
            })
            setDate(interview.interviewDate ? new Date(interview.interviewDate) : undefined)
        } else {
            setFormData({
                round: "",
                interviewDate: "",
                interviewTime: "",
                interviewMode: "video-call",
                meetingLink: "",
                interviewerName: "",
                interviewerEmail: "",
                notes: "",
                jobId: ""
            })
            setDate(undefined)
        }
        setErrors({})
    }, [interview, isOpen])


    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.round) newErrors.round = "Round type is required"
        if (!date && !formData.interviewDate) {
            newErrors.date = "Date is required"
        } else if (date) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (date < today) {
                newErrors.date = "Date cannot be in the past"
            }
        }
        if (!formData.interviewTime) newErrors.time = "Time is required"
        // If creating a new interview (no interview object passed) and jobs are available, job selection is required 
        // OR if the parent component manages context (like JobPage), it might not pass jobs but handle ID injection itself. 
        // But here we are asked to add "Schedule Interview" from global pages, so likely jobs will be passed.
        if (!interview && jobs.length > 0 && !formData.jobId) {
            newErrors.jobId = "Job application is required"
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
            // Update formData with the selected date
            const dataToSubmit = {
                ...formData,
                interviewDate: date ? format(date, "yyyy-MM-dd") : formData.interviewDate
            }

            await onSubmit(dataToSubmit)
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    // Generate time slots (30 min intervals)
    const timeSlots = []
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 30) {
            const hour = i.toString().padStart(2, '0')
            const minute = j.toString().padStart(2, '0')
            timeSlots.push(`${hour}:${minute}`)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                <DialogHeader>
                    <DialogTitle className="text-neutral-900 dark:text-white">{interview ? "Edit Interview" : "Schedule Interview"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">

                    {/* Job Selection - Only show if creating new and jobs are provided */}
                    {!interview && jobs.length > 0 && (
                        <div className="grid gap-2">
                            <Label htmlFor="job" className="text-neutral-700 dark:text-neutral-300">Job Application <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.jobId}
                                onValueChange={(value) => {
                                    setFormData({ ...formData, jobId: value })
                                    if (errors.jobId) setErrors({ ...errors, jobId: "" })
                                }}
                            >
                                <SelectTrigger className={cn("border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white", errors.jobId && "border-red-500 ring-red-500")}>
                                    <SelectValue placeholder="Select a job application" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 max-h-60">
                                    {jobs.map((job) => (
                                        <SelectItem key={job.id} value={job.id}>
                                            {job.company} - {job.position}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.jobId && <p className="text-xs text-red-500">{errors.jobId}</p>}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="round" className="text-neutral-700 dark:text-neutral-300">Round Type <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.round}
                                onValueChange={(value) => {
                                    setFormData({ ...formData, round: value })
                                    if (errors.round) setErrors({ ...errors, round: "" })
                                }}
                            >
                                <SelectTrigger className={cn("border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white", errors.round && "border-red-500")}>
                                    <SelectValue placeholder="Select round" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                                    <SelectItem value="Screening Round">Screening Round</SelectItem>
                                    <SelectItem value="Technical Round">Technical Round</SelectItem>
                                    <SelectItem value="HR Round">HR Round</SelectItem>
                                    <SelectItem value="Managerial Round">Managerial Round</SelectItem>
                                    <SelectItem value="Final Round">Final Round</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.round && <p className="text-xs text-red-500">{errors.round}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mode" className="text-neutral-700 dark:text-neutral-300">Mode</Label>
                            <Select
                                value={formData.interviewMode}
                                onValueChange={(value) => setFormData({ ...formData, interviewMode: value })}
                            >
                                <SelectTrigger className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
                                    <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                                    <SelectItem value="video-call">Video Call</SelectItem>
                                    <SelectItem value="audio-call">Audio Call</SelectItem>
                                    <SelectItem value="in-person">In Person</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label className="text-neutral-700 dark:text-neutral-300">Date <span className="text-red-500">*</span></Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800",
                                            !date && "text-muted-foreground",
                                            errors.date && "border-red-500 text-red-500"
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
                                        onSelect={(val) => {
                                            setDate(val)
                                            if (errors.date) setErrors({ ...errors, date: "" })
                                        }}
                                        disabled={(date) => {
                                            const today = new Date()
                                            today.setHours(0, 0, 0, 0)
                                            return date < today
                                        }}
                                        initialFocus
                                        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-neutral-700 dark:text-neutral-300">Time <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.interviewTime}
                                onValueChange={(value) => {
                                    setFormData({ ...formData, interviewTime: value })
                                    if (errors.time) setErrors({ ...errors, time: "" })
                                }}
                            >
                                <SelectTrigger className={cn("border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white", errors.time && "border-red-500")}>
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent className="h-48 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {format(new Date(`2000-01-01T${time}`), "hh:mm a")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.time && <p className="text-xs text-red-500">{errors.time}</p>}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="link" className="text-neutral-700 dark:text-neutral-300">Meeting Link / Location</Label>
                        <Input
                            id="link"
                            placeholder="https://meet.google.com/..."
                            className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400"
                            value={formData.meetingLink}
                            onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="interviewerName" className="text-neutral-700 dark:text-neutral-300">Interviewer Name</Label>
                            <Input
                                id="interviewerName"
                                placeholder="John Doe"
                                className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                value={formData.interviewerName}
                                onChange={(e) => setFormData({ ...formData, interviewerName: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="interviewerEmail" className="text-neutral-700 dark:text-neutral-300">Interviewer Email</Label>
                            <Input
                                id="interviewerEmail"
                                type="email"
                                placeholder="john@company.com"
                                className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                value={formData.interviewerEmail}
                                onChange={(e) => setFormData({ ...formData, interviewerEmail: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="notes" className="text-neutral-700 dark:text-neutral-300">Notes</Label>
                        <Textarea
                            id="notes"
                            placeholder="Preparation notes..."
                            className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading} className="h-9 rounded-full text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="h-9 rounded-full border border-amber-300 bg-white text-neutral-800 hover:bg-amber-50 dark:border-violet-500 dark:bg-black dark:text-white dark:hover:bg-violet-950 shadow-none transition-all duration-300">
                            {isLoading ? "Saving..." : "Save Interview"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
