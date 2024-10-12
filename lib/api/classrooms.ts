import { Classroom } from "@/types/classroom";
import { fetchWithAuth } from "../utils/apiUtils";

interface GetClassroomsType {
    classrooms: Classroom[];
    total: number;
    lastPage: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getClassrooms(page = 1, limit = 10, searchTerm?: string) {
    const url = new URL(`${API_URL}/classrooms`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());

    if (searchTerm) {
        url.searchParams.append("searchTerm", searchTerm);
    }

    const data: GetClassroomsType = await fetchWithAuth(url.toString(), {
        method: 'GET',
    });

    return {
        data: data.classrooms,
        total: data.total,
        lastPage: data.lastPage
    };
}

export async function createClassroom(classroom: Omit<Classroom, 'idClassroom'>): Promise<Classroom> {
    const data = await fetchWithAuth(`${API_URL}/classrooms`, {
        method: 'POST',
        body: JSON.stringify(classroom),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return data;
}

export async function updateClassroom(classroomId: string, classroom: Omit<Classroom, 'idClassroom'>): Promise<Classroom> {
    const data = await fetchWithAuth(`${API_URL}/classrooms/${classroomId}`, {
        method: 'PUT',
        body: JSON.stringify(classroom),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return data;
}

export async function deleteClassroom(classroomId: string): Promise<void> {
    await fetchWithAuth(`${API_URL}/classrooms/${classroomId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
