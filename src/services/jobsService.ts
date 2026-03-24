import { format } from "date-fns";
import { fetchApi } from "@/lib/apiClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export interface Job {
    id: string;
    company: string;
    position: string;
    jobLink: string;
    location: string;
    workMode: "remote" | "hybrid" | "onsite";
    jobType: "full-time" | "part-time" | "contract" | "internship";
    salary: string;
    status: "applied" | "screening" | "interview-scheduled" | "offer" | "rejected";
    appliedDate: string;
    platform: string;
    notes?: string;
    resumeVersion?: string;
    followUpDate?: string;
    createdAt?: string;
    updatedAt?: string;
    interviews?: any[]; // details can be added if needed
}

export interface JobStats {
    totalApplications: number;
    applied: number;
    screening: number;
    interviewed: number;
    offered: number;
    rejected: number;
    upcomingInterviews: number;
    successRate: number;
}

export interface JobFilters {
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
}

const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

export const jobsService = {
    getAll: async (filters: JobFilters = {}, page = 1, limit = 10) => {
        // Construct query string for simple filters
        const params = new URLSearchParams();
        if (filters.search) params.append("search", filters.search);
        if (filters.status && filters.status !== "All Status") params.append("status", filters.status);

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        // Use advanced search if date filters are present
        if (filters.dateFrom || filters.dateTo) {
            const res = await fetchApi(`${API_BASE_URL}/jobs/search/advanced?page=${page}&limit=${limit}`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({
                    dateFrom: filters.dateFrom,
                    dateTo: filters.dateTo
                })
            });
            return res.json();
        }

        const res = await fetchApi(`${API_BASE_URL}/jobs?${params.toString()}`, {
            headers: getHeaders()
        });
        return res.json();
    },

    getStats: async () => {
        const res = await fetchApi(`${API_BASE_URL}/jobs/stats`, {
            headers: getHeaders()
        });
        return res.json();
    },

    create: async (data: Partial<Job>) => {
        const res = await fetchApi(`${API_BASE_URL}/jobs/create`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },

    update: async (id: string, data: Partial<Job>) => {
        const res = await fetchApi(`${API_BASE_URL}/jobs/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },

    delete: async (id: string) => {
        const res = await fetchApi(`${API_BASE_URL}/jobs/${id}`, {
            method: "DELETE",
            headers: getHeaders()
        });
        // Handle 204 No Content or JSON response
        if (res.status === 204) return { success: true };
        return res.json();
    },

    getById: async (id: string) => {
        const res = await fetchApi(`${API_BASE_URL}/jobs/${id}`, {
            headers: getHeaders()
        });
        return res.json();
    },

    exportCSV: async () => {
        const res = await fetchApi(`${API_BASE_URL}/jobs/export/csv`, {
            headers: getHeaders()
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `jobs_export_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }
};
