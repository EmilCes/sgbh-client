import TeacherForm from "@/components/forms/TeacherForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormCardProps } from "@/types/components/FormCardProps";
import { Teacher } from "@/types/teacher";

export function TeacherFormCard({ onClose, onItemAdded: onTeacherAdded, item: teacher, isEditing }: FormCardProps<Teacher>) {

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
