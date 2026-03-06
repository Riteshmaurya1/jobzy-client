import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        success: true,
        stats: {
            tier: "premium",
            monthlyJobsUsed: 4,
            limit: 150,
            remaining: 146,
            lastReset: "2026-01-29T11:04:16.000Z",
            memberSince: "2026-01-29T11:04:16.000Z"
        }
    });
}
