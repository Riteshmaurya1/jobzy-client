import { Quota } from "./interviewsService";

import { fetchApi } from "@/lib/apiClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://65.2.83.236/api/v1";

const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

// Tier limits for ATS checks (since the /ats/usage endpoint only returns used count)
const ATS_TIER_LIMITS: Record<string, number> = {
    free: 1,
    premium: 20,
    pro: 75,
};

export const quotaService = {
    /**
     * Fetch all available quotas in parallel
     */
    getAllQuotas: async (): Promise<Quota[]> => {
        const results = await Promise.allSettled([
            quotaService.getJobsQuota(),
            quotaService.getInterviewsQuota(),
            quotaService.getAtsQuota(),
        ]);

        const quotas: Quota[] = [];
        for (const result of results) {
            if (result.status === "fulfilled" && result.value) {
                quotas.push(result.value);
            }
        }
        return quotas;
    },

    /** GET /api/v1/jobs/quota */
    getJobsQuota: async (): Promise<Quota | null> => {
        const res = await fetchApi(`${API_BASE_URL}/jobs/quota`, {
            headers: getHeaders()
        });
        const data = await res.json();
        return data.success ? data.quota : null;
    },

    /** GET /api/v1/interviews — extract quota from list response */
    getInterviewsQuota: async (): Promise<Quota | null> => {
        const res = await fetchApi(`${API_BASE_URL}/interviews`, {
            headers: getHeaders()
        });
        const data = await res.json();
        return data.success && data.quota ? data.quota : null;
    },

    /** GET /api/v1/ats/usage — map different response format to Quota */
    getAtsQuota: async (): Promise<Quota | null> => {
        const res = await fetchApi(`${API_BASE_URL}/ats/usage`, {
            headers: getHeaders()
        });
        const data = await res.json();
        if (data.success && data.data) {
            const tier = data.data.tier || "free";
            const used = data.data.atsChecksUsed || 0;
            const limit = ATS_TIER_LIMITS[tier] ?? 1;
            return {
                tier,
                resource: "ats_checks",
                used,
                limit,
                remaining: Math.max(limit - used, 0),
                resetDate: "",
            };
        }
        return null;
    },
};
