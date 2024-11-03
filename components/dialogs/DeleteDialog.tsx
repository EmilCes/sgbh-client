import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash } from "lucide-react";
import { useState } from "react";

interface DeleteDialogProps {
    entityId: string;
    onDelete: () => void;
    deleteFunction: (id: string) => Promise<void>;
}

export default function DeleteDialog({ entityId, onDelete, deleteFunction }: DeleteDialogProps) {

    const [isLoading, setIsLoading] = useState(false);

    async function handleDelete() {
        setIsLoading(true);

        try {
            await deleteFunction(entityId);
            onDelete();
        } catch (err) {
            console.log("Error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-red-500 hover:text-red-700">
                    <Trash size={20} />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro(a)?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Se eliminará permanentemente el registro.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction >Cancelar</AlertDialogAction>
                    <AlertDialogAction
                        className="bg-destructive text-white"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                         {isLoading ? 'Eliminando...' : 'Eliminar'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
