import { Teacher } from '@/types/teacher';
import { fetchWithAuth } from '../utils/apiUtils';

interface GetTeachersType {
    teachers: Teacher[];
    total: number;
    lastPage: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTeachers(page = 1, limit = 10, searchTerm?: string) {
    const url = new URL(`${API_URL}/teachers`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    if (searchTerm) {
        url.searchParams.append("searchTerm", searchTerm);
    }

    const data: GetTeachersType = await fetchWithAuth(url.toString(), {
        method: 'GET',
    });

    return {
        data: data.teachers,
        total: data.total,
        lastPage: data.lastPage
    };
}

export async function createTeacher(teacher: Omit<Teacher, 'idTeacher'>): Promise<Teacher> {
    const data = await fetchWithAuth(`${API_URL}/teachers`, {
        method: 'POST',
        body: JSON.stringify(teacher),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return data;
}

export async function updateTeacher(teacherId: string, teacher: Omit<Teacher, 'idTeacher'>): Promise<Teacher> {
    const data = await fetchWithAuth(`${API_URL}/teachers/${teacherId}`, {
        method: 'PUT',
        body: JSON.stringify(teacher),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return data;
}

export async function deleteTeacher(teacherId: string): Promise<void> {
    await fetchWithAuth(`${API_URL}/teachers/${teacherId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
