import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Teacher } from "@/types/teacher";
import { tableFields } from "./constants";
import ActionsTableRow from "./ActionsTableRow";

interface TeachersTableProps {
    teachers: Teacher[];
    onTeacherDeleted: () => void;
    onEdit: (teacher: Teacher) => void;
}

export const TeacherTable = ({ teachers, onTeacherDeleted, onEdit }: TeachersTableProps) => {
    return (
        <div className="overflow-y-auto max-h-[95%]">
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableFields.map((header, index) => (
                            <TableHead key={index} className="text-center">{header}</TableHead>
                        ))}
                        <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers.map((teacher, index) => (
                        <TableRow key={index} className="text-center">
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>{teacher.lastName}</TableCell>
                            <TableCell>{teacher.personalNumber}</TableCell>
                            <TableCell>{teacher.antiquity}</TableCell>
                            <TableCell>{teacher.personalAccount}</TableCell>
                            <TableCell>{teacher.institutionalAccount}</TableCell>
                            <TableCell>{teacher.uvAdmissionDate}</TableCell>
                            <TableCell>{teacher.birthdate}</TableCell>
                            <ActionsTableRow 
                                teacherId={teacher.idTeacher}
                                teacherData={teacher}
                                onTeacherDeleted={onTeacherDeleted}
                                onEdit={onEdit}
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};