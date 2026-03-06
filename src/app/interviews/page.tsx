"use client"

import { useState, useEffect } from "react"
import { Plus, Filter, Loader2, ChevronLeft, ChevronRight, CalendarPlus } from "lucide-react"
import { InterviewTable } from "@/components/interviews/InterviewTable"
import { InterviewModal } from "@/components/interviews/InterviewModal"
import { Topbar } from "@/components/dashboard/Topbar"
import { Button } from "@/components/ui/button"

import DashboardLayout from "@/app/dashboard/layout"
import { interviewsService, Interview } from "@/services/interviewsService"
import { jobsService, Job } from "@/services/jobsService"
import { useToast } from "@/components/ui/use-toast"

export default function InterviewsPage() {
    const [interviews, setInterviews] = useState<Interview[]>([])
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState("All Status")

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalInterviews, setTotalInterviews] = useState(0)
    const limit = 9

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentInterview, setCurrentInterview] = useState<Interview | null>(null)

    const { toast } = useToast()

    const fetchInterviews = async () => {
        setIsLoading(true)
        try {
            const response = await interviewsService.getAll({
                // search: searchQuery, 
                status: statusFilter
            }, currentPage, limit)

            if (response.success) {
                setInterviews(response.interviews || [])
                setTotalPages(response.pagination?.totalPages || Math.ceil((response.count || 0) / limit) || 1)
                setTotalInterviews(response.pagination?.total || response.count || 0)
            } else {
                setInterviews([])
            }
        } catch (error) {
            console.error("Failed to fetch interviews:", error)
            toast({ title: "Error", description: "Failed to fetch interviews", variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    const fetchJobs = async () => {
        try {
            // Fetch all jobs for the create interview dropdown
            const data = await jobsService.getAll({}, 1, 100) // simplified to get first 100, assuming not too many
            if (data.success) {
                setJobs(data.jobs)
            }
        } catch (error) {
            console.error("Failed to fetch jobs:", error)
        }
    }

    useEffect(() => {
        fetchInterviews()
        fetchJobs()
    }, [statusFilter, currentPage])

    const handleEditInterview = (interview: Interview) => {
        setCurrentInterview(interview)
        setIsModalOpen(true)
    }

    const handleDeleteInterview = async (id: string) => {
        if (!confirm("Are you sure you want to delete this interview?")) return

        try {
            await interviewsService.delete(id)
            setInterviews(interviews.filter(i => i.id !== id))
            toast({ title: "Success", description: "Interview deleted successfully" })
        } catch (error) {
            console.error("Failed to delete interview:", error)
            toast({ title: "Error", description: "Failed to delete interview", variant: "destructive" })
        }
    }

    const handleModalSubmit = async (data: any) => {
        try {
            let response;
            if (currentInterview) {
                response = await interviewsService.update(currentInterview.id, data)
            } else {
                // Service expects (jobId, data)
                response = await interviewsService.create(data.jobId, data)
            }

            if (response && !response.success) {
                const errorMessage = response.errors
                    ? response.errors.map((e: any) => e.message).join(", ")
                    : response.message || "Failed to save interview";

                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive"
                });
                throw new Error(errorMessage); // Throw to prevent modal from closing
            }

            toast({ title: "Success", description: "Interview saved successfully" })
            fetchInterviews()
            setIsModalOpen(false)
        } catch (error: any) {
            console.error("Failed to save interview:", error)
            // Rethrow so InterviewModal catches it and keeps modal open
            throw error;
        }
    }

    const handleCreateClick = () => {
        setCurrentInterview(null)
        setIsModalOpen(true)
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-10">
                <Topbar breadcrumbs={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Manage Interviews" }
                ]} />
                <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto w-full">
                    {/* Header & Filters */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Manage Interviews</h1>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-1">Track and manage all your scheduled interviews.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleCreateClick}
                                variant="outline"
                                className="gap-2 bg-white dark:bg-neutral-900 text-neutral-700 border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                            >
                                <CalendarPlus className="h-4 w-4" />
                                Schedule Interview
                            </Button>
                            <Button variant="outline" className="gap-2 bg-white dark:bg-neutral-900 text-neutral-700 border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                            <select
                                className="h-10 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All Status">All Status</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* Interview Table */}
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                        </div>
                    ) : (
                        <InterviewTable
                            interviews={interviews}
                            onEdit={handleEditInterview}
                            onDelete={handleDeleteInterview}
                        />
                    )}

                    {/* Pagination Controls */}
                    {interviews.length > 0 && (
                        <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-4">
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalInterviews)} of {totalInterviews} results
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

                    <InterviewModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleModalSubmit}
                        interview={currentInterview}
                        jobs={jobs}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}
