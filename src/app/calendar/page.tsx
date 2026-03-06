"use client"

import { useState, useEffect, useMemo } from "react"
import {
    format,
    startOfYear,
    endOfYear,
    eachDayOfInterval,
    isSameDay,
    isToday,
    getDay,
    getWeek,
    startOfWeek,
    endOfWeek,
    addWeeks,
    subWeeks
} from "date-fns"
import {
    Calendar as CalendarIcon,
    Loader2,
    CheckCircle2,
    Briefcase,
    Clock,
    Video,
    ChevronLeft,
    ChevronRight,
    MapPin
} from "lucide-react"
import DashboardLayout from "@/app/dashboard/layout"
import { Topbar } from "@/components/dashboard/Topbar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { interviewsService, Interview } from "@/services/interviewsService"
import { jobsService, Job } from "@/services/jobsService"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CalendarPage() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [selectedDate, setSelectedDate] = useState<Date>(new Date()) // Default to today
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()

    // Generate days for the full year
    const yearStart = startOfYear(new Date(currentYear, 0, 1))
    const yearEnd = endOfYear(new Date(currentYear, 0, 1))
    const daysInYear = eachDayOfInterval({ start: yearStart, end: yearEnd })

    const fetchData = async () => {
        setIsLoading(true)
        try {
            // Fetch Data for the entire Top-Level Year
            const interviewsResponse = await interviewsService.getAll({
                dateFrom: yearStart.toISOString(),
                dateTo: yearEnd.toISOString()
            }, 1, 1000) // Fetch all (page size 1000)

            if (interviewsResponse.success) {
                setInterviews(interviewsResponse.interviews || [])
            }

            const jobsResponse = await jobsService.getAll({
                dateFrom: yearStart.toISOString(),
                dateTo: yearEnd.toISOString()
            }, 1, 1000)

            if (jobsResponse.jobs) {
                setJobs(jobsResponse.jobs)
            } else if (Array.isArray(jobsResponse)) {
                setJobs(jobsResponse)
            } else if (jobsResponse.data) {
                setJobs(jobsResponse.data)
            }

        } catch (error) {
            console.error("Failed to fetch calendar data:", error)
            toast({ title: "Error", description: "Failed to load calendar data", variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [currentYear])

    // Grouping logic for the heatmap
    const getActivityLevel = (date: Date) => {
        const dateInterviews = interviews.filter(i => isSameDay(new Date(i.interviewDate), date))
        const dateJobs = jobs.filter(j => isSameDay(new Date(j.appliedDate || j.createdAt || ""), date))
        const count = dateInterviews.length + dateJobs.length

        if (count === 0) return 0
        if (count <= 1) return 1 // Low
        if (count <= 3) return 2 // Medium
        if (count > 3) return 3  // High
        return 0
    }

    const getEventsForDate = (date: Date) => {
        return {
            interviews: interviews.filter(i => isSameDay(new Date(i.interviewDate), date)),
            jobs: jobs.filter(j => isSameDay(new Date(j.appliedDate || j.createdAt || ""), date))
        }
    }

    const { interviews: selectedInterviews, jobs: selectedJobs } = getEventsForDate(selectedDate)

    // Helper to organize days into weeks (columns)
    // We basically map 53 weeks x 7 days
    // LeetCode style: 
    // Week 1: Sun, Mon, Tue...
    const weeks = useMemo(() => {
        const weeksArray: Date[][] = []
        let currentWeek: Date[] = []

        daysInYear.forEach((day, index) => {
            if (getDay(day) === 0 && currentWeek.length > 0) { // Start of new week (Sunday)
                weeksArray.push(currentWeek)
                currentWeek = []
            }
            currentWeek.push(day)

            // Push last week
            if (index === daysInYear.length - 1) {
                weeksArray.push(currentWeek)
            }
        })
        return weeksArray
    }, [daysInYear])

    const getColorClass = (level: number) => {
        switch (level) {
            case 0: return "bg-neutral-100 dark:bg-neutral-800"
            case 1: return "bg-violet-200 dark:bg-violet-900"
            case 2: return "bg-violet-400 dark:bg-violet-700"
            case 3: return "bg-violet-600 dark:bg-violet-500"
            default: return "bg-neutral-100 dark:bg-neutral-800"
        }
    }



    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [viewMode, setViewMode] = useState<'year' | 'month'>('year')

    // Effect to auto-switch on mount if mobile? 
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                setViewMode('month')
            } else {
                setViewMode('year')
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const displayedWeeks = useMemo(() => {
        if (viewMode === 'year') return weeks;

        // Filter weeks for the current month
        return weeks.filter(week => {
            // A week belongs to the month if any of its days are in the current month (and year)
            return week.some(day => day.getMonth() === currentMonth && day.getFullYear() === currentYear)
        })
    }, [weeks, viewMode, currentMonth, currentYear])

    const handlePrev = () => {
        if (viewMode === 'year') {
            setCurrentYear(prev => prev - 1)
        } else {
            if (currentMonth === 0) {
                setCurrentMonth(11)
                setCurrentYear(prev => prev - 1)
            } else {
                setCurrentMonth(prev => prev - 1)
            }
        }
    }

    const handleNext = () => {
        if (viewMode === 'year') {
            setCurrentYear(prev => prev + 1)
        } else {
            if (currentMonth === 11) {
                setCurrentMonth(0)
                setCurrentYear(prev => prev + 1)
            } else {
                setCurrentMonth(prev => prev + 1)
            }
        }
    }

    return (
        <DashboardLayout>
            <div className="h-full flex flex-col overflow-hidden bg-white dark:bg-black">
                <Topbar breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Activity", href: "/calendar" }
                ]} />

                <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 md:gap-8 max-w-[1600px] mx-auto w-full">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                <CalendarIcon className="h-6 w-6 text-violet-600" />
                                Activity Graph
                            </h1>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
                                {interviews.length} interviews and {jobs.length} applications in {currentYear}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 self-end md:self-auto">
                            <Button variant="ghost" size="icon" onClick={handlePrev} className="h-8 w-8">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-sm px-2 min-w-[80px] text-center">
                                {viewMode === 'year' ? currentYear : format(new Date(currentYear, currentMonth), "MMM yyyy")}
                            </span>
                            <Button variant="ghost" size="icon" onClick={handleNext} className="h-8 w-8">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* HEATMAP CARD */}
                    <Card className="border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col">
                        <CardHeader className="border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 py-3 px-4">
                            <CardTitle className="text-sm font-medium flex items-center justify-between">
                                <span>Contribution Overview</span>
                                <div className="flex items-center gap-2 text-[10px] font-normal text-neutral-500">
                                    <span className="hidden sm:inline">Less</span>
                                    <div className="flex gap-1">
                                        <div className="w-3.5 h-3.5 rounded-[3px] bg-neutral-100 dark:bg-neutral-800 ring-1 ring-neutral-200 dark:ring-transparent"></div>
                                        <div className="w-3.5 h-3.5 rounded-[3px] bg-violet-200 dark:bg-violet-900"></div>
                                        <div className="w-3.5 h-3.5 rounded-[3px] bg-violet-400 dark:bg-violet-700"></div>
                                        <div className="w-3.5 h-3.5 rounded-[3px] bg-violet-600 dark:bg-violet-500"></div>
                                    </div>
                                    <span className="hidden sm:inline">More</span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-5 overflow-hidden">
                            {isLoading ? (
                                <div className="h-[160px] flex items-center justify-center">
                                    <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
                                </div>
                            ) : viewMode === 'month' ? (
                                /* ===== MOBILE MONTH VIEW: 7-column grid that fills screen ===== */
                                <div className="w-full">
                                    {/* Weekday Headers */}
                                    <div className="grid grid-cols-7 gap-1.5 mb-2">
                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                            <div key={d} className="text-center text-[11px] font-medium text-neutral-400">{d}</div>
                                        ))}
                                    </div>

                                    {/* Days Grid */}
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {(() => {
                                            // Build a proper calendar grid for the month
                                            const monthStart = new Date(currentYear, currentMonth, 1)
                                            const monthEnd = new Date(currentYear, currentMonth + 1, 0) // last day of month
                                            const startDayOfWeek = getDay(monthStart) // 0=Sun

                                            // Empty cells before the 1st
                                            const cells: React.ReactNode[] = []
                                            for (let i = 0; i < startDayOfWeek; i++) {
                                                cells.push(<div key={`empty-${i}`} className="aspect-square rounded-lg bg-transparent" />)
                                            }

                                            // Actual days
                                            for (let d = 1; d <= monthEnd.getDate(); d++) {
                                                const day = new Date(currentYear, currentMonth, d)
                                                const level = getActivityLevel(day)
                                                const isSelected = isSameDay(day, selectedDate)
                                                const isTodayDate = isToday(day)

                                                cells.push(
                                                    <div
                                                        key={day.toISOString()}
                                                        onClick={() => setSelectedDate(day)}
                                                        className={cn(
                                                            "aspect-square rounded-lg cursor-pointer transition-colors flex items-center justify-center text-xs font-medium",
                                                            getColorClass(level),
                                                            level === 0 && "ring-1 ring-inset ring-neutral-200 dark:ring-transparent text-neutral-500 dark:text-neutral-400",
                                                            level >= 1 && "text-white",
                                                            isTodayDate && "ring-1 ring-violet-500"
                                                        )}
                                                    >
                                                        {d}
                                                    </div>
                                                )
                                            }

                                            return cells
                                        })()}
                                    </div>
                                </div>
                            ) : (
                                /* ===== DESKTOP YEAR VIEW: original small-block heatmap ===== */
                                <div className="min-w-max mx-auto md:mx-0">
                                    {/* Month Labels */}
                                    <div className="flex text-[11px] text-neutral-400 mb-2 pl-[30px]">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <div key={i} className="flex-1 text-center w-[68px]">{format(new Date(currentYear, i, 1), 'MMM')}</div>
                                        ))}
                                    </div>

                                    <div className="flex gap-1.5">
                                        {/* Day labels */}
                                        <div className="flex flex-col gap-1.5 text-[10px] text-neutral-400 pt-[2px] pr-2">
                                            <div className="h-3.5 leading-[14px]">Sun</div>
                                            <div className="h-3.5 leading-[14px] opacity-0">Mon</div>
                                            <div className="h-3.5 leading-[14px]">Tue</div>
                                            <div className="h-3.5 leading-[14px] opacity-0">Wed</div>
                                            <div className="h-3.5 leading-[14px]">Thu</div>
                                            <div className="h-3.5 leading-[14px] opacity-0">Fri</div>
                                            <div className="h-3.5 leading-[14px]">Sat</div>
                                        </div>

                                        {/* The Grid: Columns of Weeks */}
                                        <div className="flex gap-1.5">
                                            {weeks.map((week, wIdx) => (
                                                <div key={wIdx} className="flex flex-col gap-1.5">
                                                    {wIdx === 0 && Array.from({ length: getDay(week[0]) }).map((_, i) => (
                                                        <div key={`empty-${i}`} className="w-3.5 h-3.5" />
                                                    ))}

                                                    {week.map((day) => {
                                                        const level = getActivityLevel(day)
                                                        const isSelected = isSameDay(day, selectedDate)
                                                        const isTodayDate = isToday(day)

                                                        return (
                                                            <div
                                                                key={day.toISOString()}
                                                                onClick={() => setSelectedDate(day)}
                                                                title={`${format(day, 'MMM d, yyyy')}: ${level} activities`}
                                                                className={cn(
                                                                    "w-3.5 h-3.5 rounded-[3px] cursor-pointer transition-colors",
                                                                    getColorClass(level),
                                                                    level === 0 && "ring-1 ring-inset ring-neutral-200 dark:ring-transparent",
                                                                    isTodayDate && "ring-1 ring-violet-500"
                                                                )}
                                                            />
                                                        )
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* SELECTED DATE DETAILS (Restored & Scrollable) */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                            Activity for <span className="text-violet-600">{format(selectedDate, "MMMM d, yyyy")}</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {/* Interviews Column */}
                            <Card className="border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col">
                                <CardHeader className="py-2 px-3 bg-neutral-50/50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                                    <CardTitle className="text-[11px] font-semibold flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                                        <Video className="h-3 w-3 text-violet-500" />
                                        Interviews ({selectedInterviews.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col gap-1 overflow-y-auto max-h-[55px]">
                                    {selectedInterviews.length === 0 ? (
                                        <div className="text-[10px] text-neutral-400 italic py-1 text-center">
                                            No interviews scheduled.
                                        </div>
                                    ) : (
                                        selectedInterviews.map(interview => (
                                            <div key={interview.id} className="flex flex-col gap-0.5 p-1.5 rounded border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-violet-200 transition-colors shrink-0">
                                                <div className="flex justify-between items-start">
                                                    <span className="font-semibold text-[11px] text-neutral-900 dark:text-neutral-100 truncate max-w-[150px]">
                                                        {interview.job?.company || "Unknown"}
                                                    </span>
                                                    <Badge variant="secondary" className="text-[9px] px-1 h-4 bg-violet-50 text-violet-700 hover:bg-violet-100 border-violet-100">
                                                        {interview.round}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2 text-[9px] text-neutral-500 dark:text-neutral-400">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-2.5 w-2.5" /> {interview.interviewTime}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Video className="h-2.5 w-2.5" /> {interview.interviewMode}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </CardContent>
                            </Card>

                            {/* Jobs Column */}
                            <Card className="border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col">
                                <CardHeader className="py-2 px-3 bg-neutral-50/50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                                    <CardTitle className="text-[11px] font-semibold flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                                        <Briefcase className="h-3 w-3 text-emerald-500" />
                                        Applications ({selectedJobs.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col gap-1 overflow-y-auto max-h-[55px]">
                                    {selectedJobs.length === 0 ? (
                                        <div className="text-[10px] text-neutral-400 italic py-1 text-center">
                                            No applications submitted.
                                        </div>
                                    ) : (
                                        selectedJobs.map(job => (
                                            <div key={job.id} className="flex flex-col gap-0.5 p-1.5 rounded border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-emerald-200 transition-colors shrink-0">
                                                <div className="flex justify-between items-start">
                                                    <span className="font-semibold text-[11px] text-neutral-900 dark:text-neutral-100 truncate max-w-[150px]">
                                                        {job.company}
                                                    </span>
                                                    <Badge variant="secondary" className="text-[9px] px-1 h-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100">
                                                        {job.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-1 text-[9px] text-neutral-500 dark:text-neutral-400">
                                                    <MapPin className="h-2.5 w-2.5" />
                                                    <span className="truncate max-w-[120px]">{job.location}</span>
                                                    <span>•</span>
                                                    <span className="truncate max-w-[100px]">{job.position}</span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

