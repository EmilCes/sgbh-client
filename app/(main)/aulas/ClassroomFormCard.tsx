import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ClassroomForm from "../../../components/forms/ClassroomForm";
import { FormCardProps } from "@/types/components/FormCardProps";
import { Classroom } from "@/types/classroom";

export function ClassroomFormCard({ onClose, onItemAdded: onClassroomAdded, item: classroom, isEditing }: FormCardProps<Classroom>) {

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Aula" : "Registrar Aula"}
        </CardTitle>
        <CardDescription>
          {isEditing ? "Editar un aula en el sistema." : "Registrar una nueva aula en el sistema."}
        </CardDescription>
      </CardHeader>


      <CardContent>

        <ClassroomForm
          onClose={onClose}
          onClassroomAdded={onClassroomAdded}
          classroomData={classroom}
        />

      </CardContent>

    </Card>
  )
}
