import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
        stats: {
            totalApplications: 4,
            activeJobs: 4,
            companiesApplied: 2,
            interviewsScheduled: 0
        },
        pipeline: {
            applied: 4,
            screening: 0,
            interviewScheduled: 0,
            offers: {
                received: 0,
                accepted: 0
            }
        },
        upcomingInterviews: [],
        topCompanies: [
            { name: 'Zoho', count: 3 },
            { name: 'jobzy', count: 1 }
        ],
        monthlyApplications: [
            { month: '2026-01', count: 4 }
        ],
        jobBreakdown: {
            status: { applied: 4 },
            workMode: { onsite: 4 },
            type: { fullTime: 4 }
        },
        user: {
            name: "JobZy User",
            plan: "Free plan"
        }
    };

    return NextResponse.json(data);
}
