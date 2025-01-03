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
        <div className="w-full overflow-hidden">
            <Table className="w-full table-fixed">
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
                                Object.values(columns).map((attribute, colIndex) => {

                                    const value = item[attribute as keyof T];
                                    const displayValue =
                                        value === null || value === undefined
                                            ? "N/A"
                                            : typeof value === "boolean"
                                                ? value
                                                    ? "Sí"
                                                    : "No"
                                                : String(value);

                                    return (
                                        <TableCell 
                                            key={colIndex} 
                                            className=" overflow-hidden text-ellipsis px-2 py-2 text-sm">
                                            {displayValue}
                                        </TableCell>
                                    );
                                })
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