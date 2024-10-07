"use client"

import { Button } from "@/components/ui/button";
import { debounce } from 'lodash';
import { useEffect, useState } from "react";
import { SearchForm } from "../aulas/SearchForm";
import { TeacherTable } from "./TeacherTable";
import { TeacherFormCard } from "./TeacherFormCard";
import { getTeachers } from "@/lib/api/teachers";
import { Teacher } from "@/types/teacher";
import { useToast } from "@/hooks/use-toast";
import PaginationComponent from "./Pagination";

const Teachers = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { toast } = useToast()
    const toggleFormVisibility = () => setIsFormVisible(prev => !prev);
    
    const handleClose = () => {
        setIsFormVisible(false);
        setIsEditing(false);
        setSelectedTeacher(null);
    }
    
    const calculateRowsPerPage = () => {
        const width = window.innerWidth;
        return width > 1900 ? 10 : 8;
    };

    // Debounce: It is used to avoid making requests for each character, but rather a time later
    const handleSearch = debounce((term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }, 500);

    const fetchTeachers = async (page = 1, searchTerm = "") => {
        try {
            const rowsPerPage = calculateRowsPerPage();
            const data = await getTeachers(page, rowsPerPage, searchTerm);
            setTeachers(data.teachers);
            setTotalPages(data.lastPage);
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchTeachers(currentPage, searchTerm);
    }, [currentPage, searchTerm])

    const handleEdit = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setIsEditing(true);
        setIsFormVisible(true);
    };

    const handleTeacherAdded = () => {
        fetchTeachers(currentPage, searchTerm);
        toast({
            title: "Éxito",
            description: isEditing ? "Profesor editado correctamente" : "Profesor registrado con éxito",
            variant: "success"
        });
        
        handleClose();
    }

    const handleTeacherDeleted = () => {
        fetchTeachers(currentPage, searchTerm);
        toast({
            title: "Éxito",
            description: "Profesor eliminado correctamente",
            variant: "success"
        })
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return (
        <div className="flex flex-col h-[85vh] pt-7 px-16">
            <div className="shadow-xl p-4 rounded-xl bg-white mb-4">
                <h1 className="text-xl font-semibold mb-2">Gestión de Profesores</h1>
                <div className="flex items-center justify-between gap-4">
                    <SearchForm onSearch={handleSearch} />

                    <Button onClick={toggleFormVisibility}>Nuevo Registro</Button>
                </div>
            </div>

            <div className="flex flex-col justify-between shadow-xl p-4 rounded-xl bg-white h-[82%]">
                {isFormVisible && (
                    <div
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                        onClick={handleClose}
                    >
                        <div
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <TeacherFormCard 
                                onClose={handleClose} 
                                onTeacherAdded={handleTeacherAdded}
                                teacher={selectedTeacher}
                                isEditing={isEditing}
                            />
                        </div>
                    </div>
                )}

                <div className="flex-grow w-full overflow-auto">
                    <TeacherTable teachers={teachers} onTeacherDeleted={handleTeacherDeleted} onEdit={handleEdit} />
                </div>

                <div className="flex">
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>

            </div>

        </div>
    );
};

export default Teachers