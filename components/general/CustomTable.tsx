import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CustomActionsTableRow from "./CustomActionsTableRow";

interface CustomTableProps<T> {
    data: T[];
    columns: Record<string, string>;
    onDelete: (id: string) => void;
    onEdit: (entity: T) => void;
    idField: keyof T;
    deleteFunction: (id: string) => Promise<void>;
}

const CustomTable = <T extends { [key: string]: any }>({
    data,
    columns,
    onDelete,
    onEdit,
    idField,
    deleteFunction
}: CustomTableProps<T>) => {
    return (
        <div className="overflow-y-auto max-h-[95%]">
            <Table>
                <TableHeader>
                    <TableRow className="text-center">
                        {
                            Object.keys(columns).map((col, index) => (
                                <TableCell key={index}>{col}</TableCell>
                            ))
                        }
                        <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index} className="text-center">
                            {
                                Object.values(columns).map((atribute, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {
                                            item[atribute as keyof T] !== undefined ? (
                                                typeof item[atribute as keyof T] === 'boolean'
                                                    ? item[atribute as keyof T]
                                                        ? 'Sí'
                                                        : 'No'
                                                    : String(item[atribute as keyof T])
                                            ) : 'N/A'}
                                    </TableCell>
                                ))
                            }
                            <CustomActionsTableRow
                                entityId={item[idField]}
                                entityData={item}
                                onEntityDeleted={() => onDelete(item[idField])}
                                onEdit={() => onEdit(item)}
                                deleteFunction={deleteFunction}
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomTable;