import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ClassroomForm from "./ClassroomForm";

interface ClassroomFormCardProps {
  onClose: () => void;
}

export function ClassroomFormCard({ onClose }: ClassroomFormCardProps) {

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Registrar Aula</CardTitle>
        <CardDescription>Registrar una nueva aula en el sistema.</CardDescription>
      </CardHeader>


        <CardContent>

          <ClassroomForm onClose={onClose}/>

        </CardContent>

    </Card>
  )
}
