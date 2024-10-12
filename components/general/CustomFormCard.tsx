import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  interface EntityFormCardProps<T> {
    onClose: () => void;
    onEntityAdded: () => void;
    entity: T | null;
    isEditing: boolean;
    formComponent: React.ComponentType<any>; 
    entityName: string;
    description: {
      edit: string;
      create: string;
    }
  }
  
  export function CustomEntityFormCard<T>({ 
    onClose, 
    onEntityAdded, 
    entity, 
    isEditing, 
    formComponent: FormComponent, 
    entityName,
    description
  }: EntityFormCardProps<T>) {
  
    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>
            {isEditing ? `Editar ${entityName}` : `Registrar ${entityName}`}
          </CardTitle>
          <CardDescription>
            {isEditing ? description.edit : description.create}
          </CardDescription>
        </CardHeader>
  
        <CardContent>
          <FormComponent 
            onClose={onClose} 
            onEntityAdded={onEntityAdded}
            entityData={entity}
          />
        </CardContent>
      </Card>
    )
  }
  