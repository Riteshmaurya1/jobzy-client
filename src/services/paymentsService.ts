import { fetchApi } from "@/lib/apiClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://65.2.83.236/api/v1";

export interface Subscription {
    id: string;
    planType: string;
    planDuration: "monthly" | "yearly" | null;
    validFrom: string;
    validUntil: string;
    daysRemaining: number;
    amount: number;
    status: string;
}

export interface Payment {
    id: string;
    userId: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    amount: number;
    currency: string;
    planType: string;
    planDuration: string;
    status: "created" | "paid" | "failed" | "refunded";
    method?: string;
    errorCode?: string;
    errorDescription?: string;
    createdAt: string;
    updatedAt: string;
}

const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

export const paymentsService = {
    // Get current subscription status
    getSubscription: async () => {
        const res = await fetchApi(`${API_BASE_URL}/payments/subscription`, {
            headers: getHeaders()
        });
        return res.json();
    },

    // Get payment history
    getHistory: async () => {
        const res = await fetchApi(`${API_BASE_URL}/payments/history`, {
            headers: getHeaders()
        });
        return res.json();
    },

    // Get payment by ID
    getById: async (paymentId: string) => {
        const res = await fetchApi(`${API_BASE_URL}/payments/${paymentId}`, {
            headers: getHeaders()
        });
        return res.json();
    },

    // Create a Razorpay order
    createOrder: async (planType: string, planDuration: string) => {
        const res = await fetchApi(`${API_BASE_URL}/payments/create-order`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ planType, planDuration })
        });
        return res.json();
    },

    // Verify successful payment
    verifyPayment: async (data: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
        method?: string;
    }) => {
        const res = await fetchApi(`${API_BASE_URL}/payments/verify`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },

    // Report payment failure
    reportFailure: async (data: {
        razorpay_order_id: string;
        error_code: string;
        error_description: string;
    }) => {
        const res = await fetch(`${API_BASE_URL}/payments/failure`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};
