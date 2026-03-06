import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
    return NextResponse.json({
        success: true,
        currentPassword: "Ritesh@123",
        newPassword: "Kumar@123"
    });
}
