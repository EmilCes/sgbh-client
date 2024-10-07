import { Teacher } from '@/types/teacher';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface GetTeachersType {
    teachers: Teacher[];
    total: number;
    lastPage: number;
}

export async function getTeachers(page = 1, limit = 10, searchTerm?: string) {

    const url = new URL(`${API_URL}/teachers`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    if (searchTerm) {
        url.searchParams.append("searchTerm", searchTerm);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error('Failed to fetch teachers');
    }

    const data: GetTeachersType = await response.json();

    return {
        teachers: data.teachers,
        total: data.total,
        lastPage: data.lastPage
    }
}

export async function createTeacher(teacher: Omit<Teacher, 'idTeacher'>): Promise<Teacher> {

    const response = await fetch(`${API_URL}/teachers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create teacher');
    }

    return response.json();
}

export async function updateTeacher(teacherId: string, teacher: Omit<Teacher, 'idTeacher'>): Promise<Teacher> {

    const response = await fetch(`${API_URL}/teachers/${teacherId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacher),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create teacher');
    }

    return response.json();
}

export async function deleteTeacher(teacherId: string): Promise<Teacher> {

    const response = await fetch(`${API_URL}/teachers/${teacherId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete teacher');
    }

    return response.json();
}
