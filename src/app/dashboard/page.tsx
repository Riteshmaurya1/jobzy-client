"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Topbar } from "@/components/dashboard/Topbar"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { PipelineOverview } from "@/components/dashboard/PipelineOverview"
import { UpcomingInterviews } from "@/components/dashboard/UpcomingInterviews"
import { TopCompanies } from "@/components/dashboard/TopCompanies"
import { JobBreakdown } from "@/components/dashboard/JobBreakdown"
import { MonthlyApplications } from "@/components/dashboard/MonthlyApplications"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    router.push('/signin');
                    return;
                }

                const [dashboardRes, upcomingRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/dashboard`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch(`${API_BASE_URL}/interviews/upcoming`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                if (dashboardRes.status === 401 || upcomingRes.status === 401) {
                    localStorage.removeItem('accessToken');
                    router.push('/signin');
                    return;
                }

                const dashboardData = await dashboardRes.json();
                const upcomingData = await upcomingRes.json();

                if (dashboardData.success && dashboardData.data) {
                    // Map backend response to frontend component structure
                    const mappedData = {
                        stats: {
                            totalApplications: dashboardData.data.kpis.totalCompaniesApplied, // Using companies applied as proxy for total apps or could be totalJobs
                            activeJobs: dashboardData.data.kpis.activeJobs,
                            companiesApplied: dashboardData.data.kpis.totalCompaniesApplied,
                            interviewsScheduled: dashboardData.data.kpis.totalInterviews
                        },
                        pipeline: dashboardData.data.jobsPipeline,
                        monthlyApplications: dashboardData.data.monthlySeries ? dashboardData.data.monthlySeries.map((item: any) => ({
                            month: item.month,
                            count: item.applications
                        })) : [],
                        upcomingInterviews: upcomingData.success && upcomingData.interviews ? upcomingData.interviews.map((interview: any) => ({
                            id: interview.id,
                            round: interview.round,
                            interviewDate: interview.interviewDate,
                            interviewTime: interview.interviewTime,
                            interviewMode: interview.interviewMode,
                            meetingLink: interview.meetingLink,
                            status: interview.status,
                            interviewerName: interview.interviewerName,
                            job: {
                                company: interview.job?.company || "Unknown Company",
                                position: interview.job?.position || "Unknown Position"
                            }
                        })) : [],
                        topCompanies: dashboardData.data.topCompanies ? dashboardData.data.topCompanies.map((item: any) => ({
                            name: item.company,
                            count: item.applications
                        })) : [],
                        jobBreakdown: dashboardData.data.jobsBreakdown ? {
                            status: dashboardData.data.jobsBreakdown.byStatus || {},
                            workMode: dashboardData.data.jobsBreakdown.byWorkMode || {},
                            type: dashboardData.data.jobsBreakdown.byType || {}
                        } : { status: {}, workMode: {}, type: {} }
                    };
                    setData(mappedData);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [router])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-neutral-50 dark:bg-black">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="min-h-screen pb-10">
            <Topbar />

            <div className="px-8 py-8 space-y-6">
                <StatsCards stats={data.stats} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 space-y-6">
                        <PipelineOverview data={data.pipeline} />
                        <MonthlyApplications data={data.monthlyApplications} />
                        <JobBreakdown data={data.jobBreakdown} />
                    </div>

                    <div className="xl:col-span-1 space-y-6">
                        <UpcomingInterviews interviews={data.upcomingInterviews} />
                        <TopCompanies companies={data.topCompanies} />
                    </div>
                </div>
            </div>
        </div>
    )
}
