import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { TableCell } from "@/components/ui/table";
import { Teacher } from "@/types/teacher";
import { Pencil } from "lucide-react";

interface ActionsTableRowProps {
    teacherId: string;
    teacherData: Teacher;
    onTeacherDeleted: () => void;
    onEdit: (teacher: Teacher) => void;
}

const ActionsTableRow = ({ teacherId, teacherData, onTeacherDeleted, onEdit }: ActionsTableRowProps) => {
    return (
        <TableCell>
            <div className="flex justify-center text-center space-x-8">
                <button className="text-blue-500 hover:text-blue-700" onClick={() => onEdit(teacherData)}>
                    <Pencil size={20} />
                </button>
                <DeleteDialog teacherId={teacherId} onDelete={onTeacherDeleted}/>
            </div>
        </TableCell>
    )
}

export default ActionsTableRow;