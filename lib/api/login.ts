const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginResponse {
    token: string;
}

interface LoginError {
    message: string;
}

export async function loginUser(values: { email: string; password: string }): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData: LoginError = await response.json();
            throw new Error(errorData.message || 'Failed to login');
        }

        const data: LoginResponse = await response.json();

        if (!data.token || typeof data.token !== 'string') {
            throw new Error('Invalid token received');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Error during login. Please try again later.');
    }
}