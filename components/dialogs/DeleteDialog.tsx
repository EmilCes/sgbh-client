import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteTeacher } from "@/lib/api/teachers";
import { Trash } from "lucide-react"
import { useState } from "react";

interface DeleteDialogProps {
    teacherId: string;
    onDelete: () => void;
}

export default function DeleteDialog({ teacherId, onDelete }: DeleteDialogProps) {

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    async function handleDelete() {
        setIsLoading(true);
        setError(null);

        try {
            await deleteTeacher(teacherId);
            onDelete();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrio un error al eliminar el profesor');
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
                    <AlertDialogTitle>¿Estas seguro(a)?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede desacer. Se eliminara permanentemente
                        el registro.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-destructive text-white">Cancelar</AlertDialogCancel>
                    <AlertDialogAction
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
