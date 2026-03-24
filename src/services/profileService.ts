import { fetchApi } from "@/lib/apiClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export interface Profile {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    tier: string;
    monthlyJobsUsed: number;
    lastReset: string;
    createdAt: string;
    updatedAt: string;
}

export interface AccountStats {
    tier: string;
    monthlyJobsUsed: number;
    limit: number;
    remaining: number;
    lastReset: string;
    memberSince: string;
}

const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

export const profileService = {
    /** GET /api/v1/user/profile */
    getProfile: async (): Promise<{ success: boolean; profile: Profile }> => {
        const res = await fetchApi(`${API_BASE_URL}/user/profile`, {
            headers: getHeaders()
        });
        return res.json();
    },

    /** PUT /api/v1/user/profile */
    updateProfile: async (data: { name: string; phoneNumber: string }): Promise<{ success: boolean; message: string; updatedData: any }> => {
        const res = await fetchApi(`${API_BASE_URL}/user/profile`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },

    /** PATCH /api/v1/user/profile/password */
    changePassword: async (data: { currentPassword: string; newPassword: string }): Promise<{ success: boolean; message?: string }> => {
        const res = await fetchApi(`${API_BASE_URL}/user/profile/password`, {
            method: "PATCH",
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },

    /** DELETE /api/v1/user/profile */
    deleteAccount: async (): Promise<{ success: boolean; message: string }> => {
        const res = await fetch(`${API_BASE_URL}/user/profile`, {
            method: "DELETE",
            headers: getHeaders()
        });
        return res.json();
    },

    /** GET /api/v1/user/profile/status */
    getStatus: async (): Promise<{ success: boolean; stats: AccountStats }> => {
        const res = await fetch(`${API_BASE_URL}/user/profile/status`, {
            headers: getHeaders()
        });
        return res.json();
    },
};
