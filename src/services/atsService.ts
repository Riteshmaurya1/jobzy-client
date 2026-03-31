import { fetchApi } from "@/lib/apiClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://periodically-instrumental-permitted-scotia.trycloudflare.com/api/v1";

export interface ATSResult {
    id?: string;
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    suggestions: string[];
    documentId?: string;
    createdAt?: string;
    [key: string]: any;
}

export interface KeywordMatch {
    matchedKeywords: string[];
    missingKeywords: string[];
    matchScore: number;
    [key: string]: any;
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

export const atsService = {
    /** POST /ats/check — upload resume + jobRole for ATS scoring */
    check: async (formData: FormData): Promise<any> => {
        const res = await fetchApi(`${API_BASE_URL}/ats/check`, {
            method: "POST",
            headers: getAuthHeader(),
            body: formData
        });
        return res.json();
    },

    /** GET /ats/usage — get current ATS usage stats */
    getUsage: async (): Promise<any> => {
        const res = await fetchApi(`${API_BASE_URL}/ats/usage`, {
            headers: getHeaders()
        });
        return res.json();
    },

    /** POST /ats/keywords/suggestions — upload resume + jobRole to get keyword suggestions */
    getKeywordSuggestions: async (formData: FormData): Promise<any> => {
        const res = await fetchApi(`${API_BASE_URL}/ats/keywords/suggestions`, {
            method: "POST",
            headers: getAuthHeader(),
            body: formData
        });
        return res.json();
    },

    /** POST /ats/keywords/match — compare resume text vs job description */
    matchKeywords: async (resumeText: string, jobDescription: string): Promise<any> => {
        const res = await fetchApi(`${API_BASE_URL}/ats/keywords/match`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ resumeText, jobDescription })
        });
        return res.json();
    },

    /** GET /documents/stats/ats — get ATS stats from documents */
    getDocumentStats: async (): Promise<any> => {
        const res = await fetchApi(`${API_BASE_URL}/documents/stats/ats`, {
            headers: getHeaders()
        });
        return res.json();
    },
};
