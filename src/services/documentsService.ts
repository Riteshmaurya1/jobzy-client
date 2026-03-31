import { fetchApi } from "@/lib/apiClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://periodically-instrumental-permitted-scotia.trycloudflare.com/api/v1";

export interface Document {
    id: string;
    fileName: string;
    fileSize: number;
    fileType?: string;
    atsScore: number | null;
    uploadSource?: string;
    atsAnalysis?: any;
    keywords?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ATSDocStats {
    totalDocuments: number;
    documentsWithScore: number;
    averageScore: string;
    highestScore: number;
    lowestScore: number;
    recentUploads: {
        id: string;
        fileName: string;
        atsScore: number;
        createdAt: string;
    }[];
}

const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

const getAuthHeader = () => {
    const token = localStorage.getItem("accessToken");
    return { "Authorization": token ? `Bearer ${token}` : "" };
};

export const documentsService = {
    /** GET /documents — list all documents */
    getAll: async () => {
        const res = await fetchApi(`${API_BASE_URL}/documents`, {
            headers: getHeaders()
        });
        return res.json();
    },

    /** GET /documents/:id — get single document with full ATS analysis */
    getById: async (id: string) => {
        const res = await fetchApi(`${API_BASE_URL}/documents/${id}`, {
            headers: getHeaders()
        });
        return res.json();
    },

    /** GET /documents/:id/download-url — get S3 signed download URL */
    getDownloadUrl: async (id: string) => {
        const res = await fetchApi(`${API_BASE_URL}/documents/${id}/download-url`, {
            headers: getHeaders()
        });
        return res.json();
    },

    /** GET /documents/stats/ats — get ATS stats summary */
    getATSStats: async () => {
        const res = await fetchApi(`${API_BASE_URL}/documents/stats/ats`, {
            headers: getHeaders()
        });
        return res.json();
    },

    /** DELETE /documents/:id — delete a document */
    delete: async (id: string) => {
        const res = await fetchApi(`${API_BASE_URL}/documents/${id}`, {
            method: "DELETE",
            headers: getHeaders()
        });
        if (res.status === 204) return { success: true };
        return res.json();
    }
};
