"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Filter, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { JobCard } from "@/components/dashboard/jobs/JobCard"
import { JobModal } from "@/components/jobs/JobModal"
import { Topbar } from "@/components/dashboard/Topbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { jobsService, Job } from "@/services/jobsService"
import { useToast } from "@/components/ui/use-toast"

export default function ManageJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All Status")

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalJobs, setTotalJobs] = useState(0)
    const limit = 9 // 3x3 grid

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentJob, setCurrentJob] = useState<Job | null>(null)

    const { toast } = useToast()

    const fetchJobs = async () => {
        setIsLoading(true)
        try {
            const response = await jobsService.getAll({
                search: searchQuery,
                status: statusFilter
            }, currentPage, limit)

            if (response.success) {
                setJobs(response.jobs || [])
                setTotalPages(Math.ceil((response.totalCount || 0) / limit))
                setTotalJobs(response.totalCount || 0)
            } else {
                setJobs([])
            }
        } catch (error) {
            console.error("Failed to fetch jobs:", error)
            toast({ title: "Error", description: "Failed to fetch jobs", variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [searchQuery, statusFilter, currentPage])

    const handleAddJob = () => {
        setCurrentJob(null)
        setIsModalOpen(true)
    }

    const handleEditJob = (job: Job) => {
        setCurrentJob(job)
        setIsModalOpen(true)
    }

    const handleDeleteJob = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job?")) return

        try {
            await jobsService.delete(id)
            setJobs(jobs.filter(j => j.id !== id))
            toast({ title: "Success", description: "Job deleted successfully" })
        } catch (error) {
            console.error("Failed to delete job:", error)
            toast({ title: "Error", description: "Failed to delete job", variant: "destructive" })
        }
    }

    const handleModalSubmit = async (data: Partial<Job>) => {
        try {
            if (currentJob) {
                // Update
                await jobsService.update(currentJob.id, data)
                toast({ title: "Success", description: "Job updated successfully" })
            } else {
                // Create
                await jobsService.create(data)
                toast({ title: "Success", description: "Job created successfully" })
            }
            fetchJobs()
            setIsModalOpen(false)
        } catch (error) {
            console.error("Failed to save job:", error)
            toast({ title: "Error", description: "Failed to save job", variant: "destructive" })
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Topbar />
            <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manage Jobs</h1>
                        <p className="text-neutral-500 dark:text-neutral-400 mt-1">Track and manage all your job applications in one place.</p>
                    </div>
                    <Button onClick={handleAddJob} className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Job
                    </Button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <Input
                            placeholder="Search by role, company..."
                            className="pl-9 bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="gap-2 w-full sm:w-auto dark:border-neutral-700 dark:text-neutral-300">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                        <select
                            className="h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All Status">All Status</option>
                            <option value="applied">Applied</option>
                            <option value="screening">Screening</option>
                            <option value="interview-scheduled">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Job Grid */}
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-neutral-500">No jobs found. Start by adding one!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onEdit={handleEditJob}
                                onDelete={handleDeleteJob}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {jobs.length > 0 && (
                    <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-4">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalJobs)} of {totalJobs} results
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                Previous
                            </Button>
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                )}

                <JobModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleModalSubmit}
                    job={currentJob}
                />
            </div>
        </div>
    )
}
