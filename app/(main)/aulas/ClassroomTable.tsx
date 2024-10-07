import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { tableFields } from "./constants";
import { Classroom } from "@/types/classroom";

interface ClassroomTableProps {
    classrooms: Classroom[];
}

export const ClassroomTable = ({ classrooms }: ClassroomTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {tableFields.map((header, index) => (
                        <TableHead key={index} className="text-center">{header}</TableHead>
                    ))}
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {classrooms.map((classroom, index) => (
                    <TableRow key={index} className="text-center">
                        <TableCell>{classroom.name}</TableCell>
                        <TableCell>{classroom.building}</TableCell>
                        <TableCell>{classroom.level}</TableCell>
                        <TableCell>{classroom.width}</TableCell>
                        <TableCell>{classroom.length}</TableCell>
                        <TableCell>{classroom.computerEquipment}</TableCell>
                        <TableCell>{classroom.currentChairs}</TableCell>
                        <TableCell>{classroom.currentTables}</TableCell>
                        <TableCell>{classroom.maxChairsCapacity}</TableCell>
                        <TableCell>{classroom.maxTablesCapacity}</TableCell>
                        <TableCell>{classroom.lamps}</TableCell>
                        <TableCell>{classroom.thermalLevel}</TableCell>
                        <TableCell>{classroom.airConditioning ? 'Si' : 'No'}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};