"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Filter, Loader2, Download, ChevronLeft, ChevronRight, CalendarPlus } from "lucide-react"
import { JobCard } from "@/components/dashboard/jobs/JobCard"
import { Topbar } from "@/components/dashboard/Topbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/app/dashboard/layout"
import { Job, jobsService, JobStats } from "@/services/jobsService"
import { JobModal } from "@/components/jobs/JobModal"
import { InterviewModal } from "@/components/interviews/InterviewModal"
import { interviewsService } from "@/services/interviewsService"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { useToast } from "@/components/ui/use-toast"

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState<JobStats | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false)
    const [currentJob, setCurrentJob] = useState<Job | null>(null)
    const [filters, setFilters] = useState({
        search: "",
        status: "All Status"
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const JOBS_PER_PAGE = 9
    const { toast } = useToast()

    const fetchJobs = async (page = currentPage) => {
        setIsLoading(true)
        try {
            const data = await jobsService.getAll(filters, page, JOBS_PER_PAGE)
            if (data.success) {
                setJobs(data.jobs)
                setTotalPages(data.pagination?.totalPages || Math.ceil((data.total || data.jobs.length) / JOBS_PER_PAGE))
            }
        } catch (error) {
            console.error("Failed to fetch jobs:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchStats = async () => {
        try {
            const data = await jobsService.getStats()
            if (data.success) {
                setStats(data.stats.basic)
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error)
        }
    }

    useEffect(() => {
        fetchJobs(currentPage)
        fetchStats()
    }, [filters, currentPage])

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            pages.push(1)
            if (currentPage > 3) pages.push("...")
            const start = Math.max(2, currentPage - 1)
            const end = Math.min(totalPages - 1, currentPage + 1)
            for (let i = start; i <= end; i++) pages.push(i)
            if (currentPage < totalPages - 2) pages.push("...")
            pages.push(totalPages)
        }
        return pages
    }

    const handleCreateJob = async (data: Partial<Job>) => {
        try {
            await jobsService.create(data)
            fetchJobs()
            fetchStats()
        } catch (error) {
            console.error("Failed to create job:", error)
        }
    }

    const handleUpdateJob = async (data: Partial<Job>) => {
        if (!currentJob) return
        try {
            await jobsService.update(currentJob.id, data)
            fetchJobs()
            fetchStats()
        } catch (error) {
            console.error("Failed to update job:", error)
        }
    }

    const handleDeleteJob = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job?")) return
        try {
            await jobsService.delete(id)
            fetchJobs()
            fetchStats()
        } catch (error) {
            console.error("Failed to delete job:", error)
        }
    }

    // Interview creation handler
    const handleCreateInterview = async (data: any) => {
        try {
            const { jobId, ...interviewData } = data
            const response = await interviewsService.create(jobId, interviewData)
            if (response.success) {
                toast({ title: "Success", description: "Interview scheduled successfully" })
                setIsInterviewModalOpen(false)
                // Optionally refresh stats if they include interview counts
                fetchStats()
            } else {
                toast({ title: "Error", description: response.message || "Failed to schedule interview", variant: "destructive" })
            }
        } catch (error) {
            console.error("Failed to schedule interview:", error)
            toast({ title: "Error", description: "Failed to schedule interview", variant: "destructive" })
        }
    }

    const openCreateModal = () => {
        setCurrentJob(null)
        setIsModalOpen(true)
    }

    const openEditModal = (job: Job) => {
        setCurrentJob(job)
        setIsModalOpen(true)
    }

    const mappedStats = stats ? {
        totalApplications: stats.totalApplications,
        activeJobs: stats.applied + stats.screening + stats.interviewed,
        companiesApplied: stats.totalApplications,
        interviewsScheduled: stats.upcomingInterviews
    } : {
        totalApplications: 0,
        activeJobs: 0,
        companiesApplied: 0,
        interviewsScheduled: 0
    }

    const exportCSV = async () => {
        try {
            await jobsService.exportCSV()
        } catch (error) {
            console.error("Failed to export CSV:", error)
        }
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-10">
                <Topbar breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Manage Jobs" }
                ]} />
                <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manage Jobs</h1>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-1">Track and manage all your job applications in one place.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => setIsInterviewModalOpen(true)}
                                variant="outline"
                                className="gap-2 shadow-none dark:border-neutral-700 dark:text-neutral-300"
                            >
                                <CalendarPlus className="h-4 w-4" />
                                Schedule Interview
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <StatsCards stats={mappedStats} />

                    {/* Filters & Search */}
                    <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 items-center">
                            <div className="relative col-span-2 sm:flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                                <Input
                                    placeholder="Search by role, company..."
                                    className="pl-9 bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus-visible:ring-violet-500"
                                    value={filters.search}
                                    onChange={(e) => { setCurrentPage(1); setFilters({ ...filters, search: e.target.value }) }}
                                />
                            </div>
                            <Button onClick={openCreateModal} variant="outline" className="gap-2 shadow-none dark:border-neutral-700 dark:text-neutral-300">
                                <Plus className="h-4 w-4" />
                                Add New Job
                            </Button>
                            <Button variant="outline" className="gap-2 shadow-none dark:border-neutral-700 dark:text-neutral-300">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                            <Button onClick={exportCSV} variant="outline" className="gap-2 shadow-none dark:border-neutral-700 dark:text-neutral-300">
                                <Download className="h-4 w-4" />
                                Export CSV
                            </Button>
                            <select
                                className="h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                value={filters.status}
                                onChange={(e) => { setCurrentPage(1); setFilters({ ...filters, status: e.target.value }) }}
                            >
                                <option>All Status</option>
                                <option value="applied">Applied</option>
                                <option value="screening">Screening</option>
                                <option value="interview-scheduled">Interview Scheduled</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    {/* Job Grid */}
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {jobs.length > 0 ? (
                                    jobs.map((job) => (
                                        <JobCard
                                            key={job.id}
                                            job={job}
                                            onEdit={openEditModal}
                                            onDelete={handleDeleteJob}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-20 text-neutral-500">
                                        No jobs found. Start by adding a new job application!
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 pt-6">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 transition-colors"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    {getPageNumbers().map((page, index) =>
                                        typeof page === "string" ? (
                                            <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center text-neutral-400 text-sm">
                                                ···
                                            </span>
                                        ) : (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === page
                                                    ? "bg-violet-600 text-white shadow-md shadow-violet-500/30"
                                                    : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 transition-colors"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>

                                    <span className="ml-3 text-sm text-neutral-500 dark:text-neutral-400">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                </div>
                            )}
                        </>
                    )}

                    <JobModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={currentJob ? handleUpdateJob : handleCreateJob}
                        job={currentJob}
                    />

                    <InterviewModal
                        isOpen={isInterviewModalOpen}
                        onClose={() => setIsInterviewModalOpen(false)}
                        onSubmit={handleCreateInterview}
                        interview={null}
                        jobs={jobs}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}
