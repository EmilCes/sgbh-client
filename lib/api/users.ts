import { User } from "@/types/user";
import { fetchWithAuth } from "../utils/apiUtils";

interface GetUsersType {
    users: User[];
    total: number;
    lastPage: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers(page = 1, limit = 10, searchTerm?: string) {
    const url = new URL(`${API_URL}/users`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    if (searchTerm) {
        url.searchParams.append("searchTerm", searchTerm);
    }

    const data: GetUsersType = await fetchWithAuth(url.toString(), {
        method: 'GET',
    });

    return {
        data: data.users,
        total: data.total,
        lastPage: data.lastPage
    };
}

export async function createUser(user: Omit<User, 'idUser'>): Promise<User> {
    const data = await fetchWithAuth(`${API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return data;
}

export async function updateUser(userId: number, user: Omit<User, 'idUser'>): Promise<User> {
    const data = await fetchWithAuth(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return data;
}

export async function deleteUser(userId: string): Promise<void> {
    await fetchWithAuth(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
