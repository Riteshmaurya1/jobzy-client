import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        success: true,
        subscription: {
            id: "20da3470-a6b4-4871-abfb-a309f0ded81b",
            planType: "premium",
            planDuration: "monthly",
            validFrom: "2026-01-30T20:01:05.578Z",
            validUntil: "2026-03-02T20:01:05.578Z",
            daysRemaining: 29,
            amount: 9900,
            status: "captured"
        }
    });
}
