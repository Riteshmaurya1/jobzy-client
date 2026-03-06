import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        success: true,
        profile: {
            id: "9c9c84e8-2022-4988-9289-9994992e5966",
            name: "ritesh kumar",
            email: "riteshkumar04294@gmail.com",
            phoneNumber: "9517424951",
            tier: "premium",
            monthlyJobsUsed: 4,
            lastReset: "2026-01-29T11:04:16.000Z",
            createdAt: "2026-01-29T11:04:16.000Z",
            updatedAt: "2026-02-01T19:53:11.513Z"
        }
    });
}

export async function PUT(request: Request) {
    const body = await request.json();
    return NextResponse.json({
        success: true,
        message: "Profile updated successfully",
        updatedData: body
    });
}

export async function DELETE() {
    return NextResponse.json({
        success: true,
        message: "Account deleted successfully"
    });
}
