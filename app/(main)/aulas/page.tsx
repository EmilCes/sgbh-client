"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ClassroomFormCard } from "@/app/components/classroom/ClassroomFormCard";
import { SearchForm } from "./SearchForm";
import { ClassroomTable } from "./ClassroomTable";


const Classroom = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [classrooms, setclassrooms] = useState([]);
    const [error, setError] = useState(null);

    const toggleFormVisibility = () => setIsFormVisible(prev => !prev);
    const handleClose = () => setIsFormVisible(false);

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const response = await fetch('http://localhost:3002/classrooms');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setclassrooms(data);

            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchClassrooms();
    }, []);

    return (
        <div className="flex flex-col h-[85vh] pt-7 px-16">
            <div className="shadow-xl p-4 rounded-xl bg-white mb-4">
                <h1 className="text-xl font-semibold mb-2">Gestión de Aulas</h1>
                <div className="flex items-center justify-between gap-4">
                    <SearchForm />
                    <Button onClick={toggleFormVisibility}>Nuevo Registro</Button>
                </div>
            </div>

            <div className="shadow-xl p-4 rounded-xl bg-white h-[80%]">
                {isFormVisible && (
                    <div
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                        onClick={handleClose}
                    >
                        <div
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ClassroomFormCard onClose={handleClose} />
                        </div>
                    </div>
                )}

                <ClassroomTable classrooms={classrooms} />
            </div>
        </div>
    );
};

export default Classroom;