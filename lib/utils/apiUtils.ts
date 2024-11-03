import { redirect } from "next/navigation";

export const fetchWithAuth = async (url: string, options: RequestInit) => {
    
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    try {
        const token = localStorage.getItem("token");

        const headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };

        const response = await fetch(url, { ...options, headers });

        const newToken = response.headers.get("New-Access-Token");

        if (newToken) {
            localStorage.setItem("token", newToken);
        }

        if (!response.ok) {

            if (response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = `${basePath}/login`;
                throw new Error("Unauthorized");
            }

            const errorData = await response.json();
            throw new Error(errorData.message || "Request failed");
        }

        return response.json();

    } catch (error: any) {
        throw error;
    }
};
