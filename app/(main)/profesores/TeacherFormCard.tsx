import TeacherForm from "@/components/forms/TeacherForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Teacher } from "@/types/teacher";


interface ClassroomFormCardProps {
  onClose: () => void;
  onTeacherAdded: () => void;
  teacher: Teacher | null;
  isEditing: boolean;
}

export function TeacherFormCard({ onClose, onTeacherAdded, teacher, isEditing }: ClassroomFormCardProps) {

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Profesor" : "Registrar Profesor"}
        </CardTitle>
        <CardDescription>
          {isEditing ? "Editar un profesor en el sistema." : "Registrar un profesor en el sistema."}
        </CardDescription>
      </CardHeader>


        <CardContent>

          <TeacherForm 
            onClose={onClose} 
            onTeacherAdded={onTeacherAdded}
            teacherData={teacher}
          />

        </CardContent>

    </Card>
  )
}
