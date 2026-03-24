import { format } from "date-fns";
import { Job } from "./jobsService";

import { fetchApi } from "@/lib/apiClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export interface Interview {
    id: string;
    jobId: string;
    job?: Job; // Optional job details if populated
    round: string;
    interviewDate: string;
    interviewTime: string;
    interviewMode: "video-call" | "audio-call" | "in-person";
    meetingLink?: string;
    interviewerName?: string;
    interviewerEmail?: string;
    followUpDate?: string;
    notes?: string;
    status: "scheduled" | "completed" | "cancelled"; // Assuming status exists based on filters
    createdAt?: string;
    updatedAt?: string;
}

export interface InterviewFilters {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
}

export interface Quota {
    tier: string;
    resource: string;
    used: number;
    limit: number;
    remaining: number;
    resetDate: string;
}

const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

export const interviewsService = {
    getAll: async (filters: InterviewFilters = {}, page = 1, limit = 10) => {
        const params = new URLSearchParams();
        if (filters.status && filters.status !== "All Status") params.append("status", filters.status);
        if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
        if (filters.dateTo) params.append("dateTo", filters.dateTo);

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        const res = await fetchApi(`${API_BASE_URL}/interviews?${params.toString()}`, {
            headers: getHeaders()
        });
        return res.json();
    },

    getUpcoming: async () => {
        const res = await fetchApi(`${API_BASE_URL}/interviews/upcoming`, {
            headers: getHeaders()
        });
        return res.json();
    },

    getForJob: async (jobId: string) => {
        const res = await fetchApi(`${API_BASE_URL}/jobs/${jobId}/interviews`, {
            headers: getHeaders()
        });
        return res.json();
    },

    getById: async (id: string) => {
        const res = await fetchApi(`${API_BASE_URL}/interviews/${id}`, {
            headers: getHeaders()
        });
        return res.json();
    },

    create: async (jobId: string, data: Partial<Interview>) => {
        const res = await fetchApi(`${API_BASE_URL}/jobs/${jobId}/interviews`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },

    update: async (id: string, data: Partial<Interview>) => {
        const res = await fetchApi(`${API_BASE_URL}/interviews/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },

    delete: async (id: string) => {
        const res = await fetchApi(`${API_BASE_URL}/interviews/${id}`, {
            method: "DELETE",
            headers: getHeaders()
        });
        if (res.status === 204) return { success: true };
        return res.json();
    }
};
