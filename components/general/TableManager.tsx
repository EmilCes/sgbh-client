import { FilterForm } from '@/components/general/FilterForm';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { debounce } from 'lodash';
import CustomTable from './CustomTable';
import { toast } from '@/hooks/use-toast';
import PaginationComponent from '@/components/general/Pagination';
import * as XLSX from 'xlsx';

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
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [items, setItems] = useState<T[]>([]);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);

    const handleClose = () => {
        setIsFormVisible(false);
        setIsEditing(false);
        setSelectedItem(null);
    }

    const handleSearch = debounce((term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }, 500);

    const handleRowsChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
    };

    const fetchItems = async (page = 1, searchTerm = "") => {
        try {
            const { data, lastPage } = await fetchData(page, rowsPerPage, searchTerm);

            setItems(data);
            setTotalPages(lastPage);
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchItems(currentPage, searchTerm);
    }, [currentPage, searchTerm, rowsPerPage]);

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

    const handleExport = async () => {
        try {
            const response = await fetchData(1, 1000);
            const data = response.data;

            const transformedData = data.map(item => {
                const transformedItem: any = {};
                Object.entries(columns).forEach(([header, key]) => {
                    transformedItem[header] = item[key];
                });
                return transformedItem;
            });

            const worksheet = XLSX.utils.json_to_sheet(transformedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

            XLSX.writeFile(workbook, 'datos.xlsx');
        } catch (error) {
            console.error('Error exporting data:', error);
            toast({
                title: "Error",
                description: "Hubo un problema al exportar los datos.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col h-[85vh] pt-7 px-6">
            <div className="shadow-xl p-4 rounded-xl bg-white mb-4">
                <h1 className="text-xl font-semibold mb-2">{title}</h1>
                <div className="flex items-center justify-between gap-4">
                    <FilterForm
                        onSearch={handleSearch}
                        onRowsChange={handleRowsChange}
                    />

                    <div className="flex gap-4">
                        <Button onClick={() => setIsFormVisible(true)}>Nuevo Registro</Button>
                        <Button onClick={handleExport} className='bg-green-800'>Exportar</Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-between shadow-xl p-4 rounded-xl bg-white">
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
