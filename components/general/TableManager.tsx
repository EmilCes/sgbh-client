import { SearchForm } from '@/components/general/SearchForm';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { debounce } from 'lodash';
import CustomTable from './CustomTable';
import { toast } from '@/hooks/use-toast';
import PaginationComponent from '@/components/general/Pagination';

interface TableManagerProps<T extends { [key: string]: any }> {
    title: string;
    columns: Record<string, string>;
    idField: keyof T;
    fetchData: (page: number, limit: number, searchTerm?: string) => Promise<{ 
        data: T[]; total: number; lastPage: number; error?: undefined;
    }>
    deleteFunction: (id: string) => Promise<void>;
    FormCard: React.FC<{ 
        onClose: () => void;
        onItemAdded: () => void;
        item: T | null;
        isEditing: boolean;
    }>
}

const TableManager = <T extends { [key: string]: any }>({
    title,
    columns,
    idField,
    fetchData,
    deleteFunction,
    FormCard
}: TableManagerProps<T>) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [items, setItems] = useState<T[]>([]);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);

    const calculateRowsPerPage = () => {
        const width = window.innerWidth;
        return width > 1900 ? 10 : 8;
    };

    const handleClose = () => {
        setIsFormVisible(false);
        setIsEditing(false);
        setSelectedItem(null);
    }

    const handleSearch = debounce((term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }, 500);

    const fetchItems = async (page = 1, searchTerm = "") => {
        try {
            const rowsPerPage = calculateRowsPerPage();
            const { data, lastPage } = await fetchData(page, rowsPerPage, searchTerm);

            setItems(data);
            setTotalPages(lastPage);
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchItems(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handleEdit = (item: T) => {
        setSelectedItem(item);
        setIsEditing(true);
        setIsFormVisible(true);
    }

    const handleItemAdded = () => {
        fetchItems(currentPage, searchTerm);
        toast({
            title: "Éxito",
            description: isEditing ? "Registro editado correctamente" : "Registro creado con éxito",
            variant: "success"
        });
        
        handleClose();
    }

    const handleItemDeleted = () => {
        fetchItems(currentPage, searchTerm);
        toast({
            title: "Éxito",
            description: "Registro eliminado correctamente",
            variant: "success"
        })
    }

    return (
        <div className="flex flex-col h-[85vh] pt-7 px-16">
            <div className="shadow-xl p-4 rounded-xl bg-white mb-4">
                <h1 className="text-xl font-semibold mb-2">{title}</h1>
                <div className="flex items-center justify-between gap-4">
                    <SearchForm onSearch={handleSearch} />

                    <Button onClick={() => setIsFormVisible(true)}>Nuevo Registro</Button>
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
                            <FormCard
                                onClose={handleClose}
                                onItemAdded={handleItemAdded}
                                item={selectedItem}
                                isEditing={isEditing}
                            />
                        </div>
                    </div>
                )}

                <div className="flex-grow w-full overflow-auto">
                    <CustomTable
                        data={items}
                        columns={columns}
                        onDelete={handleItemDeleted}
                        onEdit={handleEdit}
                        idField={idField}
                        deleteFunction={deleteFunction}
                    />
                </div>

                <div className="flex">
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default TableManager;
