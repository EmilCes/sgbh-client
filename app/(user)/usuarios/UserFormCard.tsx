import UserForm from "@/components/forms/UserForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormCardProps } from "@/types/components/FormCardProps";
import { User } from "@/types/user";

export function UserFormCard({ onClose, onItemAdded: onUserAdded, item: user, isEditing }: FormCardProps<User>) {

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar Usuario" : "Registrar Usuario"}
        </CardTitle>
        <CardDescription>
          {isEditing ? "Editar un usuario del sistema." : "Registrar un usuario en el sistema."}
        </CardDescription>
      </CardHeader>


        <CardContent>

          <UserForm 
            onClose={onClose}
            onUserAdded={onUserAdded}
            userData={user}
          />

        </CardContent>

    </Card>
  )
}
