export const fetchWithAuth = async (url: string, options: RequestInit) => {
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
        console.log(response)
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
};
