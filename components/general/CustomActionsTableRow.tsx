import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { TableCell } from "@/components/ui/table";
import { Pencil } from "lucide-react";

interface CustomActionsTableRowProps<T> {
    entityId: string;
    entityData: T;
    onEntityDeleted: () => void;
    onEdit: (entity: T) => void;
    deleteFunction: (id: string) => Promise<void>;
}

const CustomActionsTableRow = <T,>({ entityId, entityData, onEntityDeleted, onEdit, deleteFunction }: CustomActionsTableRowProps<T>) => {
    return (
        <TableCell className="max-w-2">
            <div className="flex justify-center text-center space-x-4">
                <button className="text-blue-500 hover:text-blue-700" onClick={() => onEdit(entityData)}>
                    <Pencil size={20} />
                </button>
                <DeleteDialog entityId={entityId} onDelete={onEntityDeleted} deleteFunction={deleteFunction}/>
            </div>
        </TableCell>
    )
}

export default CustomActionsTableRow;
